import { db } from './firebase'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'

// Hybrid storage: use Firebase when available, fallback to localStorage
export const storage = {
  // Get a single document
  async get<T>(key: string): Promise<T | null> {
    // Try Firebase first
    try {
      if (db) {
        const docRef = doc(db, 'resumes', key)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          return docSnap.data() as T
        }
      }
    } catch (error) {
      console.error('Firebase get error:', error)
    }

    // Fallback to localStorage
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  },

  // Set a single document
  async set<T>(key: string, value: T): Promise<void> {
    // Try Firebase first
    try {
      if (db) {
        const docRef = doc(db, 'resumes', key)
        await setDoc(docRef, {
          ...value,
          updatedAt: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('Firebase set error:', error)
    }

    // Also save to localStorage as backup
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore
    }
  },

  // Get all resumes
  async getAll<T>(): Promise<Record<string, T>> {
    const result: Record<string, T> = {}

    try {
      if (db) {
        const q = query(collection(db, 'resumes'), orderBy('updatedAt', 'desc'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          result[doc.id] = doc.data() as T
        })
        return result
      }
    } catch (error) {
      console.error('Firebase getAll error:', error)
    }

    // Fallback to localStorage
    if (typeof window === 'undefined') return result
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        try {
          const raw = localStorage.getItem(key)
          if (raw) {
            result[key] = JSON.parse(raw) as T
          }
        } catch {
          // ignore
        }
      })
    } catch {
      // ignore
    }

    return result
  },

  // Delete a resume
  async delete(key: string): Promise<void> {
    try {
      if (db) {
        const docRef = doc(db, 'resumes', key)
        await deleteDoc(docRef)
      }
    } catch (error) {
      console.error('Firebase delete error:', error)
    }

    // Also remove from localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key)
      } catch {
        // ignore
      }
    }
  },
}

// Sync local storage: backwards compatibility helpers
export const localStorageOnly = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  },
  set<T>(key: string, value: T) {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore
    }
  },
}
