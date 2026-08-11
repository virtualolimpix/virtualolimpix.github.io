/* ==========================================================================
   VIRTUAL OLIMPIX - Arcade Mini-Games Suite (v1.0.0.6v1 Hardened)
   10-Level Campaign Systems, Multi-Weapon Inventories, Level Exploration,
   Power-Up Abilities, Boss Escalation & High-Res 3D Raycasting Engine
   ========================================================================== */

class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  isMuted() {
    return localStorage.getItem('virtualolimpix_muted') === 'true';
  }

  playBeep(freq = 440, type = 'square', duration = 0.1, gainVal = 0.08) {
    if (this.isMuted()) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
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
    } catch (e) {}
  }
}

const sfx = new SoundFX();

function submitScoreToVirtualOlimpix(gameName, score, defaultCat = 'retro') {
  if (!score || score <= 0) return;
  const currentApp = window.virtualOlimpixApp;
  if (currentApp) {
    currentApp.showToast(`Punteggio di ${score} PTS inviato al Medagliere Olimpix per ${gameName}! 🏆`);
  }
}

// ==========================================================================
// GAME 1: Cyber Luis Platformer (10 Levels Campaign + Fireball Powerup)
// ==========================================================================
class CyberLuisGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.level = 1;
    this.maxLevels = 10;
    this.keys = {};
    
    this.initCanvas();
    this.setupControls();
    this.renderIdleScreen();
  }

  initCanvas() {
    const parentW = this.canvas.parentElement.clientWidth || 1280;
    const parentH = this.canvas.parentElement.clientHeight || 720;
    
    this.canvas.width = 1280;
    this.canvas.height = 720;
    
    this.logicalWidth = 1280;
    this.logicalHeight = 720;
  }

  resizeCanvas() { this.initCanvas(); }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'KeyA', 'KeyD', 'KeyW', 'Space', 'KeyF'].includes(e.code)) {
        if (this.isPlaying) e.preventDefault();
        this.keys[e.code] = true;
        if (e.code === 'KeyF' && this.isPlaying) this.shootFireball();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'KeyA', 'KeyD', 'KeyW', 'Space', 'KeyF'].includes(e.code)) {
        this.keys[e.code] = false;
      }
    });

    // Touch Controls
    this.canvas.addEventListener('touchstart', (e) => {
      if (!this.isPlaying) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      
      if (x < rect.width * 0.35) {
        this.keys['ArrowLeft'] = true;
        this.keys['ArrowRight'] = false;
      } else if (x > rect.width * 0.65) {
        this.keys['ArrowRight'] = true;
        this.keys['ArrowLeft'] = false;
      } else {
        this.keys['ArrowUp'] = true;
        this.shootFireball();
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.keys['ArrowLeft'] = false;
      this.keys['ArrowRight'] = false;
      this.keys['ArrowUp'] = false;
    });
  }

  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 0;
    this.level = 1;
    this.fireballs = [];
    this.loadLevel(this.level);
    this.loop();
  }

  shootFireball() {
    if (!this.player.hasFireball) return;
    sfx.playBeep(720, 'square', 0.08);
    this.fireballs.push({
      x: this.player.x + (this.player.facing === 'right' ? 24 : -8),
      y: this.player.y + 10,
      vx: this.player.facing === 'right' ? 3.5 : -3.5,
      vy: 0.5
    });
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.gravity = 0.25;
    this.fireballs = [];

    this.player = {
      x: 30,
      y: 480,
      w: 28,
      h: 38,
      vx: 0,
      vy: 0,
      grounded: false,
      facing: 'right',
      animFrame: 0,
      hasFireball: lvl >= 3
    };

    // 10 Procedural Campaign Levels
    const themeColors = [
      { bg: '#080d26', brick: '#00f3ff', name: 'CYBER ROOFTOPS' },
      { bg: '#100b2a', brick: '#00ff87', name: 'NEO INDUSTRIAL' },
      { bg: '#1a0628', brick: '#9d4edd', name: 'CYBER CAVERNS' },
      { bg: '#25041a', brick: '#ff007f', name: 'SYNTH MATRIX' },
      { bg: '#281204', brick: '#ffd700', name: 'FORTRESS GATES' },
      { bg: '#061a1a', brick: '#00b4d8', name: 'SUB-SECTOR ZERO' },
      { bg: '#1c1c04', brick: '#c0c0c0', name: 'HIGHWAY EXPANSE' },
      { bg: '#041f06', brick: '#00ff87', name: 'TOXIC CORE' },
      { bg: '#2a0404', brick: '#ff0055', name: 'CITADEL WALLS' },
      { bg: '#3a0022', brick: '#ffd700', name: 'FINAL OLIMPIX CASTLE' }
    ];

    const currentTheme = themeColors[(lvl - 1) % themeColors.length];
    this.levelName = `LIVELLO ${lvl}/10: ${currentTheme.name}`;
    this.bgColor = currentTheme.bg;
    this.brickColor = currentTheme.brick;

    const levelLength = 1600 + lvl * 350;

    // Generate Platforms
    this.platforms = [
      { x: 0, y: 560, w: 420, h: 160 }
    ];

    for (let px = 460; px < levelLength - 300; px += 260 + Math.random() * 90) {
      this.platforms.push({
        x: px,
        y: 380 + Math.floor(Math.random() * 3) * 60,
        w: 220 + Math.floor(Math.random() * 100),
        h: 30
      });
    }

    this.platforms.push({ x: levelLength - 300, y: 540, w: 400, h: 180 });

    // Generate Coins
    this.coins = [];
    this.platforms.forEach(p => {
      this.coins.push({ x: p.x + 30, y: p.y - 45, collected: false });
      this.coins.push({ x: p.x + p.w - 30, y: p.y - 45, collected: false });
    });

    // Generate Enemies
    this.enemies = [];
    for (let i = 1; i < this.platforms.length - 1; i++) {
      const p = this.platforms[i];
      if (Math.random() > 0.3) {
        this.enemies.push({
          x: p.x + 30,
          y: p.y - 32,
          w: 32,
          h: 32,
          vx: (0.55 + lvl * 0.06) * (i % 2 === 0 ? 1 : -1),
          alive: true,
          minX: p.x,
          maxX: p.x + p.w - 32
        });
      }
    }

    this.flag = { x: levelLength - 120, y: 340, w: 20, h: 200 };
  }

  endGame(win = false) {
    this.isPlaying = false;
    if (win) {
      sfx.playBeep(950, 'sine', 0.4);
      this.score += 5000;
    } else {
      sfx.playBeep(180, 'sawtooth', 0.3);
    }
    this.renderIdleScreen(win);
    submitScoreToVirtualOlimpix('Cyber Luis Platformer', this.score, 'retro');
  }

  loop() {
    if (!this.isPlaying) return;

    const w = 1280;
    const h = 720;

    // Responsive Movement Physics (Slowed Down for smooth 1080p gameplay)
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      this.player.vx = -1.65;
      this.player.facing = 'left';
      this.player.animFrame += 0.1;
    } else if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      this.player.vx = 1.65;
      this.player.facing = 'right';
      this.player.animFrame += 0.1;
    } else {
      this.player.vx = 0;
    }

    // Jump (Smoother physics)
    if ((this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['Space']) && this.player.grounded) {
      this.player.vy = -6.8;
      this.player.grounded = false;
      sfx.playBeep(520, 'square', 0.1);
    }

    this.player.vy += this.gravity;
    this.player.x += this.player.vx;
    this.player.y += this.player.vy;

    // Platform Collisions
    this.player.grounded = false;
    this.platforms.forEach(p => {
      if (
        this.player.x + this.player.w > p.x &&
        this.player.x < p.x + p.w &&
        this.player.y + this.player.h >= p.y &&
        this.player.y + this.player.h <= p.y + p.h + 8 &&
        this.player.vy >= 0
      ) {
        this.player.grounded = true;
        this.player.vy = 0;
        this.player.y = p.y - this.player.h;
      }
    });

    // Fireballs Physics & Enemy Collision
    this.fireballs.forEach(fb => {
      fb.x += fb.vx;
      fb.y += fb.vy;

      this.enemies.forEach(e => {
        if (e.alive && Math.hypot(fb.x - e.x, fb.y - e.y) < 22) {
          e.alive = false;
          fb.dead = true;
          this.score += 400;
          sfx.playBeep(850, 'sine', 0.1);
        }
      });
    });
    this.fireballs = this.fireballs.filter(fb => !fb.dead && Math.abs(fb.x - this.player.x) < 400);

    // Collect Coins
    this.coins.forEach(c => {
      if (!c.collected && Math.hypot(this.player.x + 12 - c.x, this.player.y + 16 - c.y) < 22) {
        c.collected = true;
        this.score += 250;
        sfx.playBeep(880, 'triangle', 0.08);
      }
    });

    // Enemies Stomp / Crash
    this.enemies.forEach(e => {
      if (!e.alive) return;
      e.x += e.vx;
      if (e.x < e.minX || e.x > e.maxX) e.vx *= -1;

      if (
        this.player.x + this.player.w > e.x &&
        this.player.x < e.x + e.w &&
        this.player.y + this.player.h >= e.y &&
        this.player.y < e.y + e.h
      ) {
        if (this.player.vy > 0 && this.player.y + this.player.h - this.player.vy <= e.y + 10) {
          e.alive = false;
          this.player.vy = -7;
          this.score += 500;
          sfx.playBeep(740, 'square', 0.12);
        } else {
          this.endGame(false);
          return;
        }
      }
    });

    // Flagpole Victory Goal
    if (this.player.x >= this.flag.x) {
      if (this.level < this.maxLevels) {
        sfx.playBeep(880, 'sine', 0.2);
        this.loadLevel(this.level + 1);
      } else {
        this.endGame(true);
        return;
      }
    }

    // Fall in pit
    if (this.player.y > h + 60) {
      this.endGame(false);
      return;
    }

    // Render Scene
    const cameraX = Math.max(0, this.player.x - 120);

    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.save();
    this.ctx.translate(-cameraX, 0);

    // Draw Brick Platforms
    this.platforms.forEach(p => {
      this.ctx.fillStyle = this.brickColor;
      this.ctx.fillRect(p.x, p.y, p.w, p.h);
      
      this.ctx.fillStyle = '#00ff87';
      this.ctx.fillRect(p.x, p.y, p.w, 4);

      this.ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      this.ctx.lineWidth = 1;
      for (let bx = p.x; bx < p.x + p.w; bx += 20) {
        this.ctx.beginPath(); this.ctx.moveTo(bx, p.y); this.ctx.lineTo(bx, p.y + p.h); this.ctx.stroke();
      }
    });

    // Draw Coins
    this.coins.forEach(c => {
      if (!c.collected) {
        this.ctx.save();
        this.ctx.fillStyle = '#ffd700';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ffd700';
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    });

    // Draw Fireballs
    this.fireballs.forEach(fb => {
      this.ctx.save();
      this.ctx.fillStyle = '#ff0055';
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = '#ff0055';
      this.ctx.beginPath();
      this.ctx.arc(fb.x, fb.y, 6, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Goomba Enemies
    this.enemies.forEach(e => {
      if (e.alive) {
        this.ctx.save();
        this.ctx.fillStyle = '#d6006b';
        this.ctx.beginPath();
        this.ctx.arc(e.x + 12, e.y + 10, 12, Math.PI, 0);
        this.ctx.fill();
        this.ctx.fillRect(e.x, e.y + 10, 24, 10);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(e.x + 4, e.y + 8, 5, 5);
        this.ctx.fillRect(e.x + 15, e.y + 8, 5, 5);
        this.ctx.restore();
      }
    });

    // Draw Flagpole
    this.ctx.fillStyle = '#ffd700';
    this.ctx.fillRect(this.flag.x, this.flag.y, this.flag.w, this.flag.h);
    this.ctx.fillStyle = '#ff007f';
    this.ctx.beginPath();
    this.ctx.moveTo(this.flag.x + 12, this.flag.y);
    this.ctx.lineTo(this.flag.x + 45, this.flag.y + 20);
    this.ctx.lineTo(this.flag.x + 12, this.flag.y + 40);
    this.ctx.fill();

    // Draw Cyber Luis Sprite
    this.drawCyberLuisSprite(this.player.x, this.player.y, this.player.facing, Math.floor(this.player.animFrame) % 2);

    this.ctx.restore();

    // HUD Header
    this.ctx.font = '700 15px "Orbitron", sans-serif';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillText(`${this.levelName} | PUNTI: ${this.score}`, 15, 25);

    requestAnimationFrame(() => this.loop());
  }

  drawCyberLuisSprite(x, y, facing, legFrame) {
    this.ctx.save();
    
    // Goggles / Hat
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillRect(x + 2, y, 20, 7);
    this.ctx.fillStyle = '#ff007f';
    this.ctx.fillRect(x + (facing === 'right' ? 12 : 2), y + 2, 10, 4);

    // Head / Face
    this.ctx.fillStyle = '#ffdbac';
    this.ctx.fillRect(x + 4, y + 7, 16, 9);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(x + (facing === 'right' ? 14 : 6), y + 9, 3, 3);

    // Suit & Overalls
    this.ctx.fillStyle = '#0055ff';
    this.ctx.fillRect(x + 3, y + 16, 18, 10);
    this.ctx.fillStyle = '#ff0055';
    this.ctx.fillRect(x + (facing === 'right' ? 2 : 14), y + 16, 6, 8);

    // Legs / Boots
    this.ctx.fillStyle = '#00f3ff';
    if (legFrame === 0) {
      this.ctx.fillRect(x + 3, y + 26, 7, 6);
      this.ctx.fillRect(x + 14, y + 26, 7, 6);
    } else {
      this.ctx.fillRect(x + 1, y + 26, 7, 6);
      this.ctx.fillRect(x + 16, y + 26, 7, 6);
    }

    this.ctx.restore();
  }

  renderIdleScreen(win = false) {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;

    this.ctx.fillStyle = '#080d26';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = win ? '#00ff87' : '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(win ? 'VITTORIA! TUTTI I 10 LIVELLI COMPLETATI!' : 'CYBER LUIS PLATFORMER (10 LIVELLI)', w / 2, h / 2 - 20);

    this.ctx.font = '600 13px "Rajdhani", sans-serif';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('Premere INIZIA per la Campagna (Frecce / WASD / Touch)', w / 2, h / 2 + 15);
  }
}

// ==========================================================================
// GAME 2: DOOM 1 3D Raycaster (10 Levels Campaign + 3 Weapon Inventory)
// ==========================================================================
class DoomRaycasterGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.level = 1;
    this.maxLevels = 10;
    this.keys = {};

    this.initCanvas();
    this.setupControls();
    this.renderIdleScreen();
  }

  initCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parentW = this.canvas.parentElement.clientWidth || 320;
    const parentH = this.canvas.parentElement.clientHeight || 280;

    this.canvas.width = parentW * dpr;
    this.canvas.height = parentH * dpr;
    this.ctx.scale(dpr, dpr);

    this.logicalWidth = parentW;
    this.logicalHeight = parentH;
  }

  resizeCanvas() { this.initCanvas(); }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      if (['KeyW','KeyS','KeyA','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','Digit1','Digit2','Digit3'].includes(e.code)) {
        if (this.isPlaying) e.preventDefault();
        this.keys[e.code] = true;

        if (e.code === 'Digit1') this.activeWeapon = 1;
        if (e.code === 'Digit2' && this.unlockedWeapons >= 2) this.activeWeapon = 2;
        if (e.code === 'Digit3' && this.unlockedWeapons >= 3) this.activeWeapon = 3;

        if (e.code === 'Space') this.shoot();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['KeyW','KeyS','KeyA','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) {
        this.keys[e.code] = false;
      }
    });

    this.canvas.addEventListener('click', () => {
      if (this.isPlaying) this.shoot();
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (this.isPlaying) {
        e.preventDefault();
        this.shoot();
      }
    }, { passive: false });
  }

  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 0;
    this.level = 1;
    this.activeWeapon = 1;
    this.unlockedWeapons = 1;
    this.loadLevel(this.level);
    this.loop();
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.mapWidth = 16;
    this.mapHeight = 16;

    // Unlocks weapons progressively
    if (lvl >= 4) this.unlockedWeapons = Math.max(this.unlockedWeapons, 2);
    if (lvl >= 7) this.unlockedWeapons = Math.max(this.unlockedWeapons, 3);

    // 10 Explorable 3D Maze Maps
    this.map = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,
      1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,
      1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,
      1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
      1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,
      1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
      1,0,1,1,1,0,1,0,0,1,1,1,0,1,0,1,
      1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
      1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,
      1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1,
      1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    this.player = {
      x: 2.5,
      y: 2.5,
      angle: 0,
      fov: Math.PI / 3,
      recoil: 0,
      muzzleFlash: 0
    };

    // Scaled Demon Count per Level (Level 10 is Cyberdemon Boss Arena)
    const numDemons = lvl === 10 ? 1 : 2 + lvl;
    this.demons = [];

    if (lvl === 10) {
      // Level 10: Cyberdemon Boss Stage
      this.demons.push({ x: 8.5, y: 8.5, alive: true, hp: 45, isBoss: true });
    } else {
      for (let d = 0; d < numDemons; d++) {
        this.demons.push({
          x: 4.5 + (d % 3) * 3,
          y: 4.5 + Math.floor(d / 3) * 3,
          alive: true,
          hp: 2 + Math.floor(lvl / 3)
        });
      }
    }
  }

  shoot() {
    if (!this.isPlaying) return;
    this.player.recoil = 14;
    this.player.muzzleFlash = 4;

    const sounds = [600, 180, 950];
    sfx.playBeep(sounds[this.activeWeapon - 1], 'sawtooth', 0.2, 0.15);

    // Weapon Damage & Spread
    const weaponDamage = [1, 2, 4][this.activeWeapon - 1];

    this.demons.forEach(d => {
      if (!d.alive) return;
      const dx = d.x - this.player.x;
      const dy = d.y - this.player.y;
      const angleToDemon = Math.atan2(dy, dx);
      let angleDiff = angleToDemon - this.player.angle;

      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      const dist = Math.hypot(dx, dy);
      if (Math.abs(angleDiff) < 0.32 && dist < 9) {
        d.hp -= weaponDamage;
        if (d.hp <= 0) {
          d.alive = false;
          this.score += d.isBoss ? 5000 : 600;
          sfx.playBeep(900, 'square', 0.15);
        }
      }
    });
  }

  loop() {
    if (!this.isPlaying) return;

    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;

    // Movement Physics
    const moveSpeed = 0.055;
    const turnSpeed = 0.045;

    if (this.keys['KeyA'] || this.keys['ArrowLeft']) this.player.angle -= turnSpeed;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) this.player.angle += turnSpeed;

    let moveX = 0;
    let moveY = 0;

    if (this.keys['KeyW'] || this.keys['ArrowUp']) {
      moveX += Math.cos(this.player.angle) * moveSpeed;
      moveY += Math.sin(this.player.angle) * moveSpeed;
    }
    if (this.keys['KeyS'] || this.keys['ArrowDown']) {
      moveX -= Math.cos(this.player.angle) * moveSpeed;
      moveY -= Math.sin(this.player.angle) * moveSpeed;
    }

    const newX = this.player.x + moveX;
    const newY = this.player.y + moveY;

    if (this.map[Math.floor(this.player.y) * this.mapWidth + Math.floor(newX)] === 0) {
      this.player.x = newX;
    }
    if (this.map[Math.floor(newY) * this.mapWidth + Math.floor(this.player.x)] === 0) {
      this.player.y = newY;
    }

    // Level Clearance Check
    const aliveDemons = this.demons.filter(d => d.alive).length;
    if (aliveDemons === 0) {
      if (this.level < this.maxLevels) {
        sfx.playBeep(880, 'sine', 0.2);
        this.loadLevel(this.level + 1);
      } else {
        this.isPlaying = false;
        this.score += 10000;
        this.renderIdleScreen(true);
        submitScoreToVirtualOlimpix('Cyber Slayer 3D', this.score, 'retro');
        return;
      }
    }

    // Render 3D Scene
    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h / 2);
    this.ctx.fillStyle = '#0f0518';
    this.ctx.fillRect(0, h / 2, w, h / 2);

    // 100% Raycasting Projection Engine
    const numRays = Math.floor(w / 3);
    const rayWidth = w / numRays;

    for (let r = 0; r < numRays; r++) {
      const rayAngle = (this.player.angle - this.player.fov / 2) + (r / numRays) * this.player.fov;
      let distance = 0;
      let hitWall = false;

      const cos = Math.cos(rayAngle);
      const sin = Math.sin(rayAngle);

      while (!hitWall && distance < 16) {
        distance += 0.04;
        const checkX = Math.floor(this.player.x + cos * distance);
        const checkY = Math.floor(this.player.y + sin * distance);

        if (checkX < 0 || checkX >= this.mapWidth || checkY < 0 || checkY >= this.mapHeight) {
          hitWall = true;
          distance = 16;
        } else if (this.map[checkY * this.mapWidth + checkX] > 0) {
          hitWall = true;
        }
      }

      const correctedDist = distance * Math.cos(rayAngle - this.player.angle);
      const wallHeight = Math.min(h, (h / correctedDist) * 1.1);
      const wallTop = (h - wallHeight) / 2;

      const shade = Math.max(0.1, 1 - correctedDist / 12);
      this.ctx.fillStyle = `rgba(0, 243, 255, ${shade})`;
      this.ctx.fillRect(r * rayWidth, wallTop, rayWidth + 0.5, wallHeight);
    }

    // Render 3D Demons
    this.demons
      .map(d => {
        const dx = d.x - this.player.x;
        const dy = d.y - this.player.y;
        const dist = Math.hypot(dx, dy);
        let spriteAngle = Math.atan2(dy, dx) - this.player.angle;

        while (spriteAngle < -Math.PI) spriteAngle += Math.PI * 2;
        while (spriteAngle > Math.PI) spriteAngle -= Math.PI * 2;

        return { demon: d, dist, angle: spriteAngle };
      })
      .filter(s => s.demon.alive && s.dist > 0.4 && Math.abs(s.angle) < this.player.fov)
      .sort((a, b) => b.dist - a.dist)
      .forEach(s => {
        const screenX = (w / 2) + Math.tan(s.angle) * (w / 2);
        const spriteSize = (h / s.dist) * (s.demon.isBoss ? 1.8 : 0.9);
        const spriteTop = (h - spriteSize) / 2;

        this.ctx.save();
        this.ctx.fillStyle = s.demon.isBoss ? '#ffd700' : '#ff0055';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = s.demon.isBoss ? '#ffd700' : '#ff0055';
        
        this.ctx.beginPath();
        this.ctx.arc(screenX, spriteTop + spriteSize * 0.35, spriteSize * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });

    // Draw Active Weapon
    this.drawDoomWeapon(w, h, this.activeWeapon);

    // HUD Header
    this.ctx.font = '700 14px "Orbitron", sans-serif';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillText(`LIVELLO ${this.level}/10 | ARMA: [${this.activeWeapon}] | DEMONI: ${aliveDemons}`, 15, 25);

    requestAnimationFrame(() => this.loop());
  }

  drawDoomWeapon(w, h, wpnType) {
    const recoilOffset = this.player.recoil;
    if (this.player.recoil > 0) this.player.recoil *= 0.8;

    const centerX = w / 2;
    const bottomY = h + recoilOffset;

    this.ctx.save();

    if (wpnType === 1) {
      // Pistol
      this.ctx.fillStyle = '#4a5568';
      this.ctx.fillRect(centerX - 6, bottomY - 70, 12, 50);
    } else if (wpnType === 2) {
      // Shotgun
      this.ctx.fillStyle = '#2d3748';
      this.ctx.fillRect(centerX - 16, bottomY - 95, 14, 70);
      this.ctx.fillRect(centerX + 2, bottomY - 95, 14, 70);
    } else {
      // Plasma BFG
      this.ctx.fillStyle = '#00ff87';
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#00ff87';
      this.ctx.fillRect(centerX - 22, bottomY - 110, 44, 80);
    }

    this.ctx.restore();
  }

  renderIdleScreen(win = false) {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;

    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = win ? '#00ff87' : '#ff007f';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(win ? 'CAMPAGNA DOOM COMPLETATA! VITTORIA!' : 'CYBER SLAYER 3D (CAMPAGNA 10 LIVELLI)', w / 2, h / 2 - 20);

    this.ctx.font = '600 13px "Rajdhani", sans-serif';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('W,A,S,D = Esplora • SPAZIO = Spara • [1],[2],[3] = Armi', w / 2, h / 2 + 15);
  }
}

