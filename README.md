# Cygni Väst Avgång

This Next.js app shows departues close to the Cygni Gothenburg office, with the help from the Västtrafik API.

### Techstack

- [Next.js](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.com/)

### The departue areas are:

- Kungportsplatsen
- Brunsparken
- Nordstan
- Centralstationen (Trams)
- Centralstationen (Trains)

## Start

Go to the project directory.

- npm install
- npm run dev
- Go to http://localhost:3000

## Västtrafik API

To fetch the required data, we use the Västrafik API. To test the app locally, go to [Västtrafik developer portal](https://developer.vasttrafik.se/) and create a account and to get a Auth key. Paste your Auth key into you .env file

> NEXT*PUBLIC_VASTTRAFIK_AUTH_KEY={\_YOU_AUTH_KEY_HERE*}

The token should then be fetch through the TokenService.ts
[TokenService.ts](./services/TokenService.ts)

## Vercel

The app is hosted via Vercel. You can access the app via https://cygni-vast-avgang.vercel.app/

To learn more about Vecel + Next.js together, go to [Vercel docs](https://vercel.com/docs/frameworks/nextjs)
