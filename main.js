import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ==========================================================================
   NEXUS TITANIUM — ULTRA-REALISTIC SMARTPHONE DISASSEMBLY & CAMERA ENGINE
   ========================================================================== */

// --- 1. PROCEDURAL ULTRA-HD PHYSICAL TEXTURE GENERATORS ---

// ==========================================================================
// INTERACTIVE iOS SCREEN & WEB AUDIO SOUND ENGINE
// ==========================================================================

// Web Audio API Synthesizer Engine (100% offline, pure Web Audio, real music & sounds)
class PhoneSoundEngine {
  constructor() {
    this.ctx = null;
    this.musicTimer = null;
    this.currentStep = 0;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHapticTap() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playShutterSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.065].forEach((delay, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        osc.type = idx === 0 ? 'triangle' : 'square';
        osc.frequency.setValueAtTime(idx === 0 ? 1400 : 950, now + delay);
        osc.frequency.exponentialRampToValueAtTime(180, now + delay + 0.04);
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500, now + delay);
        gain.gain.setValueAtTime(0.4, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.06);
      });
    } catch (e) {}
  }

  startMusic(trackIndex = 0) {
    this.init();
    if (!this.ctx) return;
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;

    // Track patterns (Notes in Hz): Blinding Lights / Pop Melodies
    const bassPatterns = [
      [65.4, 0, 130.8, 155.5, 174.6, 0, 155.5, 130.8, 65.4, 87.3, 130.8, 174.6, 196.0, 174.6, 155.5, 0],
      [110.0, 110.0, 0, 130.8, 146.8, 0, 164.8, 146.8, 110.0, 0, 130.8, 146.8, 164.8, 196.0, 164.8, 0],
      [98.0, 0, 98.0, 123.4, 146.8, 0, 123.4, 98.0, 87.3, 0, 87.3, 110.0, 130.8, 146.8, 130.8, 0]
    ];

    const leadPatterns = [
      [349.2, 0, 392.0, 440.0, 523.2, 0, 440.0, 392.0, 349.2, 523.2, 587.3, 523.2, 440.0, 392.0, 349.2, 0],
      [440.0, 0, 523.2, 659.2, 523.2, 0, 440.0, 0, 392.0, 440.0, 523.2, 659.2, 783.9, 659.2, 523.2, 0],
      [587.3, 0, 523.2, 440.0, 392.0, 440.0, 523.2, 0, 587.3, 659.2, 587.3, 523.2, 440.0, 392.0, 349.2, 0]
    ];

    const currentBass = bassPatterns[trackIndex % bassPatterns.length];
    const currentLead = leadPatterns[trackIndex % leadPatterns.length];
    const stepDuration = 0.145; // ~103 BPM
    let nextStepTime = this.ctx.currentTime + 0.05;

    const scheduleNotes = () => {
      if (!this.isPlaying || !this.ctx) return;
      while (nextStepTime < this.ctx.currentTime + 0.28) {
        const step = this.currentStep % 16;
        const time = nextStepTime;

        // Punchy Kick Drum
        if (step % 4 === 0) {
          const kickOsc = this.ctx.createOscillator();
          const kickGain = this.ctx.createGain();
          kickOsc.frequency.setValueAtTime(145, time);
          kickOsc.frequency.exponentialRampToValueAtTime(35, time + 0.11);
          kickGain.gain.setValueAtTime(0.42, time);
          kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);
          kickOsc.connect(kickGain);
          kickGain.connect(this.ctx.destination);
          kickOsc.start(time);
          kickOsc.stop(time + 0.12);
        }

        // Snappy Snare
        if (step === 4 || step === 12) {
          const snareOsc = this.ctx.createOscillator();
          const snareGain = this.ctx.createGain();
          snareOsc.type = 'triangle';
          snareOsc.frequency.setValueAtTime(240, time);
          snareGain.gain.setValueAtTime(0.22, time);
          snareGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
          snareOsc.connect(snareGain);
          snareGain.connect(this.ctx.destination);
          snareOsc.start(time);
          snareOsc.stop(time + 0.09);
        }

        // Crisp Hi-Hat
        if (step % 2 === 0) {
          const hatOsc = this.ctx.createOscillator();
          const hatGain = this.ctx.createGain();
          hatOsc.type = 'square';
          hatOsc.frequency.setValueAtTime(7000 + (step % 4) * 500, time);
          hatGain.gain.setValueAtTime(0.05, time);
          hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);
          hatOsc.connect(hatGain);
          hatGain.connect(this.ctx.destination);
          hatOsc.start(time);
          hatOsc.stop(time + 0.04);
        }

        // Deep Bassline
        const bFreq = currentBass[step];
        if (bFreq > 0) {
          const bOsc = this.ctx.createOscillator();
          const bGain = this.ctx.createGain();
          const bFilter = this.ctx.createBiquadFilter();
          bOsc.type = 'sawtooth';
          bOsc.frequency.setValueAtTime(bFreq, time);
          bFilter.type = 'lowpass';
          bFilter.frequency.setValueAtTime(500, time);
          bFilter.frequency.exponentialRampToValueAtTime(160, time + stepDuration * 0.85);
          bGain.gain.setValueAtTime(0.18, time);
          bGain.gain.exponentialRampToValueAtTime(0.001, time + stepDuration * 0.85);
          bOsc.connect(bFilter);
          bFilter.connect(bGain);
          bGain.connect(this.ctx.destination);
          bOsc.start(time);
          bOsc.stop(time + stepDuration);
        }

        // Melodic Lead Synthesizer
        const lFreq = currentLead[step];
        if (lFreq > 0) {
          const lOsc = this.ctx.createOscillator();
          const lGain = this.ctx.createGain();
          lOsc.type = 'sine';
          lOsc.frequency.setValueAtTime(lFreq, time);
          lGain.gain.setValueAtTime(0.14, time);
          lGain.gain.exponentialRampToValueAtTime(0.001, time + stepDuration * 0.8);
          lOsc.connect(lGain);
          lGain.connect(this.ctx.destination);
          lOsc.start(time);
          lOsc.stop(time + stepDuration);
        }

        nextStepTime += stepDuration;
        this.currentStep++;
      }
      this.musicTimer = setTimeout(scheduleNotes, 45);
    };

    scheduleNotes();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic(trackIndex = 0) {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(trackIndex);
      return true;
    }
  }
}

const phoneSound = new PhoneSoundEngine();

// Authentic Music Playlist
const MUSIC_TRACKS = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd • After Hours',
    duration: '3:20',
    durationSec: 200,
    accent: '#ef4444',
    bg: '#2b0914'
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa • Future Nostalgia',
    duration: '3:23',
    durationSec: 203,
    accent: '#a855f7',
    bg: '#1e0b36'
  },
  {
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    duration: '3:50',
    durationSec: 230,
    accent: '#eab308',
    bg: '#291b03'
  }
];

// Master Phone Operating State
const phoneState = {
  currentApp: 'home', // 'home' | 'music' | 'camera' | 'photos' | 'safari' | 'weather' | 'settings'
  musicPlaying: false,
  trackIndex: 0,
  songProgress: 0.38,
  cameraZoom: '1x',
  cameraMode: 'PHOTO',
  photosTaken: 0,
  flashlightOn: false,
  wallpaperIndex: 0,
  cameraFocusAngle: 0,
  equalizerBands: [0.4, 0.7, 0.9, 0.5, 0.8, 0.3, 0.95, 0.6, 0.45, 0.75, 0.85, 0.35]
};

// Offscreen 1024x2048 Screen Canvas & CanvasTexture
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 1024;
screenCanvas.height = 2048;
const sCtx = screenCanvas.getContext('2d');

const screenTexture = new THREE.CanvasTexture(screenCanvas);
screenTexture.generateMipmaps = true;
screenTexture.minFilter = THREE.LinearMipmapLinearFilter;

