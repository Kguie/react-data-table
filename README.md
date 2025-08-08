# React Data Table

[![npm version](https://badge.fury.io/js/react-data-table.svg)](https://badge.fury.io/js/react-data-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview  
**react-data-table** is a lightweight, fully customizable React data table library that provides context-driven state management for sorting, filtering, pagination, and internationalization. It leverages Tailwind CSS for styling and supports both French and English labels out of the box.

## Features

- **Lightweight & Fast** - Minimal bundle size with optimal performance
- **Fully Customizable** - Built with Tailwind CSS for easy styling
- **Internationalization** - Built-in support for French and English
- **Search & Filter** - Real-time search functionality
- **Sorting** - Column-based sorting with visual indicators
- **Pagination** - Efficient data pagination with configurable page sizes
- **Theme Support** - Auto, light, and dark mode support
- **Context-Driven** - Efficient state management with React Context
- **TypeScript Ready** - Full TypeScript support with type definitions

## Installation  

Install from npm or Yarn:

```bash
# npm
npm install @kguie/react-data-table

# Yarn
yarn add @kguie/react-data-table

# pnpm
pnpm add @kguie/react-data-table
```

Ensure you have React 18+ as a peer dependency:

```bash
npm install react react-dom
```

## Quick Start

Import and compose the main components inside your React app:

```jsx
import React from 'react';
import {
  DataTable,
  DataTableSearch,
  DataTableBody,
  DataTablePagination
} from '@kguie/react-data-table';

const columns = [
  { key: 'id',    title: 'ID',    sortable: true },
  { key: 'name',  title: 'Name',  sortable: true },
  { key: 'email', title: 'Email', sortable: false }
];

const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

export default function App() {
  return (
    <DataTable data={data} columns={columns} pageSize={5} language="en">
      <DataTableSearch fullWidth />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}
```

## Components & Props

### `<DataTable>`

The main wrapper component that provides context for all child components.

**Props:**
- `data: T[]` – Array of row objects
- `columns: { key: string; title: string; sortable?: boolean }[]` – Column definitions; supports nested keys (e.g., `address.city`)
- `pageSize?: number` – Rows per page (default: 20)
- `mode?: "auto" | "light" | "dark"` – Theme mode (default: "auto")
- `language?: "fr" | "en"` – Localization (default: "fr")
- `children` – Must include `<DataTableBody/>`; can include `<DataTableSearch/>` and `<DataTablePagination/>`

### `<DataTableSearch>`

Provides a search input to filter table data in real-time.

**Props:**
- `fullWidth?: boolean` – If true, input spans container width
- `iconColor?: string` – Color of search icon (default: "black")
- `style?: React.CSSProperties` – Inline styles

### `<DataTableBody>`

Renders the table's `<thead>` and `<tbody>`. Sortable columns toggle context state, triggering re-render.

### `<DataTablePagination>`

Renders page controls if more than one page exists. Includes Previous/Next buttons and up to five page links. Highlights the current page.

## Advanced Usage

### Nested Object Properties

The library supports accessing nested object properties using dot notation:

```jsx
const columns = [
  { key: 'user.name', title: 'Name', sortable: true },
  { key: 'user.address.city', title: 'City', sortable: true },
  { key: 'user.contact.email', title: 'Email', sortable: false }
];

const data = [
  {
    user: {
      name: 'John Doe',
      address: { city: 'New York' },
      contact: { email: 'john@example.com' }
    }
  }
];
```

### Custom Styling

This library uses Tailwind CSS classes internally. You can customize the appearance by:

1. **Overriding Tailwind classes** in your project's CSS
2. **Using inline styles** on components like `<DataTableSearch>`
3. **Customizing your Tailwind configuration**

```jsx
// Example with custom styling
<DataTableSearch 
  fullWidth 
  style={{ marginBottom: '1rem' }}
  iconColor="#3b82f6" 
/>
```

### Internationalization

Switch between French and English:

```jsx
// French (default)
<DataTable data={data} columns={columns} language="fr">
  {/* Components will show: "Rechercher", "Précédent", "Suivant", etc. */}
</DataTable>

// English
<DataTable data={data} columns={columns} language="en">
  {/* Components will show: "Search", "Previous", "Next", etc. */}
</DataTable>
```

### Theme Support

```jsx
// Auto (follows system preference)
<DataTable mode="auto" data={data} columns={columns}>

// Light mode
<DataTable mode="light" data={data} columns={columns}>

// Dark mode
<DataTable mode="dark" data={data} columns={columns}>
```

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/Kguie/react-data-table.git
cd react-data-table

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build
```

### Scripts

- `npm run dev` – Start development server
- `npm run build` – Build library for production
- `npm run rebuild` – Clean and build
- `npm run lint` – Run ESLint
- `npm run test` – Run tests in watch mode
- `npm run test:run` – Run tests once
- `npm run test:coverage` – Run tests with coverage reports

## Testing

This library is thoroughly tested with **Vitest** and **React Testing Library**:

```bash
npm run test           # watch mode  
npm run test:run       # single run  
npm run test:coverage  # with coverage reports  
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © [Kevin Guieba](mailto:kevin.guieba@gmail.com)