// ==========================================================================
// GAME 3: Raptor Jet Fighter (10 Waves Missions)
// ==========================================================================
class RaptorJetGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.level = 1;
    this.maxLevels = 10;
    this.keys = {};

    this.initCanvas();
    this.setupControls();
    this.renderIdleScreen();
  }

  initCanvas() {
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.logicalWidth = 1280;
    this.logicalHeight = 720;
  }

  resizeCanvas() { this.initCanvas(); }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      if (['KeyW','KeyS','KeyA','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) {
        if (this.isPlaying) e.preventDefault();
        this.keys[e.code] = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['KeyW','KeyS','KeyA','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) {
        this.keys[e.code] = false;
      }
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (!this.isPlaying) return;
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.player.x = (touch.clientX - rect.left) * (1280 / rect.width);
      this.player.y = (touch.clientY - rect.top) * (720 / rect.height);
    }, { passive: false });
  }

  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 0;
    this.level = 1;
    this.loadMission(this.level);
    this.loop();
  }

  loadMission(lvl) {
    this.level = lvl;
    this.spawnTimer = 0;
    this.killedEnemies = 0;
    this.targetEnemies = 8 + lvl * 3;

    this.player = {
      x: 640,
      y: 640,
      w: 48,
      h: 56,
      weaponLevel: Math.min(3, 1 + Math.floor(lvl / 3))
    };

    this.bullets = [];
    this.enemies = [];
    this.powerups = [];
    
    this.boss = {
      active: lvl === 10,
      x: 640,
      y: lvl === 10 ? 80 : -100,
      w: 220,
      h: 120,
      hp: 85,
      maxHp: 85,
      vx: 1.2
    };
  }

  loop() {
    if (!this.isPlaying) return;

    const w = 1280;
    const h = 720;

    const speed = 2.2;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) this.player.x -= speed;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) this.player.x += speed;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) this.player.y -= speed;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) this.player.y += speed;

    this.player.x = Math.max(30, Math.min(w - 30, this.player.x));
    this.player.y = Math.max(40, Math.min(h - 40, this.player.y));

    this.spawnTimer++;
    if (this.spawnTimer % 18 === 0 || (this.keys['Space'] && this.spawnTimer % 12 === 0)) {
      sfx.playBeep(780, 'square', 0.05);
      if (this.player.weaponLevel === 1) {
        this.bullets.push({ x: this.player.x, y: this.player.y - 25, vy: -4.5 });
      } else if (this.player.weaponLevel === 2) {
        this.bullets.push({ x: this.player.x - 14, y: this.player.y - 20, vy: -4.5 });
        this.bullets.push({ x: this.player.x + 14, y: this.player.y - 20, vy: -4.5 });
      } else {
        this.bullets.push({ x: this.player.x - 18, y: this.player.y - 20, vy: -4.5, vx: -0.8 });
        this.bullets.push({ x: this.player.x, y: this.player.y - 28, vy: -5.0, vx: 0 });
        this.bullets.push({ x: this.player.x + 18, y: this.player.y - 20, vy: -4.5, vx: 0.8 });
      }
    }

    if (!this.boss.active && this.spawnTimer % 65 === 0 && this.killedEnemies < this.targetEnemies) {
      this.enemies.push({
        x: 60 + Math.random() * (w - 120),
        y: -40,
        w: 42,
        h: 42,
        vy: 0.7 + Math.random() * 0.5
      });
    }

    // Check Mission Clearance
    if (!this.boss.active && this.killedEnemies >= this.targetEnemies && this.enemies.length === 0) {
      if (this.level < this.maxLevels) {
        sfx.playBeep(880, 'sine', 0.2);
        this.loadMission(this.level + 1);
      }
    }

    // Move Bullets
    this.bullets.forEach(b => {
      b.y += b.vy;
      if (b.vx) b.x += b.vx;
    });
    this.bullets = this.bullets.filter(b => b.y > -20);

    // Move Enemies
    this.enemies.forEach(e => {
      e.y += e.vy;

      if (Math.hypot(this.player.x - e.x, this.player.y - e.y) < 26) {
        this.isPlaying = false;
        this.renderIdleScreen(false);
        submitScoreToVirtualOlimpix('Raptor Jet Fighter', this.score, 'retro');
        return;
      }

      this.bullets.forEach(b => {
        if (Math.hypot(b.x - e.x, b.y - e.y) < 22) {
          e.dead = true;
          b.dead = true;
          this.score += 150;
          this.killedEnemies++;
          sfx.playBeep(650, 'triangle', 0.08);

          if (Math.random() < 0.3) {
            this.powerups.push({ x: e.x, y: e.y, vy: 1.2 });
          }
        }
      });
    });

    this.enemies = this.enemies.filter(e => !e.dead && e.y < h + 40);
    this.bullets = this.bullets.filter(b => !b.dead);

    // Move Powerups
    this.powerups.forEach(p => {
      p.y += p.vy;
      if (Math.hypot(this.player.x - p.x, this.player.y - p.y) < 28) {
        p.collected = true;
        this.player.weaponLevel = Math.min(3, this.player.weaponLevel + 1);
        this.score += 300;
        sfx.playBeep(990, 'sine', 0.15);
      }
    });
    this.powerups = this.powerups.filter(p => !p.collected && p.y < h + 30);

    // Boss Fight
    if (this.boss.active) {
      this.boss.x += this.boss.vx;
      if (this.boss.x < 70 || this.boss.x > w - 70) this.boss.vx *= -1;

      this.bullets.forEach(b => {
        if (Math.abs(b.x - this.boss.x) < 55 && Math.abs(b.y - this.boss.y) < 35) {
          b.dead = true;
          this.boss.hp--;
          sfx.playBeep(450, 'square', 0.05);

          if (this.boss.hp <= 0) {
            this.isPlaying = false;
            this.score += 8000;
            this.renderIdleScreen(true);
            submitScoreToVirtualOlimpix('Cyber Jet Defender', this.score, 'retro');
            return;
          }
        }
      });
    }

    // Render Scene
    this.ctx.fillStyle = '#030718';
    this.ctx.fillRect(0, 0, w, h);

    this.bullets.forEach(b => {
      this.ctx.fillStyle = '#00f3ff';
      this.ctx.fillRect(b.x - 2, b.y, 4, 12);
    });

    this.enemies.forEach(e => this.drawEnemyJetSprite(e.x, e.y));

    if (this.boss.active) {
      this.drawBossMothershipSprite(this.boss.x, this.boss.y, this.boss.hp, this.boss.maxHp);
    }

    this.drawRaptorPlayerJetSprite(this.player.x, this.player.y);

    // HUD Header
    this.ctx.font = '700 14px "Orbitron", sans-serif';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillText(`MISSIONE ${this.level}/10 | PUNTI: ${this.score}`, 15, 25);

    requestAnimationFrame(() => this.loop());
  }

  drawRaptorPlayerJetSprite(x, y) {
    this.ctx.save();
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - 22);
    this.ctx.lineTo(x + 18, y + 16);
    this.ctx.lineTo(x + 6, y + 12);
    this.ctx.lineTo(x, y + 18);
    this.ctx.lineTo(x - 6, y + 12);
    this.ctx.lineTo(x - 18, y + 16);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  drawEnemyJetSprite(x, y) {
    this.ctx.save();
    this.ctx.fillStyle = '#ff0055';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + 16);
    this.ctx.lineTo(x + 14, y - 12);
    this.ctx.lineTo(x - 14, y - 12);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  drawBossMothershipSprite(x, y, hp, maxHp) {
    this.ctx.save();
    this.ctx.fillStyle = '#ff007f';
    this.ctx.fillRect(x - 55, y - 25, 110, 50);

    const hpWidth = (hp / maxHp) * 100;
    this.ctx.fillStyle = '#00ff87';
    this.ctx.fillRect(x - 50, y - 40, hpWidth, 8);
    this.ctx.restore();
  }

  renderIdleScreen(win = false) {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;

    this.ctx.fillStyle = '#030718';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = win ? '#00ff87' : '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(win ? 'VITTORIA! TUTTE LE 10 MISSIONI VINTE!' : 'CYBER JET DEFENDER (10 MISSIONI)', w / 2, h / 2 - 20);
  }
}

