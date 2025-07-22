# Dispatch Management System

## Overview

This is a full-stack delivery dispatch management system built with React, Express.js, and PostgreSQL. The application provides a comprehensive interface for managing delivery operations, including creating deliveries, tracking their status, and handling customer confirmations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod schemas for API request/response validation
- **Development**: Hot reload with Vite integration

### Project Structure
```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/               # Express backend
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Database schema and validation
└── migrations/           # Database migrations
```

## Key Components

### Database Schema
- **Deliveries Table**: Core entity storing delivery information
  - Order number (unique identifier)
  - Location, rider name, staff name
  - Pickup and delivery dates
  - Status tracking
  - Customer signature (nullable)

### API Endpoints
- `GET /api/deliveries` - Retrieve all deliveries
- `GET /api/deliveries/:id` - Get specific delivery
- `POST /api/deliveries` - Create new delivery
- `PUT /api/deliveries/:id` - Update delivery
- `DELETE /api/deliveries/:id` - Delete delivery
- `POST /api/deliveries/confirm` - Customer confirmation with signature
- `GET /api/deliveries/stats` - Delivery statistics

### Frontend Components
- **DeliveryForm**: Form for creating new deliveries
- **DeliveryTable**: Data table with filtering and actions
- **CustomerConfirmation**: Customer signature capture
- **StatsCards**: Dashboard statistics display

### Storage Layer
- **Interface-based Design**: IStorage interface for data operations
- **Database Implementation**: DatabaseStorage class using PostgreSQL
- **Database Integration**: Full PostgreSQL integration with Drizzle ORM
- **Sample Data**: Automatic seeding with demonstration deliveries

## Data Flow

1. **Client Request**: React components make API calls using TanStack Query
2. **API Processing**: Express routes validate requests with Zod schemas
3. **Data Access**: Storage layer handles database operations
4. **Response**: JSON responses sent back to client
5. **State Update**: React Query updates component state automatically

## External Dependencies

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for icons
- Class Variance Authority for component variants

### Data Management
- Drizzle ORM for type-safe database operations
- Zod for runtime validation
- TanStack Query for server state management
- React Hook Form for form handling

### Development Tools
- Vite for fast development and building
- TypeScript for type safety
- ESLint and Prettier for code quality
- Replit-specific plugins for development environment

## Deployment Strategy

### Development
- Single command startup with `npm run dev`
- Vite dev server with HMR for frontend
- Express server with TypeScript compilation
- Database migrations with `npm run db:push`

### Production
- Build process creates optimized client bundle
- Server bundled with esbuild for Node.js
- Static files served by Express
- Environment variables for database configuration

### Database Setup
- PostgreSQL database required (DATABASE_URL environment variable)
- Drizzle migrations for schema management
- Neon Database integration for serverless PostgreSQL

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind
- **Real-time Updates**: Optimistic updates with React Query
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error boundaries and toast notifications
- **Accessibility**: ARIA-compliant components from Radix UI
- **Type Safety**: End-to-end TypeScript coverage
- **Analytics Dashboard**: Comprehensive reports with charts and export functionality
- **Data Visualization**: Interactive charts using Recharts library

## Recent Changes

### January 17, 2025 - Implemented Role-Based Access Control
- Created separate interfaces for riders and administrators
- Built dedicated Rider Portal with delivery confirmation functionality
- Developed Admin Dashboard with full system management capabilities
- Added role selector landing page for easy access control
- Fixed customer signature field to use proper textarea instead of input
- Implemented clean, role-specific navigation and branding
- Enhanced user experience with role-appropriate functionality

### January 17, 2025 - Added Database Integration
- Migrated from in-memory storage to PostgreSQL database
- Created DatabaseStorage class implementing the IStorage interface
- Set up Drizzle ORM with Neon Database integration
- Added automatic database seeding with sample delivery data
- Maintained all existing functionality with persistent data storage

### January 17, 2025 - Added Reports and Analytics Dashboard
- Created comprehensive reports page with delivery analytics
- Added interactive charts for status distribution, daily trends, rider performance, and location analysis
- Implemented data filtering by date range, rider, and custom date periods
- Added export functionality for generating JSON reports
- Created navigation system with Management and Reports tabs
- Integrated Recharts library for data visualization
- Added sample data for demonstration purposes
- Enhanced UI with Tabs and Badge components from Radix UI