# Resume Builder - Design System Guide

## Color System

### Primary Colors
- **Blue 600**: `#3B82F6` - Primary actions, hover states
- **Blue 700**: `#2563EB` - Active states, dark backgrounds
- **Indigo 600**: `#4F46E5` - Secondary actions, accents

### Semantic Colors
- **Green 600**: `#10B981` - Success states
- **Red 600**: `#EF4444` - Error states, danger
- **Blue 100**: `#DBEAFE` - Light backgrounds
- **Gray 50**: `#F9FAFB` - Page backgrounds
- **Gray 900**: `#111827` - Text, dark elements

### Usage Examples
```tsx
// Primary Button
<Button variant="primary">Action</Button>
// → bg-blue-600 text-white

// Success State
<Toast type="success">Uploaded!</Toast>
// → bg-green-50 text-green-800

// Error Message
<Toast type="error">Failed</Toast>
// → bg-red-50 text-red-700
```

## Button Variants

### Primary (Default)
```tsx
<Button variant="primary" size="lg">Start Building</Button>
```
- Use for: Main CTAs, primary actions
- Colors: Blue background, white text
- Hover: Darker blue
- Icon support: Yes

### Secondary
```tsx
<Button variant="secondary" size="md">Save</Button>
```
- Use for: Secondary actions, less important
- Colors: Gray background, gray text
- Hover: Lighter gray

### Success
```tsx
<Button variant="success">Confirm</Button>
```
- Use for: Confirmation, positive actions
- Colors: Green background, white text

### Danger
```tsx
<Button variant="danger">Delete</Button>
```
- Use for: Destructive actions, warnings
- Colors: Red background, white text

### Ghost
```tsx
<Button variant="ghost">Help</Button>
```
- Use for: Minimal, low-priority actions
- Colors: Transparent, colored text
- Hover: Light background

### Outline
```tsx
<Button variant="outline" size="lg">View Template</Button>
```
- Use for: Secondary CTAs, alternative actions
- Colors: Border + text, no fill
- Hover: Light background

## Button Sizes

```tsx
<Button size="sm">Small</Button>    // 12px padding
<Button size="md">Medium</Button>   // 16px padding (default)
<Button size="lg">Large</Button>    // 20px padding
```

## Card Component

### Basic Card
```tsx
<Card>
  <CardBody>
    Content here
  </CardBody>
</Card>
```

### With Header
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardBody>
    Content here
  </CardBody>
</Card>
```

### Elevated Card
```tsx
<Card variant="elevated">
  Content with shadow
</Card>
```

## Typography

### Headings
- **H1**: `text-5xl font-bold` - Page titles
- **H2**: `text-3xl font-bold` - Section titles
- **H3**: `text-xl font-semibold` - Subsection titles
- **Label**: `text-sm font-medium` - Form labels

### Body Text
- **Large**: `text-lg` - Important body text
- **Normal**: `text-base` - Default text
- **Small**: `text-sm` - Secondary info
- **Extra Small**: `text-xs` - Metadata, timestamps

## Spacing Scale

```
gap-1   = 0.25rem (4px)
gap-2   = 0.5rem (8px)
gap-3   = 0.75rem (12px)
gap-4   = 1rem (16px)
gap-6   = 1.5rem (24px)
gap-8   = 2rem (32px)

px-4    = 1rem horizontal padding
px-6    = 1.5rem horizontal padding
py-8    = 2rem vertical padding
py-12   = 3rem vertical padding
py-16   = 4rem vertical padding
py-24   = 6rem vertical padding
```

## Responsive Breakpoints

```tsx
// Mobile first approach
className="text-base md:text-lg lg:text-xl"

sm  = 640px    (tablets, small devices)
md  = 768px    (tablets, medium devices)
lg  = 1024px   (desktops, large devices)
xl  = 1280px   (large desktops)
```

## Shadows & Elevation

```tsx
// Elevated Card
className="shadow-sm"  // Subtle shadow
className="shadow-md"  // Medium shadow
className="shadow-lg"  // Large shadow (modals)
```

## Animations & Transitions

### Hover Effects
```tsx
className="transition-colors hover:bg-gray-100"
className="transition-all hover:shadow-lg"
```

### Loading States
```tsx
<Loader message="Loading..." />
// Shows animated spinner with message
```

### Toast Notifications
```tsx
<Toast type="success" message="Success!" />
// Auto-dismisses after 5 seconds
```

## Component Hierarchy

```
App
├── Header (sticky)
│   └── Navigation Links
├── Main Content
│   ├── Page Title
│   ├── Cards/Sections
│   └── Buttons/Forms
└── Footer
    └── Links
```

## Common Patterns

### Success Message
```tsx
<Toast type="success" message="File uploaded successfully!" />
```

### Loading State
```tsx
<Loader message="Processing your resume..." />
```

### Error Handling
```tsx
<Toast type="error" message="Failed to upload file" />
```

### Modal Dialog
```tsx
<Modal isOpen={true}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Content>Content</Modal.Content>
  <Modal.Footer>Buttons</Modal.Footer>
</Modal>
```

### Upload Zone
```tsx
<FileUploadZone
  onUpload={handleUpload}
  isLoading={false}
  accept=".json"
/>
```

## Accessibility

### Focus States
All interactive elements have visible focus indicators:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### Color Contrast
- Text on backgrounds: 4.5:1 contrast ratio (WCAG AA)
- Interactive elements: 3:1 minimum contrast

### Keyboard Navigation
- Tab through interactive elements
- Enter/Space to activate buttons
- Escape to close modals

## Dark Mode (Future)

Reserved for future implementation:
```tsx
<Button className="dark:bg-gray-800 dark:text-white">
  Theme-aware
</Button>
```

## Version History

- **v1.0.0** - Initial modernization
  - Component library
  - Responsive design
  - Professional styling
  - Modern interactions

---

**Last Updated**: 2024
**Design System Version**: 1.0.0
