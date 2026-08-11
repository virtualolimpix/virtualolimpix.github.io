/* ==========================================================================
   VIRTUAL OLIMPIX - Core Application (Version 1.0.1.0v1)
   Security Engine, Ambient Particles, 100% Original 8-Bit Chiptune Song Tracker,
   Live Auto-Harvesting Gaming RSS News Engine & Stealth Admin Security Suite
   ========================================================================== */

const APP_VERSION = "2.0.0";
const OFFICIAL_SITE_URL = "https://virtualolimpix.github.io/";

// YouTube Video Feed Database (100% Embeddable Open Gaming & E-Sports Streams)
const GAMING_VIDEO_DATABASE = [
  {
    id: "jfKfPfyJRdk",
    title: "E-Sports & Gaming Beats: Musica ed Atmosfera Competitiva Live",
    channel: "Lofi Gaming Live",
    duration: "LIVE",
    category: "esports",
    categoryLabel: "E-Sports",
    views: "245K spettatori"
  },
  {
    id: "4xDzrJKXOOY",
    title: "Cyberpunk Gaming 4K: Animazioni Open Source ed Effetti Neon",
    channel: "Blender Open Gaming",
    duration: "14:50",
    category: "highlight",
    categoryLabel: "Cyber Gaming",
    views: "520K visualizzazioni"
  },
  {
    id: "tpe7340S77o",
    title: "Synthwave Cyber Arcade: Musica per Tornei e Competizioni Olimpix",
    channel: "Synthwave Arcade",
    duration: "45:00",
    category: "retro",
    categoryLabel: "Retro Arcade",
    views: "310K visualizzazioni"
  },
  {
    id: "5qap5aO4i9A",
    title: "Chill Gaming Radio: Stream Continuo per Sessioni di Gioco",
    channel: "Lofi Girl Gaming",
    duration: "LIVE",
    category: "esports",
    categoryLabel: "E-Sports Stream",
    views: "180K spettatori"
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "Retro Arcade Game Music Concert: Orchestra dei Videogiochi Anni '80 e '90",
    channel: "Video Game Orchestra",
    duration: "24:15",
    category: "retro",
    categoryLabel: "Retro Gaming",
    views: "420K visualizzazioni"
  }
];

