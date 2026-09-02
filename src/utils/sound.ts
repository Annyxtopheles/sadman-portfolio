// Tactile, subtle, satisfying UI micro-click synthesizer using Web Audio API
let audioCtx: AudioContext | null = null;

export function playClickSound() {
  try {
    if (typeof window === 'undefined') return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const t = audioCtx.currentTime;

    // Oscillator 1: Fast pitch drop for the tactile snap
    const osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.025);

    // Bandpass filter for a wooden/mechanical keyboard tactile character
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.Q.setValueAtTime(2.2, t);

    // Gain envelope: fast attack, instant decay (smooth & non-intrusive)
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  } catch {
    // Audio autoplay restrictions gracefully ignored
  }
}
