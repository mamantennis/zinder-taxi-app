import React, { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative border-x border-gray-200 shadow-xl overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-safe">
        {children}
      </main>
    </div>
  );
};