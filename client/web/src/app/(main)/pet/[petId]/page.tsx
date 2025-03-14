'use client';

import { availablePets } from '@/mockData';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PetDetailsPage({ params }: { params: any }) {
    const router = useRouter();
    const { petId } = params;

    const pet = availablePets.find(p => p.id === petId);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    if (!pet) {
        return (
            <div className="max-w-md mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
                <p className="text-gray-600 mb-6">The pet you&apos;re looking for doesn&apos;t exist or has been adopted.</p>
                <button
                    onClick={() => router.push('/discover')}
                    className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg"
                >
                    Back to Discover
                </button>
            </div>
        );
    }

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
        <div className="max-w-md mx-auto pb-20">
            {/* Photo carousel */}
            <div className="relative h-[300px] w-full">
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

                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/30 text-white flex items-center justify-center"
                >
                    ←
                </button>
            </div>

            {/* Pet info */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{pet.name}</h1>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {pet.adoptionStatus}
                    </span>
                </div>

                <div className="flex items-center text-gray-600 mt-1">
                    <span>{pet.breed}</span>
                    <span className="mx-2">•</span>
                    <span>{pet.age}</span>
                    <span className="mx-2">•</span>
                    <span>{pet.location}</span>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">About</h2>
                    <p className="text-gray-700">{pet.description}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Traits</h2>
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

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Shelter Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">Happy Tails Animal Shelter</p>
                        <p className="text-gray-600 text-sm mt-1">{pet.location}</p>
                        <p className="text-gray-600 text-sm">ID: {pet.shelterId}</p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-md mx-auto flex gap-4">
                    <button className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
                        Save
                    </button>
                    <button className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">
                        Contact Shelter
                    </button>
                </div>
            </div>
        </div>
    );
} 