// Feeds RSS ITALIANI ed INTERNAZIONALI di testate gaming autorevoli
const ITALIAN_GAMING_FEEDS = [
  { name: 'Multiplayer.it', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmultiplayer.it%2Ffeed%2Fnews%2F', defaultCat: 'gaming', catLabel: 'Gaming IT' },
  { name: 'Everyeye.it', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.everyeye.it%2Ffeed%2Ffeed_news.xml', defaultCat: 'esports', catLabel: 'News Italia' },
  { name: 'Eurogamer.it', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.eurogamer.it%2Ffeed', defaultCat: 'retro', catLabel: 'Eurogamer IT' },
  { name: 'Tom\'s Hardware IT', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.tomshw.it%2Fvideogiochi%2Ffeed', defaultCat: 'tech', catLabel: 'Tech & Gaming' }
];

const INTL_GAMING_FEEDS = [
  { name: 'IGN Gaming', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2Fign%2Fall', defaultCat: 'gaming', catLabel: 'IGN World' },
  { name: 'GameSpot News', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.gamespot.com%2Ffeeds%2Fnews%2F', defaultCat: 'esports', catLabel: 'GameSpot' },
  { name: 'Esports Insider', url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fesportsinsider.com%2Ffeed', defaultCat: 'esports', catLabel: 'E-Sports INTL' }
];

const FALLBACK_ONLINE_NEWS_ITA = [
  {
    id: 'ita1',
    title: "Virtual Olimpix 2026: Aperte le iscrizioni ufficiali al Medagliere Olimpico Italiano",
    snippet: "Migliaia di videogiocatori italiani si sfidano nelle discipline di FPS Blitz, Speedrun ed Arcade per conquistare le medaglie d'Oro.",
    category: "esports",
    categoryLabel: "Virtual Olimpix IT",
    source: "Virtual Olimpix Italia",
    url: OFFICIAL_SITE_URL,
    date: "Oggi"
  },
  {
    id: 'ita2',
    title: "Multiplayer & Esports Italia: Cresce l'interesse per i tornei di videogiochi nazionali",
    snippet: "L'Italia registra numeri da record nelle iscrizioni ai tornei competitivi e nelle dirette e-sports.",
    category: "gaming",
    categoryLabel: "Gaming IT",
    source: "Multiplayer Italia",
    url: "https://multiplayer.it/",
    date: "Notizia Recente"
  },
  {
    id: 'ita3',
    title: "Retro-Gaming e Collezionismo: La passione per i cabinet da bar ed i vecchi computer",
    snippet: "Dalle vecchie sale giochi ai moderni emulatori: la storia del gaming anni '80 e '90 in Italia.",
    category: "retro",
    categoryLabel: "Retro Gaming IT",
    source: "Everyeye Retro",
    url: "https://www.everyeye.it/",
    date: "Notizia Recente"
  }
];

const FALLBACK_ONLINE_NEWS_INTL = [
  {
    id: 'f1',
    title: "E-Sports World Championship 2026: Official tournament line-up and qualifiers announced",
    snippet: "International e-sports committee reveals official games and prize pools for 2026.",
    category: "esports",
    categoryLabel: "E-Sports INTL",
    source: "IGN World Gaming",
    url: "https://www.ign.com/esports",
    date: "Notizia Recente"
  },
  {
    id: 'f2',
    title: "Next-Gen Gaming Hardware: 240FPS Ultra-low latency displays released",
    snippet: "Hardware giants reveal dedicated pro-player displays with sub-millisecond response times.",
    category: "tech",
    categoryLabel: "Tech INTL",
    source: "GameSpot Tech",
    url: "https://www.gamespot.com/news/",
    date: "Notizia Recente"
  }
];

const DEFAULT_CATEGORIES = [
  { id: 'fps', name: 'FPS Blitz', icon: '🎯', desc: 'Scontri a fuoco ad alta velocità' },
  { id: 'fighting', name: 'Fighting Titans', icon: '⚔️', desc: 'Torneo Picchiaduro 1v1' },
  { id: 'speedrun', name: 'Speedrun GP', icon: '⏱️', desc: 'Corsa contro il tempo' },
  { id: 'battleroyale', name: 'Battle Royale', icon: '👑', desc: 'Ultimo sopravvissuto nell arena' },
  { id: 'retro', name: 'Retro Arcade', icon: '🕹️', desc: 'Classici arcade e mini-giochi' }
];

const DEFAULT_PLAYERS = [
  { id: '1', name: 'ViperX', tag: 'ITA', category: 'fps', score: 9850, wins: 24, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ViperX' },
  { id: '2', name: 'CyberNinja', tag: 'GER', category: 'speedrun', score: 9420, wins: 19, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberNinja' },
  { id: '3', name: 'ShadowQueen', tag: 'FRA', category: 'fighting', score: 8900, wins: 21, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ShadowQueen' },
  { id: '4', name: 'Phoenix_IT', tag: 'ITA', category: 'battleroyale', score: 8650, wins: 15, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Phoenix_IT' },
  { id: '5', name: 'AeroKnight', tag: 'ESP', category: 'fps', score: 8100, wins: 12, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AeroKnight' },
  { id: '6', name: 'PixelMaster', tag: 'UK', category: 'retro', score: 7950, wins: 17, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PixelMaster' },
  { id: '7', name: 'NeonPulse', tag: 'USA', category: 'fighting', score: 7300, wins: 11, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeonPulse' },
  { id: '8', name: 'KronoRunner', tag: 'SWE', category: 'speedrun', score: 6890, wins: 14, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=KronoRunner' }
];

class SecurityManager {
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
      .replace(/[&<>"']/g, (match) => {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return map[match];
      })
      .trim();
  }

  static stripHTML(htmlStr) {
    if (typeof htmlStr !== 'string') return htmlStr;
    const tmp = document.createElement('DIV');
    tmp.innerHTML = htmlStr;
    return tmp.textContent || tmp.innerText || '';
  }
}

// Automatic Live Gaming RSS News Harvester with ITA / INTL Switcher
class GamingNewsHarvester {
  constructor(onNewsUpdatedCallback) {
    this.newsList = [];
    this.region = localStorage.getItem('virtualolimpix_news_region') || 'ita';
    this.onNewsUpdated = onNewsUpdatedCallback;
    this.cacheKey = `virtualolimpix_harvested_news_${this.region}`;
  }

  setRegion(newRegion) {
    this.region = newRegion;
    localStorage.setItem('virtualolimpix_news_region', newRegion);
    this.cacheKey = `virtualolimpix_harvested_news_${this.region}`;
    this.fetchOnlineNews();
  }

  async fetchOnlineNews() {
    const cached = localStorage.getItem(this.cacheKey);
    if (cached) {
      try {
        this.newsList = JSON.parse(cached);
        if (this.newsList.length > 0) {
          if (this.onNewsUpdated) this.onNewsUpdated(this.newsList);
        }
      } catch(e) {}
    }

    await this.harvestFromRSSFeeds();
  }

  async harvestFromRSSFeeds() {
    let harvestedItems = [];
    const feedsToFetch = this.region === 'ita' ? ITALIAN_GAMING_FEEDS : INTL_GAMING_FEEDS;

    for (const feed of feedsToFetch) {
      try {
        const response = await fetch(feed.url);
        if (!response.ok) continue;

        const data = await response.json();
        if (data && data.status === 'ok' && Array.isArray(data.items)) {
          const items = data.items.slice(0, 4).map(item => {
            const cleanTitle = SecurityManager.stripHTML(item.title || '');
            let cleanSnippet = SecurityManager.stripHTML(item.description || item.content || '');
            if (cleanSnippet.length > 150) cleanSnippet = cleanSnippet.substring(0, 147) + '...';

            const pubDateStr = item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Oggi';

            return {
              id: item.guid || item.link || Math.random().toString(),
              title: cleanTitle,
              snippet: cleanSnippet || 'Leggi la notizia completa sulla fonte originale.',
              category: feed.defaultCat,
              categoryLabel: feed.catLabel,
              source: feed.name,
              url: item.link || feed.url,
              date: pubDateStr
            };
          });
          harvestedItems.push(...items);
        }
      } catch (err) {
        console.warn(`[News Harvester] Impossibile recuperare ${feed.name}:`, err);
      }
    }

    if (harvestedItems.length > 0) {
      harvestedItems.sort(() => Math.random() - 0.5);
      this.newsList = harvestedItems;
      localStorage.setItem(this.cacheKey, JSON.stringify(this.newsList));
    } else if (this.newsList.length === 0) {
      this.newsList = this.region === 'ita' ? FALLBACK_ONLINE_NEWS_ITA : FALLBACK_ONLINE_NEWS_INTL;
    }

    if (this.onNewsUpdated) this.onNewsUpdated(this.newsList);
  }
}

// Interactive YouTube Video Feed Manager (Muted Preview Playlist + Main Player)
class YouTubeVideoHarvester {
  constructor() {
    this.videos = GAMING_VIDEO_DATABASE;
    this.activeVideo = this.videos[0];
    this.activeCategory = 'all';
    this.initUI();
  }

  initUI() {
    this.renderPlaylist();
    this.loadVideo(this.activeVideo.id, false);

    const refreshBtn = document.getElementById('refresh-videos-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.shuffleVideos();
      });
    }
  }

  shuffleVideos() {
    this.videos.sort(() => Math.random() - 0.5);
    this.renderPlaylist();
    if (window.virtualOlimpixApp) {
      window.virtualOlimpixApp.showToast('Raccolta video gaming aggiornata in tempo reale! 🎬');
    }
  }

  filterCategory(cat) {
    this.activeCategory = cat;
    this.renderPlaylist();
  }

  loadVideo(videoId, autoPlay = true) {
    const video = this.videos.find(v => v.id === videoId) || this.videos[0];
    this.activeVideo = video;

    const iframe = document.getElementById('main-youtube-iframe');
    const titleEl = document.getElementById('main-video-title');
    const metaEl = document.getElementById('main-video-meta');

    if (iframe) {
      const autoPlayParam = autoPlay ? '1' : '0';
      iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=${autoPlayParam}&rel=0&modestbranding=1&enablejsapi=1`;
    }

    if (titleEl) {
      titleEl.textContent = video.title;
    }

    if (metaEl) {
      metaEl.innerHTML = `
        <span>Canale: <strong>${SecurityManager.sanitizeInput(video.channel)}</strong></span> • 
        <span>Categoria: <strong>${video.categoryLabel}</strong></span> • 
        <span>${video.views}</span> • 
        <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-cyan); text-decoration: underline;">
          📺 Apri su YouTube ↗
        </a>
      `;
    }

    this.renderPlaylist();
  }

  renderPlaylist() {
    const container = document.getElementById('video-playlist-sidebar');
    if (!container) return;

    let filtered = this.videos;
    if (this.activeCategory !== 'all') {
      filtered = this.videos.filter(v => v.category === this.activeCategory);
    }

    let html = '';
    filtered.forEach(v => {
      const isActive = v.id === this.activeVideo.id;
      const thumbUrl = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;

      html += `
        <div class="video-card-item ${isActive ? 'active' : ''}" onclick="window.youtubeHarvester.loadVideo('${v.id}', true)">
          <div class="video-thumb-wrapper">
            <img src="${thumbUrl}" alt="${SecurityManager.sanitizeInput(v.title)}" class="video-thumb-img" loading="lazy">
            <span class="video-duration-badge">${v.duration}</span>
          </div>
          <div class="video-card-info">
            <h4 class="video-card-title">${SecurityManager.sanitizeInput(v.title)}</h4>
            <span class="video-card-channel">📺 ${SecurityManager.sanitizeInput(v.channel)}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }
}

// 100% Original 8-Bit Chiptune Song Tracker (Composed by Us in Web Audio Code)
class ProceduralAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.step = 0;
    this.activeTrackIndex = 0;

    // 4 Complete 8-Bit Chiptune Songs Composed in Web Audio Code
    this.songs = [
      {
        title: "👾 Canzone 1: Virtual Olimpix Anthem 8-Bit",
        speed: 150,
        lead: [261.63, 329.63, 392.00, 523.25, 440.00, 523.25, 659.25, 523.25, 392.00, 329.63, 261.63, 329.63, 392.00, 440.00, 523.25, 392.00],
        harmony: [130.81, 164.81, 196.00, 261.63, 220.00, 261.63, 329.63, 261.63, 196.00, 164.81, 130.81, 164.81, 196.00, 220.00, 261.63, 196.00],
        bass: [65.41, 65.41, 82.41, 82.41, 98.00, 98.00, 110.00, 110.00, 65.41, 65.41, 82.41, 82.41, 98.00, 98.00, 110.00, 110.00]
      },
      {
        title: "🍄 Canzone 2: Cyber Luis World 1-1 Chiptune",
        speed: 135,
        lead: [329.63, 329.63, 0, 329.63, 0, 261.63, 329.63, 0, 392.00, 0, 0, 0, 196.00, 0, 0, 0],
        harmony: [164.81, 164.81, 0, 164.81, 0, 130.81, 164.81, 0, 196.00, 0, 0, 0, 98.00, 0, 0, 0],
        bass: [130.81, 130.81, 164.81, 164.81, 196.00, 196.00, 261.63, 261.63, 130.81, 130.81, 164.81, 164.81, 196.00, 196.00, 261.63, 261.63]
      },
      {
        title: "🚀 Canzone 3: Space Arcade Boss Fight 8-Bit",
        speed: 120,
        lead: [440.00, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440.00, 523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 523.25],
        harmony: [220.00, 246.94, 261.63, 293.66, 329.63, 293.66, 261.63, 246.94, 220.00, 261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 261.63],
        bass: [110.00, 110.00, 123.47, 123.47, 130.81, 130.81, 146.83, 146.83, 110.00, 110.00, 123.47, 123.47, 130.81, 130.81, 146.83, 146.83]
      },
      {
        title: "🏆 Canzone 4: Retro Victory Fanfare & Credits",
        speed: 160,
        lead: [392.00, 523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 523.25, 392.00, 523.25],
        harmony: [196.00, 261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 261.63, 196.00, 261.63],
        bass: [98.00, 130.81, 164.81, 196.00, 220.00, 196.00, 164.81, 196.00, 220.00, 261.63, 220.00, 196.00, 164.81, 130.81, 98.00, 130.81]
      }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  togglePlay() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startChiptuneSong();
    } else {
      this.stopChiptuneSong();
    }
    return this.isPlaying;
  }

  nextTrack() {
    this.activeTrackIndex = (this.activeTrackIndex + 1) % this.songs.length;
    this.updateTrackLabel();
    if (this.isPlaying) {
      this.stopChiptuneSong();
      this.startChiptuneSong();
    }
  }

  prevTrack() {
    this.activeTrackIndex = (this.activeTrackIndex - 1 + this.songs.length) % this.songs.length;
    this.updateTrackLabel();
    if (this.isPlaying) {
      this.stopChiptuneSong();
      this.startChiptuneSong();
    }
  }

  updateTrackLabel() {
    const trackLabel = document.getElementById('synth-track-title');
    if (trackLabel) {
      trackLabel.textContent = this.songs[this.activeTrackIndex].title;
    }
  }

  startChiptuneSong() {
    this.step = 0;
    const activeSong = this.songs[this.activeTrackIndex];

    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      
      const leadNote = activeSong.lead[this.step % activeSong.lead.length];
      const harmonyNote = activeSong.harmony[this.step % activeSong.harmony.length];
      const bassNote = activeSong.bass[this.step % activeSong.bass.length];

      // 8-Bit Pulse Lead Channel 1
      if (leadNote > 0) {
        this.play8BitPulse(leadNote, 'square', 0.14, 0.08);
      }

      // 8-Bit Pulse Harmony Channel 2
      if (harmonyNote > 0 && this.step % 2 === 0) {
        this.play8BitPulse(harmonyNote, 'square', 0.16, 0.05);
      }

      // 8-Bit Triangle Bassline Channel 3
      if (bassNote > 0) {
        this.play8BitPulse(bassNote, 'triangle', 0.22, 0.12);
      }

      // 8-Bit Noise Percussion (Hi-Hat / Snare)
      if (this.step % 4 === 2) {
        this.playNoisePercussion(0.04);
      }

      this.step++;
    }, activeSong.speed);
  }

  stopChiptuneSong() {
    clearInterval(this.timerId);
    this.isPlaying = false;
  }

  play8BitPulse(freq, type = 'square', duration = 0.15, gainVal = 0.08) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }

  playNoisePercussion(duration = 0.04) {
    try {
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      whiteNoise.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();
    } catch(e) {}
  }
}

// Background Floating Ambient Cyber Particles System (60FPS Frame-Throttled)
class ParticleSystem {
  constructor() {
    if (document.documentElement.classList.contains('low-performance')) return;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'bg-particles-canvas';
    document.body.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    for (let i = 0; i < 45; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: 1 + Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.4 ? '#00d2ff' : '#ffd700',
        alpha: 0.2 + Math.random() * 0.5
      });
    }
    this.animate();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalWidth = window.innerWidth;
    this.logicalHeight = window.innerHeight;
  }

  animate() {
    const w = this.logicalWidth || window.innerWidth;
    const h = this.logicalHeight || window.innerHeight;

    this.ctx.clearRect(0, 0, w, h);
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
    requestAnimationFrame(() => this.animate());
  }
}

// 100% Original Clean & Harmonic 16:9 Responsive Audio Equalizer Visualizer
class ArenaScreenVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.barCount = 18;
    this.currentHeights = new Array(this.barCount).fill(0.3);
    this.targetHeights = new Array(this.barCount).fill(0.3);
    this.phase = 0;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    if (document.documentElement.classList.contains('low-performance')) {
      this.animate(false);
    } else {
      this.animate(true);
    }
  }

  resize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parentW = this.canvas.parentElement.clientWidth || 640;
    const targetH = Math.round(parentW * (9 / 16)); // Strict 16:9 Aspect Ratio

    this.canvas.width = parentW * dpr;
    this.canvas.height = targetH * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalWidth = parentW;
    this.logicalHeight = targetH;
  }

  animate(continueAnimation = true) {
    if (!this.canvas) return;
    const w = this.logicalWidth || 640;
    const h = this.logicalHeight || 360;

    // 16:9 Dark Cyber Grid Background
    this.ctx.fillStyle = '#040614';
    this.ctx.fillRect(0, 0, w, h);

    // Subtle Grid Lines
    this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
    this.ctx.lineWidth = 1;
    const gridSize = Math.round(w / 16);
    for (let x = 0; x < w; x += gridSize) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, h); this.ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(w, y); this.ctx.stroke();
    }

    this.phase += 0.04;

    // Calculate Harmonic Harmonic Wave Bars (Zero Chaos, Smooth Animation)
    const margin = Math.round(w * 0.08);
    const availableW = w - margin * 2;
    const barWidth = Math.floor(availableW / this.barCount) - 4;
    const baseY = h - Math.round(h * 0.15);
    const maxBarHeight = Math.round(h * 0.55);

    for (let i = 0; i < this.barCount; i++) {
      // Harmonic Sine Wave Formula for Smooth Audio Motion
      const harmonicVal = 0.25 + 0.35 * Math.sin(this.phase + i * 0.45) + 0.2 * Math.cos(this.phase * 0.7 + i * 0.3);
      this.targetHeights[i] = Math.max(0.1, Math.min(0.9, harmonicVal));

      // Smooth Linear Interpolation (lerp)
      this.currentHeights[i] += (this.targetHeights[i] - this.currentHeights[i]) * 0.12;

      const barH = this.currentHeights[i] * maxBarHeight;
      const x = margin + i * (barWidth + 4);
      const y = baseY - barH;

      // Gradient Color (Gold to Electric Blue)
      const grad = this.ctx.createLinearGradient(0, baseY, 0, y);
      grad.addColorStop(0, '#00d2ff');
      grad.addColorStop(1, '#ffd700');

      this.ctx.save();
      this.ctx.fillStyle = grad;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
      this.ctx.fillRect(x, y, barWidth, barH);
      this.ctx.restore();
    }

    // Dynamic Smooth Oscilloscope Wave Overlay
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#00ff87';
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#00ff87';

    for (let x = 0; x <= w; x += 10) {
      const waveY = baseY - maxBarHeight * 0.6 + Math.sin(this.phase * 2 + x * 0.015) * 16;
      if (x === 0) this.ctx.moveTo(x, waveY);
      else this.ctx.lineTo(x, waveY);
    }
    this.ctx.stroke();
    this.ctx.restore();

    // Clean HUD Header (16:9 Responsive)
    const fontSize = Math.max(10, Math.round(w * 0.022));
    this.ctx.font = `700 ${fontSize}px "Orbitron", sans-serif`;
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillText(`📡 EQUALIZZATORE 16:9 // 60FPS`, margin, Math.round(h * 0.12));

    this.ctx.fillStyle = '#00ff87';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`● AUDIO OLIMPIX LIVE`, w - margin, Math.round(h * 0.12));
    this.ctx.textAlign = 'left';

    if (continueAnimation) requestAnimationFrame(() => this.animate(true));
  }
}

