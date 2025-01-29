# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Overview
This project is a movie recommendation application built as part of the SIL Frontend Engineer Assessment. It fetches movie data from The Movie Database (TMDB) API and provides a user-friendly interface for browsing, searching, and viewing movie details.

## Deployment
The application is deployed using Vercel and can be accessed here: [nyarikimovies](https://nyarikimovies.vercel.app/)

## Technologies Used
Framework: Nuxt 3 with Vuetify for UI components.

Authentication: Firebase for simple and efficient authentication.

Data Fetching: The Movie Database (TMDB) API.

Hosting & CI/CD: Vercel for automatic deployment and CI/CD.


## Features
Movie List: Displays a list of movies with basic information (title, poster, overview).

Movie Details: Shows detailed information for a selected movie, including cast, crew, and ratings.

Search Functionality: Allows users to search for movies by title or keyword.

Loaders & Pagination: Added loaders for data fetching and pagination to optimize performance.

## Design
I created a Figma design to guide the implementation, though some adjustments were made during development to accommodate changes on the fly.

## Areas for Improvement
Due to time constraints, I was unable to implement unit tests and a more sophisticated CI/CD pipeline. However, I’ve leveraged Vercel’s automated deployment process to ensure the application is deployed seamlessly.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
