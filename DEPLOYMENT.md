# Cloudflare Pages Deployment Guide

This guide explains how to deploy the Kadkilat Page application to Cloudflare Pages.

## Prerequisites

- Node.js 18+ installed
- A Cloudflare account
- Git repository hosted on GitHub
- Wrangler CLI installed globally: `npm install -g wrangler`

## Quick Start

### 1. Initial Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd kadkilat-page
   npm install
   ```

2. **Login to Cloudflare:**
   ```bash
   npm run cf:login
   ```

3. **Verify authentication:**
   ```bash
   npm run cf:whoami
   ```

### 2. Local Development with Cloudflare

1. **Copy environment files:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Preview with Cloudflare Pages locally:**
   ```bash
   npm run preview
   ```
   This will build and serve your app at `http://localhost:8788`

### 3. Manual Deployment

1. **Deploy to preview:**
   ```bash
   npm run deploy
   ```

2. **Deploy to production:**
   ```bash
   npm run deploy:production
   ```

## Automated Deployment (GitHub Actions)

### Setup GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

1. **CLOUDFLARE_API_TOKEN**: 
   - Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Create token with "Cloudflare Pages:Edit" permissions

2. **CLOUDFLARE_ACCOUNT_ID**:
   - Found in your Cloudflare dashboard sidebar

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:

- **On push to main/master**: Deploy to production
- **On pull request**: Deploy preview for testing

## Environment Variables

### Local Development

Copy `.env.local.example` to `.env.local` and configure:

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG_MODE=true
```

### Production (Cloudflare Dashboard)

Set these in your Cloudflare Pages project settings:

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://kadkilat-page.pages.dev
```

## Configuration Files

### wrangler.toml

The `wrangler.toml` file contains:
- Project name and compatibility settings
- Build configuration
- Environment-specific settings
- Security headers

### next.config.mjs

Configured with:
- `@cloudflare/next-on-pages` development platform setup
- Optimizations for Cloudflare Pages

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run pages:build` | Build for Cloudflare Pages (with linting) |
| `npm run pages:build:ci` | Build for CI/CD (no linting) |
| `npm run preview` | Preview locally with Cloudflare |
| `npm run deploy` | Deploy to Cloudflare Pages |
| `npm run deploy:production` | Deploy to production environment |
| `npm run cf:login` | Login to Cloudflare |
| `npm run cf:whoami` | Check Cloudflare authentication |

## Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors:**
   ```bash
   npm run type-check
   ```

2. **Authentication issues:**
   ```bash
   npm run cf:login
   npm run cf:whoami
   ```

3. **Environment variables not working:**
   - Check Cloudflare Pages dashboard settings
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access

4. **Preview not working locally:**
   ```bash
   # Clear build cache
   rm -rf .next .vercel
   npm run pages:build
   npm run preview
   ```

### Getting Help

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## Security

- Never commit `.env.local` or `.dev.vars` files
- Use GitHub Secrets for sensitive data
- Review security headers in `wrangler.toml`
- Regularly update dependencies

## Performance

The application is optimized for Cloudflare Pages with:
- Image optimization using Next.js Image component
- Lazy loading and virtualization
- Smart caching strategies
- Edge-side rendering capabilities