// Screen Drawing Primitives
function drawTopNotchAndStatusBar(ctx, isDarkContent = false) {
  // iPhone 13 20% Smaller TrueDepth Notch
  const notchW = 280, notchH = 68, notchX = (1024 - notchW) / 2, notchY = 54, notchR = 28;
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.roundRect(notchX, notchY, notchW, notchH, notchR);
  ctx.fill();

  // Earpiece speaker acoustic slit
  ctx.fillStyle = '#1c2229';
  ctx.beginPath();
  ctx.roundRect(notchX + (notchW - 100) / 2, notchY + 8, 100, 6, 3);
  ctx.fill();

  // Front camera lens dot
  ctx.fillStyle = '#051829';
  ctx.beginPath();
  ctx.arc(notchX + notchW - 56, notchY + 34, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#163b61';
  ctx.beginPath();
  ctx.arc(notchX + notchW - 56, notchY + 34, 7, 0, Math.PI * 2);
  ctx.fill();

  // Live frequency waves in notch if music is playing!
  if (phoneState.musicPlaying) {
    ctx.fillStyle = '#34d399';
    for (let i = 0; i < 5; i++) {
      const h = 8 + (phoneState.equalizerBands[(i * 2) % phoneState.equalizerBands.length] || 0.5) * 18;
      ctx.fillRect(notchX + 54 + i * 8, notchY + 34 - h / 2, 4, h);
    }
  }

  // Status Bar: Time
  ctx.textAlign = 'left';
  ctx.font = '700 36px "Plus Jakarta Sans", -apple-system, sans-serif';
  ctx.fillStyle = isDarkContent ? '#000000' : '#ffffff';
  ctx.fillText('9:41', 110, 102);

  // Status Bar: 5G & Battery
  ctx.textAlign = 'right';
  ctx.font = '600 24px "Space Grotesk", monospace';
  ctx.fillStyle = isDarkContent ? '#000000' : '#ffffff';
  ctx.fillText('5G', 820, 100);

  // Wi-Fi icon
  ctx.strokeStyle = isDarkContent ? '#000000' : '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(846, 102, 10, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();

  // Battery Outline & Level
  ctx.strokeStyle = isDarkContent ? '#000000' : '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(865, 82, 46, 24);
  ctx.fillStyle = '#34d399';
  ctx.fillRect(868, 85, 34, 18);
  ctx.fillStyle = isDarkContent ? '#000000' : '#ffffff';
  ctx.fillRect(911, 89, 4, 10);
}

function drawHomeIndicator(ctx, isDarkContent = false) {
  ctx.fillStyle = isDarkContent ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.roundRect((1024 - 320) / 2, 1980, 320, 10, 5);
  ctx.fill();
}

// 1. Home Screen Renderer
function drawHomeScreen(ctx) {
  // Rich iOS Wallpaper
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
  bgGrad.addColorStop(0, '#0a101d');
  bgGrad.addColorStop(0.3, '#172842');
  bgGrad.addColorStop(0.65, '#2b1b3d');
  bgGrad.addColorStop(1, '#090d14');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Aurora light flares
  function drawGlowBlob(x, y, r, c1, c2) {
    const radial = ctx.createRadialGradient(x, y, 0, x, y, r);
    radial.addColorStop(0, c1);
    radial.addColorStop(0.6, c2);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalCompositeOperation = 'screen';
  drawGlowBlob(300, 750, 480, 'rgba(56, 189, 248, 0.35)', 'rgba(30, 64, 175, 0.1)');
  drawGlowBlob(720, 1200, 540, 'rgba(217, 70, 239, 0.3)', 'rgba(126, 34, 206, 0.1)');
  drawGlowBlob(450, 1600, 450, 'rgba(245, 158, 11, 0.25)', 'rgba(180, 83, 9, 0.08)');
  ctx.globalCompositeOperation = 'source-over';

  drawTopNotchAndStatusBar(ctx);

  // Large Clock & Date Widget at Top
  ctx.textAlign = 'center';
  ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.letterSpacing = '1px';
  ctx.fillText('FRIDAY, OCTOBER 3', 512, 290);

  ctx.font = '800 155px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.letterSpacing = '-4px';
  ctx.fillText('09:41', 512, 440);

  // Interactive Mini Music Player Widget on Home Screen
  const track = MUSIC_TRACKS[phoneState.trackIndex];
  ctx.fillStyle = 'rgba(20, 26, 36, 0.72)';
  ctx.beginPath();
  ctx.roundRect(100, 490, 824, 140, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Album thumb in mini player
  ctx.fillStyle = track.accent;
  ctx.beginPath();
  ctx.roundRect(124, 514, 92, 92, 18);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '40px sans-serif';
  ctx.fillText('🎵', 170, 575);

  ctx.textAlign = 'left';
  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(track.title, 236, 555);
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillText(track.artist, 236, 590);

  // Play/Pause button in mini player
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.arc(850, 560, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '26px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(phoneState.musicPlaying ? '⏸' : '▶', 850, 568);

  // Grid of 8 Core Interactive iOS Apps (2 rows x 4 cols)
  const apps = [
    { id: 'music', name: 'Music', icon: '🎵', grad: ['#fa2d55', '#e11d48'] },
    { id: 'camera', name: 'Camera', icon: '📷', grad: ['#374151', '#1f2937'] },
    { id: 'photos', name: 'Photos', icon: '🖼️', grad: ['#f8fafc', '#e2e8f0'], iconColor: '#38bdf8' },
    { id: 'safari', name: 'Safari', icon: '🧭', grad: ['#0284c7', '#0369a1'] },
    { id: 'weather', name: 'Weather', icon: '☀️', grad: ['#0284c7', '#38bdf8'] },
    { id: 'settings', name: 'Settings', icon: '⚙️', grad: ['#64748b', '#475569'] },
    { id: 'messages', name: 'Messages', icon: '💬', grad: ['#22c55e', '#16a34a'] },
    { id: 'phone', name: 'Phone', icon: '📞', grad: ['#10b981', '#059669'] }
  ];

  const startX = 135, startY = 700, colSpacing = 210, rowSpacing = 205;
  apps.forEach((app, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const x = startX + col * colSpacing;
    const y = startY + row * rowSpacing;

    // App icon background with glossy gradient
    const iconGrad = ctx.createLinearGradient(x, y, x, y + 130);
    iconGrad.addColorStop(0, app.grad[0]);
    iconGrad.addColorStop(1, app.grad[1]);
    ctx.fillStyle = iconGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, 130, 130, 32);
    ctx.fill();

    // Subtle icon border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // App Icon glyph
    ctx.textAlign = 'center';
    ctx.font = '56px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(app.icon, x + 65, y + 88);

    // App label
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(app.name, x + 65, y + 168);
  });

  // Second Row of Decorative / Interactive Apps
  const secondRowApps = [
    { name: 'Calendar', icon: '📅', grad: ['#ffffff', '#f1f5f9'] },
    { name: 'Maps', icon: '🗺️', grad: ['#38bdf8', '#0ea5e9'] },
    { name: 'Notes', icon: '📝', grad: ['#fef08a', '#facc15'] },
    { name: 'Health', icon: '❤️', grad: ['#f43f5e', '#e11d48'] }
  ];
  secondRowApps.forEach((app, col) => {
    const x = startX + col * colSpacing;
    const y = startY + 2 * rowSpacing;
    const iconGrad = ctx.createLinearGradient(x, y, x, y + 130);
    iconGrad.addColorStop(0, app.grad[0]);
    iconGrad.addColorStop(1, app.grad[1]);
    ctx.fillStyle = iconGrad;
    ctx.beginPath(); ctx.roundRect(x, y, 130, 130, 32); ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    ctx.font = '54px sans-serif';
    ctx.fillText(app.icon, x + 65, y + 88);
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(app.name, x + 65, y + 168);
  });

  // Frosted Glass Bottom Dock Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.beginPath();
  ctx.roundRect(80, 1780, 864, 160, 44);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.stroke();

  // Dock Apps: Phone, Safari, Messages, Music
  const dockApps = [
    { id: 'phone', icon: '📞', grad: ['#10b981', '#059669'] },
    { id: 'safari', icon: '🧭', grad: ['#0284c7', '#0369a1'] },
    { id: 'messages', icon: '💬', grad: ['#22c55e', '#16a34a'] },
    { id: 'music', icon: '🎵', grad: ['#fa2d55', '#e11d48'] }
  ];
  dockApps.forEach((dApp, dIdx) => {
    const dx = 135 + dIdx * colSpacing;
    const dy = 1795;
    const dGrad = ctx.createLinearGradient(dx, dy, dx, dy + 130);
    dGrad.addColorStop(0, dApp.grad[0]);
    dGrad.addColorStop(1, dApp.grad[1]);
    ctx.fillStyle = dGrad;
    ctx.beginPath(); ctx.roundRect(dx, dy, 130, 130, 32); ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.stroke();
    ctx.font = '56px sans-serif';
    ctx.fillText(dApp.icon, dx + 65, dy + 88);
  });

  drawHomeIndicator(ctx);
}

// 2. Apple Music App Renderer
function drawMusicApp(ctx) {
  const track = MUSIC_TRACKS[phoneState.trackIndex];

  // Deep luxury dark gradient background
  const bg = ctx.createLinearGradient(0, 0, 1024, 2048);
  bg.addColorStop(0, track.bg);
  bg.addColorStop(0.5, '#12161f');
  bg.addColorStop(1, '#090c10');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 2048);

  drawTopNotchAndStatusBar(ctx);

  // Top navigation
  ctx.textAlign = 'left';
  ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('‹ Library', 80, 180);

  ctx.textAlign = 'center';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText('NOW PLAYING', 512, 180);

  ctx.textAlign = 'right';
  ctx.font = '700 28px sans-serif';
  ctx.fillText('•••', 944, 180);

  // Large Artwork with dynamic glow
  const artX = 142, artY = 240, artW = 740, artH = 740;
  const artGrad = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
  artGrad.addColorStop(0, track.accent);
  artGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = artGrad;
  ctx.beginPath();
  ctx.roundRect(artX, artY, artW, artH, 44);
  ctx.fill();

  // Artwork central vinyl/glyph
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(512, artY + artH / 2, 240, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '160px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎵', 512, artY + artH / 2 + 55);

  // Track Title & Artist
  ctx.textAlign = 'left';
  ctx.font = '800 52px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(track.title, 100, 1080);

  ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = track.accent;
  ctx.fillText(track.artist, 100, 1135);

  // Scrubber Progress Bar
  const scrubX = 100, scrubY = 1200, scrubW = 824;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.beginPath();
  ctx.roundRect(scrubX, scrubY, scrubW, 10, 5);
  ctx.fill();

  const filledW = scrubW * phoneState.songProgress;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(scrubX, scrubY, filledW, 10, 5);
  ctx.fill();

  // Scrubber knob
  ctx.beginPath();
  ctx.arc(scrubX + filledW, scrubY + 5, 14, 0, Math.PI * 2);
  ctx.fill();

  // Scrubber Elapsed & Remaining Times
  const elapsedSec = Math.floor(track.durationSec * phoneState.songProgress);
  const elMin = Math.floor(elapsedSec / 60);
  const elSec = (elapsedSec % 60).toString().padStart(2, '0');
  const remSec = track.durationSec - elapsedSec;
  const remMin = Math.floor(remSec / 60);
  const remSecStr = (remSec % 60).toString().padStart(2, '0');

  ctx.font = '500 22px "Space Grotesk", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.textAlign = 'left';
  ctx.fillText(`${elMin}:${elSec}`, scrubX, scrubY + 42);
  ctx.textAlign = 'right';
  ctx.fillText(`-${remMin}:${remSecStr}`, scrubX + scrubW, scrubY + 42);

  // Frequency Spectrum Equalizer Bars
  const eqX = 260, eqY = 1350, eqW = 504;
  ctx.fillStyle = track.accent;
  for (let i = 0; i < 16; i++) {
    const val = phoneState.musicPlaying ? (phoneState.equalizerBands[i % phoneState.equalizerBands.length] || 0.5) : 0.15;
    const barH = 14 + val * 70;
    ctx.fillRect(eqX + i * 31, eqY - barH / 2, 14, barH);
  }

  // Playback Controls (Previous, Play/Pause, Next)
  // Previous (⏮)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '54px sans-serif';
  ctx.fillText('⏮', 300, 1610);

  // Central Big Play/Pause Button Circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(512, 1590, 72, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111827';
  ctx.font = '56px sans-serif';
  ctx.fillText(phoneState.musicPlaying ? '⏸' : '▶', 512, 1610);

  // Next (⏭)
  ctx.fillStyle = '#ffffff';
  ctx.font = '54px sans-serif';
  ctx.fillText('⏭', 724, 1610);

  // AirPlay & Volume Controls
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.beginPath();
  ctx.roundRect(140, 1750, 744, 8, 4);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.roundRect(140, 1750, 520, 8, 4);
  ctx.fill();

  ctx.font = '28px sans-serif';
  ctx.fillText('🔈', 100, 1762);
  ctx.fillText('🔊', 924, 1762);

  drawHomeIndicator(ctx);
}

// 3. iPhone Camera App Renderer (Live Viewfinder & Shutter)
function drawCameraApp(ctx) {
  // Deep matte black camera housing
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 2048);

  drawTopNotchAndStatusBar(ctx);

  // Live Camera Viewfinder Window
  const vfX = 0, vfY = 180, vfW = 1024, vfH = 1360;
  ctx.save();
  ctx.beginPath();
  ctx.rect(vfX, vfY, vfW, vfH);
  ctx.clip();

  // Simulated live camera scene (High-tech architectural landscape with moving focus)
  const sceneGrad = ctx.createLinearGradient(0, vfY, 0, vfY + vfH);
  sceneGrad.addColorStop(0, '#0f172a');
  sceneGrad.addColorStop(0.4, '#1e293b');
  sceneGrad.addColorStop(0.8, '#334155');
  sceneGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = sceneGrad;
  ctx.fillRect(vfX, vfY, vfW, vfH);

  // Golden hour sun orb in viewfinder
  const sunX = 512 + Math.sin(phoneState.cameraFocusAngle) * 40;
  const sunY = vfY + 380;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 320);
  sunGrad.addColorStop(0, 'rgba(251, 191, 36, 0.55)');
  sunGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.25)');
  sunGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = sunGrad;
  ctx.beginPath(); ctx.arc(sunX, sunY, 320, 0, Math.PI * 2); ctx.fill();

  // Simulated cityscape building silhouettes
  ctx.fillStyle = '#090d16';
  ctx.fillRect(100, vfY + 620, 160, 740);
  ctx.fillRect(300, vfY + 540, 220, 820);
  ctx.fillRect(560, vfY + 580, 190, 780);
  ctx.fillRect(780, vfY + 660, 160, 700);

  // Architectural neon light windows
  ctx.fillStyle = 'rgba(253, 224, 71, 0.4)';
  for (let b = 0; b < 24; b++) {
    const bx = 320 + (b % 4) * 48;
    const by = vfY + 570 + Math.floor(b / 4) * 60;
    ctx.fillRect(bx, by, 28, 38);
  }

  // Camera 3x3 Rule-of-Thirds Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(vfX + vfW / 3, vfY); ctx.lineTo(vfX + vfW / 3, vfY + vfH);
  ctx.moveTo(vfX + (vfW * 2) / 3, vfY); ctx.lineTo(vfX + (vfW * 2) / 3, vfY + vfH);
  ctx.moveTo(vfX, vfY + vfH / 3); ctx.lineTo(vfX + vfW, vfY + vfH / 3);
  ctx.moveTo(vfX, vfY + (vfH * 2) / 3); ctx.lineTo(vfX + vfW, vfY + (vfH * 2) / 3);
  ctx.stroke();

  // Dynamic Yellow AI Focus Box (Tracks center subject)
  const boxX = 412 + Math.sin(phoneState.cameraFocusAngle) * 30;
  const boxY = vfY + 580 + Math.cos(phoneState.cameraFocusAngle) * 20;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(boxX, boxY, 200, 200);

  // Focus lock corner markers
  ctx.fillStyle = '#facc15';
  ctx.fillRect(boxX - 4, boxY - 4, 16, 4);
  ctx.fillRect(boxX - 4, boxY - 4, 4, 16);
  ctx.fillRect(boxX + 188, boxY - 4, 16, 4);
  ctx.fillRect(boxX + 200, boxY - 4, 4, 16);

  ctx.textAlign = 'center';
  ctx.font = '600 18px "Space Grotesk", monospace';
  ctx.fillText('AF-C • 100% FOCUS PIXELS', boxX + 100, boxY - 12);
  ctx.restore();

  // Top Camera Controls Bar
  ctx.textAlign = 'left';
  ctx.font = '28px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('⚡', 80, 160);
  ctx.fillText('🌙 2s', 150, 160);

  ctx.textAlign = 'right';
  ctx.font = '700 32px sans-serif';
  ctx.fillText('✕', 944, 160); // Close Camera Button

  // Zoom Selector Pill (0.5x, 1x, 3x)
  const zoomY = 1600;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.beginPath();
  ctx.roundRect(360, zoomY, 304, 52, 26);
  ctx.fill();

  const zooms = ['0.5x', '1x', '3x'];
  zooms.forEach((z, zIdx) => {
    const zx = 410 + zIdx * 100;
    if (phoneState.cameraZoom === z) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(zx, zoomY + 26, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000000';
    } else {
      ctx.fillStyle = '#ffffff';
    }
    ctx.textAlign = 'center';
    ctx.font = '700 20px "Space Grotesk", sans-serif';
    ctx.fillText(z, zx, zoomY + 34);
  });

  // Carousel Modes: CINEMATIC, VIDEO, PHOTO, PORTRAIT
  const modes = ['CINEMATIC', 'VIDEO', 'PHOTO', 'PORTRAIT'];
  const modeY = 1710;
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  modes.forEach((m, mIdx) => {
    const mx = 240 + mIdx * 180;
    ctx.textAlign = 'center';
    ctx.fillStyle = (m === phoneState.cameraMode) ? '#facc15' : 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(m, mx, modeY);
  });

  // Bottom Controls Bar (Shutter, Gallery, Flip)
  // Gallery Thumbnail Preview
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(110, 1780, 100, 100, 22);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '40px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🖼️', 160, 1845);
  if (phoneState.photosTaken > 0) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(195, 1795, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px sans-serif';
    ctx.fillText(phoneState.photosTaken.toString(), 195, 1800);
  }

  // Giant Circular White Shutter Button
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(512, 1830, 68, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(512, 1830, 56, 0, Math.PI * 2);
  ctx.fill();

  // Flip Camera Icon
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.beginPath();
  ctx.arc(864, 1830, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '36px sans-serif';
  ctx.fillText('🔄', 864, 1842);

  drawHomeIndicator(ctx);
}

// 4. Photos App Renderer
function drawPhotosApp(ctx) {
  ctx.fillStyle = '#0b0f17';
  ctx.fillRect(0, 0, 1024, 2048);

  drawTopNotchAndStatusBar(ctx);

  ctx.textAlign = 'left';
  ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Photos', 80, 200);

  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText('SHOT ON IPHONE 13 • DUAL 12MP OPTICS', 80, 245);

  // 2x3 Grid of Photography Showcase
  const samplePhotos = [
    { title: 'Golden Sunset', subtitle: 'Ultra-Wide 120°', color: '#ea580c' },
    { title: 'Night City', subtitle: 'Night Mode 2s', color: '#4f46e5' },
    { title: 'Macro Flora', subtitle: 'Sensor-Shift OIS', color: '#059669' },
    { title: 'Portrait Flare', subtitle: 'Cinematic Depth', color: '#e11d48' },
    { title: 'Ocean Horizon', subtitle: 'Smart HDR 4', color: '#0284c7' },
    { title: 'Studio Bokeh', subtitle: 'f/1.6 Aperture', color: '#9333ea' }
  ];

  const pStartX = 80, pStartY = 300, pW = 412, pH = 450, pGapX = 40, pGapY = 40;
  samplePhotos.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = pStartX + col * (pW + pGapX);
    const py = pStartY + row * (pH + pGapY);

    const grad = ctx.createLinearGradient(px, py, px + pW, py + pH);
    grad.addColorStop(0, item.color);
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(px, py, pW, pH, 28);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '72px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('📸', px + pW / 2, py + pH / 2 - 20);

    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(item.title, px + pW / 2, py + pH - 65);
    ctx.font = '500 18px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillText(item.subtitle, px + pW / 2, py + pH - 30);
  });

  drawHomeIndicator(ctx);
}

// 5. Safari App Renderer
function drawSafariApp(ctx) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 2048);

  drawTopNotchAndStatusBar(ctx);

  // Address Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.beginPath();
  ctx.roundRect(80, 150, 864, 76, 38);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.font = '600 24px "Plus Jakarta Sans", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('🔒 apple.com/iphone-13', 512, 196);

  // Webpage Content Card
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(80, 270, 864, 1600, 36);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 26px "Space Grotesk", monospace';
  ctx.fillText('APPLE SPECIAL EVENT', 130, 350);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 60px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('iPhone 13', 130, 430);

  ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('Your new superpower.', 130, 485);

  // Feature cards inside safari
  const features = [
    { title: 'A15 Bionic Chip', desc: '5nm 6-Core CPU & 16-Core Neural Engine powers cinematic video.' },
    { title: 'Sensor-Shift OIS', desc: 'DSLR technology stabilizes sensor directly at 5,000 adj/sec.' },
    { title: 'Super Retina XDR', desc: 'Up to 1,200 nits peak HDR brightness with 20% smaller notch.' },
    { title: 'All-Day Battery', desc: '3,227 mAh capacity delivering up to 2.5 more hours of battery life.' }
  ];

  features.forEach((f, idx) => {
    const fy = 560 + idx * 260;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(130, fy, 764, 210, 24);
    ctx.fill();

    ctx.fillStyle = '#ffd700';
    ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(f.title, 170, fy + 70);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(f.desc, 170, fy + 125);
  });

  drawHomeIndicator(ctx);
}

