import React from 'react';
import { UserInput, Gender, CalendarType } from '../types';
import { YEARS, MONTHS, DAYS, HOURS, MINUTES } from '../constants';

interface InputFormProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ input, setInput, onSubmit, isLoading }) => {
  const handleChange = (field: keyof UserInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = input.birthYear && input.birthMonth && input.birthDay && input.birthPlace;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto border-2 border-red-100">
      <h2 className="text-xl font-bold text-center text-red-800 mb-6">
        ✨ 생년월일을 입력해주세요
      </h2>

      <div className="space-y-5">
        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <div className="flex space-x-2">
            <select
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none"
              value={input.birthYear}
              onChange={(e) => handleChange('birthYear', e.target.value)}
            >
              <option value="">년</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none"
              value={input.birthMonth}
              onChange={(e) => handleChange('birthMonth', e.target.value)}
            >
              <option value="">월</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none"
              value={input.birthDay}
              onChange={(e) => handleChange('birthDay', e.target.value)}
            >
              <option value="">일</option>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex mt-2 space-x-4">
             <div className="flex items-center space-x-2 bg-red-50 p-1 rounded-lg">
                <button
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${input.calendarType === CalendarType.SOLAR ? 'bg-red-500 text-white shadow-sm' : 'text-red-800'}`}
                  onClick={() => handleChange('calendarType', CalendarType.SOLAR)}
                >
                  양력
                </button>
                <button
                   className={`px-3 py-1 rounded-md text-sm transition-colors ${input.calendarType === CalendarType.LUNAR ? 'bg-red-500 text-white shadow-sm' : 'text-red-800'}`}
                   onClick={() => handleChange('calendarType', CalendarType.LUNAR)}
                >
                  음력
                </button>
             </div>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-3 rounded-xl border-2 transition-all ${input.gender === Gender.MALE ? 'border-red-500 bg-red-50 text-red-700 font-bold' : 'border-gray-200 text-gray-500'}`}
              onClick={() => handleChange('gender', Gender.MALE)}
            >
              남성
            </button>
            <button
              className={`p-3 rounded-xl border-2 transition-all ${input.gender === Gender.FEMALE ? 'border-red-500 bg-red-50 text-red-700 font-bold' : 'border-gray-200 text-gray-500'}`}
              onClick={() => handleChange('gender', Gender.FEMALE)}
            >
              여성
            </button>
          </div>
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">태어난 시간</label>
          <div className="flex items-center space-x-2 mb-2">
             <select
              disabled={input.isTimeUnknown}
              className={`flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none ${input.isTimeUnknown ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
              value={input.birthHour}
              onChange={(e) => handleChange('birthHour', e.target.value)}
            >
              <option value="">시</option>
              {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <span className="text-gray-500">:</span>
            <select
              disabled={input.isTimeUnknown}
              className={`flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none ${input.isTimeUnknown ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
              value={input.birthMinute}
              onChange={(e) => handleChange('birthMinute', e.target.value)}
            >
              <option value="">분</option>
              {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="unknownTime"
              checked={input.isTimeUnknown}
              onChange={(e) => handleChange('isTimeUnknown', e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="unknownTime" className="ml-2 text-sm text-gray-600">
              태어난 시간을 몰라요
            </label>
          </div>
        </div>

        {/* Birth Place */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                태어난 곳 (시/군/구)
            </label>
            <input
                type="text"
                placeholder="예: 서울시 강남구, 부산 해운대구, 뉴욕"
                value={input.birthPlace || ''}
                onChange={(e) => handleChange('birthPlace', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!isFormValid || isLoading}
        className={`w-full mt-8 py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-transform transform active:scale-95 ${!isFormValid || isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'}`}
      >
        {isLoading ? '운세를 읽는 중...' : '2026년 운세 확인하기 🐴'}
      </button>
    </div>
  );
};
