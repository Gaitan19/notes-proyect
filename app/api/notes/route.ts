import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const newNote = await req.json();
  const { data: notes, error } = await supabase
    .from("notes")
    .insert([newNote])
    .select();

  return NextResponse.json({
    status: 200,
    body: {
      data: notes,
    },
  });
}
