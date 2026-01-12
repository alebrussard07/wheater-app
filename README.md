# Weather App (Educational)

Simple weather application built for educational purposes to demonstrate fetching geolocation and weather data, React component structure, Material UI integration, and localStorage usage for favourites.

**Note:** The UI and code comments are in Italian in the source files.

**Table of Contents**
- **Project:** Overview and purpose
- **Features:** What the app does
- **Tech Stack:** Libraries and APIs used
- **How It Works:** App flow and API usage
- **Project Structure:** Important files and folders
- **Setup:** How to run locally
- **Usage:** How to use the app
- **Development Notes:** Tips, rate limits, and extension ideas
- **Contributing:** Suggestions for students
- **License:** Suggested license

**Project**

This repository contains a lightweight weather-dashboard created as an educational project. It teaches how to:
- Build a small React app with Vite
- Consume public web APIs (Nominatim, Open-Meteo)
- Use Material UI components for a neat layout
- Persist simple user data with `localStorage`

**Features**
- Search any city (geocoding via Nominatim)
- Display current weather (Open-Meteo)
- Add/remove favorite cities stored in `localStorage`
- Responsive layout using Material UI
- Simple, readable code aimed at learners

**Tech Stack**
- Vite (dev tooling)
- React (functional components + hooks)
- Material UI (components & icons)
- Fetch API for HTTP requests
- Public APIs: Nominatim (OpenStreetMap) and Open-Meteo

**How It Works**
1. User enters a city name and presses Enter or the search button.
2. App calls the geocoding endpoint (`getCityCoords`) to obtain latitude/longitude via Nominatim.
3. With coordinates, the app requests current weather from Open-Meteo (`getWeatherData`).
4. Results are displayed in the main card; the city can be saved as a favourite.
5. Favourites are stored in `localStorage` to persist between sessions.

The networking helpers live in [src/services/api.js](src/services/api.js#L1-L200) and demonstrate basic fetch usage for those public APIs.

**Project Structure (high level)**
- [index.html](index.html)
- [package.json](package.json)
- [vite.config.js](vite.config.js)
- [src/main.jsx](src/main.jsx)
- [src/App.jsx](src/App.jsx#L1-L400) — main React component (UI, state, favourites)
- [src/App.css](src/App.css)
- [src/index.css](src/index.css)
- [src/services/api.js](src/services/api.js#L1-L200) — API helpers (Nominatim + Open-Meteo)
- [public/](public/) — static assets

**Setup**

Prerequisites: Node.js (recommend v16+)

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

**Usage**
- Open the app in the browser (Vite prints the local URL, typically `http://localhost:5173`).
- Type a city name in the search field and press Enter or click Search.
- The main card shows the city name, temperature, and a weather description.
- Click the heart icon in the top-right of the card to add/remove the city from favourites.
- Click a favourite in the right column to load it again.

**Development Notes & Caveats**
- Nominatim (OpenStreetMap) is used for geocoding. It is free but subject to rate limits and usage policy — do not abuse it for heavy traffic. See [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/).
- Open-Meteo is used for weather; it requires no API key for basic usage but respect rate limits.
- The example includes a placeholder `getCityDetails` helper that notes where a paid GeoDB or RapidAPI call could be added (requires API keys).
- Error handling is basic (alerts and console errors) — consider improving UX for production apps.

**Ideas for Extension (great learning tasks)**
- Add hourly and multi-day forecast cards using the `daily` data from Open-Meteo.
- Improve geocoding: present multiple matches in an autocomplete dropdown.
- Add unit toggle (Celsius / Fahrenheit) and localization.
- Add tests for helper functions and components.
- Implement caching or debounce logic to reduce API calls.

**Contributing**
This project is educational — contributions and improvements are welcome. Consider opening issues or pull requests with small, focused changes (bugfix, feature, doc).

**License**
This repository is intended for educational use. If you want a permissive license, consider using the MIT License. Add a `LICENSE` file if you choose to publish under a specific license.

---

If you want, I can also:
- Commit the new `README.md` for you,
- Run the dev server and show logs,
- Add a small LICENSE file (e.g., MIT),
- Or translate the README fully into Italian.

Which of those would you like next?
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