// 6. Weather App Renderer
function drawWeatherApp(ctx) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 2048);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.6, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 2048);

  drawTopNotchAndStatusBar(ctx);

  ctx.textAlign = 'center';
  ctx.font = '700 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Cupertino', 512, 280);

  ctx.font = '800 160px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('72°', 512, 440);

  ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Mostly Sunny', 512, 500);

  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('H: 78°   L: 56°', 512, 550);

  // Hourly forecast panel
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.beginPath();
  ctx.roundRect(80, 640, 864, 280, 36);
  ctx.fill();

  const hours = [
    { time: 'Now', temp: '72°', icon: '☀️' },
    { time: '10 AM', temp: '74°', icon: '🌤️' },
    { time: '11 AM', temp: '76°', icon: '☀️' },
    { time: '12 PM', temp: '78°', icon: '☀️' },
    { time: '1 PM', temp: '77°', icon: '⛅' }
  ];

  hours.forEach((h, idx) => {
    const hx = 160 + idx * 160;
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(h.time, hx, 700);
    ctx.font = '48px sans-serif';
    ctx.fillText(h.icon, hx, 780);
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(h.temp, hx, 860);
  });

  drawHomeIndicator(ctx);
}

// 7. Settings App Renderer (with Working Flashlight Toggle!)
function drawSettingsApp(ctx) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 2048);

  drawTopNotchAndStatusBar(ctx);

  ctx.textAlign = 'left';
  ctx.font = '800 52px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Settings', 80, 210);

  // Flashlight Setting Card
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(80, 270, 864, 180, 32);
  ctx.fill();

  ctx.font = '54px sans-serif';
  ctx.fillText('🔦', 130, 380);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('True Tone Flashlight', 220, 350);
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillText('Hardware True Tone Quad-LED Torch', 220, 395);

  // Toggle switch (ON/OFF)
  const togX = 800, togY = 330;
  ctx.fillStyle = phoneState.flashlightOn ? '#22c55e' : 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.roundRect(togX, togY, 100, 60, 30);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  const knobX = phoneState.flashlightOn ? togX + 70 : togX + 30;
  ctx.beginPath();
  ctx.arc(knobX, togY + 30, 24, 0, Math.PI * 2);
  ctx.fill();

  // Battery Health Card
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(80, 480, 864, 180, 32);
  ctx.fill();

  ctx.font = '54px sans-serif';
  ctx.fillText('🔋', 130, 590);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Battery Health', 220, 560);
  ctx.font = '600 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText('100% Maximum Capacity (Model A2655)', 220, 605);

  // iOS Version Card
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(80, 690, 864, 180, 32);
  ctx.fill();

  ctx.font = '54px sans-serif';
  ctx.fillText('⚙️', 130, 800);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('iOS 15.6 • A15 Bionic', 220, 770);
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillText('Apple APL1W07 6-Core CPU Active', 220, 815);

  drawHomeIndicator(ctx);
}

// Master Render Dispatcher
function renderScreen() {
  switch (phoneState.currentApp) {
    case 'music':
      drawMusicApp(sCtx);
      break;
    case 'camera':
      drawCameraApp(sCtx);
      break;
    case 'photos':
      drawPhotosApp(sCtx);
      break;
    case 'safari':
      drawSafariApp(sCtx);
      break;
    case 'weather':
      drawWeatherApp(sCtx);
      break;
    case 'settings':
      drawSettingsApp(sCtx);
      break;
    case 'home':
    default:
      drawHomeScreen(sCtx);
      break;
  }
  screenTexture.needsUpdate = true;
}

// Initial draw of home screen
renderScreen();

// Open App Function (used by both Screen Touch & Quick App Bar)
function openPhoneApp(appName) {
  phoneSound.playHapticTap();
  phoneState.currentApp = appName;

  // If opening music, auto-start music if not already playing!
  if (appName === 'music') {
    if (!phoneState.musicPlaying) {
      phoneSound.startMusic(phoneState.trackIndex);
      phoneState.musicPlaying = true;
    }
  }

  // Update App Bar UI Active class
  document.querySelectorAll('.app-launch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.app === appName);
  });

  const soundBars = document.getElementById('sound-wave-bars');
  if (soundBars) {
    soundBars.classList.toggle('playing', phoneState.musicPlaying);
  }

  renderScreen();
}

// Flash Screen Effect for Camera Shutter
function triggerCameraShutterFlash() {
  const flashOverlay = document.getElementById('camera-flash-overlay');
  if (flashOverlay) {
    flashOverlay.classList.add('flashing');
    setTimeout(() => flashOverlay.classList.remove('flashing'), 120);
  }
}

// Screen Touch Event Handler (Translates screen pixel coordinates to app interactions)
function handleScreenTouch(px, py) {
  phoneSound.playHapticTap();

  // Bottom Home Bar clicked from any app -> Return to Home
  if (py >= 1930) {
    openPhoneApp('home');
    return;
  }

  if (phoneState.currentApp === 'home') {
    // Mini player widget click -> open music / toggle play
    if (py >= 490 && py <= 630 && px >= 100 && px <= 924) {
      if (px >= 780) {
        phoneState.musicPlaying = phoneSound.toggleMusic(phoneState.trackIndex);
        const soundBars = document.getElementById('sound-wave-bars');
        if (soundBars) soundBars.classList.toggle('playing', phoneState.musicPlaying);
        renderScreen();
      } else {
        openPhoneApp('music');
      }
      return;
    }

    // Grid row 1 (Music, Camera, Photos, Safari)
    if (py >= 700 && py <= 880) {
      if (px >= 100 && px <= 270) openPhoneApp('music');
      else if (px >= 310 && px <= 480) openPhoneApp('camera');
      else if (px >= 520 && px <= 690) openPhoneApp('photos');
      else if (px >= 730 && px <= 900) openPhoneApp('safari');
      return;
    }

    // Grid row 2 (Weather, Settings, Messages, Phone)
    if (py >= 905 && py <= 1085) {
      if (px >= 100 && px <= 270) openPhoneApp('weather');
      else if (px >= 310 && px <= 480) openPhoneApp('settings');
      else if (px >= 520 && px <= 690) openPhoneApp('messages');
      else if (px >= 730 && px <= 900) openPhoneApp('phone');
      return;
    }

    // Dock row
    if (py >= 1780 && py <= 1940) {
      if (px >= 100 && px <= 270) openPhoneApp('phone');
      else if (px >= 310 && px <= 480) openPhoneApp('safari');
      else if (px >= 520 && px <= 690) openPhoneApp('messages');
      else if (px >= 730 && px <= 900) openPhoneApp('music');
      return;
    }
  } else if (phoneState.currentApp === 'music') {
    // Back to library button
    if (py >= 140 && py <= 220 && px <= 300) {
      openPhoneApp('home');
      return;
    }

    // Play/Pause button
    if (py >= 1500 && py <= 1680 && px >= 420 && px <= 600) {
      phoneState.musicPlaying = phoneSound.toggleMusic(phoneState.trackIndex);
      const soundBars = document.getElementById('sound-wave-bars');
      if (soundBars) soundBars.classList.toggle('playing', phoneState.musicPlaying);
      renderScreen();
      return;
    }

    // Next track
    if (py >= 1540 && py <= 1680 && px >= 660 && px <= 800) {
      phoneState.trackIndex = (phoneState.trackIndex + 1) % MUSIC_TRACKS.length;
      phoneState.songProgress = 0;
      if (phoneState.musicPlaying) {
        phoneSound.stopMusic();
        phoneSound.startMusic(phoneState.trackIndex);
      }
      renderScreen();
      return;
    }

    // Prev track
    if (py >= 1540 && py <= 1680 && px >= 220 && px <= 360) {
      phoneState.trackIndex = (phoneState.trackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
      phoneState.songProgress = 0;
      if (phoneState.musicPlaying) {
        phoneSound.stopMusic();
        phoneSound.startMusic(phoneState.trackIndex);
      }
      renderScreen();
      return;
    }

    // Scrubber click
    if (py >= 1180 && py <= 1260 && px >= 100 && px <= 924) {
      phoneState.songProgress = (px - 100) / 824;
      renderScreen();
      return;
    }
  } else if (phoneState.currentApp === 'camera') {
    // Close Camera Button (Top-right '✕')
    if (py >= 120 && py <= 210 && px >= 860) {
      openPhoneApp('home');
      return;
    }

    // Shutter button (snap photo!)
    if (py >= 1740 && py <= 1920 && px >= 430 && px <= 590) {
      phoneSound.playShutterSound();
      triggerCameraShutterFlash();
      phoneState.photosTaken++;
      renderScreen();
      return;
    }

    // Zoom buttons
    if (py >= 1580 && py <= 1660) {
      if (px >= 360 && px <= 440) phoneState.cameraZoom = '0.5x';
      else if (px >= 460 && px <= 560) phoneState.cameraZoom = '1x';
      else if (px >= 570 && px <= 670) phoneState.cameraZoom = '3x';
      renderScreen();
      return;
    }

    // Gallery thumbnail
    if (py >= 1770 && py <= 1890 && px >= 100 && px <= 230) {
      openPhoneApp('photos');
      return;
    }
  } else if (phoneState.currentApp === 'settings') {
    // Flashlight Toggle
    if (py >= 300 && py <= 420 && px >= 750) {
      phoneState.flashlightOn = !phoneState.flashlightOn;
      if (window.phoneTorchLight) {
        window.phoneTorchLight.intensity = phoneState.flashlightOn ? 5.0 : 0;
      }
      if (glbMeshes['Flash_Flash1_0']) {
        glbMeshes['Flash_Flash1_0'].material.emissiveIntensity = phoneState.flashlightOn ? 4.0 : 0.4;
      }
      renderScreen();
      return;
    }
  } else {
    // Photos, Safari, Weather: tapping top header returns to home
    if (py <= 220) {
      openPhoneApp('home');
      return;
    }
  }
}

// Wire Up Phone Apps Quick Launch Bar
document.querySelectorAll('.app-launch-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetApp = btn.dataset.app;
    openPhoneApp(targetApp);
  });
});

// 1.2 Back of Display Panel (Authentic iPhone 13 OLED Copper Shield & FPC Flex)
function createDisplayBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Brushed copper grounding plate with realistic metallic sheen
  const copperGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
  copperGrad.addColorStop(0, '#c97d3b');
  copperGrad.addColorStop(0.3, '#b36b2d');
  copperGrad.addColorStop(0.7, '#c27735');
  copperGrad.addColorStop(1, '#9e5a20');
  ctx.fillStyle = copperGrad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Micro-etched heat dissipation crosshatch lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 2048; y += 32) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
  }
  for (let x = 0; x < 1024; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 2048); ctx.stroke();
  }

  // Black graphite thermal tape reinforcement strip at top and perimeter
  ctx.fillStyle = '#14181c';
  ctx.fillRect(40, 40, 944, 120);
  ctx.fillRect(40, 160, 40, 1500);
  ctx.fillRect(944, 160, 40, 1500);

  // Laser engraved Apple spare part markings
  ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
  ctx.font = '700 32px "Space Grotesk", sans-serif';
  ctx.fillText(' SUPER RETINA XDR OLED PANEL', 120, 300);

  ctx.font = '600 22px "Space Grotesk", monospace';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillText('PART NO: 821-03212-A • MODEL: A2633', 120, 345);
  ctx.fillText('SERIAL: G6TX901L0482-K • REV 2.4', 120, 385);

  ctx.fillStyle = '#b91c1c';
  ctx.font = '700 18px "Space Grotesk", monospace';
  ctx.fillText('CAUTION: STATIC SENSITIVE ESD PROTECTED ASSEMBLY', 120, 430);

  // High-precision DataMatrix QR code
  ctx.fillStyle = '#14181c';
  ctx.fillRect(720, 260, 160, 160);
  ctx.fillStyle = '#c97d3b';
  for (let qx = 0; qx < 8; qx++) {
    for (let qy = 0; qy < 8; qy++) {
      if ((qx * 3 + qy * 7) % 2 === 0 || (qx === 0 || qx === 7 || qy === 0 || qy === 7)) {
        ctx.fillRect(732 + qx * 17, 272 + qy * 17, 13, 13);
      }
    }
  }

  // Bottom Flexible Printed Circuit (FPC) Ribbon with 40 Gold Contact Pins
  ctx.fillStyle = '#161a1e';
  ctx.fillRect(160, 1780, 704, 240);
  ctx.strokeStyle = '#2d333b';
  ctx.lineWidth = 3;
  ctx.strokeRect(160, 1780, 704, 240);

  // Gold connector pins
  ctx.fillStyle = '#d4af37';
  for (let p = 0; p < 38; p++) {
    ctx.fillRect(190 + p * 17, 1805, 9, 50);
    ctx.fillRect(190 + p * 17, 1935, 9, 50);
  }
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 16px "Space Grotesk", monospace';
  ctx.fillText('DISPLAY & DIGITIZER 40-PIN B2B CONNECTOR', 200, 1905);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.3 Authentic iPhone 13 Logic Board Texture (Apple A15 Bionic SoC & 5G Modem)
function createLogicBoardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Matte black-emerald solder mask PCB substrate
  ctx.fillStyle = '#0b1612';
  ctx.fillRect(0, 0, 1024, 1024);

  // Fine printed circuit signal tracks
  ctx.strokeStyle = 'rgba(77, 240, 210, 0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 1024; i += 20) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
  }

  // Heavy electroless nickel immersion gold (ENIG) power bus traces
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const traces = [
    [100, 180, 260, 180, 320, 240, 320, 420],
    [80, 220, 240, 220, 290, 270, 290, 460],
    [720, 160, 600, 160, 540, 220, 540, 420],
    [760, 200, 640, 200, 580, 260, 580, 480],
    [280, 780, 280, 640, 340, 580, 440, 580],
    [660, 800, 660, 670, 600, 600, 520, 600],
    [160, 860, 260, 860, 300, 820, 400, 820],
    [820, 860, 720, 860, 670, 810, 570, 810],
  ];
  traces.forEach(pts => {
    ctx.moveTo(pts[0], pts[1]);
    for (let j = 2; j < pts.length; j += 2) {
      ctx.lineTo(pts[j], pts[j+1]);
    }
  });
  ctx.stroke();

  // Shiny gold test points (vias & probe pads)
  ctx.fillStyle = '#ffd700';
  for (let k = 0; k < 120; k++) {
    const rx = 50 + (k * 47) % 924;
    const ry = 50 + (k * 73) % 924;
    ctx.beginPath();
    ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Central Processor: Apple A15 Bionic SoC Heat Spreader
  const socX = 350, socY = 310, socW = 320, socH = 320;
  ctx.fillStyle = '#1f242b';
  ctx.fillRect(socX - 12, socY - 12, socW + 24, socH + 24);

  const socGrad = ctx.createLinearGradient(socX, socY, socX + socW, socY + socH);
  socGrad.addColorStop(0, '#434b55');
  socGrad.addColorStop(0.5, '#2c333c');
  socGrad.addColorStop(1, '#171b20');
  ctx.fillStyle = socGrad;
  ctx.fillRect(socX, socY, socW, socH);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(socX + 2, socY + 2, socW - 4, socH - 4);

  // Laser engraved Apple Logo & A15 Bionic
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 44px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(' A15', socX + socW / 2, socY + 95);

  ctx.font = '600 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#e2be64';
  ctx.fillText('BIONIC', socX + socW / 2, socY + 135);

  ctx.font = '500 15px "Space Grotesk", monospace';
  ctx.fillStyle = '#d4af37';
  ctx.fillText('6-CORE CPU • 16-CORE NPU', socX + socW / 2, socY + 175);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '400 13px "Space Grotesk", monospace';
  ctx.fillText('APL1W07 • 5-CORE GPU', socX + socW / 2, socY + 215);
  ctx.fillText('SECURE ENCLAVE ACTIVE', socX + socW / 2, socY + 245);
  ctx.fillText('APPLE INC. 820-02384-A', socX + socW / 2, socY + 275);

  // Auxiliary Real Integrated Circuits (ICs)
  function drawChip(x, y, w, h, title, sub) {
    ctx.fillStyle = '#14181c';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#2d353e';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 15px "Space Grotesk", monospace';
    ctx.fillText(title, x + w / 2, y + h / 2 - 2);
    ctx.font = '400 12px "Space Grotesk", monospace';
    ctx.fillStyle = '#d4af37';
    ctx.fillText(sub, x + w / 2, y + h / 2 + 16);
  }

  drawChip(100, 310, 190, 140, 'LPDDR4X 4GB', 'SK HYNIX SDRAM');
  drawChip(100, 480, 190, 140, '128GB NVMe', 'KIOXIA NAND FLASH');
  drawChip(730, 310, 190, 130, 'X60 5G MODEM', 'QUALCOMM RF');
  drawChip(730, 470, 190, 130, 'DIALOG PMIC', 'POWER MGMT IC');

  // Board-to-Board (B2B) Gold Pin Headers with Labels
  function drawB2BConnector(x, y, w, h, label) {
    ctx.fillStyle = '#080a0d';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = '#ffd700';
    for (let pin = 4; pin < w - 4; pin += 8) {
      ctx.fillRect(x + pin, y + 3, 4, h - 6);
    }
    ctx.textAlign = 'left';
    ctx.font = '600 12px "Space Grotesk", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, x, y - 6);
  }

  drawB2BConnector(120, 110, 180, 24, 'J1 CAMERA FLEX');
  drawB2BConnector(340, 110, 180, 24, 'J2 DISPLAY LTPO');
  drawB2BConnector(560, 110, 180, 24, 'J3 BATTERY CONN');

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.4 Authentic iPhone 13 Li-ion Battery Texture (Model A2655, Pull-Tabs & Safety Marks)
function createBatteryTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Matte dark graphite battery foil pouch
  ctx.fillStyle = '#16191d';
  ctx.fillRect(0, 0, 1024, 1024);

  // Sealed silver foil crimped edge perimeter
  ctx.fillStyle = '#9ea7b2';
  ctx.fillRect(0, 0, 1024, 22);
  ctx.fillRect(0, 1002, 1024, 22);
  ctx.fillRect(0, 0, 22, 1024);
  ctx.fillRect(1002, 0, 22, 1024);

  // Metallic brushed reflection gradient
  const sheen = ctx.createLinearGradient(0, 0, 1024, 1024);
  sheen.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
  sheen.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
  sheen.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
  ctx.fillStyle = sheen;
  ctx.fillRect(22, 22, 980, 980);

  // Official Apple Battery Typography
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 46px "Space Grotesk", sans-serif';
  ctx.fillText(' Rechargeable Li-ion Battery', 80, 150);

  ctx.font = '600 28px "Space Grotesk", monospace';
  ctx.fillStyle = '#e2be64';
  ctx.fillText('3,227 mAh  •  12.41 Wh  •  Rated 3.85Vdc', 80, 210);

  ctx.font = '500 20px "Space Grotesk", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText('MODEL A2655  •  APN: 616-00898  •  1ICP5/63/87', 80, 260);
  ctx.fillText('LIMITED CHARGE VOLTAGE: 4.45V  •  SECONDARY LI-ION CELL', 80, 295);

  // Warning & Regulatory Box
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 340, 860, 240);

  ctx.fillStyle = '#ef4444';
  ctx.font = '700 20px "Space Grotesk", sans-serif';
  ctx.fillText('WARNING: AUTHORIZED SERVICE PROVIDER ONLY', 110, 380);

  ctx.font = '400 16px "Space Grotesk", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('POTENTIAL FOR FIRE OR BURNING. DO NOT DISASSEMBLE, PUNCTURE, CRUSH,', 110, 420);
  ctx.fillText('HEAT ABOVE 100°C (212°F), OR INCINERATE. DO NOT SHORT CIRCUIT TERMINALS.', 110, 455);
  ctx.fillText('REPLACE ONLY WITH APPLE-SPECIFIED GENUINE REPLACEMENT BATTERY.', 110, 490);
  ctx.fillText('CERTIFIED: [CE] [UL 1642] [PSE] [RoHS] [UKCA] [Li-ion 00] [Recycle]', 110, 535);

  // Serial Barcode & 2D Matrix
  for (let b = 0; b < 130; b++) {
    const barW = (b % 4 === 0) ? 5 : (b % 2 === 0) ? 3 : 1.5;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fillRect(80 + b * 6.5, 630, barW, 90);
  }
  ctx.font = '500 16px "Space Grotesk", monospace';
  ctx.fillText('SN: F8Y138402AK00389A • BATCH SIMPLO-TECH 2021', 80, 755);

  // Authentic Stretch-Release Pull Tabs (White Arrows on Black Pull Tabs)
  function drawPullTab(x, y) {
    ctx.fillStyle = '#0d1115';
    ctx.fillRect(x, y, 170, 85);
    ctx.strokeStyle = '#4a535e';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(x, y, 170, 85);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Space Grotesk", sans-serif';
    ctx.fillText('▼ PULL TO REMOVE ▼', x + 85, y + 48);
  }
  drawPullTab(120, 840);
  drawPullTab(730, 840);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.5 Authentic iPhone 13 Dual CMOS Image Sensor Die (1.7µm Sensor-Shift OIS)
function createCameraSensorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Ceramic carrier green substrate
  ctx.fillStyle = '#0a2218';
  ctx.fillRect(0, 0, 512, 512);

  // Gold bond wire contact pads on perimeter
  ctx.fillStyle = '#d4af37';
  for (let p = 20; p < 492; p += 18) {
    ctx.fillRect(p, 8, 9, 18);
    ctx.fillRect(p, 486, 9, 18);
    ctx.fillRect(8, p, 18, 9);
    ctx.fillRect(486, p, 18, 9);
  }

  // Active Silicon Die with Iridescent Bayer Pixel Array (Reflective Spectral Colors)
  const dieX = 55, dieY = 55, dieW = 402, dieH = 402;
  const dieGrad = ctx.createLinearGradient(dieX, dieY, dieX + dieW, dieY + dieH);
  dieGrad.addColorStop(0, '#103348');
  dieGrad.addColorStop(0.25, '#3b1d5c');
  dieGrad.addColorStop(0.5, '#0e4a3b');
  dieGrad.addColorStop(0.75, '#562b14');
  dieGrad.addColorStop(1, '#1b3d5c');
  ctx.fillStyle = dieGrad;
  ctx.fillRect(dieX, dieY, dieW, dieH);

  // Micro-pixel grid texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
  for (let gx = dieX; gx < dieX + dieW; gx += 5) {
    ctx.fillRect(gx, dieY, 1, dieH);
  }
  for (let gy = dieY; gy < dieY + dieH; gy += 5) {
    ctx.fillRect(dieX, gy, dieW, 1);
  }

  // Laser etched text on silicon die
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = '700 20px "Space Grotesk", sans-serif';
  ctx.fillText(' 12MP SENSOR-SHIFT OIS', 256, 235);
  ctx.font = '600 14px "Space Grotesk", monospace';
  ctx.fillStyle = '#ffd700';
  ctx.fillText('1.7µm PIXELS • 100% FOCUS PIXELS', 256, 268);
  ctx.font = '400 12px "Space Grotesk", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('SONY EXMOR-RS CUSTOM DIE #8291', 256, 298);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.6 Optical Sapphire Lens Coating Texture
function createCameraLensGlassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 512, 512);

  // Multi-coated optical glass anti-reflection rings
  const cx = 256, cy = 256;
  const ringGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 250);
  ringGrad.addColorStop(0, 'rgba(80, 240, 190, 0.35)');
  ringGrad.addColorStop(0.5, 'rgba(150, 70, 240, 0.25)');
  ringGrad.addColorStop(0.85, 'rgba(40, 180, 240, 0.4)');
  ringGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 250, 0, Math.PI * 2);
  ctx.fill();

  // Aperture iris edge markings
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 230, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.7 Vapor Chamber Sintered Copper & Thermal Interface Texture
function createVaporChamberTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Electrolytic pure copper plate
  ctx.fillStyle = '#c76e2e';
  ctx.fillRect(0, 0, 1024, 1024);

  // Sintered capillary wick mesh lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 1024; i += 16) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
  }

  // Laser etched fluid vaporization paths & heat arrows
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(350, 200); ctx.lineTo(350, 800);
  ctx.moveTo(450, 150); ctx.lineTo(450, 850);
  ctx.moveTo(550, 200); ctx.lineTo(550, 800);
  ctx.stroke();

  // Laser markings
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.font = '700 24px "Space Grotesk", monospace';
  ctx.fillText('VAPOR CHAMBER • SINTERED COPPER WICK', 80, 920);
  ctx.font = '500 18px "Space Grotesk", monospace';
  ctx.fillText('LIQUID COOLING DISSIPATION MATRIX REV 2', 80, 960);

  // Blue silicone thermal interface pads (Kryonaut pads over CPU and RAM)
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(250, 250, 240, 240);
  ctx.fillRect(550, 250, 180, 180);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.textAlign = 'center';
  ctx.font = '700 16px "Space Grotesk", sans-serif';
  ctx.fillText('THERMAL PAD', 370, 375);
  ctx.fillText('THERMAL PAD', 640, 345);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.8 MagSafe / Qi2 Wireless Induction Coil Texture
function createWirelessCoilTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 1024);

  const cx = 512, cy = 512;

  // Concentric copper wire spirals
  ctx.strokeStyle = '#d97736';
  ctx.lineWidth = 4;
  for (let r = 110; r < 250; r += 7) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Amber Kapton polyimide tape strips securing the coil
  ctx.fillStyle = 'rgba(217, 134, 40, 0.65)';
  ctx.fillRect(cx - 30, cy - 250, 60, 500);
  ctx.fillRect(cx - 250, cy - 30, 500, 60);

  // Neodymium Magnet Arc Segments Ring
  const numMagnets = 18;
  const magR = 310;
  for (let m = 0; m < numMagnets; m++) {
    const angle = (m / numMagnets) * Math.PI * 2;
    const nextAngle = angle + (Math.PI * 2 / numMagnets) * 0.72;
    ctx.strokeStyle = '#c5cdd6';
    ctx.lineWidth = 28;
    ctx.beginPath();
    ctx.arc(cx, cy, magR, angle, nextAngle);
    ctx.stroke();
  }

  // Orientation magnet bar at bottom
  ctx.fillStyle = '#c5cdd6';
  ctx.beginPath();
  ctx.roundRect(cx - 16, cy + 350, 32, 70, 12);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.9 Taptic Engine Brushed Aluminum Texture
function createTapticTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Brushed aluminum plate
  ctx.fillStyle = '#4a535e';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  for (let y = 0; y < 256; y += 4) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }

  // Laser etched coil icon and specs
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 24px "Space Grotesk", sans-serif';
  ctx.fillText('TAPTIC ENGINE', 256, 110);
  ctx.font = '500 14px "Space Grotesk", monospace';
  ctx.fillStyle = '#d4af37';
  ctx.fillText('170Hz LINEAR RESONANT ACTUATOR', 256, 145);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('HAPTIC PRECISION ENGINE • REV 3.4', 256, 175);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1.10 Back Panel Emblem & Frosted Camera Glass Texture
function createBackPanelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 2048);

  // Minimalist Luxury Emblem in the center
  const cx = 512, cy = 1100;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 60);
  ctx.lineTo(cx + 50, cy);
  ctx.lineTo(cx, cy + 60);
  ctx.lineTo(cx - 50, cy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#1c2229';
  ctx.beginPath();
  ctx.arc(cx, cy, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.font = '700 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.letterSpacing = '8px';
  ctx.fillText('NEXUS', cx, cy + 110);

  ctx.font = '400 13px "Space Grotesk", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.letterSpacing = '3px';
  ctx.fillText('DESIGNED IN CALIFORNIA • ASSEMBLED WITH TITANIUM', cx, 1960);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}


// --- 2. THREE.JS SCENE, LIGHTING & CAMERA SETUP ---

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera
const fov = 36;
let aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
camera.position.set(0, 0, 7.5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// HD Studio Environment
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// Balanced Studio Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

// Key Light (Main soft light from top-right)
const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
keyLight.position.set(6, 7, 6);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
keyLight.shadow.bias = -0.0001;
scene.add(keyLight);

// Fill Light (Gentle cool ambient from bottom-left)
const fillLight = new THREE.DirectionalLight(0xd4e2ff, 2.0);
fillLight.position.set(-6, -6, 4);
scene.add(fillLight);

// Rim Light (Edge definition for glass and metal chamfers)
const rimLight = new THREE.SpotLight(0xffffff, 3.6);
rimLight.position.set(0, 8, -6);
rimLight.angle = Math.PI / 3;
rimLight.penumbra = 0.6;
scene.add(rimLight);

// Top Grazing Light for Camera & Bezel Refraction
const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
topLight.position.set(0, 10, 2);
scene.add(topLight);


// --- 3. 3D SMARTPHONE MODEL & GLB LOADER ---

// Master Group holding the smartphone (centered at origin)
const phoneGroup = new THREE.Group();
scene.add(phoneGroup);

// Internal Parts Group (holds all internal engineering layers)
const internalPartsGroup = new THREE.Group();
phoneGroup.add(internalPartsGroup);

// Real 3D Phone Model from source/iphone_13_concept.glb placed at center of hero stage
let glbModelGroup = null;
let glbFrontMesh = null;
let glbBackMesh = null;
let glbLoaded = false;
const glbMeshes = {};
const glbMaterials = {};

// Precision explosion trajectories for all 31 individual components of iphone_13_concept.glb
const glbExplodeConfig = {
  // Front Glass & Screen Group (moves +Z forward towards camera)
  'Screen_Screen1_0': { x: 0, y: 0, z: 2.00 },
  'Body_Bezel1_0': { x: 0, y: 0, z: 2.35 },
  'FrontCamLens_Lens1_0': { x: 0, y: 0, z: 2.50 },
  'Body_SpeakerAndMic1_0': { x: 0, y: 0, z: 2.40 },

  // Unibody Aerospace Aluminum Frame & Perimeter Controls (stays at Z=-0.50)
  'IPHONE13_Frame1_0': { x: 0, y: 0, z: -0.50 },
  'IPHONE13_SpeakerAndMic1_0': { x: 0, y: 0, z: -0.50 },
  'IPHONE13_gray2_0': { x: 0, y: 0, z: -0.50 },
  'IPHONE13_AntennaStrip_0': { x: 0, y: 0, z: -0.50 },
  // Buttons sliding outward laterally with extreme clarity
  'PowerButton_Frame1_0': { x: 0.70, y: 0, z: -0.50 },
  'VolumeButton_Frame1_0': { x: -0.70, y: 0, z: -0.50 },
  'MuteButton_Frame1_0': { x: -0.70, y: 0, z: -0.50 },
  'SIMTray_Frame1_0': { x: -0.95, y: 0, z: -0.50 },
  'SIMTray_Chrome1_0': { x: -1.00, y: 0, z: -0.50 },
  'Port_L.Port_0': { x: 0, y: -0.70, z: -0.50 },
  'Port_Frame1_0': { x: 0, y: -0.73, z: -0.50 },

  // Rear Back Glass & Branding (moves -Z backward)
  'Body_Back1_0': { x: 0, y: 0, z: -1.25 },
  'Body_Logo1_0': { x: 0, y: 0, z: -1.38 },
  'Body_CameraGlass1_0': { x: 0, y: 0, z: -1.50 },

  // Camera Module Dismantling Layers (moves -Z backward with spread & lateral clarity)
  'CamModule_CameraModule1_0': { x: 0.05, y: 0.05, z: -1.65 },
  'CamModule_CameraM.Glass1_0': { x: 0.09, y: 0.09, z: -1.80 },
  'Camera_Camera(1)_0': { x: 0.12, y: 0.12, z: -2.00 },
  'Camera_Chrome1_0': { x: 0.16, y: 0.16, z: -2.18 },
  'Camera_CameraBlack1_0': { x: 0.20, y: 0.20, z: -2.35 },
  'Camera_CameraGray1_0': { x: 0.20, y: 0.20, z: -2.38 },
  'Camera_CameraGlass1_0': { x: 0.24, y: 0.24, z: -2.52 },
  'Lens1_Lens1_0': { x: 0.28, y: 0.18, z: -2.70 },
  'Lens2_Lens1_0': { x: 0.32, y: 0.32, z: -2.70 },
  'Flash_Chrome2_0': { x: 0.12, y: 0.15, z: -2.05 },
  'Flash_Flash1_0': { x: 0.12, y: 0.15, z: -2.08 },
  'Mic_Chrome2_0': { x: -0.05, y: -0.10, z: -2.05 },
  'Mic_SpeakerAndMic1_0': { x: -0.05, y: -0.10, z: -2.07 }
};

const gltfLoader = new GLTFLoader();
gltfLoader.load(
  'source/iphone_13_concept.glb',
  (gltf) => {
    const raw = gltf.scene;

    // Rotate 180° around Y so front OLED screen faces camera (+Z) and rear cameras face -Z
    raw.rotation.y = Math.PI;
    raw.updateMatrixWorld(true);

    // Flat group to hold all baked meshes in a single coordinate system
    const flatPhoneGroup = new THREE.Group();
    const tempMeshes = [];

    raw.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const flatMesh = child.clone();
        flatMesh.geometry = child.geometry.clone();
        flatMesh.geometry.applyMatrix4(child.matrixWorld);
        flatMesh.position.set(0, 0, 0);
        flatMesh.rotation.set(0, 0, 0);
        flatMesh.scale.set(1, 1, 1);
        flatMesh.updateMatrix();

        flatMesh.castShadow = true;
        flatMesh.receiveShadow = true;

        if (child.material) {
          const matName = child.material.name;
          // Ensure meshes sharing the same material (e.g. Frame1 across perimeter band, buttons, port) share a single material instance!
          if (!glbMaterials[matName]) {
            glbMaterials[matName] = child.material.clone();
          }
          flatMesh.material = glbMaterials[matName];
        }

        flatPhoneGroup.add(flatMesh);
        tempMeshes.push(flatMesh);
        glbMeshes[child.name] = flatMesh;
      }
    });

    // Measure bounding box of all baked meshes
    const box = new THREE.Box3().setFromObject(flatPhoneGroup);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Scale so phone height fits hero stage (~4.2 units)
    const desiredHeight = 4.2;
    const modelScale = desiredHeight / (size.y || 611.72);

    // Bake centering and scale directly into geometries for zero overhead and flawless alignment
    const mTranslate = new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z);
    const mScale = new THREE.Matrix4().makeScale(modelScale, modelScale, modelScale);
    const mCombined = new THREE.Matrix4().multiply(mScale).multiply(mTranslate);

    tempMeshes.forEach(mesh => {
      mesh.geometry.applyMatrix4(mCombined);
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeBoundingBox();
    });

    // Enhance materials with authentic iPhone 13 studio PBR qualities & connect interactive dynamic screen
    if (glbMeshes['Screen_Screen1_0']) {
      glbFrontMesh = glbMeshes['Screen_Screen1_0'];
      const sm = glbMeshes['Screen_Screen1_0'].material;
      sm.roughness = 0.10;
      sm.metalness = 0.05;
      sm.map = screenTexture;
      sm.emissiveMap = screenTexture;
      sm.emissive = new THREE.Color(0xffffff);
      sm.emissiveIntensity = 0.65;
      sm.needsUpdate = true;
    }

    if (glbMeshes['Body_Back1_0']) {
      glbBackMesh = glbMeshes['Body_Back1_0'];
      const bm = glbMeshes['Body_Back1_0'].material;
      bm.roughness = 0.25;
      bm.metalness = 0.12;
      bm.clearcoat = 0.7;
      bm.clearcoatRoughness = 0.15;
    }

    if (glbMeshes['Body_Logo1_0']) {
      const lm = glbMeshes['Body_Logo1_0'].material;
      lm.roughness = 0.05;
      lm.metalness = 0.98;
    }

    if (glbMeshes['Camera_Chrome1_0']) {
      const cm = glbMeshes['Camera_Chrome1_0'].material;
      cm.roughness = 0.04;
      cm.metalness = 1.0;
    }

    if (glbMeshes['Lens1_Lens1_0']) {
      glbMeshes['Lens1_Lens1_0'].material.roughness = 0.02;
      glbMeshes['Lens1_Lens1_0'].material.metalness = 0.1;
    }
    if (glbMeshes['Lens2_Lens1_0']) {
      glbMeshes['Lens2_Lens1_0'].material.roughness = 0.02;
      glbMeshes['Lens2_Lens1_0'].material.metalness = 0.1;
    }

    // Hardware Flashlight SpotLight (positioned at the True Tone flash unit)
    const phoneTorch = new THREE.SpotLight(0xfffae0, 0, 10, Math.PI / 4, 0.4);
    phoneTorch.position.set(0.65, 1.7, -0.35);
    phoneTorch.target.position.set(0.65, 1.7, -5.0);
    phoneGroup.add(phoneTorch);
    phoneGroup.add(phoneTorch.target);
    window.phoneTorchLight = phoneTorch;

    glbModelGroup = flatPhoneGroup;
    phoneGroup.add(glbModelGroup);
    glbLoaded = true;

    // Apply initial Midnight finish to all frame, back, and camera materials
    applyColorTheme(COLOR_PALETTES['midnight']);

    console.log('source/iphone_13_concept.glb successfully loaded, centered and baked at hero stage!');
  },
  undefined,
  (err) => {
    console.warn('Could not load source/iphone_13_concept.glb:', err);
  }
);

// Geometry helper: Smooth rounded rectangle shape
function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

// Master smartphone dimensions (Flagship proportions)
const P_WIDTH = 2.05;
const P_HEIGHT = 4.25;
const P_DEPTH = 0.22;
const P_RADIUS = 0.32;

// Shared material references
const materials = {
  titanium: new THREE.MeshStandardMaterial({
    color: 0x8e9ba4,
    metalness: 0.95,
    roughness: 0.28,
  }),
  titaniumDark: new THREE.MeshStandardMaterial({
    color: 0x5a636a,
    metalness: 0.9,
    roughness: 0.35,
  }),
  backGlass: new THREE.MeshPhysicalMaterial({
    color: 0x8e9ba4,
    metalness: 0.1,
    roughness: 0.38,
    transmission: 0.12,
    transparent: true,
    opacity: 0.96,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  }),
  polishedGlass: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.03,
    transmission: 0.96,
    transparent: true,
    opacity: 1,
    ior: 1.52,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  }),
  sapphireLensGlass: new THREE.MeshPhysicalMaterial({
    color: 0x051322,
    metalness: 0.1,
    roughness: 0.02,
    transmission: 0.92,
    transparent: true,
    opacity: 0.98,
    ior: 1.76,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
  }),
  periscopePrismGlass: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.02,
    transmission: 0.98,
    transparent: true,
    opacity: 1.0,
    ior: 1.65,
    clearcoat: 1.0,
  }),
  oledScreen: new THREE.MeshStandardMaterial({
    map: screenTexture,
    roughness: 0.18,
    metalness: 0.1,
    emissive: 0xffffff,
    emissiveMap: screenTexture,
    emissiveIntensity: 0.5,
  }),
  displayBack: new THREE.MeshStandardMaterial({
    map: createDisplayBackTexture(),
    roughness: 0.3,
    metalness: 0.8,
  }),
  copper: new THREE.MeshStandardMaterial({
    map: createVaporChamberTexture(),
    color: 0xd97736,
    metalness: 0.95,
    roughness: 0.3,
  }),
  circuit: new THREE.MeshStandardMaterial({
    map: createLogicBoardTexture(),
    metalness: 0.65,
    roughness: 0.35,
  }),
  battery: new THREE.MeshStandardMaterial({
    map: createBatteryTexture(),
    metalness: 0.5,
    roughness: 0.4,
  }),
  coil: new THREE.MeshStandardMaterial({
    map: createWirelessCoilTexture(),
    transparent: true,
    metalness: 0.9,
    roughness: 0.25,
  }),
  taptic: new THREE.MeshStandardMaterial({
    map: createTapticTexture(),
    metalness: 0.92,
    roughness: 0.25,
  }),
  cameraSensorSilicon: new THREE.MeshStandardMaterial({
    map: createCameraSensorTexture(),
    metalness: 0.95,
    roughness: 0.2,
  }),
  cameraBezel: new THREE.MeshStandardMaterial({
    color: 0x76828b,
    metalness: 0.95,
    roughness: 0.2,
  }),
  cameraGoldPin: new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.98,
    roughness: 0.15,
  }),
  flashLens: new THREE.MeshStandardMaterial({
    color: 0xffe9ad,
    emissive: 0xffdf80,
    emissiveIntensity: 0.6,
    roughness: 0.3,
  }),
  steelBracket: new THREE.MeshStandardMaterial({
    color: 0xd0d5dd,
    metalness: 0.98,
    roughness: 0.18,
  })
};

// Map to store all exploded parts & their trajectories
const explodedParts = [];

function registerPart(id, name, groupOrMesh, origZ, explodeZ, extraOffset = { x: 0, y: 0 }) {
  groupOrMesh.position.set(extraOffset.x * 0, extraOffset.y * 0, origZ);
  internalPartsGroup.add(groupOrMesh);
  explodedParts.push({
    id,
    name,
    mesh: groupOrMesh,
    origPos: new THREE.Vector3(0, 0, origZ),
    targetOffset: new THREE.Vector3(extraOffset.x, extraOffset.y, explodeZ),
  });
}


// -------------------------------------------------------------------------
// REAL SPARE PART 1: Front Ceramic Shield Cover Glass with Factory Pull-Tab
// -------------------------------------------------------------------------
const frontGlassGroup = new THREE.Group();
const frontGlassShape = createRoundedRectShape(P_WIDTH - 0.02, P_HEIGHT - 0.02, P_RADIUS - 0.01);
const frontGlassGeo = new THREE.ExtrudeGeometry(frontGlassShape, {
  depth: 0.018,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 1,
  bevelSize: 0.008,
  bevelThickness: 0.008
});
frontGlassGeo.center();
const frontGlassMesh = new THREE.Mesh(frontGlassGeo, materials.polishedGlass);
frontGlassGroup.add(frontGlassMesh);

// Micro ear-speaker acoustic slit
const speakerSlitGeo = new THREE.BoxGeometry(0.34, 0.018, 0.02);
const speakerSlitMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
const speakerSlit = new THREE.Mesh(speakerSlitGeo, speakerSlitMat);
speakerSlit.position.set(0, 1.95, 0.005);
frontGlassGroup.add(speakerSlit);

// Real orange "PULL TO REMOVE" transit protective tab on corner
const pullTabGeo = new THREE.PlaneGeometry(0.24, 0.42);
const pullTabCanvas = document.createElement('canvas');
pullTabCanvas.width = 128; pullTabCanvas.height = 256;
const ptCtx = pullTabCanvas.getContext('2d');
ptCtx.fillStyle = '#ff4d2e';
ptCtx.fillRect(0, 0, 128, 256);
ptCtx.fillStyle = '#ffffff';
ptCtx.font = '700 16px sans-serif';
ptCtx.save();
ptCtx.translate(64, 128);
ptCtx.rotate(-Math.PI / 2);
ptCtx.textAlign = 'center';
ptCtx.fillText('PULL ◀', 0, 6);
ptCtx.restore();
const pullTabMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pullTabCanvas), side: THREE.DoubleSide });
const pullTabMesh = new THREE.Mesh(pullTabGeo, pullTabMat);
pullTabMesh.position.set(P_WIDTH / 2 - 0.08, P_HEIGHT / 2 - 0.05, 0.025);
pullTabMesh.rotation.z = -Math.PI / 4;
frontGlassGroup.add(pullTabMesh);

registerPart('frontGlass', 'Ceramic Shield Cover Glass', frontGlassGroup, 0.11, 2.80);


// -------------------------------------------------------------------------
// REAL SPARE PART 2: Super Retina XDR OLED Display Panel with FPC Ribbon
// -------------------------------------------------------------------------
const displayGroup = new THREE.Group();
const displayShape = createRoundedRectShape(P_WIDTH - 0.06, P_HEIGHT - 0.06, P_RADIUS - 0.02);
const displayGeo = new THREE.ExtrudeGeometry(displayShape, { depth: 0.015, bevelEnabled: false });
displayGeo.center();

