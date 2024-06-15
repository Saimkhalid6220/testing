import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/config';

export  async function POST(req: NextRequest) {

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