class VirtualOlimpixApp {
  constructor() {
    this.version = APP_VERSION;
    this.categories = this.loadData('virtualolimpix_categories', DEFAULT_CATEGORIES);
    this.players = this.loadData('virtualolimpix_players', DEFAULT_PLAYERS);
    this.news = FALLBACK_ONLINE_NEWS_ITA;
    this.proceduralAudio = new ProceduralAudioEngine();
    
    this.isAdmin = localStorage.getItem('virtualolimpix_is_admin') === 'true';
    this.soundMuted = localStorage.getItem('virtualolimpix_muted') === 'true';
    this.activeCategory = 'all';
    this.searchQuery = '';
    
    this.targetPasscode = "Giasmino@TVB#2k26";
    this.failedAttempts = 0;
    this.lockoutTime = 0;

    this.harvester = new GamingNewsHarvester((updatedNews) => {
      this.news = updatedNews;
      this.renderNewsTicker();
      this.updateNewsRegionUI();
    });
    
    this.init();
  }

  loadData(key, fallback) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  }

  saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  init() {
    new ParticleSystem();
    this.checkSessionExpiration();
    this.setupEventListeners();
    this.setupStealthAdminTriggers();
    this.renderCategoryFilters();
    this.renderLeaderboard();
    this.renderNewsTicker();
    this.updateStats();
    this.updateAdminUI();
    this.updateSoundBtnUI();

    this.harvester.fetchOnlineNews();

    setTimeout(() => {
      new ArenaScreenVisualizer('arena-telemetry-canvas');
      window.youtubeHarvester = new YouTubeVideoHarvester();
    }, 100);
  }

  // --- Stealth Admin Triggers (Secret Logo Double Click & Secret Hotkey Ctrl+Shift+A) ---
  setupStealthAdminTriggers() {
    const logoEl = document.querySelector('.logo');
    if (logoEl) {
      logoEl.addEventListener('dblclick', (e) => {
        e.preventDefault();
        this.handleAdminToggle();
      });
    }

    const stealthTriggerEl = document.getElementById('stealth-dot-trigger');
    if (stealthTriggerEl) {
      stealthTriggerEl.addEventListener('click', () => {
        this.handleAdminToggle();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
        e.preventDefault();
        this.handleAdminToggle();
      }
    });
  }

  checkSessionExpiration() {
    if (this.isAdmin) {
      const sessionTime = parseInt(localStorage.getItem('virtualolimpix_admin_time') || '0');
      const now = Date.now();
      if (now - sessionTime > 7200000) {
        this.isAdmin = false;
        localStorage.setItem('virtualolimpix_is_admin', 'false');
        this.showToast('Sessione riservata conclusa.', 'error');
      } else {
        localStorage.setItem('virtualolimpix_admin_time', now.toString());
      }
    }
  }

  setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = SecurityManager.sanitizeInput(e.target.value).toLowerCase();
        this.renderLeaderboard();
      });
    }

    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => this.toggleSound());
    }

    const refreshNewsBtn = document.getElementById('refresh-news-btn');
    if (refreshNewsBtn) {
      refreshNewsBtn.addEventListener('click', () => {
        this.showToast('Ricerca notizie gaming online in corso... 📡');
        this.harvester.harvestFromRSSFeeds().then(() => {
          this.showToast('Notizie gaming aggiornate dai principali portali online! 📰');
        });
      });
    }

    const newsItaBtn = document.getElementById('news-btn-ita');
    const newsIntlBtn = document.getElementById('news-btn-intl');

    if (newsItaBtn) {
      newsItaBtn.addEventListener('click', () => {
        this.harvester.setRegion('ita');
        this.showToast('Caricamento Notizie Gaming Italiane... 🇮🇹');
      });
    }

    if (newsIntlBtn) {
      newsIntlBtn.addEventListener('click', () => {
        this.harvester.setRegion('intl');
        this.showToast('Caricamento International Gaming News... 🌐');
      });
    }

    const synthBtn = document.getElementById('play-synth-btn');
    const prevTrackBtn = document.getElementById('synth-prev-btn');
    const nextTrackBtn = document.getElementById('synth-next-btn');

    if (synthBtn) {
      synthBtn.addEventListener('click', () => {
        const isPlaying = this.proceduralAudio.togglePlay();
        synthBtn.innerHTML = isPlaying ? '⏹️ Ferma Canzoncina 8-Bit' : '▶️ Riproduci Canzoncina 8-Bit Originale';
        synthBtn.classList.toggle('btn-accent', !isPlaying);
        synthBtn.classList.toggle('btn-primary', isPlaying);
      });
    }

    if (prevTrackBtn) {
      prevTrackBtn.addEventListener('click', () => {
        this.proceduralAudio.prevTrack();
      });
    }

    if (nextTrackBtn) {
      nextTrackBtn.addEventListener('click', () => {
        this.proceduralAudio.nextTrack();
      });
    }

    const addPlayerForm = document.getElementById('add-player-form');
    if (addPlayerForm) {
      addPlayerForm.addEventListener('submit', (e) => this.handleAddPlayer(e));
    }

    const editPlayerForm = document.getElementById('edit-player-form');
    if (editPlayerForm) {
      editPlayerForm.addEventListener('submit', (e) => this.handleEditPlayer(e));
    }

    const addCategoryForm = document.getElementById('add-category-form');
    if (addCategoryForm) {
      addCategoryForm.addEventListener('submit', (e) => this.handleAddCategory(e));
    }
  }

  updateNewsRegionUI() {
    const itaBtn = document.getElementById('news-btn-ita');
    const intlBtn = document.getElementById('news-btn-intl');
    const regionBadge = document.getElementById('news-region-badge');

    if (itaBtn && intlBtn) {
      itaBtn.classList.toggle('active', this.harvester.region === 'ita');
      intlBtn.classList.toggle('active', this.harvester.region === 'intl');
    }

    if (regionBadge) {
      regionBadge.textContent = this.harvester.region === 'ita'
        ? '● Feed RSS Italia (Multiplayer, Everyeye, Eurogamer IT)'
        : '● Feed RSS International (IGN, GameSpot, Esports Insider)';
    }
  }

  toggleSound() {
    this.soundMuted = !this.soundMuted;
    localStorage.setItem('virtualolimpix_muted', this.soundMuted.toString());
    this.updateSoundBtnUI();
    this.showToast(this.soundMuted ? 'Audio Mini-Giochi Disattivato 🔇' : 'Audio Mini-Giochi Attivato 🔊');
  }

  updateSoundBtnUI() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.innerHTML = this.soundMuted ? '🔇' : '🔊';
      soundBtn.title = this.soundMuted ? 'Attiva Audio Mini-Giochi' : 'Disattiva Audio Mini-Giochi';
    }
  }

  // --- Render Vertical News Ticker ---
  renderNewsTicker() {
    const container = document.getElementById('news-ticker-track');
    if (!container) return;

    if (!this.news || this.news.length === 0) {
      this.news = this.harvester.region === 'ita' ? FALLBACK_ONLINE_NEWS_ITA : FALLBACK_ONLINE_NEWS_INTL;
    }

    const items = [...this.news, ...this.news];

    let html = '';
    items.forEach(item => {
      let badgeClass = 'cat-gaming';
      if (item.category === 'esports') badgeClass = 'cat-esports';
      else if (item.category === 'retro') badgeClass = 'cat-retro';
      else if (item.category === 'tech') badgeClass = 'cat-tech';

      html += `
        <article class="news-item">
          <div class="news-meta">
            <span class="news-cat-tag ${badgeClass}">${item.categoryLabel || 'Gaming'}</span>
            <span class="news-source-credit">Fonte: <strong>${SecurityManager.sanitizeInput(item.source)}</strong> • ${item.date}</span>
          </div>
          <h4 class="news-headline">${SecurityManager.sanitizeInput(item.title)}</h4>
          <p class="news-extract">${SecurityManager.sanitizeInput(item.snippet)}</p>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-link-btn">
            Leggi su ${SecurityManager.sanitizeInput(item.source)} ↗
          </a>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  // --- Category Filters ---
  renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    let html = `<button class="filter-btn ${this.activeCategory === 'all' ? 'active' : ''}" onclick="window.virtualOlimpixApp.setCategory('all')">Tutte le Discipline</button>`;
    
    this.categories.forEach(cat => {
      html += `
        <button class="filter-btn ${this.activeCategory === cat.id ? 'active' : ''}" onclick="window.virtualOlimpixApp.setCategory('${cat.id}')">
          ${cat.icon} ${SecurityManager.sanitizeInput(cat.name)}
        </button>
      `;
    });

    container.innerHTML = html;
    this.populateCategorySelects();
  }

  setCategory(catId) {
    this.activeCategory = catId;
    this.renderCategoryFilters();
    this.renderLeaderboard();
  }

  populateCategorySelects() {
    const selects = ['player-category', 'edit-player-category'];
    selects.forEach(id => {
      const select = document.getElementById(id);
      if (select) {
        select.innerHTML = this.categories.map(c => `<option value="${c.id}">${SecurityManager.sanitizeInput(c.name)}</option>`).join('');
      }
    });
  }

  // --- Leaderboard Rendering ---
  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    let filtered = this.players.filter(p => {
      const matchesCategory = this.activeCategory === 'all' || p.category === this.activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(this.searchQuery) || p.tag.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => b.score - a.score);

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-dim); padding: 3rem;">
            Nessun atleta trovato per questa disciplina.
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    filtered.forEach((player, index) => {
      const rank = index + 1;
      let rankClass = 'rank-other';
      if (rank === 1) rankClass = 'rank-1';
      else if (rank === 2) rankClass = 'rank-2';
      else if (rank === 3) rankClass = 'rank-3';

      const catObj = this.categories.find(c => c.id === player.category) || { name: player.category, icon: '🎮' };

      html += `
        <tr>
          <td style="width: 70px;">
            <div class="rank-badge ${rankClass}">${rank}</div>
          </td>
          <td>
            <div class="player-info">
              <img src="${player.avatar}" alt="${SecurityManager.sanitizeInput(player.name)}" class="player-avatar" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(player.name)}'">
              <div class="player-details">
                <div class="name">${SecurityManager.sanitizeInput(player.name)} <span class="player-tag">[${SecurityManager.sanitizeInput(player.tag)}]</span></div>
                <div class="tag">ID Atleta: #${player.id}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="category-tag">${catObj.icon} ${SecurityManager.sanitizeInput(catObj.name)}</span>
          </td>
          <td class="score-cell">${player.score.toLocaleString()} PTS</td>
          <td class="wins-cell">${player.wins} Medaglie / Vittorie</td>
          ${this.isAdmin ? `
            <td class="actions-cell">
              <button class="icon-btn" title="Modifica Punteggio" onclick="window.virtualOlimpixApp.openEditModal('${player.id}')">✏️</button>
              <button class="icon-btn delete" title="Elimina" onclick="window.virtualOlimpixApp.deletePlayer('${player.id}')">🗑️</button>
            </td>
          ` : '<td class="actions-cell">-</td>'}
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // --- Stats Bar ---
  updateStats() {
    const totalPlayers = this.players.length;
    const totalPoints = this.players.reduce((sum, p) => sum + p.score, 0);
    const totalWins = this.players.reduce((sum, p) => sum + p.wins, 0);

    const elPlayers = document.getElementById('stat-players');
    const elPoints = document.getElementById('stat-points');
    const elWins = document.getElementById('stat-wins');
    const elCats = document.getElementById('stat-cats');

    if (elPlayers) elPlayers.textContent = totalPlayers;
    if (elPoints) elPoints.textContent = totalPoints.toLocaleString();
    if (elWins) elWins.textContent = totalWins;
    if (elCats) elCats.textContent = this.categories.length;
  }

  // --- Admin Verification (Stealth Mode) ---
  handleAdminToggle() {
    if (this.isAdmin) {
      this.isAdmin = false;
      localStorage.setItem('virtualolimpix_is_admin', 'false');
      this.updateAdminUI();
      this.renderLeaderboard();
      this.showToast('Sessione Amministratore Disattivata');
    } else {
      this.openModal('admin-login-modal');
    }
  }

  async verifyAdminPasscode() {
    const passInput = document.getElementById('admin-passcode');
    if (!passInput) return;

    const now = Date.now();
    if (this.lockoutTime > now) {
      const secondsLeft = Math.ceil((this.lockoutTime - now) / 1000);
      this.showToast(`Accesso bloccato per motivi di sicurezza. Riprova tra ${secondsLeft}s`, 'error');
      return;
    }

    const userInput = passInput.value;

    if (userInput === this.targetPasscode) {
      this.isAdmin = true;
      this.failedAttempts = 0;
      localStorage.setItem('virtualolimpix_is_admin', 'true');
      localStorage.setItem('virtualolimpix_admin_time', Date.now().toString());
      
      this.closeModal('admin-login-modal');
      passInput.value = '';
      this.updateAdminUI();
      this.renderLeaderboard();
      this.showToast('Autenticazione Amministratore Completata 🏆');
    } else {
      this.failedAttempts++;
      passInput.value = '';
      
      if (this.failedAttempts >= 4) {
        this.lockoutTime = Date.now() + 60000;
        this.showToast('Accesso temporaneamente sospeso per 60 secondi.', 'error');
      } else {
        const remaining = 4 - this.failedAttempts;
        this.showToast(`Credenziali non valide! Tentativi rimanenti: ${remaining}`, 'error');
      }
    }
  }

  updateAdminUI() {
    const adminBar = document.getElementById('admin-toolbar');
    
    if (adminBar) {
      adminBar.style.display = this.isAdmin ? 'flex' : 'none';
    }
  }

  // --- Player CRUD ---
  handleAddPlayer(e) {
    e.preventDefault();
    if (!this.isAdmin) return;

    const name = SecurityManager.sanitizeInput(document.getElementById('player-name').value);
    const tag = SecurityManager.sanitizeInput(document.getElementById('player-tag').value).toUpperCase() || 'GLD';
    const category = document.getElementById('player-category').value;
    const score = parseInt(document.getElementById('player-score').value) || 0;
    const wins = parseInt(document.getElementById('player-wins').value) || 0;

    if (!name) return;

    const newPlayer = {
      id: Date.now().toString(),
      name,
      tag,
      category,
      score,
      wins,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
    };

    this.players.push(newPlayer);
    this.saveData('virtualolimpix_players', this.players);
    this.renderLeaderboard();
    this.updateStats();
    this.closeModal('add-player-modal');
    document.getElementById('add-player-form').reset();
    this.showToast(`Atleta ${name} aggiunto al medagliere Virtual Olimpix!`);
  }

  openEditModal(playerId) {
    if (!this.isAdmin) return;
    const player = this.players.find(p => p.id === playerId);
    if (!player) return;

    document.getElementById('edit-player-id').value = player.id;
    document.getElementById('edit-player-name').value = player.name;
    document.getElementById('edit-player-tag').value = player.tag;
    document.getElementById('edit-player-category').value = player.category;
    document.getElementById('edit-player-score').value = player.score;
    document.getElementById('edit-player-wins').value = player.wins;

    this.openModal('edit-player-modal');
  }

  handleEditPlayer(e) {
    e.preventDefault();
    if (!this.isAdmin) return;

    const id = document.getElementById('edit-player-id').value;
    const player = this.players.find(p => p.id === id);
    if (!player) return;

    player.name = SecurityManager.sanitizeInput(document.getElementById('edit-player-name').value);
    player.tag = SecurityManager.sanitizeInput(document.getElementById('edit-player-tag').value).toUpperCase();
    player.category = document.getElementById('edit-player-category').value;
    player.score = parseInt(document.getElementById('edit-player-score').value) || 0;
    player.wins = parseInt(document.getElementById('edit-player-wins').value) || 0;

    this.saveData('virtualolimpix_players', this.players);
    this.renderLeaderboard();
    this.updateStats();
    this.closeModal('edit-player-modal');
    this.showToast(`Punteggio di ${player.name} aggiornato in Virtual Olimpix!`);
  }

  deletePlayer(playerId) {
    if (!this.isAdmin) return;
    if (!confirm('Sei sicuro di voler eliminare questo atleta da Virtual Olimpix?')) return;

    this.players = this.players.filter(p => p.id !== playerId);
    this.saveData('virtualolimpix_players', this.players);
    this.renderLeaderboard();
    this.updateStats();
    this.showToast('Atleta rimosso dal medagliere.');
  }

  handleAddCategory(e) {
    e.preventDefault();
    if (!this.isAdmin) return;

    const name = SecurityManager.sanitizeInput(document.getElementById('cat-name').value);
    const icon = SecurityManager.sanitizeInput(document.getElementById('cat-icon').value) || '⚡';
    const desc = SecurityManager.sanitizeInput(document.getElementById('cat-desc').value);

    if (!name) return;

    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const newCat = { id, name, icon, desc };
    this.categories.push(newCat);
    this.saveData('virtualolimpix_categories', this.categories);
    
    this.renderCategoryFilters();
    this.updateStats();
    this.closeModal('add-category-modal');
    document.getElementById('add-category-form').reset();
    this.showToast(`Nuova Disciplina "${name}" creata!`);
  }

  exportDatabase() {
    if (!this.isAdmin) return;
    const data = {
      categories: this.categories,
      players: this.players,
      exportDate: new Date().toISOString()
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `VirtualOlimpix_Backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();

    this.showToast('Backup JSON Virtual Olimpix esportato con successo!');
  }

  importDatabase(event) {
    if (!this.isAdmin) return;
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.categories && imported.players) {
          this.categories = imported.categories;
          this.players = imported.players;
          this.saveData('virtualolimpix_categories', this.categories);
          this.saveData('virtualolimpix_players', this.players);
          this.renderCategoryFilters();
          this.renderLeaderboard();
          this.updateStats();
          this.showToast('Dati Virtual Olimpix importati con successo!');
        } else {
          this.showToast('Formato JSON non valido', 'error');
        }
      } catch (err) {
        this.showToast('Errore nella lettura del file', 'error');
      }
    };
    reader.readAsText(file);
  }

  resetDefaultData() {
    if (!this.isAdmin) return;
    if (confirm('Vuoi ripristinare i dati della classifica Virtual Olimpix ai valori predefiniti?')) {
      this.categories = DEFAULT_CATEGORIES;
      this.players = DEFAULT_PLAYERS;
      this.saveData('virtualolimpix_categories', this.categories);
      this.saveData('virtualolimpix_players', this.players);
      this.renderCategoryFilters();
      this.renderLeaderboard();
      this.updateStats();
      this.showToast('Dati Virtual Olimpix ripristinati ai valori di fabbrica!');
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'error') toast.style.borderLeftColor = 'var(--accent-magenta)';
    
    toast.innerHTML = `
      <span>${type === 'error' ? '⚠️' : '🏆'}</span>
      <div>${SecurityManager.sanitizeInput(message)}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Entrance Victory Splash Screen Manager ("Esultanze" & 3D Logo Fanfare)
class SplashScreenManager {
  constructor() {
    this.overlay = document.getElementById('splash-overlay');
    this.progressBar = document.getElementById('splash-progress-bar');
    this.enterBtn = document.getElementById('splash-enter-btn');
    
    if (!this.overlay) return;
    this.init();
  }

  init() {
    this.initFireworks();
    this.animateProgress();
    
    if (this.enterBtn) {
      this.enterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startFinale();
      });
    }

    // Clicking anywhere on the splash overlay dismisses it instantly
    this.overlay.addEventListener('click', () => {
      this.startFinale();
    });

    // Auto-dismiss after 4.5s if user hasn't clicked
    setTimeout(() => {
      if (!this.finaleStarted) this.dismissSplash(false);
    }, 4500);
  }

  initFireworks() {
    const canvas = document.getElementById('splash-fireworks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const lowPerformance = document.documentElement.classList.contains('low-performance');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let rockets = [];
    let particles = [];
    const colors = ['#ffd700', '#fff3a8', '#00d2ff', '#ffffff', '#ff0055', '#00ffaa'];

    class Rocket {
      constructor() {
        this.x = Math.random() * (canvas.width * 0.5) + (canvas.width * 0.25);
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height * 0.25) + (canvas.height * 0.12);
        this.speed = Math.random() * 4 + 7;
        this.angle = (Math.random() * 0.15 - 0.075);
        this.vx = Math.sin(this.angle) * this.speed;
        this.vy = -Math.cos(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alive = true;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y <= this.targetY || this.vy >= 0) {
          this.alive = false;
          this.explode();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 0;
        ctx.fill();
      }

      explode() {
        const particleCount = lowPerformance
          ? Math.floor(Math.random() * 10) + 20
          : Math.floor(Math.random() * 30) + 50;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
        splashManager.playFireworkSound();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.025 + 0.015;
        this.gravity = 0.04;
        this.drag = 0.95;
      }

      update() {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(this.alpha, 0);
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.random() * 1.5 + 0.8, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 0;
        ctx.fill();
        ctx.restore();
      }
    }

    const splashManager = this;

    this.fireworkInterval = setInterval(() => {
      if (document.hidden) return;
      rockets.push(new Rocket());
    }, lowPerformance ? 900 : 450);

    rockets.push(new Rocket(), new Rocket(), new Rocket(), new Rocket());

    this.launchFireworkFinale = () => {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          if (!this.overlay || this.overlay.classList.contains('hidden')) return;
          const burst = new Rocket();
          burst.x = canvas.width * (0.18 + Math.random() * 0.64);
          burst.y = canvas.height * (0.12 + Math.random() * 0.35);
          burst.explode();
        }, i * 180);
      }
    };

    const render = () => {
      if (this.overlay && this.overlay.classList.contains('hidden')) {
        clearInterval(this.fireworkInterval);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw();
        if (!rockets[i].alive) rockets.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }

      requestAnimationFrame(render);
    };

    render();
  }

  unlockFireworkAudio() {
    if (!this.fireworkAudioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return Promise.resolve(false);
      this.fireworkAudioContext = new AudioCtx();
    }
    if (this.fireworkAudioContext.state === 'suspended') {
      return this.fireworkAudioContext.resume()
        .then(() => this.fireworkAudioContext.state === 'running')
        .catch(() => false);
    }
    return Promise.resolve(this.fireworkAudioContext.state === 'running');
  }

  playFireworkSound() {
    const audioCtx = this.fireworkAudioContext;
    if (!audioCtx || audioCtx.state !== 'running') return;

    const now = audioCtx.currentTime;
    if (this.lastFireworkSound && now - this.lastFireworkSound < 0.07) return;
    this.lastFireworkSound = now;

    // Short quantized noise + low square pulse for a restrained SNES-like burst.
    const duration = 0.24;
    const buffer = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * duration), audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const decay = 1 - i / data.length;
      const steppedNoise = Math.round((Math.random() * 2 - 1) * 12) / 12;
      data[i] = steppedNoise * decay * decay;
    }

    const noise = audioCtx.createBufferSource();
    const noiseGain = audioCtx.createGain();
    noise.buffer = buffer;
    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(noiseGain).connect(audioCtx.destination);

    const pulse = audioCtx.createOscillator();
    const pulseGain = audioCtx.createGain();
    pulse.type = 'square';
    pulse.frequency.setValueAtTime(105 + Math.random() * 35, now);
    pulse.frequency.exponentialRampToValueAtTime(42, now + 0.18);
    pulseGain.gain.setValueAtTime(0.07, now);
    pulseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    pulse.connect(pulseGain).connect(audioCtx.destination);

    noise.start(now);
    pulse.start(now);
    pulse.stop(now + 0.21);
  }

  async startFinale() {
    if (this.finaleStarted || !this.overlay || this.overlay.classList.contains('hidden')) return;
    this.finaleStarted = true;
    const fireworkAudioReady = this.unlockFireworkAudio();

    const themeAudio = document.getElementById('theme-audio');
    if (themeAudio && themeAudio.paused) {
      themeAudio.play().catch(err => console.warn('Theme song could not start:', err));
    }

    const audioReady = await fireworkAudioReady;

    if (this.enterBtn) {
      this.enterBtn.disabled = true;
      this.enterBtn.innerText = '🎆 VIA ALLA FESTA! 🎆';
    }
    // Immediate confirmation burst, then the six-shot finale.
    if (audioReady) this.playFireworkSound();
    if (this.launchFireworkFinale) this.launchFireworkFinale();
    setTimeout(() => this.dismissSplash(false), 1300);
  }

  animateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (this.progressBar) {
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 90);
  }

  dismissSplash(userInitiated = false) {
    if (!this.overlay || this.overlay.classList.contains('hidden')) return;
    if (this.fireworkInterval) clearInterval(this.fireworkInterval);

    // Browsers allow audible playback only during a real user gesture.
    // Start the official theme from the entrance click, not from auto-dismiss.
    if (userInitiated) {
      const themeAudio = document.getElementById('theme-audio');
      if (themeAudio && themeAudio.paused) {
        themeAudio.play().catch(err => {
          console.warn('Theme song could not start:', err);
        });
      }
    }
    
    // Play fanfare beep sound
    if (window.virtualOlimpixApp && window.virtualOlimpixApp.audioEngine) {
      window.virtualOlimpixApp.audioEngine.play8BitPulse(880, 'square', 0.15, 0.1);
    }

    this.overlay.classList.add('hidden');
    setTimeout(() => {
      this.overlay.remove();
    }, 800);
  }
}

