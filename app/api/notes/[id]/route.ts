import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const supabase = createClient();

  const { params } = context;

  const { data: notes, error } = await supabase
    .from("notes")
    .select()
    .eq("user_id", params.id);

  return NextResponse.json({
    status: 200,
    body: {
      data: notes?.sort((a, b) => a.id - b.id),
    },
  });
}

export async function PATCH(req: NextRequest, context: any) {
  const supabase = createClient();

  const { params } = context;

  const updatingValues = await req.json();
  const { data: notes, error } = await supabase
    .from("notes")
    .update(updatingValues)
    .eq("id", params.id)
    .select();

  console.log({ error });

  return NextResponse.json({
    status: 200,
    body: {
      data: notes,
    },
  });
}
