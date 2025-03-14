// src/components/SwipeCard.tsx
'use client';

import { useState } from 'react';
import { User, SwipeDirection } from '@/types';

interface SwipeCardProps {
    user: User;
    onSwipe: (direction: SwipeDirection) => void;
}

export default function SwipeCard({ user, onSwipe }: SwipeCardProps) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const nextPhoto = () => {
        if (currentPhotoIndex < user.photos.length - 1) {
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
                        {user.photos[currentPhotoIndex] || '📷'}
                    </div>
                </div>

                {/* Photo navigation */}
                <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
                    {user.photos.map((_, index) => (
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
                    disabled={currentPhotoIndex === user.photos.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 text-white flex items-center justify-center"
                >
                    →
                </button>
            </div>

            {/* User info */}
            <div className="p-4">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
                </div>
                <p className="text-gray-600 mt-1">{user.job}</p>
                <p className="text-gray-600">{user.location}</p>

                <p className="mt-3">{user.bio}</p>

                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                                {interest}
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