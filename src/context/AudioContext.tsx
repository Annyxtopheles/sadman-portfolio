import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AudioContextType {
  hasAudio: boolean;
  setHasAudio: (has: boolean) => void;
  muted: boolean;
  setMuted: (muted: boolean | ((prev: boolean) => boolean)) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType>({
  hasAudio: false,
  setHasAudio: () => {},
  muted: true,
  setMuted: () => {},
  toggleMute: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasAudio, setHasAudio] = useState(false);
  const [muted, setMuted] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/matrimony')) {
      setHasAudio(false);
    }
  }, [location.pathname]);

  const toggleMute = () => setMuted((prev) => !prev);

  return (
    <AudioContext.Provider value={{ hasAudio, setHasAudio, muted, setMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};
