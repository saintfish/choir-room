# Choir Room

`choir-room` is a web application built using Astro, React, and Tailwind CSS. It leverages Tone.js for web audio functionality, offering interactive musical features.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── choir.ts
│   └── songs.yml
├── astro.config.mjs
└── package.json
```

- `src/pages/` - Astro routes (e.g., `index.astro`).
- `src/components/` - Reusable UI components built with React or Astro.
- `src/layouts/` - Astro layouts wrapping page content.
- `src/choir.ts` - The core module handling audio logic via Tone.js.
- `src/songs.yml` - Stores structural data or parameters for various songs.
- `public/` - Static assets such as images, icons, or audio assets served directly to the client.
- `astro.config.mjs` - Configuration for Astro integrations (React, Tailwind, Astro Compress).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |

## 🎵 Adding a Song

To add a new song to the application:

1. Create a directory within `public/` containing the individual audio tracks (`.m4a` or `.mp3`), e.g., `public/agnus-dei`.
2. Determine the `bpm` (beats per minute) and `measure` (beats per measure).
3. Add a new entry to `src/songs.yml` representing your song and its tracks.

Example `songs.yml` entry:
```yaml
  - id: agnus-dei
    name: Agnus Dei
    bpm: 112
    measure: 4
    tracks:
      - name: Soprano
        audio: soprano.m4a
      - name: Alto
        audio: alto.m4a
      - name: Tenor
        audio: tenor.m4a
      - name: Bass
        audio: bass.m4a
```

### Audio Assets in `public/`

The `public/` directory stores song tracks as audio files (typically `.m4a` or `.mp3`). Each song is grouped into its own subfolder, named by the song's ID (e.g., `public/agnus-dei`, `public/what-sorrow-is-this`). Inside these folders, individual stem tracks (e.g., Soprano, Alto, Tenor, Bass, Piano, Metronome, etc.) are kept as separate files. Tone.js fetches these direct paths relative to the domain (e.g., `/agnus-dei/soprano.m4a`) to synthesize the song interactively.

See `GEMINI.md` for extended guidelines and workflows for developing this application.
