# NOTES.md — Manual vs. Shadcn / Radix UI Component Evaluation

A deep technical comparison between the hand-crafted accessible components (`Modal.tsx`, `Tabs.tsx`, `Disclosure.tsx`) and the production-ready Shadcn / Radix UI primitives (`components/ui/dialog.tsx`, `components/ui/tabs.tsx`).

---

## 1. Pointer Events (Click-Outside Handling)

### Manual Implementation (`Modal.tsx`)
- **Mechanism:** Listens for a standard `click` event on the background overlay `div` and verifies `e.target === e.currentTarget`.
- **Edge Cases & Failure Points:**
  1. **Drag-and-Release Bug:** If a user selects text inside the modal or clicks inside and drags their mouse outward, releasing over the overlay, a `click` event fires on the overlay and dismisses the dialog unintentionally.
  2. **Touch/Pointer Timing:** `click` fires after `pointerdown` and `touchend`. On touch screens, background gestures or underlying elements might register touches before the modal unmounts.
  3. **No Layer Stacking:** If a dropdown or tooltip is opened inside the modal and the user clicks outside the dropdown, the manual modal cannot coordinate which layer should receive the dismiss event.

### Shadcn / Radix UI (`Dialog` via `radix-ui / DismissableLayer`)
- **Mechanism:** Uses Radix’s `DismissableLayer` primitive, which registers global `pointerdown` listeners on the document during the capture phase.
- **Advanced Handling:**
  - **Pointer Down vs. Up Tracking:** Radix checks whether the pointer event originated *inside* the modal before dismissing. If a drag started inside and ended outside, the dialog remains open.
  - **Customizable Interactivity:** Provides `onPointerDownOutside` and `onInteractOutside` callback props. Consumers can call `event.preventDefault()` to conditionally block closing (e.g., if there are unsaved form changes).
  - **Layer Stack Management:** Manages an internal stack of dismissable layers. Clicking outside an inner popover dismisses only the popover, not the parent dialog.

---

## 2. Scroll Locking

### Manual Implementation (`Modal.tsx`)
- **Mechanism:** Modifies `document.body.style.overflow = 'hidden'` on open and restores the previous inline value on unmount.
- **Edge Cases & Failure Points:**
  1. **Layout Shift (Scrollbar Jump):** On desktop browsers (Windows / Linux / macOS with persistent scrollbars), removing the scrollbar reduces the viewport width by ~15–17px, causing the entire background page content to visually jump to the right.
  2. **iOS Safari Rubber-Banding:** `overflow: hidden` on `<body>` is notoriously ineffective on iOS Safari. Touch gestures (`touchmove`) will still scroll the background viewport behind the modal.
  3. **Nested Modals / Collisions:** Opening a second modal or sheet and closing it will reset `body.style.overflow` to empty, prematurely unlocking background scrolling while the first modal is still visible.

### Shadcn / Radix UI (`Dialog` via `react-remove-scroll`)
- **Mechanism:** Integrates `react-remove-scroll` under the hood when a modal dialog is mounted.
- **Advanced Handling:**
  - **Scrollbar Width Compensation:** Calculates the exact scrollbar width (`window.innerWidth - document.documentElement.clientWidth`) and dynamically applies `padding-right` or `margin-right` to `body` and fixed-position elements, preventing any layout shift.
  - **iOS Safari Support:** Intercepts `touchmove` events at the document level and only permits touches that originate within designated scrollable sub-containers inside the dialog.
  - **Reference Counting:** Tracks multiple active lock instances so nested dialogs, dropdowns, and drawers release the scroll lock only when the final overlay unmounts.

---

## 3. Focus Management Edge Cases

### Manual Implementation (`Modal.tsx`)
- **Mechanism:** Stores `document.activeElement` in `triggerRef` upon opening and invokes `triggerRef.current?.focus()` during cleanup. Traps focus using a `keydown` listener checking for `Tab` / `Shift+Tab`.
- **Edge Cases & Failure Points:**
  1. **Removed Trigger Node:** If the action inside the modal removes the trigger element from the DOM (e.g., clicking "Delete Item" in a confirmation dialog), `triggerRef.current.focus()` silently fails and focus resets to `document.body` / top of page.
  2. **Dynamic DOM Content:** Focusable elements are queried via `querySelectorAll` on keydown. Elements that are dynamically rendered or disabled after mount may cause focus trapping errors or focus loss.
  3. **Hidden / Invisible Elements:** Simple CSS selector `a[href], button:not([disabled])` may match elements with `display: none`, `visibility: hidden`, or zero opacity that cannot receive focus.

