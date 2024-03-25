import HeaderNotes from "@/components/HeaderNotes";
import NotesList from "@/components/NotesList";
import { cookies } from "next/headers";
// import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/server";



export default  function UserNotesPage() {
    //     const supabase = createClient();
    const cookieStore = cookies();

    const data = cookieStore.get('sb-yavhtdnzcvaymaykpmju-auth-token');

    const userString = data?.value;
    const {user} = userString ? JSON.parse(userString) : null;
// console.log('user :>> ', user);

    return (
     <>
        <HeaderNotes/>
        <NotesList author={user.email}/>
     </>
    );
  }