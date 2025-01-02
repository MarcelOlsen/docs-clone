# Google Docs Clone

A collaborative document editor built with Next.js, featuring real-time editing and rich text formatting.

Built using modern web technologies and real-time collaboration features. Features a clean, modern UI with comprehensive document editing capabilities, real-time collaboration, and document organization.

### Live Demo

Visit [docs.marcelolsen.dev](https://docs.marcelolsen.dev) to try out the application.

### Features

- 🔐 Authentication & Organization Management
  - User authentication with Clerk
  - Personal and organization workspaces
  - Role-based access control
- 📝 Rich Text Editing
  - Text formatting (bold, italic, underline)
  - Font family and size selection
  - Text and highlight colors
  - Lists and task lists
  - Tables with resizable columns
  - Image insertion and resizing
  - Link management
- 👥 Real-time Collaboration
  - Multi-user editing
  - User presence indicators
  - Comments and threads
  - User avatars and status
  - Real-time updates
- 📄 Document Management
  - Create from templates
  - Organize in workspaces
  - Search functionality
  - Export options (PDF, HTML, Text)
- 🎨 Modern UI/UX
  - Clean, intuitive interface
  - Responsive design
  - Template gallery
  - Document toolbar
  - File menu

### Tech Stack

**Framework**: Next.js 14 \
**Database & Backend**: Convex \
**Real-time Collaboration**: Liveblocks \
**Authentication**: Clerk \
**Rich Text Editor**: TipTap \
**UI Components**:
- Radix UI
- Shadcn/ui
**Styling**: Tailwind CSS

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/MarcelOlsen/docs-clone
cd docs-clone
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file:

```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
LIVEBLOCKS_SECRET_KEY=your_liveblocks_key
```

4. Start the development server:

```bash
bun run dev
```

5. Open [localhost](http://localhost:3000) in your browser

### Project Structure

```bash
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable components
├── constants/          # Application constants
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── store/             # State management
└── types/             # TypeScript types

convex/               # Convex backend functions
public/              # Static assets
```

### Key Features in Detail

#### Document Editor

- Rich text formatting
- Real-time collaboration
- Comments and threads
- Adjustable margins
- Export options

#### Document Management

- Create from templates
- Search documents
- Organization workspaces
- Personal documents

#### Templates

- Blank Document
- Software Proposal
- Project Proposal
- Business Letter
- Resume
- Cover Letter
- Letter

### LICENSE

This project is licensed under the MIT license
