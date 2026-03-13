import React, { useState } from 'react';
import { Mail, Lock, Phone, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const Auth = ({ onLogin }: { onLogin: () => void }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="relative h-2/5 bg-yellow-500 flex flex-col items-center justify-center text-white p-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-4 rounded-3xl shadow-2xl mb-6"
        >
          <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0aeb052e-d8dc-4f18-8127-c006ac1f3b65/standard-taxi-type-617d8f82-1773407968408.webp" className="w-20 h-16 object-cover" alt="Logo" />
        </motion.div>
        <h1 className="text-3xl font-black italic">ZINDER TAXI</h1>
        <p className="text-yellow-100 text-sm mt-2 text-center">Votre partenaire de mobilité dans la ville de Damagaram</p>
      </div>

      <div className="flex-1 -mt-8 bg-white rounded-t-[40px] p-8 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRegistering ? 'Créer un compte' : 'Bienvenue !'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isRegistering ? 'Rejoignez-nous pour vos déplacements à Zinder' : 'Connectez-vous pour commencer votre course'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {isRegistering && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-yellow-500 transition-all"
                required
              />
            </div>
          )}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="tel" 
              placeholder="Numéro de téléphone" 
              className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-yellow-500 transition-all"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Mot de passe" 
              className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-yellow-500 transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-yellow-200 mt-6 active:scale-[0.98] transition-all"
          >
            {isRegistering ? "S'inscrire" : 'Se connecter'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm font-semibold text-yellow-600"
          >
            {isRegistering ? 'Déjà un compte ? Connectez-vous' : "Nouveau ? Créez un compte"}
          </button>
        </div>
      </div>
    </div>
  );
};