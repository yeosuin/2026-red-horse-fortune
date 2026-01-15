import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-pulse">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-red-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
           🐎
        </div>
      </div>
      <h3 className="text-xl font-bold text-red-800 mb-2">
        정보를 저장하지 않아요.<br />
        걱정하지 마세요.
      </h3>
    </div>
  );
};
