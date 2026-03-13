import React from 'react';
import { ArrowLeft, User, MapPin, History, CreditCard, LogOut, ChevronRight, Settings, Bike, Car, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Profile = ({ onBack }: { onBack: () => void }) => {
  const { rideHistory } = useBooking();

  return (
    <div className="h-full flex flex-col bg-gray-50 min-h-screen">
      <div className="p-4 bg-white flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Mon Profil</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 bg-white flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-4 border-4 border-white shadow-lg overflow-hidden">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Ibrahim Maikano</h2>
          <p className="text-gray-500 text-sm">+227 9X XX XX XX</p>
          <div className="flex gap-4 mt-6 w-full">
             <div className="flex-1 bg-gray-50 p-3 rounded-2xl text-center">
                <div className="text-xs text-gray-400 uppercase font-bold">Courses</div>
                <div className="text-lg font-black">{rideHistory.length}</div>
             </div>
             <div className="flex-1 bg-gray-50 p-3 rounded-2xl text-center">
                <div className="text-xs text-gray-400 uppercase font-bold">Points</div>
                <div className="text-lg font-black">450</div>
             </div>
          </div>
        </div>

        <div className="mt-4 px-4 space-y-4">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase px-2 mb-2">Général</h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: 'Adresses enregistrées' },
                { icon: <CreditCard className="w-5 h-5" />, label: 'Paiement' },
                { icon: <Settings className="w-5 h-5" />, label: 'Paramètres' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400">{item.icon}</div>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>
          </section>

          <section className="pb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase px-2 mb-2">Historique des trajets</h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {rideHistory.length === 0 ? (
                <div className="p-8 text-center text-gray-400 flex flex-col items-center gap-2">
                  <History className="w-8 h-8 opacity-20" />
                  <p className="text-sm">Aucun trajet effectué pour le moment</p>
                </div>
              ) : (
                rideHistory.map((ride) => (
                  <div key={ride.id} className="p-4 border-b border-gray-50 last:border-0">
                    <div className="flex justify-between mb-2">
                       <div className="flex items-center gap-2">
                         <div className={`p-1.5 rounded-lg ${ride.type === 'moto' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                           {ride.type === 'moto' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                         </div>
                         <span className="font-bold text-sm">Zinder Taxi - {ride.type === 'moto' ? 'Moto' : 'Standard'}</span>
                       </div>
                       <span className="text-sm font-black text-gray-900">{ride.price} CFA</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <div className="w-0.5 h-2 bg-gray-100"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      </div>
                      <div className="flex-1 truncate">
                        {ride.pickup} → {ride.destination}
                      </div>
                      <div>{new Date(ride.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold bg-white rounded-2xl shadow-sm mb-8">
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};