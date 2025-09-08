# Kadkilat Page

A high-performance Next.js application optimized for Cloudflare Pages, featuring interactive image galleries with advanced performance optimizations.

## ✨ Features

- **🖼️ Optimized Image Gallery**: Smart image loading with Next.js Image component
- **⚡ Performance Optimized**: Lazy loading, virtualization, and intelligent caching
- **🌐 Interactive Maps**: Geographic visualization using react-simple-maps
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🚀 Edge Deployment**: Optimized for Cloudflare Pages with edge functions
- **🔄 Automated CI/CD**: GitHub Actions for seamless deployment
- **💨 Fast Loading**: Image preloading and smart caching strategies

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Image Slider**: [Swiper.js](https://swiperjs.com/)
- **Maps**: [React Simple Maps](https://www.react-simple-maps.io/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Language**: TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd kadkilat-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run pages:build` | Build for Cloudflare Pages (with validation) |
| `npm run pages:build:ci` | Build for CI/CD (optimized) |
| `npm run preview` | Preview with Cloudflare Pages locally |
| `npm run deploy` | Deploy to Cloudflare Pages |

## 🌐 Deployment

This project is configured for deployment on Cloudflare Pages. For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy

1. **Manual deployment:**
   ```bash
   npm run deploy
   ```

2. **Automated deployment:**
   - Push to `main` branch for automatic deployment via GitHub Actions
   - Set up required secrets in GitHub repository settings

## 🏗️ Project Structure

```
kadkilat-page/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── hooks/              # Custom React hooks
│   └── styles/             # CSS and styling files
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions CI/CD
├── wrangler.toml          # Cloudflare configuration
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # This file
```

## ⚡ Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Virtualization**: Only render visible slides in image galleries
- **Smart Caching**: Intelligent image preloading and caching
- **Edge Functions**: Server-side rendering at the edge
- **Static Generation**: Pre-rendered pages for optimal performance

## 🔧 Configuration

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG_MODE=true
```

For production deployment, set these in your Cloudflare Pages dashboard.

### TypeScript

The project uses TypeScript with strict type checking. Run `npm run type-check` to validate types.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 Additional Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment instructions
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - Cloudflare Pages documentation

## 🔗 Learn More

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API
- **[Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)** - Learn about Cloudflare Pages
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/docs/)** - TypeScript documentation

## 🚀 Performance Optimizations

This application includes several performance optimizations:

- **Image Optimization**: Using Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **Edge Functions**: Server-side rendering at Cloudflare's edge
- **Static Generation**: Pre-rendered pages for faster loading
- **Caching**: Intelligent caching strategies for images and data

## 🛠️ Development Tips

- Use `npm run type-check` to validate TypeScript before committing
- Run `npm run lint` to ensure code quality
- Test locally with `npm run preview` to simulate Cloudflare Pages environment
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment best practices
