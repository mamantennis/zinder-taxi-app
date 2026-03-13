import React, { useState } from 'react';
import { Car, Zap, Bike, Info, CreditCard, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { toast } from 'sonner';

interface RideOptionsProps {
  pickup: string;
  destination: string;
  onCancel: () => void;
}

const RIDE_TYPES = [
  {
    id: 'standard',
    name: 'Taxi Standard',
    price: 1500,
    time: "3 min",
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/standard-taxi-type-617d8f82-1773407968408.webp',
    icon: <Car className="w-5 h-5" />
  },
  {
    id: 'premium',
    name: 'Taxi Confort',
    price: 3000,
    time: "5 min",
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/premium-taxi-type-58845269-1773407968123.webp',
    icon: <Zap className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'moto',
    name: 'Moto-Taxi',
    price: 500,
    time: "1 min",
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/moto-taxi-type-46da61de-1773407969189.webp',
    icon: <Bike className="w-5 h-5 text-green-500" />
  }
];

export const RideOptions = ({ pickup, destination, onCancel }: RideOptionsProps) => {
  const [selectedType, setSelectedType] = useState('standard');
  const { setRide } = useBooking();

  const handleBook = () => {
    const rideType = RIDE_TYPES.find(t => t.id === selectedType)!;
    const newRide = {
      id: Math.random().toString(36).substr(2, 9),
      pickup,
      destination,
      type: selectedType as any,
      price: rideType.price,
      status: 'searching' as const,
      timestamp: new Date()
    };
    
    setRide(newRide);
    toast.success("Recherche de chauffeur en cours...");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Choisir un trajet</h3>
        <button onClick={onCancel} className="text-sm text-gray-500 font-medium">Annuler</button>
      </div>

      <div className="flex flex-col gap-3">
        {RIDE_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${
              selectedType === type.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-100'
            }`}
          >
            <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden">
              <img src={type.image} alt={type.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold flex items-center gap-2">
                {type.name}
                {type.id === 'moto' && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded">Éco</span>}
              </div>
              <div className="text-xs text-gray-500">{type.time} d'attente</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{type.price} CFA</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Espèces</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300" />
      </div>

      <button 
        onClick={handleBook}
        className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
      >
        Réserver {RIDE_TYPES.find(t => t.id === selectedType)?.name}
      </button>
    </div>
  );
};