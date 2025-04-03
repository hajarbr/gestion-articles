import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
  return null; // This will never render because of the redirect
}