// Language Switcher Manager (ITA ↔ ENG)
const TRANSLATIONS = {
  ita: {
    nav_leaderboard: "Medagliere Live",
    nav_pillars: "Pillars",
    nav_news: "Notizie Gaming",
    nav_games: "Mini-Giochi (3)",
    nav_rules: "Regolamento & Info",
    nav_license: "Licenza GNU 3.0",
    hero_tagline: "THE ULTIMATE VIRTUAL COMPETITION",
    hero_quote: '"COMPETE. UNITE. BECOME LEGEND."',
    btn_leaderboard: "📊 Medagliere Live",
    btn_games: "🎮 Gioca ai Mini-Giochi (3 Arcade)",
    btn_videos: "🎬 Video Stream Hub",
    stat_players: "Atleti Iscritti",
    stat_points: "Punti Totali Olimpix",
    stat_wins: "Medaglie Assegnate",
    stat_cats: "Discipline Ufficiali",
    news_title: "Notizie Gaming Online in Tempo Reale (RSS Harvester)",
    video_title: "YouTube Gaming & E-Sports Video Stream Hub",
    eq_title: "📡 Visualizzatore Spettatori Arena (60FPS)",
    synth_title: "🕹️ Canzoncine 8-Bit Olimpix (Fatte da Noi)",
    splash_sub: "🎉 BENVENUTO NELL'ARENA OLIMPICA DEI VIDEOGIOCHI! 🎉",
    splash_btn: "🚀 ENTRA NELL'ARENA OLIMPIX",
    footer_motto: "ONE WORLD. ONE COMPETITION. ENDLESS LEGENDS."
  },
  eng: {
    nav_leaderboard: "Live Leaderboard",
    nav_pillars: "3 Pillars",
    nav_news: "Gaming News",
    nav_games: "Mini-Games (3)",
    nav_rules: "Rules & Info",
    nav_license: "GNU GPL 3.0 License",
    hero_tagline: "THE ULTIMATE VIRTUAL COMPETITION",
    hero_quote: '"COMPETE. UNITE. BECOME LEGEND."',
    btn_leaderboard: "📊 Live Leaderboard",
    btn_games: "🎮 Play Mini-Games (3 Arcade)",
    btn_videos: "🎬 Video Stream Hub",
    stat_players: "Registered Athletes",
    stat_points: "Total Olimpix Points",
    stat_wins: "Awarded Medals",
    stat_cats: "Official Disciplines",
    news_title: "Realtime Online Gaming News (RSS Harvester)",
    video_title: "YouTube Gaming & E-Sports Video Stream Hub",
    eq_title: "📡 Arena Audience Visualizer (60FPS)",
    synth_title: "🕹️ Original 8-Bit Olimpix Songs (Self-Made)",
    splash_sub: "🎉 WELCOME TO THE VIRTUAL OLIMPIX ARENA! 🎉",
    splash_btn: "🚀 ENTER THE OLIMPIX ARENA",
    footer_motto: "ONE WORLD. ONE COMPETITION. ENDLESS LEGENDS."
  }
};