### Shadcn / Radix UI (`Dialog` via `FocusScope`)
- **Mechanism:** Implements a dedicated `FocusScope` with `trapped={true}` and `loop={true}`.
- **Advanced Handling:**
  - **Graceful Fallback on Trigger Loss:** If the triggering element was removed from the DOM, Radix gracefully falls back to the nearest focusable ancestor or a container element, maintaining keyboard focus within the document hierarchy.
  - **Mutation Observers:** Actively watches for DOM mutations inside the dialog, ensuring dynamic elements (e.g., async-loaded forms) are immediately included in the focus cycle.
  - **Configurable Auto-Focus:** Exposes `onOpenAutoFocus` and `onCloseAutoFocus` events that allow developers to programmatically override the default focus target.
  - **Virtual DOM / Portals:** Automatically hides background DOM from assistive tech using `aria-hidden="true"` on all sibling roots outside the portal (via `aria-hidden` / `hideOthers`), ensuring screen readers cannot bypass the focus trap.

---

## 4. Browser Inconsistencies & Internationalization

### Manual Implementation (`Modal.tsx` & `Tabs.tsx`)
- **Keyboard Handling:** Direct string checks (`e.key === 'ArrowRight'`).
- **Shortcomings:**
  1. **IME Composition:** Does not check `e.nativeEvent.isComposing`. When users type using an Input Method Editor (IME) for Japanese, Chinese, or Korean, pressing <kbd>Escape</kbd> or <kbd>Enter</kbd> to confirm a character candidate could accidentally close the modal.
  2. **RTL (Right-to-Left) Support:** In `Tabs.tsx`, <kbd>ArrowRight</kbd> always increments index. In Arabic or Hebrew (RTL mode), <kbd>ArrowRight</kbd> should move to the *previous* tab visually.
  3. **Orientation:** Manual tabs only support horizontal orientation; vertical tabs with <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> require custom code branches.

### Shadcn / Radix UI (`Tabs` & `Dialog`)
- **Advanced Handling:**
  - **Direction Provider (`dir="rtl" | "ltr"`):** Radix automatically flips arrow key navigation when inside an RTL context.
  - **Orientation Awareness:** Supports both `orientation="horizontal"` and `orientation="vertical"` out of the box with proper <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> bindings.
  - **Composition Event Safety:** Checks `isComposing` on keyboard events to ensure international keyboard input is never interrupted.
  - **ARIA 1.2 Compliance:** Implements proper `data-*` state attributes (`data-state="active"`, `data-orientation`) enabling CSS transitions and styling without manual class toggles.

---

## 5. Summary Matrix

| Feature | Manual Component (`Modal` / `Tabs`) | Shadcn / Radix (`Dialog` / `Tabs`) |
| :--- | :--- | :--- |
| **W3C ARIA Semantics** | ✅ Implemented from scratch | ✅ Fully spec-compliant |
| **Focus Trap** | ⚠️ Static querySelector cycle | ✅ Dynamic `FocusScope` + MutationObserver |
| **Trigger Restoration Fallback** | ❌ Lost if trigger is unmounted | ✅ Safe fallback strategy |
| **Click Outside (Drag-proof)** | ❌ Click on overlay dismisses | ✅ `pointerdown` origin validation |
| **Scroll Lock (iOS Safari)** | ❌ `overflow: hidden` fails on iOS | ✅ `react-remove-scroll` coordinate tracking |
| **Scrollbar Shift Prevention** | ❌ Layout jumps horizontally | ✅ Dynamic scrollbar width padding |
| **Screen Reader Background Isolation**| ⚠️ Only `aria-modal="true"` | ✅ Automatic `aria-hidden` on app root |
| **RTL / Localization** | ❌ Hardcoded Left/Right keys | ✅ Bi-directional `DirectionProvider` |
| **Customizability** | Simple inline styles / CSS | Tailwind utility classes via `className` + `cva` |

---

## 6. Conclusion & Recommendation

While the manual components successfully satisfy the core W3C ARIA specifications and provide a clear understanding of low-level accessibility mechanics, **Shadcn / Radix UI is strongly recommended for production applications**. Radix eliminates hundreds of subtle edge cases around mobile Safari touch behaviors, internationalization, scroll jumping, and portal layer management that are cost-prohibitive to maintain in-house.
