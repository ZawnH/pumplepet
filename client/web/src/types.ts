// src/types.ts
export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: string;
  job?: string;
  school?: string;
  interests: string[];
  petPreference?: 'dogs' | 'cats' | 'all' | 'other';
  lookingFor?: 'adopt' | 'foster' | 'both';
}

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  age: string; // "2 years", "6 months", etc.
  photos: string[];
  location: string;
  description: string;
  shelterId?: string;
  traits: string[];
  adoptionStatus: 'available' | 'pending' | 'adopted';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Match {
  id: string;
  userId: string;
  petId?: string;
  matchedOn: Date;
  lastMessage?: string;
  unreadCount: number;
}

export type SwipeDirection = 'left' | 'right' | 'up';
