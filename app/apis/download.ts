// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import supabase from '@/lib/config'; // Adjust the path to your Supabase initialization file

const GOOGLE_DRIVE_DOWNLOAD_URL = 'https://www.googleapis.com/drive/v3/files';

export default async function downloadFile(req: NextApiRequest, res: NextApiResponse) {
  const { fileId } = req.query;

  if (!fileId || typeof fileId !== 'string') {
    return res.status(400).json({ error: 'File ID is required' });
  }

  // Obtain user's access token from Supabase session
  const user =await  supabase.auth.getSession();
  const access_token = user.data.session?.access_token
  if (!user || !access_token) {
    return res.status(401).json({ error: 'User is not authenticated' });
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
    const headers = {
      'Content-Disposition': `attachment; filename="${fileId}"`,
      'Content-Type': response.headers['content-type'] || 'application/octet-stream',
      'Content-Length': response.headers['content-length'] || '0',
    };

    // Pipe the file stream directly to the response
    res.writeHead(200, headers);
    response.data.pipe(res);

  } catch (error) {
    console.error('Error downloading file:', error);
    return res.status(500).json({ error: 'Failed to download file' });
  }
}
