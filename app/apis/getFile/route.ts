// app/api/copy-file/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { google } from 'googleapis';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const sourceFileId = searchParams.get('fileId');
  const { data: { session }, error } = await supabase.auth.getSession();


}