// Front glowing screen
const displayMesh = new THREE.Mesh(displayGeo, materials.oledScreen);
displayGroup.add(displayMesh);

// Rear copper heat shielding foil with Apple Part Number & ESD Warning
const displayBackPlane = new THREE.Mesh(new THREE.PlaneGeometry(P_WIDTH - 0.08, P_HEIGHT - 0.08), materials.displayBack);
displayBackPlane.rotation.y = Math.PI;
displayBackPlane.position.set(0, 0, -0.01);
displayGroup.add(displayBackPlane);

// Flexible Printed Circuit (FPC) Ribbon Cable extending from bottom
const fpcRibbonGeo = new THREE.BoxGeometry(0.55, 0.35, 0.008);
const fpcRibbonMat = new THREE.MeshStandardMaterial({ color: 0x181c20, metalness: 0.6, roughness: 0.4 });
const fpcRibbon = new THREE.Mesh(fpcRibbonGeo, fpcRibbonMat);
fpcRibbon.position.set(0, -2.05, -0.015);
displayGroup.add(fpcRibbon);

// Gold-plated 40-pin connector on end of flex
const fpcHeaderGeo = new THREE.BoxGeometry(0.48, 0.08, 0.02);
const fpcHeader = new THREE.Mesh(fpcHeaderGeo, materials.cameraGoldPin);
fpcHeader.position.set(0, -2.2, -0.015);
displayGroup.add(fpcHeader);

registerPart('display', 'Super Retina XDR OLED Display Panel', displayGroup, 0.09, 1.50);


// -------------------------------------------------------------------------
// REAL SPARE PART 3: Sintered Copper Heat Spreader & Vapor Matrix
// -------------------------------------------------------------------------
const vaporChamberGroup = new THREE.Group();
const vcShape = createRoundedRectShape(P_WIDTH - 0.18, P_HEIGHT - 0.22, P_RADIUS - 0.06);
const vcGeo = new THREE.ExtrudeGeometry(vcShape, { depth: 0.015, bevelEnabled: true, bevelSize: 0.005, bevelThickness: 0.005 });
vcGeo.center();
const vcMesh = new THREE.Mesh(vcGeo, materials.copper);
vaporChamberGroup.add(vcMesh);

registerPart('vaporChamber', 'Copper Thermal Heat Spreader', vaporChamberGroup, 0.065, 1.00);


// -------------------------------------------------------------------------
// REAL SPARE PART 4: Internal Aerospace Aluminum Midplate Subchassis
// -------------------------------------------------------------------------
const midframeGroup = new THREE.Group();
const midframeShape = createRoundedRectShape(P_WIDTH - 0.1, P_HEIGHT - 0.1, P_RADIUS - 0.03);
const midframeGeo = new THREE.ExtrudeGeometry(midframeShape, { depth: 0.025, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006 });
midframeGeo.center();
const midframeMesh = new THREE.Mesh(midframeGeo, materials.titaniumDark);
midframeGroup.add(midframeMesh);

// 12 Precision CNC Screw Mounting Standoffs (Gold & Brass)
for (let s = 0; s < 12; s++) {
  const screwGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.035, 12);
  const screw = new THREE.Mesh(screwGeo, materials.cameraGoldPin);
  screw.rotation.x = Math.PI / 2;
  const sx = ((s % 2 === 0 ? 1 : -1) * 0.78);
  const sy = -1.7 + (s * 0.31);
  screw.position.set(sx, sy, 0.015);
  midframeGroup.add(screw);
}

registerPart('midFrame', 'Aerospace Aluminum Subchassis', midframeGroup, 0.035, 0.70);


// -------------------------------------------------------------------------
// REAL SPARE PART 5:  A15 Bionic Logic Board with 3D SMT & Shield Cans
// -------------------------------------------------------------------------
const logicBoardGroup = new THREE.Group();
const pcbShape = new THREE.Shape();
pcbShape.moveTo(-0.85, 1.85);
pcbShape.lineTo(0.85, 1.85);
pcbShape.lineTo(0.85, 0.2);
pcbShape.lineTo(0.1, 0.2);
pcbShape.lineTo(0.1, -1.8);
pcbShape.lineTo(-0.85, -1.8);
pcbShape.closePath();
const pcbGeo = new THREE.ExtrudeGeometry(pcbShape, { depth: 0.02, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004 });
pcbGeo.center();
const pcbMesh = new THREE.Mesh(pcbGeo, materials.circuit);
logicBoardGroup.add(pcbMesh);

// 3D Shiny Nickel-Plated RF Shielding Cans
const rfShield1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.04), materials.steelBracket);
rfShield1.position.set(0.35, 1.25, 0.025);
logicBoardGroup.add(rfShield1);

const rfShield2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.04), materials.steelBracket);
rfShield2.position.set(-0.35, -0.65, 0.025);
logicBoardGroup.add(rfShield2);

// SMT Micro-Capacitor Banks (3D realistic ceramic soldered micro-chips)
const capMat = new THREE.MeshStandardMaterial({ color: 0x826e55, metalness: 0.6, roughness: 0.3 });
for (let c = 0; c < 24; c++) {
  const capMesh = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.02), capMat);
  capMesh.position.set(-0.55 + (c % 6) * 0.06, 0.15 + Math.floor(c / 6) * 0.05, 0.02);
  logicBoardGroup.add(capMesh);
}

registerPart('logicBoard', ' A15 Bionic Logic Board', logicBoardGroup, 0.01, 0.45, { x: -0.16, y: 0.12 });


// =========================================================================
// REAL CAMERA INTERNAL DISASSEMBLY (CMOS SENSORS & OIS VOICE COILS)
// =========================================================================

// --- CAMERA LAYER 1: Dual Sensor-Shift OIS Voice-Coil Actuators ---
const camOisActuatorsGroup = new THREE.Group();

// Voice Coil Motor suspension frame
const vcmFrame = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.82, 0.04), new THREE.MeshStandardMaterial({ color: 0x1f2429, metalness: 0.9, roughness: 0.25 }));
camOisActuatorsGroup.add(vcmFrame);

// Miniature Copper Voice-Coils and Drive Magnets aligned with Dual Diagonal Cameras
const coilMat = new THREE.MeshStandardMaterial({ color: 0xd97736, metalness: 0.95, roughness: 0.2 });
[-0.18, 0.18].forEach((cVal, idx) => {
  const oisCoil = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 12, 24), coilMat);
  oisCoil.position.set(cVal, cVal, 0.02);
  camOisActuatorsGroup.add(oisCoil);
});

camOisActuatorsGroup.position.set(0.55, 1.58, 0);
registerPart('camOisActuators', 'Sensor-Shift OIS Actuators', camOisActuatorsGroup, -0.16, -2.88, { x: 0.20, y: 0.20 });


// --- CAMERA LAYER 2: Dual 12MP CMOS Silicon Sensor Chips & Gold FPC Ribbon ---
const camSensorsGroup = new THREE.Group();

// Sensor Ceramic & PCB Substrate
const sensorSubstrate = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.82, 0.03), new THREE.MeshStandardMaterial({ color: 0x0f291e, metalness: 0.5, roughness: 0.4 }));
camSensorsGroup.add(sensorSubstrate);

// 1. Main 12MP Wide CMOS Silicon Die (Iridescent rainbow Bayer matrix!)
const mainSensorDie = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.26), materials.cameraSensorSilicon);
mainSensorDie.position.set(-0.18, -0.18, 0.018);
camSensorsGroup.add(mainSensorDie);

// 2. Ultra-Wide 12MP CMOS Silicon Die
const uwSensorDie = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.24), materials.cameraSensorSilicon);
uwSensorDie.position.set(0.18, 0.18, 0.018);
camSensorsGroup.add(uwSensorDie);

// Gold Ribbon Cable extending to motherboard
const camRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.008), new THREE.MeshStandardMaterial({ color: 0x1a1e22, metalness: 0.5, roughness: 0.4 }));
camRibbon.position.set(-0.15, -0.6, 0.01);
camSensorsGroup.add(camRibbon);

const camRibbonHeader = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.02), materials.cameraGoldPin);
camRibbonHeader.position.set(-0.15, -0.9, 0.015);
camSensorsGroup.add(camRibbonHeader);

camSensorsGroup.position.set(0.55, 1.58, 0);
registerPart('camSensors', 'Dual 12MP Sensor-Shift CMOS Dies', camSensorsGroup, -0.16, -3.05, { x: 0.24, y: 0.24 });


// --- CAMERA LAYER 3: True Tone Flash & Microphone Electronics ---
const camLidarFlashGroup = new THREE.Group();

// Dual-Temperature True Tone Flash Housing & LEDs
const flashHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24), materials.cameraBezel);
flashHousing.rotation.x = Math.PI / 2;
flashHousing.position.set(-0.18, 0.18, 0.03);
camLidarFlashGroup.add(flashHousing);

const flashDiffuser = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.01, 24), materials.flashLens);
flashDiffuser.rotation.x = Math.PI / 2;
flashDiffuser.position.set(-0.18, 0.18, 0.052);
camLidarFlashGroup.add(flashDiffuser);

// Rear Noise-Canceling MEMS Microphone Housing
const micHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16), new THREE.MeshStandardMaterial({ color: 0x11161b, metalness: 0.9, roughness: 0.25 }));
micHousing.rotation.x = Math.PI / 2;
micHousing.position.set(0.18, -0.18, 0.03);
camLidarFlashGroup.add(micHousing);

const micHole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.01, 12), new THREE.MeshBasicMaterial({ color: 0x000000 }));
micHole.rotation.x = Math.PI / 2;
micHole.position.set(0.18, -0.18, 0.05);
camLidarFlashGroup.add(micHole);

camLidarFlashGroup.position.set(0.55, 1.58, 0);
registerPart('camLidarFlash', 'True Tone Flash & Mic Unit', camLidarFlashGroup, -0.16, -2.05, { x: 0.10, y: 0.10 });


// -------------------------------------------------------------------------
// REAL SPARE PART 7: 3,227 mAh Apple Li-ion Battery with Stretch Pull-Tabs
// -------------------------------------------------------------------------
const batteryGroup = new THREE.Group();
const battShape = createRoundedRectShape(1.15, 2.35, 0.12);
const battGeo = new THREE.ExtrudeGeometry(battShape, { depth: 0.065, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01 });
battGeo.center();
const battMesh = new THREE.Mesh(battGeo, materials.battery);
batteryGroup.add(battMesh);

// Battery Protection Circuit Module (PCM) and Gold Terminal Tab
const battTabGeo = new THREE.BoxGeometry(0.32, 0.12, 0.02);
const battTab = new THREE.Mesh(battTabGeo, materials.cameraGoldPin);
battTab.position.set(-0.42, 1.22, 0.02);
batteryGroup.add(battTab);

batteryGroup.position.set(0.3, -0.45, 0.0);
registerPart('battery', '3,227 mAh Apple Li-ion Battery', batteryGroup, -0.02, 0.00, { x: 0.26, y: -0.1 });


// -------------------------------------------------------------------------
// REAL SPARE PART 8: Taptic Engine LRA, Acoustic Chamber & Lightning Port
// -------------------------------------------------------------------------
const bottomGroup = new THREE.Group();

// Acoustic Loudspeaker Enclosure Box
const speakerBoxGeo = new THREE.BoxGeometry(0.9, 0.45, 0.08);
const speakerBoxMat = new THREE.MeshStandardMaterial({ color: 0x1a1e22, metalness: 0.8, roughness: 0.3 });
const speakerBox = new THREE.Mesh(speakerBoxGeo, speakerBoxMat);
speakerBox.position.set(0.42, -1.82, 0);
bottomGroup.add(speakerBox);

// Taptic Engine Linear Resonant Actuator (Brushed Aluminum)
const tapticGeo = new THREE.BoxGeometry(0.72, 0.34, 0.06);
const tapticMesh = new THREE.Mesh(tapticGeo, materials.taptic);
tapticMesh.position.set(-0.45, -1.82, 0);
bottomGroup.add(tapticMesh);

// Precision Anodized Aluminum Lightning Port with 8 Gold Contact Pins
const lightningGeo = new THREE.BoxGeometry(0.34, 0.10, 0.09);
const lightningMat = new THREE.MeshStandardMaterial({ color: 0x8a929b, metalness: 0.95, roughness: 0.2 });
const lightning = new THREE.Mesh(lightningGeo, lightningMat);
lightning.position.set(0, -2.05, 0);
bottomGroup.add(lightning);

const lightningCavity = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.035, 0.06), new THREE.MeshBasicMaterial({ color: 0x05070a }));
lightningCavity.position.set(0, -2.05, 0.02);
bottomGroup.add(lightningCavity);

for (let p = 0; p < 8; p++) {
  const pinMesh = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.006, 0.04), materials.cameraGoldPin);
  pinMesh.position.set(-0.07 + p * 0.02, -2.045, 0.02);
  bottomGroup.add(pinMesh);
}

registerPart('bottomAssembly', 'Taptic Engine & Loudspeaker Enclosure', bottomGroup, -0.03, -0.15, { x: 0, y: -0.3 });


// -------------------------------------------------------------------------
// REAL SPARE PART 9: MagSafe Pure Copper Induction Coil Array
// -------------------------------------------------------------------------
const coilGroup = new THREE.Group();
const coilPlaneGeo = new THREE.PlaneGeometry(1.4, 1.4);
const coilMesh = new THREE.Mesh(coilPlaneGeo, materials.coil);
coilGroup.add(coilMesh);

coilGroup.position.set(0, -0.2, 0.0);
registerPart('wirelessCoil', 'MagSafe Pure Copper Induction Array', coilGroup, -0.065, -0.30);


// --- 4. SCROLL & MOUSE TRACKING ENGINE ---

let targetScrollProgress = 0;
let currentScrollProgress = 0;
let isManualOverride = false;
let manualExplodeVal = 0;
let isCameraFocusMode = false;

// Mouse parallax coordinates
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let isDragging3D = false;
let prevMousePos = { x: 0, y: 0 };
let manualEuler = new THREE.Euler(0, 0, 0, 'YXZ');
let orbitActive = false;

window.addEventListener('scroll', () => {
  if (isManualOverride) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetScrollProgress = Math.min(Math.max(window.scrollY / (maxScroll || 1), 0), 1);
});

window.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;

  if (isDragging3D && orbitActive) {
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;
    manualEuler.y += deltaX * 0.008;
    manualEuler.x += deltaY * 0.008;
    manualEuler.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, manualEuler.x));
    prevMousePos = { x: e.clientX, y: e.clientY };
  }
});

container.addEventListener('mousedown', (e) => {
  if (orbitActive) {
    isDragging3D = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
    container.classList.add('is-dragging');
  }
});

window.addEventListener('mouseup', () => {
  isDragging3D = false;
  container.classList.remove('is-dragging');
});

