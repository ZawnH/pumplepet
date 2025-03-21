import { Match, Message, Pet, User } from "./types";

export const currentUser: User = {
  id: "1",
  name: "Alex Johnson",
  age: 28,
  bio: "Animal lover looking to adopt a furry friend. I have a spacious apartment and lots of love to give!",
  photos: [
    "/images/profile1.jpg",
    "/images/profile2.jpg",
    "/images/profile3.jpg",
  ],
  location: "San Francisco, CA",
  job: "Software Engineer at Tech Co",
  school: "Stanford University",
  interests: ["Dog Walking", "Animal Rescue", "Hiking", "Photography"],
  petPreference: "all",
  lookingFor: "adopt",
};

export const availablePets: Pet[] = [
  {
    id: "p1",
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 years",
    photos: ["/images/pet1-1.jpg", "/images/pet1-2.jpg", "/images/pet1-3.jpg"],
    location: "San Francisco, CA",
    description:
      "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with kids and other pets.",
    shelterId: "s1",
    traits: ["Friendly", "Energetic", "Good with kids", "Trained"],
    adoptionStatus: "available",
  },
  {
    id: "p2",
    name: "Whiskers",
    type: "cat",
    breed: "Maine Coon",
    age: "3 years",
    photos: ["/images/pet2-1.jpg", "/images/pet2-2.jpg"],
    location: "Oakland, CA",
    description:
      "Whiskers is a calm and affectionate Maine Coon who enjoys lounging in sunny spots and gentle pets. She's litter trained and good with other cats.",
    shelterId: "s2",
    traits: ["Calm", "Affectionate", "Indoor", "Litter trained"],
    adoptionStatus: "available",
  },
  {
    id: "p3",
    name: "Max",
    type: "dog",
    breed: "Beagle",
    age: "1 year",
    photos: ["/images/pet3-1.jpg", "/images/pet3-2.jpg", "/images/pet3-3.jpg"],
    location: "San Jose, CA",
    description:
      "Max is a playful Beagle puppy with lots of energy. He's still learning basic commands but is very food-motivated and eager to please.",
    shelterId: "s1",
    traits: ["Playful", "Curious", "Food-motivated", "Needs training"],
    adoptionStatus: "available",
  },
];

export const matches: Match[] = [
  {
    id: "101",
    userId: "s1", // Shelter ID
    petId: "p1", // Pet ID
    matchedOn: new Date("2023-06-15"),
    lastMessage: "Hi, I'm interested in meeting Buddy!",
    unreadCount: 2,
  },
  {
    id: "102",
    userId: "s2",
    petId: "p2",
    matchedOn: new Date("2023-06-10"),
    lastMessage: "When can I come visit Whiskers?",
    unreadCount: 0,
  },
];

export const shelters: User[] = [
  {
    id: "s1",
    name: "Happy Tails Rescue",
    age: 0, // Not applicable for shelters
    bio: "We're a non-profit animal rescue dedicated to finding forever homes for dogs and cats in the Bay Area.",
    photos: ["/images/shelter1.jpg"],
    location: "San Francisco, CA",
    job: "Animal Shelter",
    interests: ["Animal Rescue", "Pet Adoption", "Community Events"],
  },
  {
    id: "s2",
    name: "Feline Friends Sanctuary",
    age: 0,
    bio: "Specialized in rescuing and rehabilitating cats and kittens. We provide medical care, socialization, and adoption services.",
    photos: ["/images/shelter2.jpg"],
    location: "Oakland, CA",
    job: "Cat Shelter",
    interests: ["Cat Rescue", "TNR Programs", "Foster Care"],
  },
];

export const conversations: Record<string, Message[]> = {
  s1: [
    {
      id: "201",
      senderId: "s1",
      receiverId: "1",
      text: "Thank you for your interest in Buddy! Would you like to schedule a meet and greet?",
      timestamp: new Date("2023-06-15T14:30:00"),
      read: true,
    },
    {
      id: "202",
      senderId: "1",
      receiverId: "s1",
      text: "Yes, I'd love to! When are you open for visits?",
      timestamp: new Date("2023-06-15T14:45:00"),
      read: true,
    },
    {
      id: "203",
      senderId: "s1",
      receiverId: "1",
      text: "We're open daily from 10am to 5pm. How about this Saturday at 2pm?",
      timestamp: new Date("2023-06-15T15:00:00"),
      read: true,
    },
    {
      id: "204",
      senderId: "s1",
      receiverId: "1",
      text: "Hi, just confirming your visit with Buddy tomorrow at 2pm. Please bring your ID.",
      timestamp: new Date("2023-06-16T09:30:00"),
      read: false,
    },
  ],
  s2: [
    {
      id: "301",
      senderId: "1",
      receiverId: "s2",
      text: "Hi, I'm interested in meeting Whiskers. Is she good with other cats?",
      timestamp: new Date("2023-06-10T18:30:00"),
      read: true,
    },
    {
      id: "302",
      senderId: "s2",
      receiverId: "1",
      text: "Hello! Yes, Whiskers gets along well with other cats. She's currently in a room with two other cats.",
      timestamp: new Date("2023-06-10T18:45:00"),
      read: true,
    },
    {
      id: "303",
      senderId: "1",
      receiverId: "s2",
      text: "That's great to hear! When can I come visit her?",
      timestamp: new Date("2023-06-10T19:00:00"),
      read: true,
    },
    {
      id: "304",
      senderId: "s2",
      receiverId: "1",
      text: "We're open Wednesday through Sunday, 11am-6pm. Would any of those days work for you?",
      timestamp: new Date("2023-06-10T19:15:00"),
      read: true,
    },
    {
      id: "305",
      senderId: "1",
      receiverId: "s2",
      text: "When can I come visit Whiskers?",
      timestamp: new Date("2023-06-11T23:45:00"),
      read: true,
    },
  ],
};

export const potentialMatches = availablePets.map((pet) => ({
  id: pet.id,
  name: pet.name,
  age: pet.age,
  bio: pet.description,
  photos: pet.photos,
  location: pet.location,
  job: undefined,
  school: undefined,
  interests: pet.traits,
}));
