import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Work email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <textarea
          name="details"
          placeholder="Project details"
          value={formData.details}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-gold hover:bg-gold-hover text-bg-primary font-semibold rounded-lg transition-colors shadow-lg"
      >
        Send message
      </button>
    </form>
  )
}

