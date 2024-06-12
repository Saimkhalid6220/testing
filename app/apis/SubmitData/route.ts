// app/api/submitData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/config';

export async function POST(req: NextRequest) {
  const hehe = "hehe"
  try {
    const { fullName, dlink } = await req.json();

    const { data, error } = await supabase
      .from('DownloadLinks') // replace 'users' with your actual table name
      .insert([
        { full_name: fullName, download_link:dlink.split('/').slice(-2, -1)[0]; }
      ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Data submitted successfully', data });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
