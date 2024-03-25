import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const supabase = createClient();

  const { params } = context;

  const { data: note, error } = await supabase
    .from("notes")
    .select()
    .eq("id", params.id)
    .single();

  return NextResponse.json({
    status: 200,
    body: {
      data: note,
    },
  });
}
