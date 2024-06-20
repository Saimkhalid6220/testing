import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

 export async function POST (req:NextRequest) {

  const {fileId} =await req.json();

  const supabase = createRouteHandlerClient({cookies})
  const {data:{session}} =await supabase.auth.getSession();

  const accessToken = session?.provider_token

  if (!accessToken || !fileId) {
    return NextResponse.json({ error: 'Missing access token or file ID' }, { status: 400 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const response = await drive.files.copy({
      fileId,
      requestBody: {
        name: 'Copied File', // The name of the copied file
      },
    });
    if(response.status == 200){

      return NextResponse.json({ file: response.data , accessToken });
    }
    return NextResponse.json({error : `acess token is :  ${accessToken}`})
    // res.status(200).json({ file: response.data });
  } catch (error) {
    NextResponse.json({ error: error || 'An error occurred' }, { status: 500 });
  }
};
