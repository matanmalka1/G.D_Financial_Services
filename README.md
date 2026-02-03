# G.D Financial Services

A modern, responsive website for G.D Financial Services built with React, Vite, and Tailwind CSS. The site showcases financial advisory services, business consulting solutions, and company information with a multilingual interface.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS for beautiful UI across all devices
- **Multilingual Support**: Full internationalization (i18n) support for multiple languages
- **Modern Components**: Reusable React components with best practices
- **Fast Performance**: Built with Vite for optimized development and production builds
- **Form Validation**: Robust form handling with React Hook Form and Zod validation
- **Accessibility**: Accessible UI components using Radix UI
- **Analytics Integration**: Built-in analytics service for tracking user interactions
- **Dynamic Content**: Content management system with context API for state management

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build](#build)
- [Project Structure Details](#project-structure-details)
- [Key Features](#key-features)

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.12.0
- **Forms**: React Hook Form 7.71.0 with Zod 4.3.5 validation
- **UI Components**: Radix UI (Select), Lucide React (Icons)
- **Notifications**: React Hot Toast
- **Language Support**: Custom i18n implementation with JSON locale files
- **Development**: Vite React plugin with Fast Refresh

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Shared components (Logo, Header, etc.)
│   ├── layout/              # Layout components (Navbar, Footer, Layout wrapper)
│   ├── sections/            # Page sections (Clients, etc.)
│   ├── sector/              # Sector-specific components
│   └── ui/                  # UI components (Cards, Buttons, etc.)
├── config/
│   └── contexts.js          # Context configuration
├── constants/
│   └── index.js             # Application constants
├── context/
│   └── ContentContext.jsx   # Global content context
├── data/
│   └── mockData.js          # Mock data for development
├── hooks/
│   ├── useContent.js        # Content management hook
│   └── useLanguage.js       # Language/i18n hook
├── i18n/
│   ├── LanguageContext.jsx  # Language context provider
│   ├── translations.js      # Translation utilities
│   └── locales/             # JSON translation files for each page
├── pages/
│   ├── CompanyProfile.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── News.jsx
│   ├── SectorDetail.jsx
│   └── Sectors.jsx
├── routes/
│   └── paths.js             # Route definitions
├── services/
│   ├── analyticsService.js  # Analytics tracking
│   └── contentService.js    # Content fetching/management
├── utils/
│   ├── helpers/             # Helper functions
│   └── validators/          # Form validators
├── App.jsx                  # Root component
└── main.jsx                 # Application entry point

public/
├── logo.avif                # Company logo
└── owner_photo.avif         # Owner spotlight image
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm or yarn
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/matanmalka1/G.D_Financial_Services.git
cd G.D_Financial_Services
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 💻 Development

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally

### Development Workflow

1. Make changes to components/pages in the `src/` directory
2. Changes are automatically reflected in the browser with hot refresh
3. Use React DevTools for component debugging

### Adding New Pages

1. Create a new component in `src/pages/`
2. Define the route in `src/routes/paths.js`
3. Add translations to `src/i18n/locales/` for each language
4. Import and use the `useLanguage()` hook for translated content

### Adding New Components

Place reusable components in the appropriate folder under `src/components/`:

- **common/**: UI elements shared across multiple pages
- **layout/**: Layout wrappers and structure
- **ui/**: Atomic UI components (buttons, cards, etc.)
- **sections/**: Page-specific sections
- **sector/**: Sector-specific components

## 🔨 Build

### Production Build

```bash
npm run build
```

This generates an optimized production build in the `dist/` directory.

### Preview Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

## 📚 Project Structure Details

### Components

- **Layout**: Main layout wrapper with Navbar and Footer
- **Navbar**: Responsive navigation with language toggle and mobile menu
- **Footer**: Multi-section footer with brand, links, contact info, and social media
- **Sections**: Page-specific content sections (Clients, Related Articles, etc.)
- **UI**: Reusable components like Cards, Buttons, Search bars, etc.

### Pages

- **Home**: Landing page with hero section, features, and CTA
- **Sectors**: Displays available business sectors with filtering
- **SectorDetail**: Individual sector information and related services
- **News**: News and insights listing with pagination
- **CompanyProfile**: About the company and team information
- **Contact**: Contact form and company information

### i18n (Internationalization)

The project supports multiple languages through JSON locale files:

- `global.json` - Global/shared translations
- `home.json` - Home page translations
- `sectors.json`, `sectorDetail*.json` - Sector-related translations
- `news.json` - News page translations
- `contact.json` - Contact page translations
- `companyProfile.json` - Company profile translations

## 🎯 Key Features

### Responsive Navigation

- Desktop and mobile-optimized navigation
- Language toggle for multilingual support
- Sticky header with parallax effects

### Content Management

- Context API for global state management
- Custom hooks for content and language
- Mock data integration for development

### Form Handling

- React Hook Form for efficient form management
- Zod schema validation
- Toast notifications for user feedback

### Analytics

- Built-in analytics service for tracking user interactions
- Event logging and monitoring

### Performance

- Optimized with Vite's fast build and dev server
- Code splitting and lazy loading ready
- Tailwind CSS for minimal CSS output

## 📦 Dependencies

See `package.json` for the complete list of dependencies. Key packages include:

- React & React DOM (UI library)
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router DOM (Client-side routing)
- React Hook Form (Form management)
- Zod (Schema validation)
- Radix UI (Accessible components)

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Push to your branch
4. Submit a pull request

## 📄 License

This project is proprietary software for G.D Financial Services.

## 📞 Contact

For inquiries, please visit the Contact page or reach out through the company website.

---

**Last Updated**: February 2026
**Version**: 0.0.0
