import React, { createContext, useContext, useState, ReactNode } from 'react';

type RideStatus = 'idle' | 'searching' | 'confirmed' | 'arriving' | 'in_progress' | 'completed';

interface Ride {
  id: string;
  pickup: string;
  destination: string;
  type: 'standard' | 'premium' | 'moto';
  price: number;
  status: RideStatus;
  timestamp: Date;
}

interface BookingContextType {
  currentRide: Ride | null;
  rideHistory: Ride[];
  setRide: (ride: Ride | null) => void;
  updateRideStatus: (status: RideStatus) => void;
  addToHistory: (ride: Ride) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);

  const setRide = (ride: Ride | null) => setCurrentRide(ride);

  const updateRideStatus = (status: RideStatus) => {
    if (currentRide) {
      setCurrentRide({ ...currentRide, status });
    }
  };

  const addToHistory = (ride: Ride) => {
    setRideHistory([ride, ...rideHistory]);
  };

  return (
    <BookingContext.Provider value={{ currentRide, rideHistory, setRide, updateRideStatus, addToHistory }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};