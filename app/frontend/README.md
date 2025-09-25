# Frontend Application

A modern frontend application built with **React + Vite**.  
It provides user authentication, team management, rankings, an admin dashboard, legal policy pages and challenges page.

## 🚀 Features

- User login & registration
- Profile management and password change
- Create or join teams
- Team and user rankings
- Admin dashboard
- Legal pages (Privacy Policy, Terms of Service, Acceptable Use Policy, Legal Notice)
- Responsive UI with reusable React components

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [JavaScript ES6+](https://developer.mozilla.org/docs/Web/JavaScript)
- [CSS Modules](https://github.com/css-modules/css-modules)

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kubosis/ISEP_CyberSec.git
cd ISEP_CyberSec/app/frontend
npm install
```

## ▶️ Development

Run the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173 (Or next available port)

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

## 📖 Project Structure

```plaintext
src/
├── assets/          # static assets (images, icons)
├── components/      # UI components and page views
├── utils/           # utility functions
├── App.jsx          # root component
├── main.jsx         # entry point
└── index.css        # global styles
```

## 📜 Environment Variables

Create a `.env` file in the `app/frontend/` folder to configure environment-specific variables:

```bash
VITE_API_URL=http://localhost:3000/api
```

## 👥 Authors
Paweł Jamroziak