# Simple Landing Page

A simple landing page built with Next.js 14+, Tailwind CSS 3, and TypeScript.

## Features

- Modern tech stack (Next.js, Tailwind CSS, TypeScript)
- Responsive design
- SEO optimized
- Fast performance
- Easy to customize

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
simple-landing/
├── src/
│   ├── components/
│   │   ├── cta/
│   │   ├── features/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── layout/
│   │   └── navigation/
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── AppConfig.ts
├── public/
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Customization

You can customize the landing page by:

1. Modifying the components in the `src/components` directory
2. Updating the styles in `src/styles/global.css`
3. Changing the app configuration in `src/utils/AppConfig.ts`

## Building for Production

```bash
npm run build
```

Then, you can start the production server:

```bash
npm run start
```

## License

MIT
