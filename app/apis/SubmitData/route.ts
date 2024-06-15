import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/config';

export  async function POST(req: NextRequest) {

<<<<<<< HEAD
    try {
      const { fullName, dlink, media_type, ep_link } = await req.json();
      console.log(fullName , ('saim line 9 (updated) '));
      // Insert into Supabase
      const { data, error } = await supabase.from('DownloadLinks').insert([
        {
          full_name: fullName,
          download_link: dlink,
          media_type,
          ep_link: ep_link // Store ep_link as JSON object
        }
=======
    const { data, error } = await supabase
      .from('DownloadLinks') // replace 'users' with your actual table name
      .insert([
        { full_name: fullName, download_link:dlink.split('/').slice(-2, -1)[0] }
>>>>>>> d2812d2fb41cc37f3d2d96c793a7d04ac5da13ba
      ]);

      if (error) {
        throw error;
      }

      // res.status(200).json({ message: 'Data submitted successfully', data });
      return NextResponse.json({ message: 'Data submitted successfully', data });
    } catch (error) {
      console.error('Error submitting data:', error);
      // res.status(500).json({ error: 'An error occurred. Please try again.' });
      return NextResponse.json({ error: 'An error occurred. Please try again.' });
    }
}
