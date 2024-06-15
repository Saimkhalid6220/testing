'use client'
import { Clapperboard, Link } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dlink: '',
    media_type: '',
    ep_link: {} as Record<string, { name: string, link: string }[]>
  });

  const [action, setAction] = useState('submit'); // New state to handle action type

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSeasonEpisodeChange = (e: ChangeEvent<HTMLInputElement>, season: string, index: number, field: 'name' | 'link') => {
    const newEpLink = { ...formData.ep_link };
    newEpLink[season][index][field] = e.target.value;
    setFormData({ ...formData, ep_link: newEpLink });
  };

  const addSeason = () => {
    const newEpLink = { ...formData.ep_link };
    const newSeasonName = `season_${Object.keys(newEpLink).length + 1}`;
    newEpLink[newSeasonName] = [{ name: '', link: '' }];
    setFormData({ ...formData, ep_link: newEpLink });
  };

  const addEpisode = (season: string) => {
    const newEpLink = { ...formData.ep_link };
    newEpLink[season].push({ name: '', link: '' });
    setFormData({ ...formData, ep_link: newEpLink });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = action === 'submit' ? `/apis/SubmitData` : `/apis/updateData`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Data submitted successfully');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{action === 'submit' ? 'Register' : 'Update'} Movie</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Clapperboard className="text-gray-400 mr-3" />
            <input
              className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              type="text"
              name="fullName"
              placeholder="Enter Movie/Series Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Link className="text-gray-400 mr-3" />
            <input
              className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              type="text"
              name="dlink"
              placeholder="Enter Download Link"
              value={formData.dlink}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Clapperboard className="text-gray-400 mr-3" />
            <input
              className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              type="text"
              name="media_type"
              placeholder="Enter Media Type"
              value={formData.media_type}
              onChange={handleChange}
              required
            />
          </div>
          {formData.media_type.toLowerCase() === 'tv' && Object.keys(formData.ep_link).map((season, seasonIndex) => (
            <div key={seasonIndex} className="space-y-2">
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter Season Name"
                  value={season}
                  readOnly
                />
              </div>
              {formData.ep_link[season].map((episode, episodeIndex) => (
                <div key={episodeIndex} className="flex items-center border-b border-gray-300 py-2">
                  <input
                    className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter Episode Name"
                    value={episode.name}
                    onChange={(e) => handleSeasonEpisodeChange(e, season, episodeIndex, 'name')}
                  />
                  <input
                    className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter Episode Link"
                    value={episode.link}
                    onChange={(e) => handleSeasonEpisodeChange(e, season, episodeIndex, 'link')}
                  />
                </div>
              ))}
              <button
                type="button"
                className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
                onClick={() => addEpisode(season)}
              >
                Add Episode
              </button>
            </div>
          ))}
          <button
            type="button"
            className="w-full py-2 px-4 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
            onClick={addSeason}
          >
            Add Season
          </button>
          <div className="flex items-center border-b border-gray-300 py-2">
            <select
              className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="submit">Submit New</option>
              <option value="update">Update Existing</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none"
          >
            {action === 'submit' ? 'Submit' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
