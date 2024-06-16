// pages/api/download.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import supabase from '@/lib/config'; // Adjust the path to your Supabase initialization file

const GOOGLE_DRIVE_DOWNLOAD_URL = 'https://www.googleapis.com/drive/v3/files';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  // Obtain user's access token from Supabase session
  const user =await  supabase.auth.getSession();
  const access_token = user.data.session?.access_token;
  if (!user || !access_token) {
    return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
  }

  const accessToken = access_token;

  try {
    const response = await axios({
      method: 'GET',
      url: `${GOOGLE_DRIVE_DOWNLOAD_URL}/${fileId}?alt=media`,
      responseType: 'stream',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Set headers for file download
    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="${fileId}"`);
    headers.append('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    headers.append('Content-Length', response.headers['content-length'] || '0');

    return NextResponse.stream(response.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
