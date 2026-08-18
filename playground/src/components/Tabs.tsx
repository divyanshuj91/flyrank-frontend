import { useState, useRef, useCallback } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import './Tabs.css'

interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultActiveId?: string
  label: string
}

const Tabs = ({ tabs, defaultActiveId, label }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultActiveId ?? tabs[0]?.id ?? '')
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const setTabRef = useCallback((id: string) => (el: HTMLButtonElement | null) => {
    if (el) {
      tabRefs.current.set(id, el)
    } else {
      tabRefs.current.delete(id)
    }
  }, [])

  const focusTab = useCallback((id: string) => {
    const tabEl = tabRefs.current.get(id)
    if (tabEl) {
      tabEl.focus()
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId)
      if (currentIndex === -1) return

      let nextIndex: number | null = null

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % tabs.length
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = tabs.length - 1
      }

      if (nextIndex !== null) {
        const nextTab = tabs[nextIndex]
        setActiveTabId(nextTab.id)
        focusTab(nextTab.id)
      }
    },
    [activeTabId, tabs, focusTab]
  )

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="tabs-list"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              ref={setTabRef(tab.id)}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className="tabs-tab"
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab && (
        <div
          key={activeTab.id}
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className="tabs-panel"
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  )
}

export default Tabs
