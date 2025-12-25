# Resume Builder - Quick Reference Guide

## 🚀 Getting Started

### Start Development Server
```bash
cd "/Users/jaydwivedi/My Space/Personal/Code/ResumeBuilder"
npm run dev
# Server runs at http://localhost:3001
```

### Build for Production
```bash
npm run build
npm run start
```

---

## 📋 Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | `/` | Upload resume JSON file |
| **Builder** | `/builder` | Edit resume with live preview |
| **Preview** | `/preview` | View formatted resume |

---

## 🎨 Component Usage Examples

### Button
```tsx
// Primary button
<Button variant="primary" size="lg">Start Building</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Success button
<Button variant="success">Confirm</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Ghost button (minimal)
<Button variant="ghost">Help</Button>

// Outline button
<Button variant="outline">Learn More</Button>
```

### Card
```tsx
// Basic card
<Card>
  <CardBody>Content here</CardBody>
</Card>

// Card with header
<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardBody>Content here</CardBody>
</Card>

// Elevated card
<Card variant="elevated">
  Content with shadow
</Card>
```

### Modal
```tsx
<Modal isOpen={isOpen}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Content>Your content here</Modal.Content>
  <Modal.Footer>
    <Button onClick={onClose}>Close</Button>
  </Modal.Footer>
</Modal>
```

### Toast
```tsx
// Success toast
<Toast type="success" message="Successfully uploaded!" />

// Error toast
<Toast type="error" message="Upload failed!" />

// Info toast
<Toast type="info" message="Processing..." />

// Warning toast
<Toast type="warning" message="Please review..." />
```

### Loader
```tsx
// Inline loader
<Loader message="Loading your resume..." />

// Page loader
<Loader variant="page" message="Preparing..." />
```

---

## 📂 File Structure

### Components Directory
```
components/
├── ui/                    ← Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Loader.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   └── index.ts
├── Header.tsx            ← Navigation header
├── Footer.tsx            ← Footer with links
├── FileUploadZone.tsx    ← File upload component
├── UploadModal.tsx       ← Upload status modal
├── ResumeForm.tsx        ← Edit form
├── ResumeView.tsx        ← Display resume
└── ResumePDF.tsx         ← PDF export
```

### Pages Directory
```
app/
├── page.tsx              ← Homepage (/)
├── layout.tsx            ← Root layout with Header/Footer
├── builder/
│   └── page.tsx          ← Builder (/builder)
├── preview/
│   └── page.tsx          ← Preview (/preview)
├── api/
│   └── export/
│       ├── pdf/route.ts  ← PDF export API
│       └── docx/route.ts ← DOCX export API
└── globals.css           ← Global styles
```

---

## 🎯 Common Tasks

### Adding a New Component

1. **Create component file**
```tsx
// src/components/MyComponent.tsx
'use client'

import { ReactNode } from 'react'

interface MyComponentProps {
  children: ReactNode
}

export function MyComponent({ children }: MyComponentProps) {
  return <div className="p-4">{children}</div>
}
```

2. **Use the component**
```tsx
import { MyComponent } from '@/components/MyComponent'

export default function Page() {
  return <MyComponent>Hello</MyComponent>
}
```

### Creating a New Page

1. **Create page file**
```tsx
// src/app/mynewpage/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold">My Page</h1>
        {/* Your content */}
      </main>
    </div>
  )
}
```

2. **Page automatically available at** `/mynewpage`

### Using Toast Notifications

```tsx
const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

// Show toast
setToast({ type: 'success', message: 'Saved!' })

// In JSX
{toast && (
  <Toast
    type={toast.type}
    message={toast.message}
    onClose={() => setToast(null)}
  />
)}
```

---

## 🎨 Tailwind CSS Classes

### Common Patterns

#### Spacing
```tsx
className="px-6 py-12"           // Horizontal 1.5rem, Vertical 3rem
className="gap-4"               // Gap between flex items
className="mt-4 mb-6"           // Margins
```

#### Typography
```tsx
className="text-4xl font-bold"  // Large heading
className="text-lg"            // Large body text
className="text-sm text-gray-600"  // Small secondary text
```

