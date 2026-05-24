# Stopwatch & Timer

A small React app with a tabbed UI for a countdown timer and a stopwatch with lap times. Built with Vite and Tailwind CSS.

## Features

**Timer**
- Set hours, minutes, and seconds (default: 5 minutes)
- Start, pause, and reset
- Counts down to zero and stops automatically

**Stopwatch**
- Displays elapsed time in `MM:SS.CS` (centisecond precision)
- Start, pause, lap, and reset
- Lap list shows split times for each lap

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Install & run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Project Structure

```
src/
├── App.jsx                 # Tab layout and routing between modes
├── components/
│   ├── Timer.jsx           # Countdown timer
│   └── Stopwatch.jsx       # Stopwatch with laps
└── index.css               # Global styles (Tailwind)
```