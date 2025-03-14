// src/app/page.tsx
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export default function Home() {
  // TODO: check authentication here
  // For now, we'll just redirect to the discover page
  redirect(ROUTES.DISCOVER);
}