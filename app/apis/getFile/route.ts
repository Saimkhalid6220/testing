import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Define a type for the error response

export async function POST(req: NextRequest, res: NextResponse) {
  const { fileLink } = await req.json(); // Assuming fileLink is the link to the file on Google Drive

  // Extract fileId from the provided link
  const fileId = extractFileId(fileLink);

  // Assuming createRouteHandlerClient is correctly configured
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.provider_token;

  try {
    // Step 1: Create a copy of the file in another user's Drive
    const copyResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        emailAddress: "movietubeworkers@gmail.com", // Email address of the user whose Drive you want to copy the file to
      })
    });

    if (!copyResponse.ok) {
      throw new Error(`Failed to copy file: ${copyResponse.status}`);
    }

    const copiedFileData = await copyResponse.json();
    return NextResponse.json({ message: 'File copied successfully', copiedFileData }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({error:"failed to copy file"}, { status: 500 });
  }
}

// Helper function to extract fileId from Google Drive URL
function extractFileId(fileLink: string): string {
  // Example: https://drive.google.com/file/d/FILE_ID/view
  const match = fileLink.match(/\/file\/d\/([^/]+)\//);
  if (match && match.length > 1) {
    return match[1];
  } else {
    throw new Error('Invalid Google Drive file link');
  }
}
