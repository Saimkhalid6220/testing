// pages/api/copy-file.js
import { google } from 'googleapis';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function  POST(req:NextRequest, res:NextResponse) {

  const { fileLink } = await req.json();

  const supabase = createRouteHandlerClient({cookies})
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.provider_token;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    // Download the file content from the provided link
    const response = await axios.get(fileLink, { responseType: 'arraybuffer' });

    const fileData = response.data;
    const fileName = 'Copied File'; // You can change the file name as needed
    const mimeType = response.headers['content-type'] || 'application/octet-stream';

    // Upload the file to the user's Google Drive
    // const newFile = await drive.files.create({
    //   requestBody: {
    //     name: fileName,
    //     mimeType: mimeType,
    //   },
    //   media: {
    //     mimeType: mimeType,
    //     body: fileData,
    //   },
    //   fields: 'id',
    // });

    return NextResponse.json({ file: fileData },{status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to copy file' },{status:500});
  }
}
