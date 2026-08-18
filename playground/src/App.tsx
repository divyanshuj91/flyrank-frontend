import { useState } from 'react'
import Modal from './components/Modal'
import Tabs from './components/Tabs'
import Disclosure from './components/Disclosure'
import {
  Dialog as ShadcnDialog,
  DialogContent as ShadcnDialogContent,
  DialogHeader as ShadcnDialogHeader,
  DialogTitle as ShadcnDialogTitle,
  DialogDescription as ShadcnDialogDescription,
  DialogFooter as ShadcnDialogFooter,
  DialogTrigger as ShadcnDialogTrigger,
} from '@/components/ui/dialog'
import {
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent,
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import './App.css'

const demoTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <p>
        This is the Overview panel. It demonstrates accessible tab navigation using
        roving tabindex and arrow key controls.
      </p>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    content: (
      <p>
        This panel describes the features. Use ArrowLeft and ArrowRight keys to
        navigate between tabs.
      </p>
    ),
  },
  {
    id: 'specs',
    label: 'Specifications',
    content: (
      <p>
        This panel shows specifications. The active tab has tabIndex 0, while inactive
        tabs have tabIndex -1 (roving tabindex pattern).
      </p>
    ),
  },
]

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: '#111827' }}>
        Accessible Components Playground
      </h1>
      <p style={{ color: '#6b7280', marginBottom: 40 }}>
        Comparing custom W3C ARIA implementations with Shadcn / Radix UI primitives.
      </p>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. MODAL DIALOGS COMPARISON */}
      {/* ────────────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 56, padding: '24px', background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 8 }}>
          1. Modal Dialog Comparison
        </h2>
        <p style={{ color: '#6b7280', marginBottom: 20 }}>
          Test keyboard focus traps (<kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>), <kbd>Escape</kbd> to close, scroll locks, and outside clicks.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {/* Manual Modal */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8, color: '#4b5563' }}>
              Manual W3C Modal
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '10px 20px',
                background: '#4f46e5',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Open Manual Modal
            </button>
          </div>

          {/* Shadcn / Radix Dialog */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8, color: '#4b5563' }}>
              Shadcn / Radix Dialog
            </h3>
            <ShadcnDialog>
              <ShadcnDialogTrigger asChild>
                <Button variant="default">Open Shadcn Dialog</Button>
              </ShadcnDialogTrigger>
              <ShadcnDialogContent>
                <ShadcnDialogHeader>
                  <ShadcnDialogTitle>Radix UI Dialog</ShadcnDialogTitle>
                  <ShadcnDialogDescription>
                    This dialog uses Radix FocusScope, DismissableLayer, and react-remove-scroll.
                  </ShadcnDialogDescription>
                </ShadcnDialogHeader>
                <div style={{ margin: '16px 0', color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Notice how background scrollbar jump is compensated, touch scrolling is prevented on iOS, and dragging out does not dismiss accidentally.
                </div>
                <ShadcnDialogFooter>
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button type="button">Confirm</Button>
                </ShadcnDialogFooter>
              </ShadcnDialogContent>
            </ShadcnDialog>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Manual W3C Modal"
          titleId="demo-modal-title"
          descriptionId="demo-modal-desc"
        >
          <p>
            This modal traps focus using a custom Tab keydown handler. Press <kbd>Escape</kbd> to
            close, or click outside the dialog.
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: '8px 18px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: '8px 18px',
                border: 'none',
                borderRadius: 6,
                background: '#4f46e5',
                color: '#fff',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. TABS COMPARISON */}
      {/* ────────────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 56, padding: '24px', background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 8 }}>
          2. Tabs Comparison
        </h2>
        <p style={{ color: '#6b7280', marginBottom: 20 }}>
          Test roving tabindex and <kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> keyboard navigation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12, color: '#374151' }}>
              Manual W3C Tabs
            </h3>
            <Tabs tabs={demoTabs} label="Manual demo tabs" />
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12, color: '#374151' }}>
              Shadcn / Radix Tabs
            </h3>
            <ShadcnTabs defaultValue="overview">
              <ShadcnTabsList>
                <ShadcnTabsTrigger value="overview">Overview</ShadcnTabsTrigger>
                <ShadcnTabsTrigger value="features">Features</ShadcnTabsTrigger>
                <ShadcnTabsTrigger value="specs">Specifications</ShadcnTabsTrigger>
              </ShadcnTabsList>
              <ShadcnTabsContent value="overview">
                <p style={{ color: '#4b5563', padding: '12px 0' }}>
                  Radix Tabs panel for Overview. Fully supports RTL direction flipping, automated orientation, and active data states.
                </p>
              </ShadcnTabsContent>
              <ShadcnTabsContent value="features">
                <p style={{ color: '#4b5563', padding: '12px 0' }}>
                  Radix Tabs panel for Features. Smooth keyboard navigation and focus management.
                </p>
              </ShadcnTabsContent>
              <ShadcnTabsContent value="specs">
                <p style={{ color: '#4b5563', padding: '12px 0' }}>
                  Radix Tabs panel for Specifications. Controlled & uncontrolled mode support out of the box.
                </p>
              </ShadcnTabsContent>
            </ShadcnTabs>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. DISCLOSURE (ACCORDION) */}
      {/* ────────────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 56, padding: '24px', background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 8 }}>
          3. Accessible Disclosure (Accordion)
        </h2>
        <p style={{ color: '#6b7280', marginBottom: 20 }}>
          Click or press <kbd>Enter</kbd> / <kbd>Space</kbd> on the triggers.
        </p>
        <Disclosure title="What is this component?">
          <p>
            This is a Disclosure widget following the W3C ARIA Authoring Practices. The
            trigger button uses <code>aria-expanded</code> and{' '}
            <code>aria-controls</code> to communicate state to assistive technology.
          </p>
        </Disclosure>
        <Disclosure title="How does keyboard interaction work?">
          <p>
            Since the trigger is a native <code>&lt;button&gt;</code> element, it
            inherently supports activation via <kbd>Enter</kbd> and <kbd>Space</kbd>{' '}
            keys. No additional keyboard event handlers are needed.
          </p>
        </Disclosure>
        <Disclosure title="Is this component accessible?">
          <p>
            Yes. The component uses semantic HTML, proper ARIA attributes, and follows
            the disclosure pattern from the W3C WAI-ARIA Authoring Practices Guide.
          </p>
        </Disclosure>
      </section>
    </div>
  )
}

export default App
