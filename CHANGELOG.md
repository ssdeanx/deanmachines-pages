# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Docs Pages Updated

- **Documentation Pages:**
  - Updated `src/pages/docs/contributing.tsx`, `src/pages/docs/fpv.tsx`, `src/pages/docs/requirements.tsx`, and `src/pages/docs/components.tsx` to use `<Head>` component for `<title>` and `<meta>` tags.
  - Replaced `Sidebar` component with `Navbar` component in `src/pages/docs.tsx`.
  - Removed unused imports and variables from all modified documentation pages to resolve ESLint warnings.
  - Reimplemented interactive elements in `src/pages/docs/fpv.tsx` based on user feedback.

### Authentication Type System Improvements

- **NextAuth Type Declarations:**
  - Created dedicated `types/next-auth.d.ts` file for type extensions
  - Implemented proper Role type handling in Session and JWT interfaces
  - Added type safety for user ID in authentication flow

### Authentication Code Refactoring

- **NextAuth Configuration Updates:**
  - Streamlined JWT and session callbacks
  - Improved default role handling with proper type assertions
  - Removed duplicate type declarations from auth configuration
  - Enhanced type safety in token and session transformations

### UI Component Enhancements

- **Sidebar Icons Update:**
  - Updated `Sidebar.tsx` to include additional icons for each sidebar item, displaying a total of 8 icons.

- **LoadingSpinner Component Update:**
  - Refactored `LoadingSpinner.tsx` to use separate `spinnerStyles` and `fullScreenStyles` variables for improved code readability and maintainability, aligning with MUI v6+ best practices.

- **ErrorBoundary Component Update:**
  - Refactored `ErrorBoundary.tsx` to a functional component using `useState` and `useCallback` hooks for improved code structure and alignment with MUI v6+ best practices.

### Theme System Improvements

- **Centralized Type Definitions:**
  - Removed duplicate theme declarations from `Navbar.tsx` and `_app.tsx`
  - Consolidated all theme type extensions in `theme.ts`
  - Added proper type declarations for custom palette options
  - Fixed circular type references in palette definitions

### Type Safety Enhancements

- **Theme Palette Fixes:**
  - Added missing `divider`, `warning`, and other standard MUI palette types
  - Removed duplicate `warning` property declarations
  - Implemented proper type augmentation for Material-UI components

### Component Updates

- **Navbar Type Fixes:**
  - Removed local theme type declarations causing conflicts
  - Updated palette access to use centralized type definitions
  - Fixed optional chaining syntax in `Sidebar.tsx`

### Documentation

- **Changelog Updates:**
  - Added entries for theme system improvements and type safety fixes

## [0.3.0] - 2025-02-07

### Authentication Implemented

- **Authentication (OAuth with NextAuth.js):**
  - Installed `next-auth`.
  - Configured NextAuth.js with Google and GitHub providers.
  - Created API route for NextAuth.js handling (`pages/api/auth/[...nextauth].ts`).
  - Integrated Prisma adapter (`@next-auth/prisma-adapter`) for database persistence of user and session data.
  - Added sign-in/sign-out buttons to `Navbar` component.
  - Used `useSession`, `signIn`, and `signOut` hooks for managing authentication state.
  - Created `next-auth.d.ts` to extend the `Session` type with the user's `id`.
  - Updated `DropdownMenu` to handle optional onClick.

### Navbar Updates

- Updated Navbar to include login options.

### Resolved Issues

- Fixed any errors.

## [0.2.0] - 2025-02-07

### Database and UI Enhancements

- **Prisma Integration:**
  - Installed and configured Prisma Client for PostgreSQL.
  - Created `prisma/schema.prisma` with `User`, `Account`, `Machine`, and `Contact` models.
  - Generated and applied initial database migrations.
- **Dependencies:**
  - Added `date-fns`
  - Added `@testing-library/react`, `@testing-library/jest-dom`, and `jest`.
- **Zod Validation:** Added Zod for validation in the contact form API route.
- **UI Component Enhancements:**
  - Added dropdown to Navbar for requirements.
  - Added pages for docs.
  - Added pages for requirements and nested requirements.
  - Implemented `<Image>` component.
  - Implemented `<ErrorBoundary>` component.
  - Implemented `<Skeleton>` loading.
  - Implemented Google Fonts.

### Component and Style Modifications

