import Link from 'next/link'
import { FileDown, FileText } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <p className="text-gray-600">Create a professional resume and export as PDF or DOCX.</p>
      </header>

      <div className="flex flex-wrap gap-4">
        <Link
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          href="/builder"
        >
          Start Building
        </Link>
        <Link
          className="rounded border px-4 py-2 hover:bg-gray-50"
          href="/preview"
        >
          Preview Template
        </Link>
        <Link
          className="rounded border border-blue-300 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100"
          href="/projects"
        >
          View All Projects
        </Link>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded border p-4">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <FileDown className="h-5 w-5" /> PDF Export
          </div>
          <p className="text-sm text-gray-600">High-quality PDF generated from your data.</p>
        </div>
        <div className="rounded border p-4">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <FileText className="h-5 w-5" /> DOCX Export
          </div>
          <p className="text-sm text-gray-600">Editable Word document using DOCX template.</p>
        </div>
      </section>
    </main>
  )
}
