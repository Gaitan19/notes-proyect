import HeaderNotes from '@/components/HeaderNotes';
import NotesList from '@/components/NotesList';
import { cookies } from 'next/headers';

export default function UserNotesPage() {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-yavhtdnzcvaymaykpmju-auth-token');

  const userString = data?.value;
  const { user } = userString ? JSON.parse(userString) : null;

  return (
    <>
      <HeaderNotes />
      <NotesList author={user.email} />
    </>
  );
}
