import HeaderNotes from '@/components/HeaderNotes';
import NotesList from '@/components/NotesList';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";


export default function UserNotesPage() {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-yavhtdnzcvaymaykpmju-auth-token');

  if (!data) {
    return redirect("/login");
  }

  const userString = data?.value;
  const { user } = userString ? JSON.parse(userString) : null;

  

  return (
    <>
      <HeaderNotes />
      <NotesList author={user.email} />
    </>
  );
}
