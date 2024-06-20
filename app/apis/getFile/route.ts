// app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { cookies } from 'next/headers'; // Import cookies to use with Supabase

const GOOGLE_DRIVE_DOWNLOAD_URL = 'https://www.googleapis.com/drive/v3/files';

export async function GET(req: NextRequest) {
  // Initialize the Supabase client with cookies
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  // Obtain user's session from Supabase
  const { data: { session } } = await supabase.auth.getSession();

  if (!session || !session?.provider_token) {
    return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
  }

  const accessToken = session?.provider_token;

  try {
    const response = await axios({
      method: 'GET',
      url: `${GOOGLE_DRIVE_DOWNLOAD_URL}/${fileId}?alt=media`,
      responseType: 'stream',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="${fileId}"`);
    headers.append('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    headers.append('Content-Length', response.headers['content-length'] || '0');

    return new NextResponse(response.data, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
