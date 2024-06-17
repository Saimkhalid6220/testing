// pages/api/download.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const GOOGLE_DRIVE_DOWNLOAD_URL = 'https://www.googleapis.com/drive/v3/files';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies:() => cookieStore})
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) {
    return new NextResponse(JSON.stringify({ error: 'File ID is required' }), { status: 400 });
  }

  // Obtain user's session from Supabase
  const { data: { session } } = await supabase.auth.getSession();

  if (!session || !session.provider_token) {
    return new NextResponse(JSON.stringify({ error: `User is not authenticated, acess token : ${JSON.stringify(session)}` }), { status: 401 });
  }

  const accessToken = session.provider_token;

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

    const streamResponse = new Response(response.data, {
      headers,
      status: 200,
    });

    return streamResponse;
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to download file' }), { status: 500 });
  }
}
