"use client"

import { CommentForm } from "./commentForm"
import { Commented } from "./commented"

export const Comment: React.FC = () => (
  <section className="bg-gray-50 dark:bg-gray-900 py-8 lg:py-16 antialiased">
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-400">Discussion (20)</h2>
      </div>
      <CommentForm />
      <Commented />
    </div>
  </section>
)
