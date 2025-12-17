# PromptiX - Premium AI Technology Platform

A modern, professional homepage for PromptiX - an AI technology platform specializing in intelligent prompt engineering.

![PromptiX Logo](./public/logo.png)

## 🚀 Overview

PromptiX is a premium AI technology platform built with React, Tailwind CSS, and Framer Motion. The homepage showcases the brand's visual identity with a deep navy blue and subtle orange color palette, inspired by the official PromptiX logo.

## ✨ Features

- **Modern Design**: Clean, professional UI following the latest web design trends
- **Brand Consistency**: Strict adherence to PromptiX visual language
- **Smooth Animations**: Subtle, professional animations using Framer Motion
- **Fully Responsive**: Optimized for all device sizes
- **SEO Optimized**: Proper meta tags, semantic HTML, and accessibility features
- **Performance**: Fast load times and optimized assets

## 🎨 Design System

### Color Palette

- **Primary Navy**: `#0a1e3d` - Deep, professional navy blue
- **Accent Orange**: `#ff8c42` - Subtle orange for CTAs and highlights
- **Neutral Grays**: Various shades for text and backgrounds

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components

- Reusable button styles (primary/secondary)
- Consistent spacing and layout containers
- Professional heading hierarchy

## 📁 Project Structure

```
PromptiX/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Fixed navigation header
│   │   ├── Hero.jsx         # Hero section with CTAs
│   │   ├── Features.jsx     # 4 core AI features
│   │   ├── About.jsx        # Mission and values
│   │   ├── CTA.jsx          # Conversion-focused section
│   │   ├── Footer.jsx       # Footer with links
│   │   └── Logo.jsx         # SVG logo component
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles & Tailwind
├── public/                  # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies
```

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.19
- **Animations**: Framer Motion 12.23.26
- **Icons**: Lucide React 0.561.0

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PromptiX
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📄 Page Sections

### 1. Hero Section
- Powerful headline introducing PromptiX
- AI-focused tagline
- Primary CTA (orange accent)
- Secondary CTA (outlined)
- Animated geometric shapes inspired by logo
- Key statistics display

### 2. Features Section
- **Intelligent Prompt Engineering**: Advanced AI optimization
- **Lightning-Fast Processing**: Sub-second response times
- **Precision-Tuned Models**: Consistent, reliable results
- **Enterprise-Grade Security**: End-to-end encryption

### 3. About Section
- Mission statement
- Value propositions
- Animated circular visual inspired by logo
- Trust indicators

### 4. Call to Action
- High-contrast navy background
- Orange accent buttons
- Trust badges (14-day trial, no credit card, cancel anytime)
- Conversion-focused messaging

### 5. Footer
- PromptiX logo
- Navigation links (Product, Company, Resources, Legal)
- Social media links
- Copyright and legal links

## 🎯 Design Principles

1. **Professional, Not Playful**: Serious, enterprise-grade aesthetic
2. **Orange as Accent Only**: Used sparingly for CTAs and highlights
3. **Clean Typography**: Inter font for modern, readable text
4. **Subtle Animations**: Professional micro-interactions
5. **Accessibility First**: Semantic HTML and ARIA labels
6. **Mobile-First**: Responsive design for all devices

## 🔧 Customization

### Updating Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  navy: {
    950: '#0a1e3d', // Primary brand navy
  },
  orange: {
    500: '#ff8c42', // Primary brand orange
  },
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add to `src/App.jsx`
3. Follow existing component patterns for consistency

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

© 2025 PromptiX. All rights reserved.

## 🤝 Contributing

This is a proprietary project for PromptiX. For inquiries, please contact the development team.

---

Built with ❤️ by the PromptiX team
