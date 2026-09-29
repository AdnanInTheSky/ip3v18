import { Router } from 'express';
import Media from '../models/Media.js';
import { requireAdmin } from '../lib/auth.js';
import { cdnConfig, signUpload, destroyAsset, videoThumbnail, DEFAULT_FOLDER } from '../lib/cloudinary.js';
import { asyncHandler, httpError, isValidId, sanitizePayload } from '../lib/helpers.js';
import { isDBConnected } from '../lib/db.js';
import {
  addInMemoryMedia,
  getInMemoryMedia,
  deleteInMemoryMedia,
} from '../lib/inMemoryStore.js';

const router = Router();

/** Tells the admin console whether the CDN is wired up. */
router.get('/config', requireAdmin, (_req, res) => res.json(cdnConfig()));

/**
 * Admin: a short-lived signature. The browser then uploads the file straight
 * to Cloudinary, so large video never touches this server or the database.
 */
router.post(
  '/signature',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { folder, resourceType } = req.body || {};
    res.json(signUpload({ folder: folder || DEFAULT_FOLDER, resourceType }));
  })
);

/** Admin: record an uploaded asset in the library. */
router.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);
    if (!payload.url || !payload.publicId) {
      throw httpError(400, 'An uploaded asset needs a url and a publicId.', 'INVALID_PAYLOAD');
    }

    const resourceType = payload.resourceType === 'video' ? 'video' : 'image';

    if (!isDBConnected()) {
      const item = addInMemoryMedia({
        ...payload,
        resourceType,
        folder: payload.folder || DEFAULT_FOLDER,
        thumbnailUrl:
          payload.thumbnailUrl || (resourceType === 'video' ? videoThumbnail(payload.publicId) : payload.url),
      });
      return res.status(201).json({ ok: true, item });
    }

    const item = await Media.findOneAndUpdate(
      { publicId: payload.publicId },
      {
        $set: {
          ...payload,
          resourceType,
          folder: payload.folder || DEFAULT_FOLDER,
          thumbnailUrl:
            payload.thumbnailUrl || (resourceType === 'video' ? videoThumbnail(payload.publicId) : payload.url),
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    res.status(201).json({ ok: true, item });
  })
);

/** Admin: the media library. */
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { type = 'all', limit = 200 } = req.query;
    const filter = type && type !== 'all' ? { resourceType: String(type) } : {};

    if (!isDBConnected()) {
      return res.json({ items: getInMemoryMedia(filter).slice(0, Math.min(Number(limit) || 200, 500)) });
    }

    const items = await Media.find(filter)
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit) || 200, 500))
      .lean();

    res.json({ items });
  })
);

/** Admin: delete from the library and from the CDN. */
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    if (!isDBConnected()) {
      const item = deleteInMemoryMedia(req.params.id);
      if (item) {
        try {
          await destroyAsset(item.publicId, item.resourceType);
        } catch (err) {
          console.warn('[media] CDN delete failed; removing the record anyway.', err?.message);
        }
      }
      return res.json({ ok: true });
    }

    if (!isValidId(req.params.id)) throw httpError(400, 'Invalid media id.', 'INVALID_ID');

    const item = await Media.findById(req.params.id).lean();
    if (!item) return res.json({ ok: true });

    try {
      await destroyAsset(item.publicId, item.resourceType);
    } catch (err) {
      console.warn('[media] CDN delete failed; removing the record anyway.', err?.message);
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  })
);

export default router;