window.addEventListener('resize', () => {
  aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// --- 5. COMPONENT SPECS DATA & INTERACTION ---

const COMPONENT_SPECS = {
  glbFront: {
    category: 'EXTERIOR CRAFTSMANSHIP',
    title: 'Super Retina XDR Bezel & Ceramic Shield',
    body: 'Aerospace aluminum perimeter housing the 6.1-inch Super Retina XDR OLED panel with 20% smaller TrueDepth camera notch and ultra-slim uniform bezels.',
    metrics: [
      { label: 'Front Glass', val: 'Ceramic Shield' },
      { label: 'Notch Profile', val: '20% Smaller' }
    ]
  },
  glbBack: {
    category: 'AEROSPACE CHASSIS',
    title: 'Precision Aerospace Aluminum Body',
    body: 'Flat-edge unibody enclosure precision-machined from 100% recycled aerospace-grade aluminum, paired with durable color-infused rear back glass.',
    metrics: [
      { label: 'Frame Alloy', val: 'Aerospace-Grade Aluminum' },
      { label: 'Water Rating', val: 'IP68 (6m, 30 min)' }
    ]
  },
  frontGlass: {
    category: 'OPTICS & PROTECTION',
    title: 'Ceramic Shield Front Cover Glass',
    body: 'Infused with nano-ceramic crystals harder than most metals. Dual-ion exchange process delivers 4x better drop performance and scratch resistance, shown with factory orange transit pull-tab.',
    metrics: [
      { label: 'Drop Toughness', val: '4x Greater Resistance' },
      { label: 'Hardness Rating', val: 'Dual-Ion Exchange' }
    ]
  },
  display: {
    category: 'VISUAL SYSTEM',
    title: 'Super Retina XDR OLED Display Panel',
    body: 'Custom 6.1-inch OLED panel capable of up to 1,200 nits peak HDR brightness. Backed with an electrolytic copper grounding and thermal shield foil and gold-plated 40-pin FPC connector ribbon.',
    metrics: [
      { label: 'Resolution', val: '2532 × 1170 at 460 ppi' },
      { label: 'Peak Brightness', val: '1,200 Nits HDR' }
    ]
  },
  vaporChamber: {
    category: 'THERMAL SYSTEM',
    title: 'Copper Thermal Heat Spreader',
    body: 'Electrolytic copper heat dissipation plane engineered to draw high thermal loads away from the A15 Bionic CPU and SK Hynix LPDDR4X RAM using dual high-conductivity silicone thermal pads.',
    metrics: [
      { label: 'Conductivity', val: 'Pure Electrolytic Cu' },
      { label: 'Interface', val: 'Dual Silicone TIM Pads' }
    ]
  },
  midFrame: {
    category: 'STRUCTURAL CHASSIS',
    title: 'Aerospace Aluminum Subchassis',
    body: 'High-rigidity internal aluminum midplate unifying the display assembly and rear chassis with micrometer precision. Equipped with 12 gold CNC standoff screw bosses for ground isolation.',
    metrics: [
      { label: 'Alloy Class', val: '7000 Series Aluminum' },
      { label: 'Screw Standoffs', val: '12 Precision Bosses' }
    ]
  },
  logicBoard: {
    category: 'COMPUTING & LOGIC',
    title: ' A15 Bionic Logic Board',
    body: 'Apple A15 Bionic SoC (APL1W07) with 6-core CPU (2 performance and 4 efficiency cores), 4-core GPU, and 16-core Neural Engine. Fitted with SK Hynix 4GB LPDDR4X RAM, Kioxia 128GB NVMe flash, Qualcomm X60 5G modem, and gold B2B headers.',
    metrics: [
      { label: 'SoC Process', val: '5nm 6-Core CPU' },
      { label: 'Neural Engine', val: '15.8 Trillion Ops/Sec' }
    ]
  },
  camBezelRings: {
    category: 'OPTICAL HOUSING',
    title: 'Aluminum Bezel & Sapphire Lens Rings',
    body: 'Precision color-matched anodized aluminum camera rings protecting custom sapphire crystal cover lenses with multi-layer anti-reflective coatings.',
    metrics: [
      { label: 'Hardness', val: 'Sapphire Crystal Glass' },
      { label: 'Arrangement', val: 'Diagonal Dual-Camera' }
    ]
  },
  camLensStack: {
    category: 'PRECISION OPTICS',
    title: '7-Element Wide & 5-Element Ultra Wide',
    body: 'Dual diagonally arranged camera optics: 7-element f/1.6 Wide lens capturing 47% more light, paired with a 5-element f/2.4 Ultra Wide lens with 120° field of view.',
    metrics: [
      { label: 'Wide Lens', val: '7-Element f/1.6' },
      { label: 'Ultra Wide', val: '5-Element 120° FOV' }
    ]
  },
  camOisActuators: {
    category: 'ACTUATION & STABILIZATION',
    title: 'Sensor-Shift OIS Voice-Coil Actuators',
    body: 'DSLR-style sensor-shift optical image stabilization. Precision copper voice-coil electromagnets physically adjust the CMOS sensor up to 5,000 times per second for rock-steady shots.',
    metrics: [
      { label: 'Stabilization', val: 'Sensor-Shift OIS' },
      { label: 'Adjustments', val: '5,000 / sec' }
    ]
  },
  camSensors: {
    category: 'SILICON IMAGING DIES',
    title: 'Dual 12MP Sensor-Shift CMOS Dies',
    body: 'Massive 1.7µm pixel Wide sensor with 100% Focus Pixels and custom iridescent Bayer matrix silicon die, paired with 12MP Ultra Wide sensor connected via high-speed gold ribbon.',
    metrics: [
      { label: 'Pixel Size', val: '1.7 µm Sensor-Shift' },
      { label: 'Focus Pixels', val: '100% Coverage' }
    ]
  },
  camLidarFlash: {
    category: 'PHOTONICS & AUDIO',
    title: 'True Tone Flash & Mic Unit',
    body: 'Dual-temperature True Tone flash unit with amber and daylight white LEDs, coupled with rear noise-canceling MEMS studio microphone with acoustic mesh seal.',
    metrics: [
      { label: 'Flash Type', val: 'Dual True Tone LED' },
      { label: 'Microphone', val: 'MEMS Noise-Canceling' }
    ]
  },
  battery: {
    category: 'ENERGY SYSTEM',
    title: '3,227 mAh Apple Li-ion Battery',
    body: 'Official Apple rechargeable lithium-ion battery pack (Model A2655, 12.41 Wh rated at 3.85Vdc) featuring dual stretch-release pull tabs, laser-welded protection circuit board, and certified safety compliance markings.',
    metrics: [
      { label: 'Capacity', val: '3,227 mAh (12.41 Wh)' },
      { label: 'Model Number', val: 'Apple A2655' }
    ]
  },
  bottomAssembly: {
    category: 'AUDIO & HAPTICS',
    title: 'Taptic Engine & Loudspeaker Enclosure',
    body: 'Custom linear resonant actuator (LRA) tuned for iOS tactile feedback, combined with the bottom acoustic stereo loudspeaker box and 8-pin precision Lightning charging connector.',
    metrics: [
      { label: 'Haptic Frequency', val: '170Hz Resonant LRA' },
      { label: 'Connector', val: '8-Pin Lightning Port' }
    ]
  },
  wirelessCoil: {
    category: 'WIRELESS POWER',
    title: 'MagSafe Pure Copper Induction Array',
    body: 'Pure copper Litz wire induction coil with Kapton polyimide insulation, surrounded by 18 custom neodymium alignment magnets supporting 15W MagSafe fast wireless charging.',
    metrics: [
      { label: 'MagSafe Power', val: '15W Fast Charge' },
      { label: 'Magnet Array', val: '18 NdFeB Segments' }
    ]
  },
  titaniumFrame: {
    category: 'AEROSPACE CHASSIS',
    title: 'Aerospace-Grade Aluminum Band',
    body: 'Flat-edge perimeter crafted from 100% recycled aerospace-grade aluminum with matte satin anodization, precision antenna injection lines, and tactile volume & power buttons.',
    metrics: [
      { label: 'Band Alloy', val: 'Aerospace Aluminum' },
      { label: 'Finish', val: 'Anodized Satin Matte' }
    ]
  },
  backGlass: {
    category: 'EXTERIOR CRAFTSMANSHIP',
    title: 'Color-Infused Rear Back Glass',
    body: 'Dual-ion exchanged rear glass custom color-matched to the official iPhone 13 finishes: Midnight, Starlight, Blue, Pink, Green, and (PRODUCT)RED.',
    metrics: [
      { label: 'Available Colors', val: '6 Official Finishes' },
      { label: 'Toughness', val: 'Dual-Ion Exchanged' }
    ]
  }
};

// UI Drawer Elements
const specDrawer = document.getElementById('spec-drawer');
const specCat = document.getElementById('spec-category');
const specTitle = document.getElementById('spec-title');
const specBody = document.getElementById('spec-body');
const specMetrics = document.getElementById('spec-metrics');
const closeSpecBtn = document.getElementById('close-spec-btn');

function showSpecDetail(id) {
  const data = COMPONENT_SPECS[id];
  if (!data) return;

  specCat.textContent = data.category;
  specTitle.textContent = data.title;
  specBody.textContent = data.body;
  specMetrics.innerHTML = data.metrics.map(m => `
    <div class="metric-item">
      <span class="metric-label">${m.label}</span>
      <span class="metric-val">${m.val}</span>
    </div>
  `).join('');

  specDrawer.classList.add('open');

  document.querySelectorAll('.hud-callout').forEach(el => {
    el.classList.toggle('active', el.dataset.partId === id);
  });
}

if (closeSpecBtn) {
  closeSpecBtn.addEventListener('click', () => {
    specDrawer.classList.remove('open');
    document.querySelectorAll('.hud-callout').forEach(el => el.classList.remove('active'));
  });
}

// Raycasting for clicking on 3D parts & interactive screen
const raycaster = new THREE.Raycaster();
const mouseVec = new THREE.Vector2();

container.addEventListener('click', (e) => {
  if (isDragging3D) return;
  mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouseVec, camera);
  const intersects = raycaster.intersectObjects(phoneGroup.children, true);

  if (intersects.length > 0) {
    let hitObj = intersects[0].object;
    const name = hitObj.name || '';

    // If phone is assembled on hero page (currentScrollProgress < 0.25), touching the screen interacts with iPhone iOS!
    if ((name.includes('Screen') || hitObj === glbMeshes['Screen_Screen1_0']) && currentScrollProgress < 0.25) {
      if (intersects[0].uv) {
        const uv = intersects[0].uv;
        // Normalize UV coordinates mapped to 1024x2048 canvas
        const uNorm = Math.min(Math.max((uv.x - 0.05) / 0.90, 0), 1);
        const vNorm = Math.min(Math.max((uv.y - 0.046) / 0.88, 0), 1);
        const px = uNorm * 1024;
        const py = (1.0 - vNorm) * 2048;
        handleScreenTouch(px, py);
        return;
      }
    }

    if (name.includes('Screen') || name.includes('Bezel')) {
      showSpecDetail('display');
      return;
    }
    if (name.includes('Lens') || name.includes('Camera') || name.includes('CamModule') || name.includes('Flash') || name.includes('Mic')) {
      showSpecDetail('camLensStack');
      return;
    }
    if (name.includes('Frame') || name.includes('Button') || name.includes('SIM') || name.includes('Port') || name.includes('gray2') || name.includes('Antenna')) {
      showSpecDetail('titaniumFrame');
      return;
    }
    if (name.includes('Back') || name.includes('Logo')) {
      showSpecDetail('backGlass');
      return;
    }
    while (hitObj && hitObj !== phoneGroup && hitObj !== internalPartsGroup) {
      const match = explodedParts.find(p => p.mesh === hitObj);
      if (match) {
        showSpecDetail(match.id);
        break;
      }
      hitObj = hitObj.parent;
    }
  }
});


// --- 6. HUD OVERLAY SYSTEM ---

const hudOverlay = document.getElementById('hud-overlay');
const hudElements = new Map();

// Floating HUD markers for key exploded layers (including dismantled cameras!)
const keyHUDParts = [
  { id: 'screen', label: 'SUPER RETINA XDR', sub: 'OLED Display & TrueDepth' },
  { id: 'camLensStack', label: 'DUAL OPTICS', sub: '7P Wide & 5P Ultra Wide' },
  { id: 'camOisActuators', label: 'SENSOR-SHIFT OIS', sub: '5,000 adj/sec Dual Actuator' },
  { id: 'camSensors', label: 'DUAL 12MP SENSORS', sub: '1.7µm Sensor-Shift CMOS Dies' },
  { id: 'camLidarFlash', label: 'TRUE TONE FLASH', sub: 'Dual LEDs & MEMS Mic' },
  { id: 'display', label: 'DISPLAY HARDWARE', sub: 'Copper Heat Foil & 40-Pin Flex' },
  { id: 'logicBoard', label: ' A15 BIONIC', sub: '5nm 6-Core CPU & NPU' },
  { id: 'vaporChamber', label: 'COPPER SPREADER', sub: 'Thermal Dissipation Matrix' },
  { id: 'battery', label: '3,227 mAh BATTERY', sub: 'Model A2655 & Pull Tabs' },
  { id: 'wirelessCoil', label: 'MAGSAFE COIL', sub: 'Pure Copper & 18 Magnets' },
  { id: 'titaniumFrame', label: 'ALUMINUM BAND', sub: 'Aerospace Flat-Edge Frame' },
  { id: 'backGlass', label: 'REAR BACK GLASS', sub: 'Official iPhone 13 Colors' }
];

if (hudOverlay) {
  keyHUDParts.forEach(item => {
    const el = document.createElement('div');
    el.className = 'hud-callout';
    el.dataset.partId = item.id;
    el.innerHTML = `
      <div class="hud-pill">
        <span class="hud-dot"></span>
        <span class="hud-title">${item.label}</span>
        <span class="hud-sub">${item.sub}</span>
      </div>
    `;
    el.addEventListener('click', () => showSpecDetail(item.id));
    hudOverlay.appendChild(el);
    hudElements.set(item.id, el);
  });
}

function updateHUDPositions() {
  if (!hudOverlay) return;
  const tempV = new THREE.Vector3();

  hudElements.forEach((el, id) => {
    let targetMesh = null;
    if (id === 'screen') targetMesh = glbMeshes['Screen_Screen1_0'];
    else if (id === 'titaniumFrame') targetMesh = glbMeshes['IPHONE13_Frame1_0'];
    else if (id === 'backGlass') targetMesh = glbMeshes['Body_Back1_0'];
    else if (id === 'camLensStack') targetMesh = glbMeshes['Lens1_Lens1_0'] || glbMeshes['Camera_Chrome1_0'];
    else {
      const part = explodedParts.find(p => p.id === id);
      if (part) targetMesh = part.mesh;
    }
    if (!targetMesh) return;

    targetMesh.getWorldPosition(tempV);
    tempV.project(camera);

    if (tempV.z > 1.0) {
      el.style.display = 'none';
      return;
    }

    el.style.display = 'block';
    const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;

    const offsetX = (tempV.x > 0 ? 110 : -110);
    el.style.left = `${x + offsetX}px`;
    el.style.top = `${y}px`;
  });
}


// --- 7. COLOR SWITCHING & INTERACTIVE CONTROLS ---

const COLOR_PALETTES = {
  midnight: {
    name: 'Midnight',
    frame: 0x20252e,
    back: 0x1a1f27,
    cameraBezel: 0x28303c,
    antenna: 0x151922
  },
  starlight: {
    name: 'Starlight',
    frame: 0xe8e4dc,
    back: 0xfaf7f2,
    cameraBezel: 0xded8ce,
    antenna: 0xd4cfc5
  },
  blue: {
    name: 'Blue',
    frame: 0x255979,
    back: 0x2c678a,
    cameraBezel: 0x1e4a66,
    antenna: 0x1a4560
  },
  pink: {
    name: 'Pink',
    frame: 0xeed2ce,
    back: 0xfae3df,
    cameraBezel: 0xe0beba,
    antenna: 0xd8b5af
  },
  green: {
    name: 'Green',
    frame: 0x344537,
    back: 0x3e5241,
    cameraBezel: 0x2a392d,
    antenna: 0x263328
  },
  red: {
    name: '(PRODUCT)RED',
    frame: 0xb3131e,
    back: 0xcb1f2d,
    cameraBezel: 0x9a111a,
    antenna: 0x8a0f18
  }
};

function applyColorTheme(theme) {
  if (!theme) return;

  // 1. Surrounding perimeter frame band, buttons, SIM tray & lightning port (all share Frame1)
  if (glbMaterials['Frame1']) {
    glbMaterials['Frame1'].color.setHex(theme.frame);
    glbMaterials['Frame1'].roughness = 0.28;
    glbMaterials['Frame1'].metalness = 0.85;
    glbMaterials['Frame1'].needsUpdate = true;
  }

  // 2. Rear back glass panel (Back1)
  if (glbMaterials['Back1']) {
    glbMaterials['Back1'].color.setHex(theme.back);
    glbMaterials['Back1'].roughness = 0.24;
    glbMaterials['Back1'].metalness = 0.12;
    glbMaterials['Back1'].clearcoat = 0.7;
    glbMaterials['Back1'].needsUpdate = true;
  }

  // 3. Camera module bump plateau (CameraModule1)
  if (glbMaterials['CameraModule1']) {
    glbMaterials['CameraModule1'].color.setHex(theme.back);
    glbMaterials['CameraModule1'].roughness = 0.32;
    glbMaterials['CameraModule1'].metalness = 0.2;
    glbMaterials['CameraModule1'].needsUpdate = true;
  }

  // 4. Dual diagonal camera lens bezels (Camera1)
  if (glbMaterials['Camera1']) {
    glbMaterials['Camera1'].color.setHex(theme.cameraBezel);
    glbMaterials['Camera1'].roughness = 0.12;
    glbMaterials['Camera1'].metalness = 0.95;
    glbMaterials['Camera1'].needsUpdate = true;
  }

  // 5. Antenna injection bands (AntennaStrip)
  if (glbMaterials['AntennaStrip']) {
    glbMaterials['AntennaStrip'].color.setHex(theme.antenna || theme.frame);
    glbMaterials['AntennaStrip'].roughness = 0.6;
    glbMaterials['AntennaStrip'].metalness = 0.4;
    glbMaterials['AntennaStrip'].needsUpdate = true;
  }

  // 6. Procedural internal materials for exploded view
  if (materials.titanium) materials.titanium.color.setHex(theme.frame);
  if (materials.backGlass) materials.backGlass.color.setHex(theme.back);
  if (materials.cameraBezel) materials.cameraBezel.color.setHex(theme.cameraBezel);
}

document.querySelectorAll('.swatch-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const theme = COLOR_PALETTES[btn.dataset.color];
    if (theme) {
      applyColorTheme(theme);
    }
  });
});

