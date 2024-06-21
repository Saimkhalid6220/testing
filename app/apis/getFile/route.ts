// app/apis/getFile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest, res: NextResponse) {
  const { fileLink } = await req.json();

  // Assuming createRouteHandlerClient is correctly configured
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.provider_token;

  try {
    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        name: 'sample file',
        mimeType: 'application/json', // Adjust the mimeType according to your file type
        contentHints: {
          indexableText: 'Sample file for Google Drive API upload'
        },
        webViewLink: fileLink // This is the publicly accessible link to the file
      })
    });

    const data = await response.json();
    return NextResponse.json({ message: 'File uploaded successfully', data }, { status: 200 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ error: `Failed to upload file: ${error.message}`, accessToken }, { status: 500 });
  }
}
