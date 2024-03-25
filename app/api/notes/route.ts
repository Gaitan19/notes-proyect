import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const newNote = await req.json();
  const { data: notes, error } = await supabase
    .from('notes')
    .insert([newNote])
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
