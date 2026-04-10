# Beevora Frontend

Premium B2B & B2C eCommerce Frontend built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **Redux Toolkit**.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **State Management**: Redux Toolkit + React Redux
- **Styling**: Tailwind CSS 4 + Class Variance Authority
- **API Client**: Axios
- **Icons**: Lucide React
- **Validation**: Client-side form validation

## Key Features
- 🚀 **Full eCommerce Flow**: Product listing, detail view, cart management, and multi-step checkout.
- 🔐 **Authentication**: Complete login and registration forms with Redux state.
- 🛡️ **Route Protection**: Custom `AuthGuard` component for user and admin dashboards.
- 📊 **Dashboards**: Dedicated layouts for regular Users (orders, profile) and Admins (product, order, user management).
- ✨ **Premium Design**: Dark-mode-first aesthetic with glassmorphism and smooth animations.

## Directory Structure
- `app/`: Next.js pages and layouts (Routes)
- `components/`: Reusable UI, layout, and feature-specific components
- `store/`: Redux store configuration and slices
- `hooks/`: Custom hooks (`useAuth`, `useCart`, `useProducts`)
- `lib/`: API instance, constants, and utility functions
- `types/`: TypeScript interfaces for the entire project
- `middleware/`: Route guard components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Next Steps
- Connect the `lib/api.ts` Axios instance to a real backend service.
- Implement more robust error handling for API failures.
- Add unit and integration tests using Jest and Playwright.

---
Built with ❤️ for Beevora.
