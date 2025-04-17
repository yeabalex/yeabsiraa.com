i
`:wq
port { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv'

dotenv.config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
let accessToken: string | null = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to get access token');
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get('playlistId');

  if (!playlistId) {
    return NextResponse.json({ error: 'Missing playlistId' }, { status: 400 });
  }

  const token = await getAccessToken();

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(CLIENT_ID, CLIENT_SECRET)
    const data = await response.json();
    console.log(data)
    return NextResponse.json(data.items || []);
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist tracks' }, { status: 500 });
  }
}
