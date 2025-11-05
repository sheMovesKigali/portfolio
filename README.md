# SheMoves Kigali 🚗💪

A modern, responsive website for SheMoves Kigali - a women-driven ride-sharing platform that prioritizes safety, empowerment, and community in Kigali, Rwanda.

## 🌟 About the Project

SheMoves Kigali is more than just a transportation service. It's a platform built by women, for women, focusing on:

- **Safety First**: Vetted women drivers providing secure rides
- **Women's Empowerment**: Supporting women drivers with fair income opportunities
- **Community Building**: Rooted in Kigali's local culture and values

The website showcases the platform's mission, driver opportunities, and provides contact information for potential riders and drivers.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Contact Forms**: Integrated contact and driver application forms
- **Email Integration**: Automated email notifications using Resend
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast loading
- **SEO Ready**: Optimized for search engines

## 🛠️ Technologies Used

### Frontend
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Turbopack** - Fast bundler for development

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **Resend** - Email delivery service
- **React Email** - Email template components

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **pnpm** - Fast, disk space efficient package manager

### Deployment
- **Vercel** - Hosting platform (recommended)
- **Node.js** - Runtime environment

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18.17 or later)
- **pnpm** (recommended) or npm/yarn
- **Git** for version control

## 🏃‍♀️ Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sheMovesKigali/site
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Optional: Custom domain for emails
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
# Using pnpm (recommended)
pnpm dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
# Using pnpm
pnpm build

# Or using npm
npm run build

# Or using yarn
yarn build
```

### 6. Start Production Server

```bash
# Using pnpm
pnpm start

# Or using npm
npm start

# Or using yarn
yarn start
```

## 📁 Project Structure

```
site/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form endpoint
│   │   └── drive-application/ # Driver application endpoint
│   ├── contact/           # Contact page
│   ├── drive/             # Driver application page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Footer.tsx         # Site footer
│   ├── icons.tsx          # Icon components
│   └── Navbar.tsx         # Navigation bar
├── emails/                # Email templates
│   ├── ContactFormEmail.tsx
│   └── DriverApplicationEmail.tsx
├── public/                # Static assets
│   └── images/            # Image files
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎨 Design System

The website uses a consistent design system with:

- **Color Palette**: Dark theme with white/gray accents
- **Typography**: Clean, readable fonts optimized for web
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable UI components for consistency
- **Animations**: Subtle hover effects and transitions

## 📧 Email Integration

The project includes email functionality for:

- **Contact Form**: Sends inquiries to the team
- **Driver Applications**: Processes driver applications

Email templates are built using React Email components and sent via Resend.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
# Build the project
pnpm build

# The build output will be in the .next folder
# Deploy the .next folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4 with custom configuration for:
- Dark theme support
- Custom color palette
- Responsive design utilities

### TypeScript
Strict TypeScript configuration for:
- Type safety
- Better development experience
- Reduced runtime errors

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary to SheMoves Kigali.

## 📞 Support

For support or questions about this project, please contact:
- Email: shemoveskigali@gmail.com
- Website: [SheMoves Kigali](https://shemoveskigali.com)

---

**Built with ❤️ for women's empowerment in Kigali**