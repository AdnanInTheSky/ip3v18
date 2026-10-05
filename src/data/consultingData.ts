import { OfficeInfo, ServiceOption, FaqItem, StatItem, TestimonialItem } from '../types';

// Do not seed invented contact details, client outcomes, or service claims.
// Add verified organisation details through the CMS before launch.
export const ip3OfficeInfo: OfficeInfo = {
  companyName: 'IP3 Consulting Limited',
  tagline: 'Policy analysis, action research and management consulting.',
  description: '',
  email: '',
  phone: '',
  alternatePhone: '',
  address: {
    building: '',
    road: '',
    area: '',
    city: '',
    country: '',
    fullAddress: '',
  },
  googleMapsUrl: '',
  googleMapsEmbedUrl: '',
  officeHours: '',
  timeZone: '',
};

export const consultingServices: ServiceOption[] = [];
export const trustStats: StatItem[] = [];
export const faqItems: FaqItem[] = [];
export const availableTimeSlots: string[] = [
  '08:30 AM', '10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM', '04:30 PM',
];
export const clientTestimonials: TestimonialItem[] = [];
