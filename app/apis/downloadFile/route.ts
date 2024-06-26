import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.provider_token;

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
    // Get file metadata
    const fileMetadata = await drive.files.get({ fileId, fields: 'name' });
    const fileName = fileMetadata.data.name || 'download';

    // Generate file download link
    const downloadLink = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&access_token=${accessToken}`;

    return NextResponse.redirect(downloadLink, 302);
  } catch (error) {
    console.error('API error', error);
    return NextResponse.json({ error: 'Failed to get file' }, { status: 500 });
  }
}
