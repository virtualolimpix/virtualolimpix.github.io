# 🏆 Virtual Olimpix v2.0.0 - The Ultimate Virtual Competition

**Sito Ufficiale:** https://virtualolimpix.github.io/

## 👑 Team Ufficiale & Crediti
- 💻 **Creatore del Sito**: Luigi "Luis" (*OldGamerDarthy*)
- 🏆 **Fondatore & Organizzatore Ufficiale dell'Evento**: Davide (*MicioSardo*)
- 🏛️ **Federazione Ufficiale**: **AVOP** (Association of Virtual Olimpix Players)

---

## 🎨 Note di Aggiornamento - Ultimi Lavori Completati (Release v2.0.0)

### 1. 🛡️ Design System & Tematizzazione Pitch Black Pure (#000000):
- **Sfondo Nero Assoluto (#000000)**: Uniformato lo sfondo dello Splash Screen e della Hero Section al nero assoluto per combaciare perfettamente con l'immagine trasparente del logo 3D.
- **Rimozione Laser Sweep & Faro Rotante**: Eliminata la linea laser orizzontale orrenda ed i fasci di luce faro rotanti nello Splash Screen (`.splash-overlay::before` e `::after` disattivati).
- **Eliminazione Bagliori & Tipografia Metallica 3D**: Rimosso qualsiasi bagliore o sfuocatura glow (`shadowBlur = 0`, `filter: none !important`) da logo, badge AVOP, titoli e pulsanti. Applicata una nitida ombreggiatura metallica 3D a sbalzo.
- **Logo Ufficiale 1:1**: Inclusa nel progetto l'immagine ufficiale dello stemma a scudo 1:1 (`images/official_logo_3d.png`), utilizzabile anche online senza percorsi locali.
- **Motto Centrale Pulito**: Rimosse le scritte HTML ridondanti, lasciando al centro della Hero l'iconico motto: `"COMPETE. UNITE. BECOME LEGEND."`.

### 2. 🎆 Motore Fuochi d'Artificio Realistici nello Splash:
- Implementato un motore Canvas 2D per fuochi d'artificio realistici a festa con scintille nitide e circoscritte attorno al logo dorato, senza ricolorare o lavare lo sfondo nero.

### 3. 🕹️ Suite dei 3 Mini-Giochi Ufficiali (Ottimizzati 16:9 PC 1080p):
Mantenuti **esclusivamente i 3 giochi principali** richiesti:
1. 🚀 **Neon Space Defender**: Sparatutto spaziale tattico contro la flotta aliena.
2. ✈️ **Cyber Jet Defender (10 Missioni)**: Campagna aerea contro squadriglie e Boss Finale alla Missione 10.
3. ⚡ **Cyber Luis Platformer (10 Livelli)**: Campagna platform a 10 mondi procedurali con Palle di Fuoco `[F]` e Castello Finale di Olimpix.

- **Riquadri 16:9 Espansi 1080p**: Rimosse le opzioni di ingrandimento a schermo intero ed usati i riquadri espansi in formato logico nativo `1280x720` (16:9).
- **Fisica Rallentata del 50%**: Rallentate significativamente le velocità di movimento di player, salti, nemici e proiettili per un'esperienza di gioco fluida, reattiva e piacevole.

### 4. 🎵 Sigla Ufficiale "Virtual Olimpix 2026.wav" & Player Audio:
- Integrata la sigla ufficiale **`Virtual Olimpix 2026.wav`**.
- Inserito il tasto **`🎵 Sigla Ufficiale`** nella Navbar di tutte le pagine del sito (Home, Mini-Giochi, Regolamento, Licenza) per riprodurre e mettere in pausa il brano in qualsiasi momento.

### 5. ⚡ Compatibilità PC Low-Budget & Finale 16-Bit:
- Aggiunta una modalità automatica alleggerita per computer con poca memoria o pochi core, mantenendo animate le immagini ufficiali del marchio.
- Ottimizzati canvas, trasparenze ed effetti grafici per ridurre rallentamenti e lampeggi.
- Potenziati i fuochi d'artificio dello Splash Screen con un finale interattivo e scoppi sintetizzati in stile console 16-bit/SNES dopo il click dell'utente.

### 6. 💾 Backup Completo del Progetto:
- Salvato il backup completo nella cartella `backup_v1.1.0/`.

---

## ⚖️ Licenza
Rilasciato sotto licenza **GNU General Public License v3.0 (GNU GPL-3.0)**.
Copyright (C) 2026 Virtual Olimpix by Davide (Miciosardo). Sito creato da Luigi Sestili Spurio.
