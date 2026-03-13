import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Home } from './Home';
import { ActiveRide } from './ActiveRide';
import { Profile } from './Profile';
import { Auth } from './Auth';

export const AppContent = () => {
  const { currentRide } = useBooking();
  const [view, setView] = useState<'home' | 'profile' | 'auth'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  if (view === 'profile') {
    return <Profile onBack={() => setView('home')} />;
  }

  if (currentRide && currentRide.status !== 'completed') {
    return <ActiveRide />;
  }

  return (
    <div className="flex flex-col h-full">
      <Home onProfileClick={() => setView('profile')} />
    </div>
  );
};