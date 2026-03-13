import React, { useState } from 'react';
import { MapPin, Navigation, User, Bell, Search, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { RideOptions } from './RideOptions';
import { useBooking } from '../context/BookingContext';
import { toast } from 'sonner';

export const Home = ({ onProfileClick }: { onProfileClick: () => void }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const { setRide } = useBooking();

  const handleSearch = () => {
    if (!pickup || !destination) {
      toast.error('Veuillez entrer le point de départ et la destination');
      return;
    }
    setShowOptions(true);
  };

  return (
    <div className="flex flex-col min-h-full pb-20">
      <header className="p-4 bg-yellow-500 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <Navigation className="w-6 h-6 fill-white" />
          <h1 className="text-xl font-bold italic">Zinder Taxi</h1>
        </div>
        <button 
          onClick={onProfileClick}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <User className="w-6 h-6" />
        </button>
      </header>

      <div className="relative h-64 bg-gray-200">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/map-background-app-6f7375e3-1773407967906.webp" 
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-0.5 h-6 bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="D'où partez-vous ?" 
                  className="w-full text-sm outline-none border-b border-gray-100 pb-1"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Où allez-vous ?" 
                  className="w-full text-sm outline-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
           </div>
           {!showOptions && (
             <button 
                onClick={handleSearch}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-yellow-500/30 active:scale-[0.98] transition-all"
             >
                Trouver un chauffeur
             </button>
           )}
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-lg font-bold mb-4">Destinations populaires à Zinder</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Grand Marché', color: 'bg-orange-100 text-orange-600' },
            { name: 'Sultanat', color: 'bg-green-100 text-green-600' },
            { name: 'Université de Zinder', color: 'bg-blue-100 text-blue-600' },
            { name: 'Aéroport', color: 'bg-purple-100 text-purple-600' }
          ].map((place) => (
            <button 
              key={place.name}
              onClick={() => {
                setDestination(place.name);
                if (pickup) setShowOptions(true);
              }}
              className={`${place.color} p-4 rounded-xl text-left transition-transform active:scale-95`}
            >
              <div className="font-semibold text-sm">{place.name}</div>
              <div className="text-[10px] opacity-70">Réserver en 1 clic</div>
            </button>
          ))}
        </div>
      </div>

      {showOptions && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed inset-x-0 bottom-0 z-50 max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl p-6 border-t border-gray-100"
        >
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <RideOptions 
            pickup={pickup} 
            destination={destination} 
            onCancel={() => setShowOptions(false)} 
          />
        </motion.div>
      )}

      {!showOptions && (
        <div className="px-4 py-4 mt-auto">
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
             <div className="flex-shrink-0 w-64 h-32 rounded-xl overflow-hidden relative">
               <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/hero-taxi-c5b2292b-1773407968339.webp" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                 <p className="text-white text-xs font-bold">Promotion Weekend</p>
                 <p className="text-white/80 text-[10px]">-20% sur tous vos trajets</p>
               </div>
             </div>
             <div className="flex-shrink-0 w-64 h-32 rounded-xl overflow-hidden relative bg-blue-600">
               <div className="p-4 flex flex-col h-full justify-center">
                 <p className="text-white font-bold">Nouveau: Moto-Taxi</p>
                 <p className="text-white/80 text-xs">Évitez les bouchons au centre-ville</p>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};