#### Colors
```tsx
className="bg-blue-600 text-white"      // Primary
className="bg-red-50 text-red-700"      // Error
className="bg-green-50 text-green-800"  // Success
className="bg-gray-100 text-gray-700"   // Neutral
```

#### Layout
```tsx
className="grid grid-cols-2 md:grid-cols-3"  // Responsive grid
className="flex flex-col md:flex-row"        // Responsive flex
className="max-w-6xl mx-auto"               // Centered container
```

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run build
npm run build

# Start production server
npm run start

# Open in browser
open http://localhost:3001
```

---

## 📦 Resume Data Schema

```typescript
type Resume = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  links: Array<{ label: string; url: string }>
  summary: string
  expertise: string[]
  skills: Array<{ category: string; skills: string[] }>
  experience: Array<{
    company: string
    location: string
    role: string
    startDate: string
    endDate: string
    bullets: string[]
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    graduationDate: string
  }>
}
```

---

## 🎯 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Upload file | `Ctrl/Cmd + U` (can add) |
| Export PDF | (Button click) |
| Export DOCX | (Button click) |
| Close modal | `Esc` |

---

## 🐛 Debugging

### Check Console Errors
```bash
# Open browser DevTools
F12 or Cmd+Option+I

# Check Console tab
# Check Network tab for failed requests
```

### Check Build Errors
```bash
npm run build
# Errors shown in terminal
```

### Check Type Errors
```bash
# TypeScript is checked during build
# Fix any red squiggles in VS Code
```

---

## 📱 Responsive Design

### Breakpoints
```
Mobile First (< 640px)
├── Small (sm: 640px)
├── Medium (md: 768px)
├── Large (lg: 1024px)
└── XL (xl: 1280px)
```

### Testing Responsive
```bash
# In browser DevTools
# Device Toolbar: Ctrl+Shift+M (Cmd+Shift+M on Mac)
# Test on various screen sizes
```

---

## 🚀 Performance Tips

### Best Practices
1. ✅ Use `'use client'` only where needed
2. ✅ Keep components small and focused
3. ✅ Use proper dependency arrays in hooks
4. ✅ Lazy load heavy components
5. ✅ Optimize images with next/image
6. ✅ Minimize re-renders with proper state

### Check Build Size
```bash
npm run build
# Check output for bundle size
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide Icons](https://lucide.dev)
- [CVA Documentation](https://cva.style/docs)

---

## 💡 Quick Tips

1. **Import from barrel export**
   ```tsx
   import { Button, Card, Loader } from '@/components/ui'
   ```

2. **Use template strings for conditionals**
   ```tsx
   className={`flex items-center gap-2 ${
     isActive ? 'text-blue-600' : 'text-gray-600'
   }`}
   ```

3. **Keep your components modular**
   ```tsx
   // Good
   <FileUploadZone onUpload={handleUpload} />
   
   // Avoid
   // Large components with too many responsibilities
   ```

4. **Use consistent spacing**
   ```tsx
   className="px-6 py-12"  // Use our spacing scale
   className="px-7 py-11"  // Avoid random values
   ```

---

## 📞 Getting Help

### Troubleshooting

**Port already in use?**
```bash
lsof -ti:3001 | xargs kill -9
npm run dev
```

**Cache issues?**
```bash
rm -rf .next
npm run build
```

**Module not found?**
```bash
npm install
npm run dev
```

**TypeScript errors?**
```bash
# Check src/ directory for red squiggles
# Hover on error for suggestions
```

---

## ✅ Checklist for New Features

- [ ] Create component file with proper types
- [ ] Add 'use client' if using hooks
- [ ] Use existing UI components from `/components/ui`
- [ ] Follow Tailwind spacing/color system
- [ ] Add proper error handling
- [ ] Test responsive design
- [ ] Check TypeScript compilation
- [ ] Update documentation
- [ ] Test in development
- [ ] Create optimized build

---

**Version**: 1.0.0 (Modernized)  
**Last Updated**: 2024  
**Status**: Production Ready ✅
