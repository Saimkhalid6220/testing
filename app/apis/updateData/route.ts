import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/config';

export  async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      const { fullName, dlink, media_type, ep_link } =await req.json();

      // Fetch existing data
      const { data: existingData, error: fetchError } = await supabase
        .from('DownloadLinks')
        .select('ep_link')
        .eq('full_name', fullName)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Merge existing ep_link data with new data
      const mergedEpLink = mergeEpLink(existingData.ep_link, ep_link);

      // Update Supabase record
      const { error: updateError } = await supabase
        .from('DownloadLinks')
        .update({
          full_name: fullName,
          download_link: dlink,
          media_type,
          ep_link: mergedEpLink
        })
        .eq('full_name', fullName);

      if (updateError) {
        throw updateError;
      }

      // res.status(200).json({ message: 'Data updated successfully' });
      return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating data:', "pata nahi kia error he");
      // res.status(500).json({ error: 'An error occurred. Please try again.' });
      return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 });
    }
  } else {
    // res.status(405).json({ error: 'Method not allowed' });
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}

function mergeEpLink(existingEpLink:any, newEpLink:any) {
  const mergedEpLink = { ...existingEpLink };
  for (const season in newEpLink) {
    if (mergedEpLink[season]) {
      mergedEpLink[season] = [...mergedEpLink[season], ...newEpLink[season]];
    } else {
      mergedEpLink[season] = newEpLink[season];
    }
  }
  return mergedEpLink;
}
