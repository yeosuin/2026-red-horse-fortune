export const APP_TITLE = "2026년 붉은 말의 해";

export const YEARS = Array.from({ length: 100 }, (_, i) => String(2026 - i)); // Past 100 years
export const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
export const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
export const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
export const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));