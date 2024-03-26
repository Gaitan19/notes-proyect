import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return await NextResponse.json({
      status: 400,
      body: {
        user: undefined,
      },
    });
  }

  const { data: notes, error } = await supabase
    .from("notes")
    .select()
    .eq("author", user?.email);

  return NextResponse.json({
    status: 200,
    body: {
      data: notes?.sort((a, b) => a.id - b.id),
    },
  });
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const newNote = await req.json();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: notes, error } = await supabase
    .from("notes")
    .insert([{ ...newNote, author: user?.email }])
    .select()
    .single();

  return NextResponse.json({
    status: !error ? 200 : 400,
    body: {
      data: notes,
      message: error?.message,
    },
  });
}
