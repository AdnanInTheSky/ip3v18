import { Router } from 'express';
import Content from '../models/Content.js';
import Lead from '../models/Lead.js';
import Booking from '../models/Booking.js';
import Media from '../models/Media.js';
import { dbState, dbPing, isDBConnected } from '../lib/db.js';
import { isCloudinaryConfigured } from '../lib/cloudinary.js';
import { optionalAdmin } from '../lib/auth.js';
import { asyncHandler } from '../lib/helpers.js';
import { inMemoryStore } from '../lib/inMemoryStore.js';

const router = Router();

/**
 * Public: liveness only. Counts and content metadata are returned only to a
 * signed-in administrator — the console's overview panel uses them.
 */
router.get(
  '/',
  optionalAdmin,
  asyncHandler(async (req, res) => {
    const isConnected = isDBConnected();
    const state = dbState();
    const ping = isConnected ? await dbPing() : 'offline';

    const payload = {
      ok: true,
      database: isConnected ? 'MongoDB' : 'In-Memory (Local / Ephemeral)',
      dbState: isConnected ? state : 'in-memory',
      dbPing: ping,
      cdn: isCloudinaryConfigured() ? 'Cloudinary' : 'Not configured',
      adminAuth: 'Active',
      content: null,
      counts: null,
    };

    if (req.admin) {
      if (isConnected) {
        try {
          const [content, leads, newLeads, bookings, upcoming, media] = await Promise.all([
            Content.findOne({ key: 'site' }).select('version updatedAt updatedBy').lean(),
            Lead.countDocuments({}),
            Lead.countDocuments({ status: 'new' }),
            Booking.countDocuments({}),
            Booking.countDocuments({ status: 'confirmed' }),
            Media.countDocuments({}),
          ]);

          payload.content = content
            ? { version: content.version, updatedAt: content.updatedAt, updatedBy: content.updatedBy }
            : null;
          payload.counts = { leads, newLeads, bookings, upcoming, media };
        } catch {
          // If query fails, fall back to in-memory counts
          payload.counts = {
            leads: inMemoryStore.leads.length,
            newLeads: inMemoryStore.leads.filter((l) => l.status === 'new').length,
            bookings: inMemoryStore.bookings.length,
            upcoming: inMemoryStore.bookings.filter((b) => b.status === 'confirmed').length,
            media: inMemoryStore.media.length,
          };
        }
      } else {
        const memContent = inMemoryStore.content;
        payload.content = memContent
          ? { version: memContent.version, updatedAt: memContent.updatedAt, updatedBy: memContent.updatedBy }
          : null;
        payload.counts = {
          leads: inMemoryStore.leads.length,
          newLeads: inMemoryStore.leads.filter((l) => l.status === 'new').length,
          bookings: inMemoryStore.bookings.length,
          upcoming: inMemoryStore.bookings.filter((b) => b.status === 'confirmed').length,
          media: inMemoryStore.media.length,
        };
      }
    }

    res.status(200).json(payload);
  })
);

export default router;
