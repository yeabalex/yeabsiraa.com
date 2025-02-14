import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { monstreat } from "@/app/page";
import { fetchPlaylistTracks } from "@/utils/fetchPlaylistTracks";
import dotenv from "dotenv";

dotenv.config();

interface Track {
  title: string;
  artist: string;
  artwork: string;
  previewUrl: string | null;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const data = await fetchPlaylistTracks("3GdkLVn8DVF2GzSrwGHbmh");
        if (data && data.length > 0) {
          const currentTrack = data[0].track;
          setTrack({
            title: currentTrack.name,
            artist: currentTrack.artists[0].name,
            artwork: currentTrack.album.images[0].url,
            previewUrl: currentTrack.preview_url,
          });
        }
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    }
    fetchTrack();
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const SpotifyLogo = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.021.24-2.82-1.74-6.36-2.1-10.561-1.14-.418.122-.779-.179-.901-.539-.122-.418.179-.779.539-.901 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.304 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.479.12-1.02.6-1.14C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
        fill="#1DB954"
      />
    </svg>
  );

  const SpotifyWave = () => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map((bar) => (
        <motion.div
          key={bar}
          className="w-0.5 bg-[#1DB954] rounded-full"
          animate={{
            height: [3, 12, 6, 16, 3],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: bar * 0.1,
            },
          }}
        />
      ))}
    </div>
  );

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex items-center justify-center ${monstreat.className} mt-16 sm:px-0`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[36rem] flex flex-col sm:flex-row rounded-xl shadow-xl overflow-hidden"
      >
        <div className="relative w-full sm:w-[30%] flex items-center justify-center bg-black">
          <div
            className="relative cursor-pointer w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              if (track?.previewUrl) {
                setIsPlaying(!isPlaying);
              }
            }}
          >
            <img
              src={track.artwork}
              alt={track.title}
              className="w-full h-auto object-contain" 
            />
            <AnimatePresence>
              {isHovered && track?.previewUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute w-full inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause size={36} className="text-white" />
                  ) : (
                    <Play size={36} className="text-white" fill="white" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-4 py-3 flex flex-col justify-center bg-gradient-to-b from-gray-900 to-black text-white w-full sm:w-[70%]">
          <div className="flex items-center justify-between mb-16">
            <SpotifyLogo />
            <div className="flex gap-5">
              <SpotifyWave />
              <h4 className="text-[#1DB954] text-sm font-bold">Last Played</h4>
            </div>
          </div>
          <h2 className="text-base font-semibold mb-1 sm:mb-0.5 text-left">
            {track.title}
          </h2>
          <p className="text-sm text-gray-400 text-left">
            {track.artist}
          </p>
        </div>
      </motion.div>

      {track.previewUrl && (
        <audio ref={audioRef} src={track.previewUrl} preload="auto" />
      )}
    </div>
  );
};

export default MusicPlayer;