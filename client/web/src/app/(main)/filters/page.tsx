'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FiltersPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    petType: ['dogs', 'cats', 'other'],
    ageRange: [0, 15], // years
    distance: 50, // miles
    size: ['small', 'medium', 'large'],
    goodWith: {
      kids: false,
      dogs: false,
      cats: false,
    },
    traits: {
      housetrained: false,
      specialNeeds: false,
      vaccinated: false,
    }
  });

  const handlePetTypeToggle = (type: string) => {
    if (filters.petType.includes(type)) {
      setFilters({
        ...filters,
        petType: filters.petType.filter(t => t !== type)
      });
    } else {
      setFilters({
        ...filters,
        petType: [...filters.petType, type]
      });
    }
  };

  const handleSizeToggle = (size: string) => {
    if (filters.size.includes(size)) {
      setFilters({
        ...filters,
        size: filters.size.filter(s => s !== size)
      });
    } else {
      setFilters({
        ...filters,
        size: [...filters.size, size]
      });
    }
  };

  const handleGoodWithToggle = (key: keyof typeof filters.goodWith) => {
    setFilters({
      ...filters,
      goodWith: {
        ...filters.goodWith,
        [key]: !filters.goodWith[key]
      }
    });
  };

  const handleTraitsToggle = (key: keyof typeof filters.traits) => {
    setFilters({
      ...filters,
      traits: {
        ...filters.traits,
        [key]: !filters.traits[key]
      }
    });
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      distance: parseInt(e.target.value)
    });
  };

  const handleApplyFilters = () => {
    // In a real app, you would save these filters to state/context
    // and apply them to your pet discovery algorithm
    console.log('Applied filters:', filters);
    router.back();
  };

  const handleResetFilters = () => {
    setFilters({
      petType: ['dogs', 'cats', 'other'],
      ageRange: [0, 15],
      distance: 50,
      size: ['small', 'medium', 'large'],
      goodWith: {
        kids: false,
        dogs: false,
        cats: false,
      },
      traits: {
        housetrained: false,
        specialNeeds: false,
        vaccinated: false,
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.back()}
          className="text-gray-500"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-center">Filters</h1>
        <button 
          onClick={handleResetFilters}
          className="text-yellow-500 font-medium"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Pet Type */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Pet Type</h2>
          <div className="flex gap-3">
            {['dogs', 'cats', 'other'].map(type => (
              <button
                key={type}
                onClick={() => handlePetTypeToggle(type)}
                className={`flex-1 py-2 px-4 rounded-full border ${
                  filters.petType.includes(type)
                    ? 'bg-yellow-400 border-yellow-400 text-black'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Distance</h2>
          <div className="px-2">
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={filters.distance}
              onChange={handleDistanceChange}
              className="w-full accent-yellow-400"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>5 miles</span>
              <span>{filters.distance} miles</span>
              <span>100 miles</span>
            </div>
          </div>
        </div>

        {/* Size */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Size</h2>
          <div className="flex gap-3">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`flex-1 py-2 px-4 rounded-full border ${
                  filters.size.includes(size)
                    ? 'bg-yellow-400 border-yellow-400 text-black'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Good with */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Good with</h2>
          <div className="space-y-2">
            {(Object.keys(filters.goodWith) as Array<keyof typeof filters.goodWith>).map(key => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`goodWith-${key}`}
                  checked={filters.goodWith[key]}
                  onChange={() => handleGoodWithToggle(key)}
                  className="h-5 w-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                />
                <label htmlFor={`goodWith-${key}`} className="ml-2 text-gray-700">
                  {key === 'kids' ? 'Children' : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Traits */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Traits</h2>
          <div className="space-y-2">
            {(Object.keys(filters.traits) as Array<keyof typeof filters.traits>).map(key => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`trait-${key}`}
                  checked={filters.traits[key]}
                  onChange={() => handleTraitsToggle(key)}
                  className="h-5 w-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                />
                <label htmlFor={`trait-${key}`} className="ml-2 text-gray-700">
                  {key === 'housetrained' ? 'House Trained' : 
                   key === 'specialNeeds' ? 'Special Needs' : 
                   key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 sticky bottom-4">
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
} 