// Explode Slider Control
const explodeSlider = document.getElementById('explode-slider');
if (explodeSlider) {
  explodeSlider.addEventListener('input', (e) => {
    isManualOverride = true;
    isCameraFocusMode = false;
    manualExplodeVal = parseFloat(e.target.value) / 100;
  });
}

// 3D Orbit Drag Mode Toggle
const orbitBtn = document.getElementById('orbit-btn');
if (orbitBtn) {
  orbitBtn.addEventListener('click', () => {
    orbitActive = !orbitActive;
    orbitBtn.classList.toggle('active', orbitActive);
    if (!orbitActive) {
      manualEuler.set(0, 0, 0);
    }
  });
}

// View presets: Assemble, Explode, and Dedicated Camera Focus!
const btnAssemble = document.getElementById('btn-assemble');
const btnExplode = document.getElementById('btn-explode');
const btnCamera = document.getElementById('btn-camera');

if (btnAssemble) {
  btnAssemble.addEventListener('click', () => {
    isManualOverride = false;
    isCameraFocusMode = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (explodeSlider) explodeSlider.value = 0;
  });
}

if (btnExplode) {
  btnExplode.addEventListener('click', () => {
    isManualOverride = false;
    isCameraFocusMode = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    if (explodeSlider) explodeSlider.value = 100;
  });
}

// CAMERAS Mode Button: Explodes to 100% and focuses camera directly on the dismantled camera optics!
if (btnCamera) {
  btnCamera.addEventListener('click', () => {
    isManualOverride = true;
    isCameraFocusMode = true;
    manualExplodeVal = 1.0;
    if (explodeSlider) explodeSlider.value = 100;
    showSpecDetail('camLensStack');
  });
}


// --- 8. MASTER RENDER & ANIMATION LOOP ---

const backgroundText = document.getElementById('background-text');
const subText = document.getElementById('sub-text');
const foregroundLayer = document.getElementById('foreground-layer');
const siteHeader = document.getElementById('site-header');
const scrollIndicator = document.getElementById('scroll-indicator');
const phaseSteps = document.querySelectorAll('.phase-step');

let targetCamPos = new THREE.Vector3(0, 0, 7.5);
let targetCamLook = new THREE.Vector3(0, 0, 0);

const render = () => {
  // Silky smooth interpolation of scroll progress
  if (!isManualOverride) {
    currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.055;
  } else {
    const targetProg = 0.60 + (manualExplodeVal * 0.40);
    currentScrollProgress += (targetProg - currentScrollProgress) * 0.08;
  }

  // Camera framing interpolation (handles close-up inspection of cameras)
  if (isCameraFocusMode) {
    targetCamPos.set(0.35, 1.35, 3.8);
    targetCamLook.set(0.12, 1.25, 0.15);
  } else {
    targetCamPos.set(0, 0, 7.5);
    targetCamLook.set(0, 0, 0);
  }
  camera.position.lerp(targetCamPos, 0.06);
  const currentLook = new THREE.Vector3();
  camera.getWorldDirection(currentLook);
  camera.lookAt(targetCamLook);

  // Mouse parallax interpolation
  mouseX += (targetMouseX - mouseX) * 0.08;
  mouseY += (targetMouseY - mouseY) * 0.08;

  // 1. Sliding UI Elements (Header, Wave, Subtitle, Indicator, Phone Apps Bar)
  const uiSlideProgress = Math.min(currentScrollProgress / 0.22, 1.0);

  if (siteHeader) {
    siteHeader.style.transform = `translateY(-${uiSlideProgress * 110}%)`;
    siteHeader.style.opacity = `${1.0 - uiSlideProgress}`;
  }
  if (subText) {
    subText.style.transform = `translateY(-50%) translateX(${uiSlideProgress * 15}vw)`;
    subText.style.opacity = `${1.0 - uiSlideProgress}`;
  }
  if (foregroundLayer) {
    foregroundLayer.style.transform = `translateY(${uiSlideProgress * 30}vh)`;
    foregroundLayer.style.opacity = `${1.0 - uiSlideProgress}`;
  }
  if (scrollIndicator) {
    scrollIndicator.style.opacity = `${Math.max(0, 1.0 - currentScrollProgress * 5)}`;
    scrollIndicator.style.transform = `translateX(-50%) translateY(${uiSlideProgress * 20}px)`;
  }

  // Slide phone apps bar and interactive hint on hero stage
  const phoneAppsBar = document.getElementById('phone-apps-bar');
  const phoneHint = document.getElementById('phone-interactive-hint');
  if (phoneAppsBar) {
    phoneAppsBar.style.transform = `translateX(-50%) translateY(${uiSlideProgress * 140}%)`;
    phoneAppsBar.style.opacity = `${Math.max(0, 1.0 - uiSlideProgress * 1.5)}`;
    phoneAppsBar.style.pointerEvents = uiSlideProgress > 0.3 ? 'none' : 'auto';
  }
  if (phoneHint) {
    phoneHint.style.transform = `translateX(-50%) translateY(-${uiSlideProgress * 40}px)`;
    phoneHint.style.opacity = `${Math.max(0, 1.0 - uiSlideProgress * 1.8)}`;
  }

  // Dynamic real-time screen updates when music is playing or camera viewfinder is active
  if (phoneState.musicPlaying) {
    phoneState.songProgress = (phoneState.songProgress + 0.0006) % 1.0;
    for (let b = 0; b < phoneState.equalizerBands.length; b++) {
      phoneState.equalizerBands[b] = 0.2 + Math.abs(Math.sin(Date.now() * 0.009 + b * 1.4)) * 0.75;
    }
    renderScreen();
  } else if (phoneState.currentApp === 'camera') {
    phoneState.cameraFocusAngle += 0.035;
    renderScreen();
  }

  // 2. Cinematic Rotation Phases
  let baseRotY = 0;
  let baseRotX = 0;
  let baseRotZ = 0;
  let explodeProgress = 0;
  let activePhaseIndex = 0;

  // When actively using an app (Music, Camera, etc.) on hero page, hold phone front-facing for easy interaction
  const isAppOpen = (phoneState.currentApp !== 'home');

  if (currentScrollProgress <= 0.18) {
    // Phase 1 (0.0 to 0.18): Turn face to profile angle (+55° Y) unless an app is active
    activePhaseIndex = 0;
    if (!isAppOpen) {
      const p = currentScrollProgress / 0.18;
      baseRotY = p * (55 * (Math.PI / 180));
      baseRotX = p * (4 * (Math.PI / 180));
    } else {
      baseRotY = 0;
      baseRotX = 0;
    }
  } else if (currentScrollProgress <= 0.28) {
    // Phase 2 (0.18 to 0.28): Hold profile view
    activePhaseIndex = 1;
    baseRotY = 55 * (Math.PI / 180);
    baseRotX = 4 * (Math.PI / 180);
  } else if (currentScrollProgress <= 0.50) {
    // Phase 3 (0.28 to 0.50): Spin into 3D Disassembly Isometric Angle
    activePhaseIndex = 2;
    const p = (currentScrollProgress - 0.28) / 0.22;
    baseRotY = (55 - (p * 115)) * (Math.PI / 180);
    baseRotX = (4 - (p * 22)) * (Math.PI / 180);
    baseRotZ = (0 - (p * 6)) * (Math.PI / 180);
  } else if (currentScrollProgress <= 0.60) {
    // Phase 4 (0.50 to 0.60): Hold isometric stance
    activePhaseIndex = 2;
    baseRotY = -60 * (Math.PI / 180);
    baseRotX = -18 * (Math.PI / 180);
    baseRotZ = -6 * (Math.PI / 180);
  } else {
    // Phase 5 (0.60 to 1.00): EXPLODED VIEW ACTIVATION
    activePhaseIndex = 3;
    baseRotY = -60 * (Math.PI / 180);
    baseRotX = -18 * (Math.PI / 180);
    baseRotZ = -6 * (Math.PI / 180);
    explodeProgress = (currentScrollProgress - 0.60) / 0.40;
  }

  // Update Left Phase Tracker
  phaseSteps.forEach((step, idx) => {
    step.classList.toggle('active', idx === activePhaseIndex);
  });

  // Apply rotations with smooth mouse parallax
  if (!orbitActive && !isCameraFocusMode) {
    phoneGroup.rotation.y = baseRotY + (mouseX * 0.18);
    phoneGroup.rotation.x = baseRotX + (-mouseY * 0.14);
    phoneGroup.rotation.z = baseRotZ;
  } else if (isCameraFocusMode) {
    // When focusing on cameras, angle the phone to showcase the dismantled dual camera stack in glorious isometric 3D
    phoneGroup.rotation.y = (145 * Math.PI) / 180 + (mouseX * 0.08);
    phoneGroup.rotation.x = (-14 * Math.PI) / 180 + (-mouseY * 0.08);
    phoneGroup.rotation.z = (-4 * Math.PI) / 180;
  } else {
    phoneGroup.rotation.copy(manualEuler);
  }

  // Background Text Dynamics
  if (backgroundText) {
    if (explodeProgress > 0.1) {
      backgroundText.textContent = isCameraFocusMode ? 'OPTICS' : 'EXPLODED';
      backgroundText.style.opacity = `${0.35 + explodeProgress * 0.35}`;
    } else {
      backgroundText.textContent = 'IPHONE 13';
      backgroundText.style.opacity = `${0.55 - uiSlideProgress * 0.25}`;
    }
  }

  // Explode each phone component smoothly along its designated offset
  explodedParts.forEach(part => {
    const curve = Math.pow(explodeProgress, 0.95);
    part.mesh.position.z = part.origPos.z + (part.targetOffset.z * curve);
    part.mesh.position.x = part.origPos.x + (part.targetOffset.x * curve);
    part.mesh.position.y = part.origPos.y + (part.targetOffset.y * curve);
  });

  // Explode all 31 individual components of source/iphone_13_concept.glb along their precision trajectories
  if (glbLoaded) {
    const curve = Math.pow(explodeProgress, 0.95);
    for (const [name, target] of Object.entries(glbExplodeConfig)) {
      const mesh = glbMeshes[name];
      if (mesh) {
        mesh.position.z = (target.z || 0) * curve;
        mesh.position.x = (target.x || 0) * curve;
        mesh.position.y = (target.y || 0) * curve;
      }
    }
    internalPartsGroup.visible = (explodeProgress > 0.005);
  }

  // Update HUD callouts visibility and positions
  if (hudOverlay) {
    if (explodeProgress > 0.25 && !orbitActive) {
      hudOverlay.classList.add('visible');
      updateHUDPositions();
    } else {
      hudOverlay.classList.remove('visible');
    }
  }

  // Update slider position if not manually dragging
  if (!isManualOverride && explodeSlider) {
    explodeSlider.value = Math.round(explodeProgress * 100);
  }

  renderer.render(scene, camera);
};

// Start continuous animation loop
renderer.setAnimationLoop(render);
