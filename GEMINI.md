# Choir Room Project Context

## Overview

`choir-room` is a web application built using Astro, React, and Tailwind CSS. It leverages Tone.js for web audio functionality, offering interactive musical features.

## Tech Stack

- **Framework:** Astro
- **UI Components:** React
- **Styling:** Tailwind CSS
- **Audio:** Tone.js
- **Language:** TypeScript & JavaScript
- **Data:** YAML (for songs)

## Project Structure

- `src/` - The main source code directory.
  - `src/pages/` - Astro routes (e.g., `index.astro`).
  - `src/components/` - Reusable UI components built with React or Astro.
  - `src/layouts/` - Astro layouts wrapping page content.
  - `src/choir.ts` - The core module handling audio logic via Tone.js.
  - `src/songs.yml` - Stores structural data or parameters for various songs.
- `public/` - Static assets such as images, icons, or audio assets served directly to the client.
- `astro.config.mjs` - Configuration for Astro integrations (React, Tailwind, Astro Compress).

## Commands

- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`

## Agentic Guidelines

- Stick to Vanilla CSS or Tailwind CSS exclusively, depending on the scope of changes required.
- Maintain clear separation between Astro layout components and interactive React components. Use appropriate Astro client directives (e.g., `client:load`, `client:visible`, `client:only="react"`) when embedding React components that use interactive hooks.
- Use `Tone.js` for all audio synthesis and sequencing, managing audio contexts cleanly to ensure cross-browser compatibility.
- Consult the `src/songs.yml` manifest when dealing with the song data logic, and parse properly in Astro.

## Workflows

### Add a Song Workflow
1. **Identify the Audio Directory**: You will be given an audio asset directory in `public/` (e.g., `public/agnus-dei`).
2. **Determine Song Details**:
   - Guess the `name` (title) of the song from the folder name (e.g., "Agnus Dei" from `agnus-dei`).
   - The `id` will be the folder name itself (e.g., `agnus-dei`).
   - Prompt the user to input the `bpm` (beats per minute) and the `measure` (beats per measure).
3. **Scan Tracks**: Read the contents of the given audio asset directory to identify the track names and their filenames (e.g., `soprano.m4a`, `alto.m4a`, `tenor.m4a`, `bass.m4a`). The track name should be derived and capitalized from the file name.
4. **Sort Tracks**: Order the scanned tracks following a standard musical arrangement structure. Prioritize rhythmic/foundational tracks (e.g., Metronome, Click, Drum), followed by accompaniments (e.g., Piano, Solo), and finally the choral sections in standard pitch descending order (Soprano, Alto, Tenor, Baritone, Bass).
5. **Update Manifest**: Append the gathered information as a new song entry in `src/songs.yml` at the end of the file, matching the structure:
   - `id`
   - `name`
   - `bpm`
   - `measure`
   - `tracks`
6. **Verify**: Notify the user that the song has been added to the manifest.
