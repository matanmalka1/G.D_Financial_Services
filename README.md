# G.D Financial Services

A modern, responsive website for G.D Financial Services built with React, Vite, and Tailwind CSS. The site showcases financial advisory services, business consulting solutions, and company information with a professional multilingual interface supporting English and Hebrew.

> **Note**: This is a proprietary website for G.D Financial Services. All content and code are protected intellectual property.

## 🌟 Features

- **🎨 Responsive Design**: Mobile-first approach with Tailwind CSS for beautiful UI across all devices
- **🌐 Multilingual Support**: Full internationalization (i18n) with English and Hebrew language support
- **⚡ Modern Components**: Reusable React components with best practices and hooks
- **🚀 Fast Performance**: Built with Vite for optimized development and production builds
- **✅ Form Validation**: Robust form handling with React Hook Form and Zod schema validation
- **♿ Accessibility**: Accessible UI components using Radix UI
- **📊 Analytics Integration**: Built-in analytics service for tracking user interactions
- **🎯 Dynamic Content**: Content management system with Context API for global state management
- **🔍 Search & Filtering**: Search functionality for articles and sectors with keyword-based filtering
- **📱 Mobile Optimization**: Optimized touch interactions and responsive layouts for all screen sizes

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build](#build)
- [Project Structure Details](#project-structure-details)
- [Key Features](#key-features)
- [Page Routes](#page-routes)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Tech Stack

### Core Framework

- **Frontend Framework**: React 19.2.3 - Modern UI library with hooks
- **Build Tool**: Vite 7.3.1 - Lightning-fast build tool with instant HMR
- **Styling**: Tailwind CSS 4.1.18 - Utility-first CSS framework
- **TypeScript Support**: Type safety with React types (optional)

### Routing & State

- **Routing**: React Router DOM 7.12.0 - Client-side routing with nested routes
- **State Management**: React Context API - Global state management for content and language
- **Custom Hooks**: useContent, useLanguage - Domain-specific custom hooks

### Forms & Validation

- **Forms**: React Hook Form 7.71.0 - Efficient form state management
- **Validation**: Zod 4.3.5 - TypeScript-first schema validation
- **Phone Input**: libphonenumber-js 1.12.36 - International phone number handling

### UI Components & Styling

- **UI Library**: Radix UI (Select component) - Unstyled, accessible components
- **Icons**: Lucide React 0.562.0 - Beautiful, consistent icon library
- **Notifications**: Sonner 2.0.7 - Toast notifications and alerts

## 📁 Project Structure

```
.
├── index.html                          # HTML entry point
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── package.json                        # Project dependencies and scripts
├── metadata.json                       # Project metadata
├── public/                             # Static assets
│   ├── logo.avif                      # Company logo
│   ├── owner_photo.avif               # Owner spotlight image
│   └── *.avif                         # Service and feature images
│
├── src/
│   ├── components/
│   │   ├── common/                    # Shared utility components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── LoadBoundary.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ParallaxHeader.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── SocialLogos.jsx
│   │   │
│   │   ├── layout/                    # Layout structure components
│   │   │   ├── Layout.jsx             # Root layout wrapper
│   │   │   ├── Navbar.jsx             # Main navigation
│   │   │   ├── Footer.jsx             # Footer section
│   │   │   ├── navbar/                # Navbar sub-components
│   │   │   └── footer/                # Footer sub-components
│   │   │
│   │   ├── sections/                  # Full-width page sections
│   │   │   └── ClientsSection.jsx
│   │   │
│   │   ├── sector/                    # Sector-specific components
│   │   │   ├── SectorBenefitsCard.jsx
│   │   │   ├── SectorServices.jsx
│   │   │   ├── SectorValueBubbles.jsx
│   │   │   ├── SectorTile.jsx
│   │   │   └── RelatedArticlesSection.jsx
│   │   │
│   │   └── ui/                        # Reusable UI components
│   │       ├── EmptyState.jsx
│   │       ├── ErrorState.jsx
│   │       ├── FeatureBubble.jsx
│   │       ├── LoadingGrid.jsx
│   │       ├── NewsCard.jsx
│   │       ├── OwnerSpotlight.jsx
│   │       ├── Pagination.jsx
│   │       ├── PhoneNumberInput.jsx
│   │       ├── SearchBar.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── Select.jsx
│   │       ├── phone/                 # Phone input sub-components
│   │       └── primitives/            # Basic UI primitives
│   │
│   ├── constants/
│   │   ├── index.js                   # Application constants
│   │   ├── pagination.js              # Pagination configuration
│   │   └── sectorKeywords.js          # Keywords for sector filtering
│   │
│   ├── context/
│   │   └── ContentContext.jsx         # Global content context provider
│   │
│   ├── data/
│   │   ├── mockData.js                # Mock articles and sectors
│   │   └── countries.js               # Country list data
│   │
│   ├── hooks/
│   │   ├── useContent.js              # Hook for accessing content context
│   │   └── useLanguage.js             # Hook for i18n and language management
│   │
│   ├── i18n/                          # Internationalization
│   │   ├── LanguageContext.jsx        # Language context provider
│   │   ├── translations.js            # Translation utility functions
│   │   └── locales/                   # Translation files by language
│   │       ├── global.json            # Shared translations
│   │       ├── home.json              # Home page
│   │       ├── contact.json           # Contact page
│   │       ├── news.json              # News page
│   │       ├── companyProfile.json    # Company profile page
│   │       ├── sectorBusinessConsulting.json
│   │       ├── sectorBusinessPlan.json
│   │       ├── sectorBusinessPresentations.json
│   │       ├── sectorDetailCommon.json
│   │       ├── sectorOngoingAdvisory.json
│   │       └── ... (more sector translations)
│   │
│   ├── pages/                         # Page components (top-level routes)
│   │   ├── Home.jsx                   # Landing page
│   │   ├── CompanyProfile.jsx         # About company
│   │   ├── Sectors.jsx                # Services/sectors listing
│   │   ├── SectorDetail.jsx           # Individual sector details
│   │   ├── News.jsx                   # News/insights page
│   │   └── Contact.jsx                # Contact form page
│   │
│   ├── routes/
│   │   └── paths.js                   # Route path definitions
│   │
│   ├── services/
│   │   ├── analyticsService.js        # Analytics tracking
│   │   └── contentService.js          # Content fetching and filtering
│   │
│   ├── utils/
│   │   ├── helpers/                   # Utility functions
│   │   └── validators/                # Custom validators
│   │
│   ├── validation/
│   │   └── contactSchema.js           # Zod schema for contact form
│   │
│   ├── App.jsx                        # Root component with routes
│   └── main.jsx                       # Application entry point and React initialization
│
└── dist/                              # Production build output (generated)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher (v18+ recommended)
- **npm** or **yarn**: Package manager (npm comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code or your preferred editor (with optional Vite and React plugins)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/matanmalka1/G.D_Financial_Services.git
cd G.D_Financial_Services
```

#### 2. Install Dependencies

Install all project dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

#### 3. Start the Development Server

Start the Vite development server with hot module replacement:

```bash
npm run dev
# or
yarn dev
```

The application will be available at:

- **Local**: `http://localhost:5173` (default Vite port)
- **Network**: Check terminal output for network URL to access from other devices

> If port 5173 is in use, Vite will automatically use the next available port. Check the terminal output for the correct URL.

````

## 🔨 Build
### Production Build

```bash
npm run build
````

## 📚 Project Structure Details

### Pages Overview

| Page                | Route              | Purpose                                   |
| ------------------- | ------------------ | ----------------------------------------- |
| **Home**            | `/`                | Landing page with hero, features, and CTA |
| **Sectors**         | `/sectors`         | Browse all business services/sectors      |
| **Sector Detail**   | `/sectors/:id`     | Individual sector information             |
| **News**            | `/news`            | Articles and insights with pagination     |
| **Company Profile** | `/company-profile` | About company and team                    |
| **Contact**         | `/contact`         | Contact form and company information      |

### i18n (Internationalization)

The application supports multiple languages with JSON locale files:

**Language Support**: English (`en`) and Hebrew (`he`)

## 🎯 Key Features

### Responsive Navigation

- ✅ Desktop and mobile-optimized
- ✅ Language toggle (English/Hebrew)
- ✅ Sticky header with scroll effects
- ✅ Mobile hamburger menu
- ✅ Smooth transitions and animations

### Content Management

- ✅ Context API for global state
- ✅ Custom hooks for content and language
- ✅ Mock data for development
- ✅ Easy to migrate to API
- ✅ Caching for performance

## 📦 Dependencies

### Production Dependencies

```json
{
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "react-router-dom": "7.12.0",
  "react-hook-form": "7.71.0",
  "zod": "4.3.5",
  "@hookform/resolvers": "5.2.2",
  "tailwindcss": "4.1.18",
  "@tailwindcss/vite": "4.1.18",
  "@radix-ui/react-select": "2.2.6",
  "lucide-react": "0.562.0",
  "sonner": "2.0.7",
  "libphonenumber-js": "1.12.36"
}

## 🤝 Contributing

### Development Standards

1. **Branch Naming**: `feature/my-feature` or `fix/my-fix`
2. **Commit Messages**: Clear and descriptive
3. **Code Style**: Follow existing patterns
4. **Components**: Use functional components with hooks
5. **Styling**: Use Tailwind CSS utility classes
6. **i18n**: Always add translations for new strings
## 📄 License

This project is **proprietary software** for G.D Financial Services.

- ✅ Privately licensed
- ✅ All content protected
- ✅ Code protected under MIT license (see LICENSE file)
- ❌ Not for public redistribution

## 🔒 Security

- Keep dependencies updated: `npm audit`
- Review dependencies for vulnerabilities
- Use `.gitignore` for local files

## 📞 Contact & Support

For inquiries or support:
- **Website**: Visit the Contact page
- **Email**: Use contact form on the website
- **Social Media**: Links in footer

---

## 📊 Quick Stats

- **React Version**: 19.2.3 (Latest)
- **Build Tool**: Vite 7.3.1 (Lightning fast)
- **Languages Supported**: 2 (English, Hebrew)
- **Pages**: 6 (Home, Sectors, News, Company, Contact, Sector Detail)
- **Components**: 20+ reusable components
- **Last Updated**: February 2026
- **Version**: 0.0.0 (Development)
```
