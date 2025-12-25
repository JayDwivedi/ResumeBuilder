# Resume Builder - Implementation & Architecture Guide

## Project Overview

**Resume Builder** is a modern, web-based application for creating, editing, and exporting professional resumes. Users can upload JSON resume files, edit them through an intuitive builder interface, and export them as PDF or DOCX.

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Variants**: class-variance-authority (CVA)
- **Icons**: lucide-react
- **State**: React Hooks (useState, useEffect)

### Backend
- **Runtime**: Next.js API Routes
- **Export Formats**: PDF (custom), DOCX (custom)
- **Data Validation**: Zod

### Infrastructure
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Fallback**: Browser localStorage

### Package Management
- **npm** v10.x
- **Node** v18.x+

## Project Structure

### Directory Layout
```
ResumeBuilder/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── export/
│   │   │       ├── pdf/route.ts
│   │   │       └── docx/route.ts
│   │   ├── builder/
│   │   │   └── page.tsx
│   │   ├── preview/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FileUploadZone.tsx
│   │   ├── UploadModal.tsx
│   │   ├── ResumeForm.tsx
│   │   ├── ResumeView.tsx
│   │   ├── ResumePDF.tsx
│   │   └── UploadModal.tsx
│   └── lib/
│       ├── schema.ts
│       ├── storage.ts
│       ├── firebase.ts
│       └── format.ts
├── public/
│   ├── sample-resume.json
│   └── uploads/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── firebase.json
```

## Core Components

### UI Component Library

#### Button.tsx
**Purpose**: Reusable button component with multiple variants and sizes
**Props**:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}
```
**Variants**:
- `primary`: Main call-to-action buttons
- `secondary`: Secondary actions
- `success`: Confirmation, positive actions
- `danger`: Destructive actions
- `ghost`: Minimal, text-only buttons
- `outline`: Border-based buttons

#### Card.tsx
**Purpose**: Container component with optional header and flexible content
**Compound Pattern**:
```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

#### Modal.tsx
**Purpose**: Flexible modal dialog with customizable header, content, and footer
**Features**:
- Backdrop click to close
- Custom content rendering
- Optional footer actions
- Smooth animations

#### Loader.tsx
**Purpose**: Loading spinner for async operations
**Variants**:
- Default: Inline spinner
- `PageLoader`: Full-page loading state

#### Toast.tsx
**Purpose**: Temporary notifications
**Types**: success, error, info, warning
**Features**:
- Auto-dismisses after 5 seconds
- Customizable positioning
- Multiple simultaneous toasts

### Layout Components

#### Header.tsx
**Features**:
- Sticky navigation bar
- Active route highlighting
- Logo with branding
- Responsive navigation
- Mobile-friendly

#### Footer.tsx
**Features**:
- Multi-column layout
- Quick links
- Social media links
- Responsive design

### Feature Components

#### FileUploadZone.tsx
**Purpose**: Drag-and-drop file upload interface
**Features**:
- Drag-and-drop support
- Click to upload fallback
- File type validation
- Loading indicator
- Visual feedback

#### UploadModal.tsx
**Purpose**: Upload status feedback modal
**States**:
- `idle`: Not visible
- `uploading`: Shows loading spinner
- `success`: Shows success message with action button
- `failure`: Shows error message with retry option

#### ResumeForm.tsx
**Purpose**: Edit resume data with form inputs
**Features**:
- Structured form fields
- Real-time validation
- Live preview integration
- Auto-save capability

#### ResumeView.tsx
**Purpose**: Display formatted resume
**Features**:
- Professional layout
- Multiple sections support
- Print-friendly styling
- Responsive design

## Data Layer

### Schema Definition (schema.ts)
Zod validation schemas for complete type safety:
```tsx
type Resume = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  links: Array<{ label: string; url: string }>
  summary: string
  expertise: string[]
  skills: Array<{
    category: string
    skills: string[]
  }>
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

### Storage Layer (storage.ts)
Hybrid storage system with Firebase fallback:
```tsx
// Automatic fallback to localStorage if Firebase unavailable
await storage.set<Resume>('resume-builder:data', resumeData)
const data = await storage.get<Resume>('resume-builder:data')
```

## Page Flows

### Homepage (`/`)
1. Display hero section with project overview
2. Show feature highlights
3. Provide drag-and-drop upload zone
4. Validate JSON on upload
5. Show success/failure modal
6. Auto-redirect to preview on success

### Builder (`/builder`)
1. Load existing resume data from storage
2. Display form with all editable fields
3. Show live preview in split panel
4. Allow PDF/DOCX export
5. Show toast notification on export
6. Handle validation errors

### Preview (`/preview`)
1. Load resume data from storage or use sample
2. Display formatted resume
3. Show upload success banner if redirected
4. Provide navigation to builder
5. Support print functionality

## API Routes

### PDF Export (`/api/export/pdf`)
**Method**: POST
**Input**: Resume object (JSON)
**Output**: PDF file blob
**Process**:
1. Validate resume schema
2. Convert to PDF format
3. Return as downloadable blob

### DOCX Export (`/api/export/docx`)
**Method**: POST
**Input**: Resume object (JSON)
**Output**: DOCX file blob
**Process**:
1. Validate resume schema
2. Convert to DOCX format
3. Return as downloadable blob

### File Upload (`/api/upload`)
**Method**: POST
**Input**: Form data with file
**Output**: { success: boolean, data?: Resume, error?: string }
**Process**:
1. Receive file upload
2. Parse JSON
3. Validate against schema
4. Store in Firebase
5. Return result

## State Management

### Hooks Usage
```tsx
// Homepage
const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
const [uploadMessage, setUploadMessage] = useState<string>('')

