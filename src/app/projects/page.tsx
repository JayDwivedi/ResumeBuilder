import type { Project } from '@/lib/schema'

const allProjects: Project[] = [
  {
    name: 'App Transporter',
    role: 'Lead Developer & Architect',
    description: 'Comprehensive transportation app handling everything from start to end - user authentication, real-time location tracking, booking management, payment processing, and delivery monitoring. Built with modern Android architecture, real-time data synchronization via Supabase PostgREST, and beautiful Material Design UI with Jetpack Compose.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material Design', 'Coroutines', 'Supabase', 'PostgREST', 'Firebase', 'Room', 'MVVM', 'Clean Architecture', 'REST APIs', 'GitHub', 'Jira'],
  },
  {
    name: 'MyBpost',
    role: 'Technical Lead, iOS/Android Lead & Cross-Platform Team Lead',
    description: 'Enterprise postal and logistics app initially developed in Xamarin Native, then transformed to native Android and iOS. Led cross-platform team coordination, managed technical direction for both iOS and Android native implementations. Spearheaded Android transformation using Kotlin, Jetpack Compose, RxJava, and Coroutines, establishing architecture patterns and development standards for the team.',
    technologies: ['Xamarin Native', 'Kotlin', 'RxJava', 'Jetpack Compose', 'Coroutines', 'iOS Native', 'Swift', 'MVVM', 'Clean Architecture', 'Retrofit', 'Room', 'SQLite', 'REST APIs', 'Firebase', 'GitHub', 'Jira', 'Jenkins'],
  },
  {
    name: 'ESC Pocket Guidelines',
    role: 'Senior Android Developer',
    description: 'CE-marked medical software device app providing European Society of Cardiology (ESC) clinical guidelines and medical tools. Developed comprehensive medical algorithms, interactive calculators, and decision support tools enabling healthcare professionals to access cardiac care guidelines efficiently. Built with robust data management, offline support, and high-reliability standards for healthcare applications.',
    technologies: ['Java', 'Android SDK', 'Firebase', 'Retrofit', 'XML', 'SQLite', 'REST APIs', 'Medical Algorithms', 'GitHub', 'Jira'],
  },
  {
    name: 'In-House App Configurator (Modular Framework)',
    role: 'R&D Developer & Lead',
    description: 'Revolutionary modular framework enabling rapid app creation and real-time modifications without recompilation. Enabled product teams to dynamically create applications, modify designs on-the-fly, and enable/disable modules in live production apps. Reduced app development build cycle from 1 month to 3 days, significantly accelerating time-to-market. Implemented dynamic module loading, hot configuration updates, and feature toggles for seamless deployment.',
    technologies: ['Java', 'Android SDK', 'Modular Architecture', 'Dynamic Module Loading', 'Feature Flags', 'XML Configuration', 'REST APIs', 'SQLite', 'GitHub', 'Jira', 'R&D'],
  },
  {
    name: 'HCM (Zenefits) Android App',
    role: 'Sr. Technology Specialist',
    description: 'HR management app with FCM push notifications; migrated legacy modules to V1 API.',
    technologies: ['Kotlin', 'Java', 'Compose', 'Coroutines', 'FCM', 'Python', 'Flask', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
  },
  {
    name: 'TriNet HR Platform App',
    role: 'Sr. Technology Specialist',
    description: 'Cross-platform HR solution with modular components and seamless backend integration.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
  },
  {
    name: 'Banking App, Dashboard & Configurator',
    role: 'Sr. Developer',
    description: 'Banking dashboard with workflow automation and real-time visualization using low-code tools.',
    technologies: ['Flutter', 'FlutterFlow', 'Firebase', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
  },
  {
    name: 'YourPeople3 (Zenefits Backend)',
    role: 'Sr. Technology Specialist',
    description: 'Backend modernization with FCM push notifications; migrated legacy APIs to V1.',
    technologies: ['Python', 'Flask', 'FCM', 'REST APIs', 'Git', 'Jira', 'Agile'],
  },
  {
    name: 'The Straits Times',
    role: 'Developer / Technical Lead (Team: 8)',
    description: 'Digital news platform with Compose architecture; implemented unit testing and CI/CD.',
    technologies: ['Kotlin', 'Compose', 'Firebase Auth', 'Retrofit', 'MVVM', 'Koin', 'Mockito', 'Bitbucket', 'Jira', 'Bitrise', 'SQLite', 'Room', 'Coroutines'],
  },
  {
    name: 'Universal Tennis App',
    role: 'Developer / Technical Lead (Team: 4)',
    description: 'Tennis platform with leagues and analytics; managed feature design and CI/CD.',
    technologies: ['Kotlin', 'Firebase', 'Google Maps', 'Retrofit', 'MVVM', 'Dagger Hilt', 'Mockito', 'Jira', 'GIT', 'Jenkins', 'SQLite', 'Room', 'Coroutines'],
  },
]

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">All Projects</h1>
        <p className="text-lg text-gray-600">Comprehensive portfolio of {allProjects.length} projects across mobile, backend, and R&D initiatives</p>
      </div>

      <div className="grid gap-6">
        {allProjects.map((project, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                <p className="mt-1 text-sm font-semibold text-blue-600">{project.role}</p>
              </div>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Project {index + 1}
              </span>
            </div>

            <p className="mb-4 text-gray-700 leading-relaxed">{project.description}</p>

            <div className="mb-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-700">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-blue-50 p-6">
        <p className="text-center text-sm text-gray-600">
          Portfolio last updated: November 2025 • 11+ years of mobile development expertise
        </p>
      </div>
    </main>
  )
}
