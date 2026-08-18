import { useState, useId } from 'react'
import type { ReactNode } from 'react'
import './Disclosure.css'

interface DisclosureProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

const Disclosure = ({ title, children, defaultOpen = false }: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const generatedId = useId()
  const contentId = `disclosure-content-${generatedId}`

  return (
    <div className="disclosure">
      <button
        type="button"
        className="disclosure-trigger"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        <span className="disclosure-icon" aria-hidden="true">▼</span>
      </button>

      {isOpen && (
        <div id={contentId} className="disclosure-content" role="region" aria-labelledby={undefined}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Disclosure
