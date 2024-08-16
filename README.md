# Street Samurai Aug Clinic

This is a [Next.js](https://nextjs.org/) project for the Street Samurai Aug Clinic, a fictional cyberpunk-themed augmentation clinic website.

## Project Overview

This project is a web application for a futuristic augmentation clinic. It features a unique design with a water-based background animation and custom fonts for a cyberpunk aesthetic.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Three.js](https://threejs.org/) (via @react-three/fiber and @react-three/drei) - 3D library for creating and displaying 3D computer graphics
- [MDX](https://mdxjs.com/) - Markdown for the component era

## Project Structure

```
src/
├── app/
│   ├── (ui)/
│   │   ├── content.mdx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── water/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── water/
│   │   ├── frag-shader.glsl
│   │   ├── vertex-shader.glsl
│   │   └── water.tsx
│   ├── background.tsx
│   ├── content.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   └── projection.tsx
└── lib/
    ├── fonts/
    │   ├── kode-mono.ts
    │   ├── kode-mono.ttf
    │   ├── libre-barcode-128-text.ts
    │   └── libre-barcode-128-text.ttf
    ├── env.ts
    └── hook.ts
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Custom Components

- `Header`: Contains the main title with a custom barcode font
- `Footer`: Currently empty, can be expanded for additional content
- `Background`: Renders the water animation using Three.js
- `Water`: Implements the water shader and animation
- `Projection`: Creates a 3D text effect

## Styling

The project uses Tailwind CSS for styling, with custom configurations in `tailwind.config.ts`. Custom fonts are implemented using Next.js font optimization.

## Content Management

Content is managed using MDX, allowing for easy integration of Markdown and React components. The main content is located in `src/app/(ui)/content.mdx`.

## Deployment

The project is set up for easy deployment on Vercel. For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Future Improvements

- Implement more interactive 3D elements
- Expand content with additional pages
- Enhance accessibility features
- Optimize performance for mobile devices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
