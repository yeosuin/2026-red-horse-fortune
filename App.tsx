import React, { useState, useCallback } from 'react';
import { UserInput, Gender, CalendarType, FortuneResult } from './types';
import { fetchFortune } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { ResultSection } from './components/ResultSection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { APP_TITLE } from './constants';
import horseImg from './assets/images/horse.png';

const App: React.FC = () => {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [input, setInput] = useState<UserInput>({
    birthYear: '1995',
    birthMonth: '',
    birthDay: '',
    calendarType: CalendarType.SOLAR,
    gender: Gender.FEMALE,
    birthHour: '',
    birthMinute: '',
    isTimeUnknown: false,
    birthPlace: '',
  });
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setStep('loading');
    setError(null);
    try {
      const data = await fetchFortune(input);
      setResult(data);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError("죄송합니다. 운세를 불러오는 중에 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      setStep('input');
    }
  }, [input]);

  const handleReset = useCallback(() => {
    setResult(null);
    setStep('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-gray-800 font-sans selection:bg-red-200">
      <header className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-red-600 tracking-tight">
          {APP_TITLE}
        </h1>
      </header>

      <main className="container mx-auto px-4 pb-12">
        {step === 'input' && (
          <div className="flex flex-col items-center">
            {/* Hero Image Area */}
            <div className="mb-8 w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-xl overflow-hidden border-4 border-red-100 relative group">
              <img 
                src={horseImg} 
                alt="2026 Red Horse" 
                className="w-full h-full object-cover object-center aspect-square transition-transform duration-700 scale-125 group-hover:scale-150"
              />
               <div className="absolute inset-0 bg-red-500/10 pointer-events-none"></div>
            </div>
            
            {error && (
              <div className="w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <InputForm 
              input={input} 
              setInput={setInput} 
              onSubmit={handleSubmit} 
              isLoading={false}
            />
          </div>
        )}

        {step === 'loading' && (
          <div className="flex justify-center items-center min-h-[400px]">
             <LoadingSpinner />
          </div>
        )}

        {step === 'result' && result && (
          <ResultSection result={result} userInput={input} onReset={handleReset} />
        )}
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm border-t border-red-50 mt-8">
        <p className="font-medium">Created by <span className="text-red-400">yeosuin</span></p>
        <p className="mt-1">© 2026 AI Fortune Teller. All rights reserved.</p>
        <p className="text-xs mt-1">이 서비스는 재미로 보는 운세입니다.</p>
      </footer>
    </div>
  );
};

export default App;