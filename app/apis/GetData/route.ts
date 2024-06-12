// app/api/getUserByUsername/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/config';

export async function GET(req: NextRequest) {
  const hehe = "hhe"
  const { searchParams } = new URL(req.url);
  console.log(searchParams)
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('DownloadLinks') // replace 'users' with your actual table name
      .select('*')
      .eq('full_name', id); // replace 'full_name' with the appropriate column name

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'movie not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
