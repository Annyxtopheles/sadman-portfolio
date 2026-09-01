import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const AudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { hasAudio, muted, toggleMute } = useAudio();
  if (!hasAudio) return null;

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? 'Unmute ambient music' : 'Mute ambient music'}
      title={muted ? 'Unmute ambient music' : 'Mute ambient music'}
      className={`opacity-40 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center py-1 shrink-0 ${className}`}
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
};