// Builder
const [initial, setInitial] = useState<Resume | null>(null)
const [loading, setLoading] = useState(true)
const [exporting, setExporting] = useState(false)
const [toast, setToast] = useState<{ type: string; message: string } | null>(null)

// Preview
const [resumeData, setResumeData] = useState<Resume>(sampleData)
const [isLoading, setIsLoading] = useState(true)
const [showSuccess, setShowSuccess] = useState(false)
```

### Data Flow
```
User Input
    ↓
Validation (Zod Schema)
    ↓
State Update (setState)
    ↓
Storage (Firebase/localStorage)
    ↓
Component Re-render
    ↓
Visual Feedback (Toast/Modal)
```

## Authentication & Storage

### Firebase Integration
```tsx
// Initialize
const app = initializeApp(config)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Operations
const doc = await getDoc(docRef)
await setDoc(docRef, data)
```

### Fallback Strategy
```tsx
// If Firebase unavailable, use localStorage
const storage = {
  async get(key) {
    try {
      return await firebase.get(key)
    } catch {
      return localStorage.getItem(key)
    }
  }
}
```

## Build & Deployment

### Development
```bash
npm run dev      # Start dev server on port 3001
npm run build    # Production build
npm run start    # Start production server
```

### Build Output
- ✅ Pages pre-rendered as static content
- ✅ API routes marked as dynamic
- ✅ Bundle size optimized with tree-shaking
- ✅ No TypeScript errors
- ✅ ESLint warnings (non-blocking, image optimization)

### Production Build Stats
```
Route (app)              Size     First Load JS
/                        4.13 kB  115 kB
/builder                 112 kB   216 kB
/preview                 6.61 kB  96.6 kB
/api/export/pdf          -        -
/api/export/docx         -        -
```

## Testing Strategy

### Unit Tests (Recommended)
```tsx
// Component snapshot tests
test('Button renders with variant', () => {
  render(<Button variant="primary">Click</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})

// Hook tests
test('useEffect loads resume data', async () => {
  const { result } = renderHook(() => useResume())
  await waitFor(() => {
    expect(result.current.data).toBeDefined()
  })
})
```

### Integration Tests
```tsx
// Upload flow
test('complete upload flow', async () => {
  render(<HomePage />)
  const file = new File(['{}'], 'resume.json')
  fireEvent.drop(screen.getByTestId('upload-zone'), { dataTransfer: { files: [file] } })
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument()
  })
})
```

### E2E Tests
```tsx
// Full user journey
test('user can upload, edit, and export resume', async () => {
  // Upload
  page.goto('/')
  await page.uploadFile('#upload', 'sample.json')
  
  // Edit
  page.goto('/builder')
  await page.fill('#name', 'New Name')
  
  // Export
  await page.click('text=Export as PDF')
})
```

## Performance Optimization

### Code Splitting
- Pages automatically split into separate bundles
- Shared chunks for common dependencies
- Lazy loading of components

### Rendering
- Client components only where state needed
- Server components for static content
- Proper dependency arrays in hooks

### Styling
- Tailwind CSS with PurgeCSS
- Only used styles included
- CSS-in-JS optimized

### Images
- Lazy loading support
- Next/Image component recommended
- WebP format support

## Security Considerations

### Data Validation
- Zod schema validation on all inputs
- JSON schema enforcement
- Type safety with TypeScript

### Firebase Security
- Firestore security rules
- Authentication required for data access
- Encrypted storage

### XSS Prevention
- React's built-in XSS protection
- Content sanitization
- No eval() or innerHTML

## Future Enhancements

### Short Term
1. Unit test coverage (80%+)
2. Dark mode support
3. More resume templates
4. Additional export formats (RTF, TXT)

### Medium Term
1. Advanced PDF customization
2. Resume builder templates
3. Analytics dashboard
4. Export presets

### Long Term
1. Collaboration features
2. Version history
3. Mobile native apps
4. AI-powered suggestions
5. Multi-language support

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev
```

#### Firebase Connection Issues
```bash
# Check .env.local
# Verify Firebase config
# Check network connectivity
```

#### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build

# Check Node version
node --version  # Should be 18.x+
```

## Deployment Checklist

- [ ] All tests passing
- [ ] Build succeeds without errors
- [ ] Environmental variables configured
- [ ] Firebase project created and configured
- [ ] CORS settings configured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Email notifications set up
- [ ] Analytics enabled
- [ ] Backup system configured
- [ ] Monitoring set up
- [ ] Documentation updated

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Firebase**: https://firebase.google.com
- **Zod Validation**: https://zod.dev

---

**Version**: 1.0.0
**Last Updated**: 2024
**Maintainer**: Development Team
