# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## 2. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (you can update security rules later)
4. Choose your database location

## 3. Enable Firebase Storage (Optional)

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Start in **test mode**

## 4. Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app (name it "ResumeBuilder")
5. Copy the configuration values

## 5. Configure Environment Variables

1. Open `.env.local` file in the project root
2. Replace the empty values with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## 6. Update Firestore Security Rules

In Firebase Console > Firestore Database > Rules, update to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to all resumes (add authentication later)
    match /resumes/{resumeId} {
      allow read, write: if true;
    }
  }
}
```

## 7. Deploy to Firebase Hosting

Install Firebase CLI:
```bash
npm install -g firebase-tools
```

Login to Firebase:
```bash
firebase login
```

Initialize Firebase in your project:
```bash
firebase init
```

Select:
- Hosting
- Use an existing project (select your project)
- Public directory: `out`
- Single-page app: Yes
- GitHub actions: No (optional)

Build and deploy:
```bash
npm run build
firebase deploy
```

## Notes

- The app now uses Firebase Firestore for data storage
- LocalStorage is used as a fallback if Firebase is unavailable
- All resume data syncs to Firestore automatically
- You can add Firebase Authentication later for user management
