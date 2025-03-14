'use client';

import { availablePets } from '@/mockData';
import { Pet, SwipeDirection } from '@/types';
import { useState } from 'react';

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedPets, setSwipedPets] = useState<Record<string, SwipeDirection>>({});

  const handleSwipe = (direction: SwipeDirection) => {
    if (currentIndex < availablePets.length) {
      const pet = availablePets[currentIndex];
      setSwipedPets({
        ...swipedPets,
        [pet.id]: direction,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentPet = currentIndex < availablePets.length
    ? availablePets[currentIndex]
    : null;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Discover Pets</h1>

      {currentPet ? (
        <PetSwipeCard
          pet={currentPet}
          onSwipe={handleSwipe}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <h2 className="text-xl font-semibold mb-2">No more pets</h2>
          <p className="text-gray-500">Check back later for new furry friends</p>
        </div>
      )}
    </div>
  );
}

interface PetSwipeCardProps {
  pet: Pet;
  onSwipe: (direction: SwipeDirection) => void;
}

function PetSwipeCard({ pet, onSwipe }: PetSwipeCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    if (currentPhotoIndex < pet.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Photo carousel */}
      <div className="relative h-[500px] w-full">
        <div className="absolute inset-0 bg-gray-300">
          {/* In a real app, you'd use real images */}
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {pet.photos[currentPhotoIndex] || '🐾'}
          </div>
        </div>

        {/* Photo navigation */}
        <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
          {pet.photos.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 mx-1 rounded-full ${index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>

        {/* Left/Right photo navigation */}
        <button
          onClick={prevPhoto}
          disabled={currentPhotoIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 text-white flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={nextPhoto}
          disabled={currentPhotoIndex === pet.photos.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 text-white flex items-center justify-center"
        >
          →
        </button>
      </div>

      {/* Pet info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{pet.name}</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {pet.adoptionStatus}
          </span>
        </div>
        <p className="text-gray-600 mt-1">{pet.breed}, {pet.age}</p>
        <p className="text-gray-600">{pet.location}</p>

        <p className="mt-3">{pet.description}</p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Traits</h3>
          <div className="flex flex-wrap gap-2">
            {pet.traits.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4 p-4 border-t border-gray-100">
        <button
          onClick={() => onSwipe('left')}
          className="h-14 w-14 rounded-full bg-white border border-gray-300 text-red-500 text-2xl flex items-center justify-center shadow-md"
        >
          ✕
        </button>
        <button
          onClick={() => onSwipe('up')}
          className="h-14 w-14 rounded-full bg-blue-500 text-white text-2xl flex items-center justify-center shadow-md"
        >
          ★
        </button>
        <button
          onClick={() => onSwipe('right')}
          className="h-14 w-14 rounded-full bg-green-500 text-white text-2xl flex items-center justify-center shadow-md"
        >
          ♥
        </button>
      </div>
    </div>
  );
}
