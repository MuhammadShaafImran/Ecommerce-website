# Gaming E-commerce Store

A modern e-commerce store built with React and Supabase, specifically designed for gaming peripherals and accessories. The store features a responsive design, real-time cart updates, secure authentication, and seamless payment integration.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Product Management**: Browse, search, and filter gaming products
- **Shopping Cart**: Real-time cart updates with persistent storage
- **Categories**: Browse products by categories
- **Payment Integration**: Multiple payment method support
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Real-time Updates**: Powered by Supabase real-time subscriptions

## 🛠️ Tech Stack

- **Frontend**: React with Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Routing**: React Router
- **API Client**: Supabase Client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or later)
- npm (v7.0.0 or later)
- Git

## ⚡ Quick Start

1. **Clone the repository**
   ```powershell
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```powershell
   npm run dev
   ```

## 🗄️ Database Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Run Database Migrations**
   The SQL file for database setup is located in `Code/DataBase.sql`. You can run this in your Supabase SQL editor.

## 📁 Project Structure

```
src/
├── api/            # API integration layers
│   ├── auth/       # Authentication related APIs
│   ├── cart/       # Shopping cart operations
│   ├── category/   # Category management
│   ├── order/      # Order processing
│   ├── payment/    # Payment integration
│   └── product/    # Product management
├── components/     # Reusable React components
│   ├── home/       # Homepage components
│   ├── layout/     # Layout components
│   ├── shared/     # Shared components
│   └── ui/         # UI components
├── contexts/       # React Context providers
├── pages/         # Page components
└── utils/         # Utility functions
```

## 🔑 Authentication

The store uses Supabase Authentication. Available methods:
- Email/Password
- Magic Link (Coming soon)
- OAuth providers (Coming soon)

## 🛍️ Shopping Cart

The shopping cart implementation:
- Persists across sessions
- Syncs with database for logged-in users
- Real-time updates
- Automatic price calculations

## 💳 Payment Integration

Supported payment methods:
- Sadapay
- JazzCash
- EasyPaisa
- NayaPay

## 🚀 Deployment

1. **Build the project**
   ```powershell
   npm run build
   ```

2. **Preview production build**
   ```powershell
   npm run preview
   ```

3. **Deploy to your hosting provider**
   The `dist` folder will contain your production-ready files.

## 🧪 Testing

Run tests using:
```powershell
npm run test
```

## 📝 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Initial work and development by the Database Project Team

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [React](https://reactjs.org)
- [Supabase](https://supabase.com)
- [Vite](https://vitejs.dev)
