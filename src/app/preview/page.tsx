'use client'

import { ResumeView } from '@/components/ResumeView'
import type { Resume } from '@/lib/schema'
import { useEffect, useState } from 'react'

const sampleData: Resume = {
  name: 'Jay Kishor Dwivedi',
  title: 'Mobile Architect/Lead Android Developer',
  email: 'jaidwivedi20@gmail.com',
  phone: '+91 8600227438',
  location: 'Hyderabad, India',

  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jaydwivedi' },
    { label: 'GitHub', url: 'https://github.com/jaydwivedi' },
    { label: 'Portfolio', url: 'https://jaydwivedi.github.io' },
  ],

  summary:
    'Mobile Architect with 11+ years building scalable Android and cross-platform apps across HR, Sports, fintech, and healthcare domains. Expert in Kotlin, Jetpack Compose, React Native, and Flutter. Proven leader in modernizing legacy systems, driving AI-assisted development, and accelerating delivery cycles by 30-40%.',

  expertise: [
    'Team Leadership & Mentorship',
    'Clean Architecture & MVVM',
    'Cross-Platform Development',
    'CI/CD & DevOps',
    'AI-Powered Development',
    'Performance Optimization',
    'Agile & Solution Design',
    'R&D & Innovation',
  ],

  skills: [
    {
      category: 'Languages',
      skills: ['Kotlin', 'Java', 'JavaScript', 'TypeScript', 'Python(Basic)', 'Dart(Basic)'],
    },
    {
      category: 'Mobile Development',
      skills: ['Android SDK', 'Jetpack Compose', 'React Native & Expo', 'Flutter & FlutterFlow', 'Xamarin Native'],
    },
    {
      category: 'Architecture & Design',
      skills: ['MVVM', 'Clean Architecture', 'Hilt', 'Koin', 'DI', 'Solution Design'],
    },
    {
      category: 'Backend & Data',
      skills: ['Room', 'SQLite', 'PostgreSQL', 'Supabase', 'GraphQL', 'REST APIs', 'Retrofit', 'Coroutines', 'RxJava'],
    },
    {
      category: 'DevOps & Tools',
      skills: ['CI/CD (Jenkins, Bitrise)', 'GitHub/Bitbucket', 'Jira', 'SonarQube', 'AWS Monitoring', 'Firebase Crashlytics', 'FCM'],
    },
    {
      category: 'Testing & Quality',
      skills: ['JUnit', 'Mockito', 'NUnit/XUnit', 'Unit Testing', 'Test Automation', 'Code Review'],
    },
    {
      category: 'Cloud & AI',
      skills: ['Firebase (Auth, FCM, Crashlytics)', 'Google APIs', 'AI Tools (Gemini, ChatGPT, Claude, GitHub Copilot)', 'Multi-agent Systems'],
    },
    {
      category: 'Additional Technologies',
      skills: ['WebRTC', 'TensorFlow', 'Vision APIs', 'Google Maps', 'JSON/XML'],
    },
  ],

  experience: [
    {
      company: 'Coforge Limited',
      location: 'Hyderabad',
      role: 'Senior Technical Lead',
      startDate: 'Jan 2024',
      endDate: 'Present',
      bullets: [
        'Led HCM (Zenefits) Android app development using Kotlin, Jetpack Compose, and Coroutines; improved UI efficiency.',
        'Built TriNet HR Platform with React Native and Expo; ensured seamless cross-platform experience.',
        'Developed YourPeople3 backend in Python; implemented push notifications with FCM and migrated from legacy API to V1.',
        'Built Banking apps and dashboards using Flutter and FlutterFlow; reduced delivery time with low-code approach.',
        'Integrated AI tools (GitHub Copilot, Gemini 2.5, ChatGPT, Claude) for code generation and productivity.',
        'Participated in R&D, architecture discussions, and cross-platform module development in Agile environment.',
        'Managed workflows in JIRA; handled Git repositories, code merges, and CI/CD pipelines.',
        'Rolled out a shared Jetpack Compose design system reused by five squads, shrinking UI delivery time by 40%.',
        'Stabilized observability stack (Crashlytics + Datadog + Firebase Performance) to lift crash-free sessions to 99.6%.',
        'Used the CircleCI-powered mobile app pipeline with static checks, signed artifacts, and staged rollouts to secure faster approvals.',
        'Used Sentry for API monitoring and structured log captures, routing alerts to on-call Slack rooms for rapid triage.',
      ],
    },
    {
      company: 'Nityo Technology',
      location: 'Gurgaon',
      role: 'Lead Android Developer',
      startDate: 'Mar 2023',
      endDate: 'Dec 2023',
      bullets: [
        'Architected critical modules for The Straits Times app (Kotlin, Compose); increased user engagement.',
        'Attended weekly R&D meetings; contributed to cross-platform teams.',
        'Managed Jira for Agile task tracking.',
        'Handled Git management, code merging, and CI/CD.',
        'Analyzed requirements and developed new modules.',
        'Piloted Kotlin Multiplatform proof of concept for shared article widgets, removing 30% duplicate code.',
        'Partnered with product/data on personalization experiments that boosted returning reader retention by 12%.',
      ],
    },
    {
      company: 'Riktam Technology',
      location: 'Hyderabad',
      role: 'Lead Android Developer',
      startDate: 'Jul 2022',
      endDate: 'Feb 2023',
      bullets: [
        'Led Universal Tennis App team; managed sprint planning, code merges, and CI/CD (Jenkins).',
        'Conducted weekly R&D meetings; contributed to cross-platform development.',
        'Used Jira for Agile task tracking.',
        'Analyzed requirements; developed modules with real-time analytics and Google Maps.',
        'Mentored six Android engineers on Compose/MVVM patterns, cutting onboarding time by three sprints.',
        'Integrated Jenkins quality gates and Firebase Test Lab smoke suites to block regressions before release.',
      ],
    },
    {
      company: 'T-Systems ICT',
      location: 'Pune',
      role: 'Lead Android Developer',
      startDate: 'Jun 2021',
      endDate: 'Jul 2022',
      bullets: [
        'Worked as Technical Lead; led One App and Mesh Setup App development.',
        'Managed Git server, code merging, and CI/CD.',
        'Conducted weekly R&D meetings; contributed to cross-platform teams.',
        'Developed internal SDK demos; enhanced cloud connectivity with APIs.',
        'Designed modular BLE/Wi-Fi connectivity layer reused by two OEM hardware programs and smart routers.',
        'Introduced SonarQube gating, automated release notes, and feature flag playbooks, trimming regression defects by 25%.',
      ],
    },
    {
      company: 'Tata Consultancy Services',
      location: 'Pune',
      role: 'Lead Android Developer',
      startDate: 'Aug 2018',
      endDate: 'Jun 2021',
      bullets: [
        'Worked as Technical Lead; guided Mybpost app as Solution Designer.',
        'Part of TCS DI Architecture group; handled code/document review and release sign-off.',
        'Provided solutions for project challenges; led technology adaptation initiatives.',
        'Architected features, analyzed requirements, and ensured timely releases.',
        'Distributed modules; handled sprint planning on Confluence and Jira.',
        'Advanced DevOps automation for CI/CD, version control, and user acceptance testing.',
        'Managed Git server and code merging; conducted weekly R&D meetings.',
        'Coordinated a 15+ engineer squad across Pune and Montreal to deliver four major releases per year with zero slip.',
        'Led the end-to-end Xamarin-to-native Android migration for Mybpost, rebuilding complex logistics flows and release automation.',
        'Served on the unit hiring panel, ran onboarding bootcamps, and evangelized Flutter/Compose through org-wide enablement sessions.',
      ],
    },
    {
      company: 'Borm Bruckmeier InfoTech',
      location: 'Pune',
      role: 'Sr. Android Developer',
      startDate: 'Feb 2014',
      endDate: 'Jul 2018',
      bullets: [
        'Worked in R&D; analyzed requirements and developed new modules.',
        'Tracked latest Android releases; checked compatibility issues.',
        'Created Java desktop app for generating medical algorithms and interactive tools.',
        'Mapped client requirements; implemented solutions with improvements.',
        'Conducted weekly R&D meetings.',
        'Partnered with European Society of Cardiology editors to codify 50+ clinical algorithms into reusable templates.',
        'Automated release pipeline so medical editors could publish guideline updates to apps within 24 hours.',
      ],
    },
  ],

  education: [
    {
      school: 'IPS Academy, Indore',
      degree: 'MCA – Master of Computer Applications',
      location: 'Indore',
      startDate: '2011',
      endDate: '2014',
      details: [],
    },
    {
      school: 'Dr. VSICS, Kanpur',
      degree: 'BCA – Bachelor of Computer Applications',
      location: 'Kanpur',
      startDate: '2008',
      endDate: '2011',
      details: [],
    },
  ],

  projects: [
    {
      name: 'HCM (Zenefits) Android App',
      role: 'Sr. Technology Specialist',
      description: 'Modern HR mobile experience with Compose UI, FCM notifications, and v1 API migration.',
      technologies: ['Kotlin', 'Java', 'Compose', 'Coroutines', 'FCM', 'Python', 'Flask', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'TriNet HR Platform App',
      role: 'Sr. Technology Specialist',
      description: 'React Native HR platform with reusable modules and secure backend integrations.',
      technologies: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'Banking App, Dashboard & Configurator',
      role: 'Sr. Developer',
      description: 'Low-code Flutter/FlutterFlow dashboards delivering workflow automation and live insights.',
      technologies: ['Flutter', 'FlutterFlow', 'Firebase', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'YourPeople3 (Zenefits Backend)',
      role: 'Sr. Technology Specialist',
      description: 'Python + FCM backend refresh that unified notification flows and replaced legacy APIs.',
      technologies: ['Python', 'Flask', 'FCM', 'REST APIs', 'Git', 'Jira', 'Agile'],
    },
    {
      name: 'The Straits Times',
      role: 'Developer / Technical Lead (Team: 8)',
      description: 'Compose-based news app with personalization, unit tests, and Bitrise CI/CD boosts.',
      technologies: ['Kotlin', 'Compose', 'Firebase Auth', 'Retrofit', 'MVVM', 'Koin', 'Mockito', 'Bitbucket', 'Jira', 'Bitrise', 'SQLite', 'Room', 'Coroutines'],
    },
    {
      name: 'Universal Tennis App',
      role: 'Developer / Technical Lead (Team: 4)',
      description: 'Global tennis community app featuring real-time analytics, Maps, and Jenkins pipelines.',
      technologies: ['Kotlin', 'Firebase', 'Google Maps', 'Retrofit', 'MVVM', 'Dagger Hilt', 'Mockito', 'Jira', 'GIT', 'Jenkins', 'SQLite', 'Room', 'Coroutines'],
    },
      {
      name: 'App Transporter',
      role: 'Lead Developer & Architect',
      description: 'End-to-end transport platform with live tracking, bookings, and payments powered by Kotlin, Jetpack Compose, and Supabase PostgREST.',
      technologies: ['Kotlin', 'Jetpack Compose', 'Material Design', 'Coroutines', 'Supabase', 'PostgREST', 'Firebase', 'Room', 'MVVM', 'Clean Architecture', 'REST APIs', 'GitHub', 'Jira'],
    },
    {
      name: 'MyBpost',
      role: 'Technical Lead, iOS/Android Lead & Cross-Platform Team Lead',
      description: 'Postal logistics suite migrated from Xamarin to native Android/iOS while leading cross-platform delivery, Compose UI rebuilds, and RxJava pipelines.',
      technologies: ['Xamarin Native', 'Kotlin', 'RxJava', 'Jetpack Compose', 'Coroutines', 'iOS Native', 'Swift', 'MVVM', 'Clean Architecture', 'Retrofit', 'Room', 'SQLite', 'REST APIs', 'Firebase', 'GitHub', 'Jira', 'Jenkins'],
    },
    {
      name: 'ESC Pocket Guidelines',
      role: 'Senior Android Developer',
      description: 'CE-marked cardiology reference app with medical calculators, offline content, and Firebase sync built in Java and Retrofit.',
      technologies: ['Java', 'Android SDK', 'Firebase', 'Retrofit', 'XML', 'SQLite', 'REST APIs', 'Medical Algorithms', 'GitHub', 'Jira'],
    },
    {
      name: 'In-House App Configurator',
      role: 'R&D Developer & Lead',
      description: 'Modular framework that lets teams toggle modules live, restyle screens, and ship new apps in days using dynamic configs.',
      technologies: ['Java', 'Android SDK', 'Modular Architecture', 'Dynamic Module Loading', 'Feature Flags', 'XML Configuration', 'REST APIs', 'SQLite', 'GitHub', 'Jira', 'R&D'],
    },
  ],

  languages: ['English', 'Hindi'],

  certifications: [
    'Digital Mobile Computing: Android Foundation',
    'Process Agile Way of Working Foundation',
    'Adobe Qualified, Adobe Experience Platform',
  ],

  community: [
    'LinkedIn: Active profile and networking',
    'Stack Overflow: Active contributor',
    'GitHub: Portfolio with live apps and open-source material'
  ],

  avatar: '',
};

// const sampleData: Resume = {
//   name: 'Umadatt Rajnarayan Dwivedi',
//   title: 'FS Lead Technology Specialist | Technical Architect | Microservices & Cloud Expert',
//   email: 'umadatt2024@outlook.com',
//   phone: '+91-7337504801',
//   location: 'Mumbai, India',

//   links: [
//     { label: 'LinkedIn', url: 'https://www.linkedin.com/in/umadatt-dwivedi-344aa042/' },
//   ],

//   summary:
//     'Results-driven Technical Architect with 14+ years of enterprise platform design and delivery using cloud-native microservices, Spring Boot, Angular, and DevOps automation. Hands-on individual contributor with deep expertise in scalable, secure, and resilient system design. Proven ability to reduce operational risk, improve developer productivity, and accelerate release cycles through strong architectural governance and high-quality implementation, ensuring alignment between business objectives and technology strategy.',

//   expertise: [
//     'Technical Architecture',
//     'Cloud-Native Design',
//     'API Modernization',
//     'Microservices Architecture',
//     'Spring Boot & Java',
//     'Stakeholder Management',
//     'DevOps Implementation',
//     'AWS & Azure Cloud',
//     'Kubernetes & Docker',
//     'Event-Driven Architecture',
//     'Domain-Driven Design (DDD)',
//     'Technical Leadership & Mentoring',
//     'Security & Compliance',
//   ],

//   skills: [
//     {
//       category: 'Languages',
//       skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL','gRPC','GraphQl'],
//     },
//     {
//       category: 'Cloud & Infrastructure',
//       skills: ['AWS (EC2, EKS, ECR, S3, Secret Manager)', 'Azure', 'Docker', 'Kubernetes', 'Service Mesh'],
//     },
//     {
//       category: 'Architecture & Design',
//       skills: ['Microservices', 'DDD', 'CQRS', 'SAGA Pattern', 'Event-driven Architecture', 'Strangler Pattern'],
//     },
//     {
//       category: 'Backend Frameworks',
//       skills: ['Spring Boot', 'Spring Cloud', 'Spring Data', 'Hibernate', 'REST APIs'],
//     },
//     {
//       category: 'Frontend',
//       skills: ['Angular', 'TypeScript', 'HTML5', 'CSS3'],
//     },
//     {
//       category: 'Data & Messaging',
//       skills: ['Oracle', 'SQL Server', 'MySQL', 'MongoDB', 'Kafka', 'Solace', 'JMS'],
//     },
//     {
//       category: 'DevOps & Tools',
//       skills: ['CI/CD (Jenkins, GitHub Actions, TeamCity)', 'Git', 'SonarQube', 'ELK Stack', 'Observability & Monitoring'],
//     },
//     {
//       category: 'Security & Patterns',
//       skills: ['OAuth2', 'JWT', 'API Gateway', 'Service-to-Service Communication', 'Distributed Tracing'],
//     },
//   ],

//   experience: [
//     {
//       company: 'Coforge Ltd.',
//       location: 'Hyderabad',
//       role: 'Lead Technology Specialist',
//       startDate: 'Jan 2024',
//       endDate: 'Nov 2025',
//       bullets: [
//         'Designed, developed, tested, and deployed Spring Boot–based microservices end to end as hands-on individual contributor supporting high-scale enterprise applications.',
//         'Achieved 99.9% production stability, reduced defect leakage by 40%, and improved system performance by 25%.',
//         'Architected Feature Flag SDK ecosystem using OpenFeature API and Harness.io; built Java, Python, and TypeScript SDKs for centralized flag propagation.',
//         'Designed secure developer mode with Jira-based approvals to improve feature experimentation speed and reduce production rollback risks.',
//         'Built scalable Spring Boot microservice for PDF generation with encryption, watermarking, password protection, and PDF/A validation; delivered REST and gRPC APIs.',
//         'Architected Automated Communication Service for email, SMS, and notifications with async processing, retry handling, and failure tracking.',
//         'Integrated with third-party email and SMS gateways; managed end-to-end communication pipeline.',
//         'Authored technical design and Confluence documentation for all microservices and platform initiatives.',
//       ],
//     },
//     {
//       company: 'Trigyn Technologies India Pvt. Ltd.',
//       location: 'Mumbai',
//       role: 'Technical & Technical Architect',
//       startDate: 'Aug 2022',
//       endDate: 'Dec 2023',
//       bullets: [
//         'Defined enterprise architecture for cloud-native microservices platforms aligned with business objectives.',
//         'Owned architecture lifecycle across DDD, API-first design, security governance, and CI/CD pipelines.',
//         'Established scalable, resilient, and observable DevOps architecture for large-scale deployments.',
//         'Delivered Bihar Caste-Based Survey platform and Emigrate national platforms supporting millions of users.',
//         'Designed API gateways, service mesh, and inter-service communication patterns for high-throughput systems.',
//         'Mentored technical teams on cloud-native patterns, microservices best practices, and DevOps automation.',
//       ],
//     },
//     {
//       company: 'Synechron',
//       location: 'Mumbai',
//       role: 'Senior Technology Specialist',
//       startDate: 'Oct 2020',
//       endDate: 'May 2022',
//       bullets: [
//         'Architected and delivered enterprise-scale solutions for financial services and capital markets.',
//         'Led technical strategy, system design, and delivery governance across multiple workstreams.',
//         'Mentored engineering teams on microservices, cloud architecture, and DevOps practices.',
//       ],
//     },
//     {
//       company: 'Datamatics Global Services',
//       location: 'India',
//       role: 'Technical Architect',
//       startDate: 'Sep 2019',
//       endDate: 'Aug 2020',
//       bullets: [
//         'Designed enterprise solutions for data processing and analytics platforms.',
//         'Established architectural governance and technical standards across development teams.',
//         'Mentored architects and senior developers on cloud-native design patterns.',
//       ],
//     },
//     {
//       company: 'Capgemini Technologies Services India',
//       location: 'India',
//       role: 'Technical Manager / Architect',
//       startDate: 'Feb 2017',
//       endDate: 'Aug 2019',
//       bullets: [
//         'Managed technical delivery and architecture for large-scale enterprise applications.',
//         'Led architecture reviews, design discussions, and technology evaluations.',
//         'Drove DevOps adoption and CI/CD automation across multiple projects.',
//       ],
//     },
//     {
//       company: 'Sears Holding Corporation',
//       location: 'USA',
//       role: 'Technical Lead ',
//       startDate: 'May 2012',
//       endDate: 'Mar 2016',
//       bullets: [
//         'Architected and led development of e-commerce and retail platforms.',
//         'Designed scalable infrastructure and API strategies for high-traffic systems.',
//         'Mentored technical teams and established coding standards and best practices.',
//       ],
//     },
//     {
//       company: 'ABM Knowledgeware Ltd.',
//       location: 'India',
//       role: 'Technical Lead',
//       startDate: 'Jun 2011',
//       endDate: 'May 2012',
//       bullets: [
//         'Led technical delivery of enterprise Java applications.',
//         'Established development standards and mentored junior developers.',
//       ],
//     },
//   ],

//   education: [
     
//     {
//       school: 'K. K. Wagh I.E.E.R, Nashik',
//       degree: 'Bachelor of Engineering (Computer Engineering)',
//       location: 'Nashik',
//       startDate: '1992',
//       endDate: '1996',
//       details: [],
//     },
//   ],

//   projects: [
//     {
//       name: 'Feature Flag Management – SDK Development',
//       role: 'Architect & Lead Developer',
//       description: 'Designed Feature Flag SDK ecosystem using OpenFeature API and Harness.io. Built Java, Python, and TypeScript SDKs for centralized flag propagation with secure developer mode and Jira-based approvals.',
//       technologies: ['Java', 'Python', 'TypeScript', 'OpenFeature', 'Harness.io', 'gRPC','REST APIs','Spring Boot', 'Jira Integration','Angular'],
//     },
//     {
//       name: 'Shared PDF Services',
//       role: 'Architect & Lead Developer',
//       description: 'Built scalable Spring Boot microservice for PDF generation and transformation. Implemented encryption, watermarking, password protection, and PDF/A validation with REST and gRPC APIs.',
//       technologies: ['Spring Boot', 'Java', 'gRPC','GraphQl', 'REST APIs', 'PDF Processing', 'Microservices','Angular'],
//     },
//     {
//       name: 'Automated Communication Service (ACS)',
//       role: 'Architect & Lead Developer',
//       description: 'Built ACS for email, SMS, and notification delivery with async processing, retry handling, and failure tracking. Integrated with third-party email and SMS gateways.',
//       technologies: ['Spring Boot', 'Java', 'Kafka', 'AWS', 'gRPC','GraphQl','REST APIs', 'Async Processing', 'Microservices'],
//     },
//     {
//       name: 'Bihar Caste-Based Survey Platform',
//       role: 'Solution Architect',
//       description: 'Designed and delivered national-scale survey platform supporting millions of concurrent users. Implemented microservices, scalable databases, and real-time analytics.',
//       technologies: ['Spring Boot', 'Microservices', 'Kubernetes', 'AWS', 'Oracle', 'Angular', 'CI/CD', 'Jenkins'],
//     },
//     {
//       name: 'Emigrate',	
//       role: 'Architect & Lead Developer',
//       description: 'Architected and delivered national-scale emigration management platform. Designed API-first architecture with comprehensive security and compliance controls.',
//       technologies: ['Spring Boot', 'Microservices', 'Angular', 'Oracle', 'Kubernetes', 'AWS', 'OAuth2', 'Jenkins'],
//     },
//     {
//       name: 'Enterprise Microservices Architecture',
//       role: 'Technical Lead',
//       description: 'Established cloud-native microservices foundation supporting multiple business domains. Implemented service mesh, API gateway, distributed tracing, and observability.',
//       technologies: ['Kubernetes', 'Service Mesh', 'Spring Cloud', 'API Gateway', 'ELK Stack', 'Kafka', 'AWS', 'Azure'],
//     },
//     {
//       name: 'DevOps Automation & CI/CD Platform',
//       role: 'Technical Lead',
//       description: 'Designed and implemented comprehensive CI/CD platform with Jenkins, GitHub Actions, and infrastructure-as-code. Enabled automated testing, security scanning, and deployment pipelines.',
//       technologies: ['Jenkins', 'GitHub Actions', 'Kubernetes', 'Docker', 'Terraform', 'SonarQube', 'GitOps'],
//     },
//     {
//       name: 'E-Commerce Platform (Sears)',
//       role: 'Technical Lead' ,
//       description: 'Architected and led development of high-traffic e-commerce platform handling millions of transactions. Designed scalable infrastructure and API strategies.',
//       technologies: ['Java', 'Spring', 'Microservices', 'Oracle', 'REST APIs', 'CI/CD', 'Cloud Infrastructure'],
//     },
//   ],

//   languages: ['English', 'Hindi'],

//   certifications: [
//     'Agile Certification',
//     'Cloud Foundation Certification (AWS/Azure)',
//     'Kubernetes Developer Certification',
//     'Microservices Architecture Certification',
//   ],

//   community: [
//     'LinkedIn: Active in enterprise architecture and microservices community',
//     'Technical speaker on cloud-native architecture and DevOps',
//     'Mentor for enterprise technology architects',

//   ],

export default function PreviewPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [showSuccess, setShowSuccess] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>(sampleData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { storage } = await import('@/lib/storage');
        const savedData = await storage.get<Resume>('resume-builder:data');
        if (savedData) {
          setResumeData(savedData);
        }
      } catch (error) {
        console.error('Failed to load resume data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (searchParams && searchParams.get('uploaded') === '1') {
      setShowSuccess(true);
      // Optionally remove the param from URL after showing
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Template Preview</h1>
      {showSuccess && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800 border border-green-200">
          <strong>Success!</strong> Your file was uploaded and loaded successfully.
        </div>
      )}
      {isLoading ? (
        <div className="rounded-lg bg-blue-50 p-6 text-center">
          <p className="text-blue-700">Loading resume data...</p>
        </div>
      ) : (
        <ResumeView data={resumeData} />
      )}
    </main>
  )
}
