export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum CalendarType {
  SOLAR = 'solar',
  LUNAR = 'lunar',
}

export interface UserInput {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  calendarType: CalendarType;
  gender: Gender;
  birthHour: string;
  birthMinute: string;
  isTimeUnknown: boolean;
  birthPlace: string;
}

export interface MonthlyFortune {
  month: number;
  content: string;
  mood: 'good' | 'neutral' | 'caution';
}

export interface SpecificFortuneDetail {
  summary: string;
  detail: string;
  score: number;
}

export interface SpecificFortunes {
  love: SpecificFortuneDetail;
  career: SpecificFortuneDetail;
  friendship: SpecificFortuneDetail;
}

export interface CautionaryAdvice {
  title: string;
  content: string;
  solution: string;
}

export interface FortuneResult {
  geo_info: {
    location_name: string;
    latitude: string;
    longitude: string;
    timezone?: string;
  };
  astrology_chart: {
    ascendant?: string;
    sun?: string;
    moon?: string;
    house_emphasis?: string;
  };
  personality: string;
  generalFortune: string;
  keywords: string[];
  cautionary_advice: CautionaryAdvice;
  specific_fortunes: SpecificFortunes;
  monthlyFortune: MonthlyFortune[];
}
