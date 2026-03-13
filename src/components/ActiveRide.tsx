import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Shield, MessageCircle, X, MapPin, User, Star, Bike, Car } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { toast } from 'sonner';

export const ActiveRide = () => {
  const { currentRide, updateRideStatus, setRide, addToHistory } = useBooking();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentRide) return;

    const sequence = async () => {
      if (currentRide.status === 'searching') {
        await new Promise(r => setTimeout(r, 2000));
        updateRideStatus('confirmed');
        toast.success("Chauffeur trouvé !");

        await new Promise(r => setTimeout(r, 2000));
        updateRideStatus('arriving');
        toast.info("Le chauffeur arrive au point de rendez-vous");

        await new Promise(r => setTimeout(r, 2000));
        updateRideStatus('in_progress');
        toast("Course commencée");

        for (let i = 0; i <= 100; i += 20) {
          setProgress(i);
          await new Promise(r => setTimeout(r, 1000));
        }

        updateRideStatus('completed');
        if (currentRide) {
          addToHistory({ ...currentRide, status: 'completed' });
        }
        toast.success("Course terminée. Merci d'avoir choisi Zinder Taxi !");
        
        setTimeout(() => setRide(null), 3000);
      }
    };

    sequence();
  }, [currentRide?.status]);

  if (!currentRide) return null;

  const isSearching = currentRide.status === 'searching';
  
  return (
    <div className="h-full flex flex-col bg-gray-100 min-h-screen">
      <div className="relative h-1/2 bg-gray-300">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/map-background-app-6f7375e3-1773407967906.webp" 
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
        
        <motion.div 
          animate={isSearching ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isSearching ? Infinity : 0 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="bg-yellow-400 p-2 rounded-full shadow-xl border-2 border-white">
            {currentRide.type === 'moto' ? <Bike className="w-5 h-5 text-black" /> : <Car className="w-5 h-5 text-black" />}
          </div>
        </motion.div>

        <div className="absolute top-4 left-4 right-4 flex justify-between">
           <button 
            onClick={() => setRide(null)}
            className="p-2 bg-white rounded-full shadow-lg"
           >
             <X className="w-6 h-6" />
           </button>
           <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {currentRide.status === 'searching' && "Recherche..."}
              {currentRide.status === 'confirmed' && "Chauffeur en route"}
              {currentRide.status === 'arriving' && "Chauffeur arrivé"}
              {currentRide.status === 'in_progress' && "Trajet en cours"}
              {currentRide.status === 'completed' && "Terminé"}
           </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl -mt-6 z-10 p-6 flex flex-col shadow-2xl">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>

        {isSearching ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <MapPin className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">Nous recherchons votre chauffeur</h2>
              <p className="text-gray-500 text-sm mt-1">Cela ne prendra que quelques secondes...</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop" alt="Driver" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Moussa Dan Kaka</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9 (1,240 courses)</span>
                  </div>
                  <div className="text-xs font-medium text-gray-400 uppercase mt-1">Toyota Corolla • 12-Z-5432</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="p-3 bg-green-500 text-white rounded-full shadow-lg shadow-green-200 hover:bg-green-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="border-y border-gray-50 py-4">
              <div className="flex items-center gap-3">
                 <div className="flex flex-col items-center gap-1">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <div className="w-0.5 h-4 bg-gray-100"></div>
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 </div>
                 <div className="flex-1 text-sm">
                   <div className="font-medium text-gray-400">{currentRide.pickup}</div>
                   <div className="font-bold mt-1">{currentRide.destination}</div>
                 </div>
                 <div className="text-right">
                   <div className="font-bold">{currentRide.price} CFA</div>
                   <div className="text-[10px] text-gray-400">Paiement Espèces</div>
                 </div>
              </div>
            </div>

            {currentRide.status === 'in_progress' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Progression du trajet</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-yellow-500"
                  ></motion.div>
                </div>
              </div>
            )}

            <button className="flex items-center justify-center gap-2 py-3 border-2 border-red-50 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors">
              <Shield className="w-5 h-5" />
              Signaler un problème
            </button>
          </div>
        )}
      </div>
    </div>
  );
};