- Changed "Machines" link to "Products" on Navbar component.
- Updated Navbar with dropdown and styling.
- Updated `_app.tsx` with advanced styling.
- Refactored `ContactForm.tsx` to use stable React form handling (removed experimental `useActionState`).
- Updated README.

### Bug Fixes

- Corrected import paths for `@fontsource` packages.
- Fixed various TypeScript errors related to type checking and incorrect imports.
- Resolved issues with Material UI theme configuration (deprecated `adaptV4Theme`, incorrect array lengths, etc.).
- Ensured `psql` is accessible in the system PATH (for database connection).
- Fixed Navbar styling.
- Removed unused variables.
- Fixed issues with React 19 experimental features.

## [0.1.0] - 2025-02-05

### Initial Project Additions

- **Project Initialization:** Created a new Next.js project using `create-next-app` with TypeScript, configured for the Pages Router (not the App Router).
- **Dependencies:** Installed necessary dependencies: `@mui/material`, `@emotion/react`, `@emotion/styled`, `react-icons`, `@mui/icons-material`.
- **Basic Page Structure:** Created initial page files: `pages/index.tsx`, `pages/about.tsx`, `pages/machines.tsx`, `pages/contact.tsx`, `pages/api/contact.ts`.
- **Component Structure:** Created a `components` directory and initial component files: `Hero.tsx`, `ContactForm.tsx`, `MachineCard.tsx`, `Footer.tsx`, `Layout.tsx`, `Navbar.tsx`, `DropdownMenu.tsx`.
- **Global Styles:** Created `styles/globals.css` for global CSS.
- **Layout Component:** Implemented `Layout.tsx` to wrap all pages and provide a consistent structure (header/footer).
- **Navbar Component:** Created a responsive `Navbar.tsx` with:
  - Mobile menu (hamburger icon).
  - Desktop menu.
  - Integration with Next.js routing (`usePathname`).
  - Highlighting of the active menu item.
  - Dropdown menu support (`DropdownMenu.tsx` component).
- **Hero Component:** Created a basic `Hero.tsx` component for the homepage.
- **ContactForm Component:** Implemented `ContactForm.tsx` with:
  - Form fields (name, email, message).
  - Error handling and loading states.
  - Integration with a (placeholder) API endpoint (`pages/api/contact.ts`).
- **MachineCard Component:** Created `MachineCard.tsx` to display individual machine information.
- **Machines Page:** Implemented `pages/machines.tsx` to display a list of machines:
  - Fetches data from a placeholder API endpoint (with clear instructions to replace with the real endpoint).
  - Uses a type guard (`isMachine`) for robust type checking of API data.
  - Renders a responsive grid of `MachineCard` components.
  - Includes a loading state using `Suspense`.
  - **About Page:** Created a basic `pages/about.tsx`.
  - **Contact Page:** Created `pages/contact.tsx` that uses the `ContactForm` component.
  - **API Route:** Implemented `pages/api/contact.ts` to handle contact form submissions (placeholder logic).
  - **Theming:** Configured Material UI theming in `pages/_app.tsx` with:
    - Custom primary and secondary colors (blood red).
    - Light and dark mode support, automatically adapting to user preference.
    - Custom background and text colors for both modes.
  - **Document Metadata:** Used standard HTML `<title>` and `<meta>` tags within components (React 19 feature) instead of `next/head`.
  - **README:** Created a professional `README.md` file.

## [0.5.0] - 2025-02-14 07:41:49 AM - Enhanced Navbar Styling with Material UI

- **Navbar Component:**
  - Added theme toggle icon (light/dark mode switch).
  - Added GitHub icon linking to the project repository.
  - Positioned the theme toggle and GitHub icons to the left of the sign-in buttons.
  - Updated Material UI theme configuration to meet all requirements.
  - Implemented advanced, cutting-edge styling to the Navbar component using Material UI components, including Typography, Box, Stack, and IconButton.
  - Improved the Navbar's visual appearance with modern typography, a sleek color scheme, subtle box shadows, smooth transitions, and improved spacing and alignment.
  - Ensured that the Navbar is fully responsive and adapts seamlessly to different screen sizes and devices, though isMobile is unused.

[Unreleased]: https://github.com/ssdeanx/deanmachines-pages/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/ssdeanx/deanmachines-pages/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/ssdeanx/deanmachines-pages/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/ssdeanx/deanmachines-pages/releases/tag/v0.1.0
