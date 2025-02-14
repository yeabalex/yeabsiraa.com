export const fetchPlaylistTracks = async (playlistId: string) => {
    const res = await fetch(`/api/spotify?playlistId=${playlistId}`);
    const data = await res.json();
    return data
  };
  