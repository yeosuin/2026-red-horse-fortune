import React from 'react';
import { FortuneResult, UserInput, CalendarType, Gender } from '../types';

interface ResultSectionProps {
  result: FortuneResult;
  userInput: UserInput;
  onReset: () => void;
}

// 점수 표시용 간단한 Progress Bar 컴포넌트
const ScoreBar = ({ score, colorClass }: { score: number; colorClass: string }) => (
    <div className="flex items-center space-x-3 mt-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
            className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-bold text-gray-600">{score}점</span>
    </div>
);

export const ResultSection: React.FC<ResultSectionProps> = ({ result, userInput, onReset }) => {
  const birthTimeStr = userInput.isTimeUnknown 
    ? "시간 모름" 
    : `${userInput.birthHour}시 ${userInput.birthMinute}분`;

  return (
      <div className="w-full max-w-4xl mx-auto space-y-10 pb-20 animate-fade-in px-4 md:px-0">

        {/* 1. Header & Title */}
        <div className="text-center space-y-3 pt-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide border border-red-200">
            <span>🐎</span> 2026 병오년 (丙午年)
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            당신의 운명, <br className="md:hidden" />
            <span className="text-red-600">붉은 말의 전언</span>
          </h2>
        </div>

        {/* User Input Summary Box */}
        <div className="bg-white/50 backdrop-blur-sm border border-red-100 rounded-2xl p-4 md:p-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-500">📅 생년월일</span>
            <span>{userInput.birthYear}년 {userInput.birthMonth}월 {userInput.birthDay}일 ({userInput.calendarType === CalendarType.SOLAR ? '양력' : '음력'})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-500">⏰ 시간</span>
            <span>{birthTimeStr}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-500">👤 성별</span>
            <span>{userInput.gender === Gender.MALE ? '남성' : '여성'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-500">📍 태어난 곳</span>
            <span>{userInput.birthPlace}</span>
          </div>
        </div>

        {/* 3. General Fortune (Main Hero) */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100 ring-1 ring-red-50">
          <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-9xl opacity-10 select-none">🔥</div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-white/20 p-1.5 rounded-lg text-lg">📜</span> 총운 요약
              </h3>
              <p className="text-lg md:text-2xl leading-relaxed font-medium mb-8 text-white/95 break-keep">
                "{result.generalFortune}"
              </p>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, index) => (
                    <span key={index} className="bg-white/90 text-red-600 px-3 py-1 rounded-lg text-sm font-bold shadow-sm backdrop-blur-sm">
                  #{keyword}
                </span>
                ))}
              </div>
            </div>
          </div>

          {/* Personality Section */}
          <div className="p-8 md:p-10 bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👤</span> 타고난 기질 (Personality)
            </h3>
            <p className="text-gray-600 leading-8 text-lg bg-gray-50 p-6 rounded-2xl border border-gray-100">
              {result.personality}
            </p>
          </div>
        </div>

        {/* 3.5 Cautionary Advice - NEW */}
        {result.cautionary_advice && (
          <div className="bg-amber-50 rounded-3xl shadow-md overflow-hidden border border-amber-200">
            <div className="bg-amber-100 px-8 py-4 flex items-center gap-2 border-b border-amber-200">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-xl font-bold text-amber-900">2026년 특별 주의사항</h3>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">Warning</span>
                <h4 className="text-2xl font-black text-gray-900">{result.cautionary_advice.title}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {result.cautionary_advice.content}
              </p>
              <div className="bg-white/60 rounded-2xl p-6 border border-amber-100 mt-4">
                <h5 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <span>💡</span> 이렇게 대처하세요
                </h5>
                <p className="text-gray-600">
                  {result.cautionary_advice.solution}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Specific Fortunes (Vertical Stack) - Updated */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>🔍</span> 테마별 상세 분석
          </h3>
          <div className="flex flex-col gap-6">
            {/* Love Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-pink-400 to-red-400"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h4 className="font-bold text-2xl text-gray-800 flex items-center gap-3">
                  <span className="bg-pink-100 p-2 rounded-xl text-2xl">💘</span> 연애 및 결혼운
                </h4>
                <div className="w-full md:w-64">
                   <ScoreBar score={result.specific_fortunes.love.score} colorClass="bg-gradient-to-r from-pink-500 to-red-400" />
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xl font-bold text-gray-900 block border-b border-gray-50 pb-2">{result.specific_fortunes.love.summary}</span>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {result.specific_fortunes.love.detail}
                </p>
              </div>
            </div>

            {/* Career Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-indigo-400"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h4 className="font-bold text-2xl text-gray-800 flex items-center gap-3">
                  <span className="bg-blue-100 p-2 rounded-xl text-2xl">💼</span> 직업 및 재물운
                </h4>
                <div className="w-full md:w-64">
                   <ScoreBar score={result.specific_fortunes.career.score} colorClass="bg-gradient-to-r from-blue-500 to-indigo-500" />
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xl font-bold text-gray-900 block border-b border-gray-50 pb-2">{result.specific_fortunes.career.summary}</span>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {result.specific_fortunes.career.detail}
                </p>
              </div>
            </div>

            {/* Friendship Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-green-100 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 to-green-400"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h4 className="font-bold text-2xl text-gray-800 flex items-center gap-3">
                  <span className="bg-green-100 p-2 rounded-xl text-2xl">🤝</span> 인복 및 대인관계
                </h4>
                <div className="w-full md:w-64">
                   <ScoreBar score={result.specific_fortunes.friendship.score} colorClass="bg-gradient-to-r from-teal-500 to-green-500" />
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xl font-bold text-gray-900 block border-b border-gray-50 pb-2">{result.specific_fortunes.friendship.summary}</span>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {result.specific_fortunes.friendship.detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Monthly Fortune Timeline */}
        <div className="space-y-6 pt-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
            <span>📅</span> 2026년 월별 흐름
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.monthlyFortune.map((monthData) => (
                <div key={monthData.month} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-red-200 transition-all hover:shadow-lg group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">{monthData.month}월</span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                          monthData.mood === 'good' ? 'bg-red-50 text-red-600 border-red-100' :
                              monthData.mood === 'caution' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                                  'bg-white text-gray-500 border-gray-200'
                      }`}>
                    {monthData.mood === 'good' ? 'Good 🔥' :
                        monthData.mood === 'caution' ? 'Caution 🌪️' : 'Normal ☁️'}
                  </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {monthData.content}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* 6. Footer Actions */}
        <div className="flex flex-col items-center pt-10 pb-4 space-y-6">
          <button
              onClick={onReset}
              className="w-full max-w-sm bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-black transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>↻</span> 다른 사주 보러가기
          </button>
          <p className="text-gray-400 text-xs text-center leading-5 max-w-md">
            본 운세 서비스는 Google Gemini AI의 천문/사주 데이터를 기반으로 생성되었습니다.<br/>
            인생의 중요한 결정은 본인의 의지에 달려있음을 기억하세요.
          </p>
        </div>
      </div>
  );
};