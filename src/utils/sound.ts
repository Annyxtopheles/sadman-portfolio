// Tactile, subtle, satisfying UI micro-click synthesizer using Web Audio API
let audioCtx: AudioContext | null = null;
let lastClickTime = 0;

export function playClickSound() {
  try {
    if (typeof window === 'undefined') return;

    const now = performance.now();
    if (now - lastClickTime < 60) return; // Guard against duplicate pointerdown + click events
    lastClickTime = now;

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

// Gentle, organic 2-note chime for quest/milestone unlocks
export function playMilestoneSound() {
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

    // Note 1 (587 Hz - D5)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, t);
    gain1.gain.setValueAtTime(0.04, t);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(t);
    osc1.stop(t + 0.26);

    // Note 2 (880 Hz - A5) slight delay
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, t + 0.09);
    gain2.gain.setValueAtTime(0.0001, t);
    gain2.gain.setValueAtTime(0.05, t + 0.09);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(t + 0.09);
    osc2.stop(t + 0.4);
  } catch {
    // Audio autoplay restrictions gracefully ignored
  }
}

// Celebratory, warm 3-note harmonic chime for 100% completion
export function playCompletionRewardSound() {
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
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const noteTime = t + idx * 0.08;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.setValueAtTime(0.045, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });
  } catch {
    // Audio autoplay restrictions gracefully ignored
  }
}