// Theme Song Player Manager
class ThemeSongManager {
  constructor() {
    this.audio = document.getElementById('theme-audio');
    this.btn = document.getElementById('theme-song-btn');
    if (!this.btn || !this.audio) return;
    this.init();
  }

  init() {
    const togglePlay = () => {
      if (this.audio.paused) {
        this.audio.play().then(() => {
          this.btn.innerHTML = '⏸️ Pausa Sigla';
          if (window.virtualOlimpixApp) window.virtualOlimpixApp.showToast('Riproduzione Sigla Virtual Olimpix 2026 🎵');
        }).catch(err => {
          console.warn("Audio play error:", err);
          const unlock = () => {
            this.audio.play();
            document.removeEventListener('click', unlock);
          };
          document.addEventListener('click', unlock, { once: true });
        });
      } else {
        this.audio.pause();
        this.btn.innerHTML = '🎵 Sigla Ufficiale';
        if (window.virtualOlimpixApp) window.virtualOlimpixApp.showToast('Sigla Ufficiale in Pausa ⏸️');
      }
    };

    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePlay();
    });

    this.audio.addEventListener('play', () => {
      if (this.btn) this.btn.innerHTML = '⏸️ Pausa Sigla';
    });

    this.audio.addEventListener('pause', () => {
      if (this.btn) this.btn.innerHTML = '🎵 Sigla Ufficiale';
    });
  }
}

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('virtualolimpix_lang') || 'ita';
    this.btn = document.getElementById('lang-toggle-btn');
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);

    if (this.btn) {
      this.btn.addEventListener('click', () => {
        this.currentLang = this.currentLang === 'ita' ? 'eng' : 'ita';
        localStorage.setItem('virtualolimpix_lang', this.currentLang);
        this.applyLanguage(this.currentLang);
        if (window.virtualOlimpixApp) {
          window.virtualOlimpixApp.showToast(this.currentLang === 'ita' ? 'Lingua impostata su Italiano 🇮🇹' : 'Language set to English 🇬🇧');
        }
      });
    }
  }

  applyLanguage(lang) {
    if (this.btn) {
      this.btn.innerHTML = lang === 'ita' ? '🇮🇹 ITA' : '🇬🇧 ENG';
    }

    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerText = dict[key];
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fewCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  if (reducedMotion || fewCores || lowMemory) {
    document.documentElement.classList.add('low-performance');
  }

  // The entrance must remain usable even if a secondary site feature fails.
  window.splashScreenManager = new SplashScreenManager();
  window.languageManager = new LanguageManager();
  window.themeSongManager = new ThemeSongManager();
  try {
    window.virtualOlimpixApp = new VirtualOlimpixApp();
  } catch (error) {
    console.error('Virtual Olimpix initialization error:', error);
  }
});
