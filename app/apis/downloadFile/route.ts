import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const supabase  = createRouteHandlerClient({cookies});
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.provider_token

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('id');
  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const fileResponse = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    const fileMetadata = await drive.files.get({ fileId, fields: 'name,size,mimeType' });

    const readableStream = fileResponse.data as NodeJS.ReadableStream;

    const stream = new ReadableStream({
      start(controller) {
        readableStream.on('data', (chunk) => {
          controller.enqueue(chunk);
        });

        readableStream.on('end', () => {
          controller.close();
        });

        readableStream.on('error', (err) => {
          console.error('Stream error:', err);
          controller.error(err);
        });
      },
      type: 'bytes'
    });

    const headers = new Headers({
      'Content-Type': fileMetadata.data.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileMetadata.data.name}"`,
      'Content-Length': fileMetadata.data.size?.toString() || '',
    });

    return new NextResponse(stream as unknown as BodyInit, {
      headers
    });
  } catch (error) {
    console.error('API error', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