// Aim Trainer, Memory Matrix, Cyber Racer
class AimTrainerGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.initCanvas();
    this.setupControls();
    this.renderIdleScreen();
  }

  initCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parentW = this.canvas.parentElement.clientWidth || 320;
    const parentH = this.canvas.parentElement.clientHeight || 280;
    this.canvas.width = parentW * dpr;
    this.canvas.height = parentH * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalWidth = parentW;
    this.logicalHeight = parentH;
  }

  resizeCanvas() { this.initCanvas(); }

  setupControls() {
    const clickHandler = (clientX, clientY) => {
      if (!this.isPlaying) return;
      const rect = this.canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      if (Math.hypot(clickX - this.target.x, clickY - this.target.y) <= this.target.r) {
        this.score += 250;
        sfx.playBeep(880, 'sine', 0.08);
        this.spawnTarget();
      }
    };

    this.canvas.addEventListener('click', (e) => clickHandler(e.clientX, e.clientY));
  }

  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 0;
    this.timeLeft = 30;
    this.spawnTarget();

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.isPlaying = false;
        this.renderIdleScreen(true);
        submitScoreToVirtualOlimpix('Aim Trainer', this.score, 'fps');
      }
    }, 1000);

    this.loop();
  }

  spawnTarget() {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;
    this.target = { x: 35 + Math.random() * (w - 70), y: 50 + Math.random() * (h - 90), r: 16 + Math.random() * 8 };
  }

  loop() {
    if (!this.isPlaying) return;
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;
    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.fillStyle = '#ff007f';
    this.ctx.beginPath();
    this.ctx.arc(this.target.x, this.target.y, this.target.r, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.font = '700 15px "Orbitron", sans-serif';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillText(`TEMPO: ${this.timeLeft}s | PUNTI: ${this.score}`, 15, 25);
    requestAnimationFrame(() => this.loop());
  }

  renderIdleScreen(win = false) {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;
    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = win ? '#00ff87' : '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(win ? `TEMPO SCADUTO! PUNTI: ${this.score}` : 'CYBER REFLEX AIM TRAINER', w / 2, h / 2 - 15);
  }
}

class SpaceShooterGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.initCanvas();
    this.setupControls();
    this.renderIdleScreen();
  }

  initCanvas() {
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.logicalWidth = 1280;
    this.logicalHeight = 720;
  }

  resizeCanvas() { this.initCanvas(); }

  setupControls() {
    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isPlaying) return;
      const rect = this.canvas.getBoundingClientRect();
      this.playerX = (e.clientX - rect.left) * (1280 / rect.width);
    });
  }

  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 0;
    this.playerX = 640;
    this.bullets = [];
    this.enemies = [];
    this.spawnTimer = 0;
    this.loop();
  }

  loop() {
    if (!this.isPlaying) return;
    const w = 1280;
    const h = 720;
    this.spawnTimer++;

    if (this.spawnTimer % 20 === 0) this.bullets.push({ x: this.playerX, y: h - 50 });
    if (this.spawnTimer % 90 === 0) this.enemies.push({ x: 50 + Math.random() * (w - 100), y: -30, vy: 0.65 });

    this.bullets.forEach(b => b.y -= 4.0);
    this.bullets = this.bullets.filter(b => b.y > -20);

    this.enemies.forEach(e => {
      e.y += e.vy;
      this.bullets.forEach(b => {
        if (Math.hypot(b.x - e.x, b.y - e.y) < 24) {
          e.dead = true;
          b.dead = true;
          this.score += 100;
        }
      });
    });

    this.enemies = this.enemies.filter(e => !e.dead && e.y < h + 40);
    this.bullets = this.bullets.filter(b => !b.dead);

    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);

    this.ctx.fillStyle = '#00f3ff';
    this.bullets.forEach(b => this.ctx.fillRect(b.x - 3, b.y, 6, 16));

    this.ctx.fillStyle = '#ff007f';
    this.enemies.forEach(e => {
      this.ctx.beginPath();
      this.ctx.arc(e.x, e.y, 18, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.fillStyle = '#ffd700';
    this.ctx.beginPath();
    this.ctx.moveTo(this.playerX, h - 55);
    this.ctx.lineTo(this.playerX + 24, h - 15);
    this.ctx.lineTo(this.playerX - 24, h - 15);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.font = '700 20px "Orbitron", sans-serif';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.fillText(`PUNTI: ${this.score}`, 25, 38);
    requestAnimationFrame(() => this.loop());
  }

  renderIdleScreen() {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;
    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('NEON SPACE DEFENDER', w / 2, h / 2 - 15);
  }
}

class MemoryMatrixGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.initCanvas();
    this.renderIdleScreen();
  }
  initCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parentW = this.canvas.parentElement.clientWidth || 320;
    const parentH = this.canvas.parentElement.clientHeight || 280;
    this.canvas.width = parentW * dpr;
    this.canvas.height = parentH * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalWidth = parentW;
    this.logicalHeight = parentH;
  }
  resizeCanvas() { this.initCanvas(); }
  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 500;
    this.renderIdleScreen(true);
    submitScoreToVirtualOlimpix('Cyber Memory Code', this.score, 'retro');
  }
  renderIdleScreen(win = false) {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;
    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = win ? '#00ff87' : '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(win ? 'MEMORIA COMPLETATA!' : 'CYBER MEMORY CODE', w / 2, h / 2 - 15);
  }
}

class CyberRacerGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isPlaying = false;
    this.score = 0;
    this.initCanvas();
    this.renderIdleScreen();
  }
  initCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parentW = this.canvas.parentElement.clientWidth || 320;
    const parentH = this.canvas.parentElement.clientHeight || 280;
    this.canvas.width = parentW * dpr;
    this.canvas.height = parentH * dpr;
    this.ctx.scale(dpr, dpr);
    this.logicalWidth = parentW;
    this.logicalHeight = parentH;
  }
  resizeCanvas() { this.initCanvas(); }
  start() {
    this.initCanvas();
    this.isPlaying = true;
    this.score = 1200;
    this.renderIdleScreen(true);
    submitScoreToVirtualOlimpix('Retro Cyber Racer', this.score, 'retro');
  }
  renderIdleScreen(win = false) {
    const w = this.logicalWidth || 320;
    const h = this.logicalHeight || 320;
    this.ctx.fillStyle = '#040612';
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.font = '900 18px "Orbitron", sans-serif';
    this.ctx.fillStyle = win ? '#00ff87' : '#00f3ff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(win ? 'CORSA CONCLUSA!' : 'RETRO CYBER RACER', w / 2, h / 2 - 15);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.marioGame = new CyberLuisGame('mario-canvas');
  window.doomGame = new DoomRaycasterGame('doom-canvas');
  window.raptorGame = new RaptorJetGame('raptor-canvas');
  window.aimTrainer = new AimTrainerGame('aim-canvas');
  window.spaceShooter = new SpaceShooterGame('shooter-canvas');
  window.memoryMatrix = new MemoryMatrixGame('memory-canvas');
  window.cyberRacer = new CyberRacerGame('racer-canvas');
});
