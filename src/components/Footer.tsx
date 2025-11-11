export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-primary border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-text-muted text-sm">
          © {currentYear} Lumina Kreasi Technology. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

