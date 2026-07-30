# Workflow Drill: Lazy vs. Precise Prompting

## 1. The Caught Mistake
* **Example:** "In Round One, the AI completely failed to validate the API key length, just using a basic `<input type="text">`. If deployed, this would have allowed users to submit 3-character keys, breaking the backend OCR service. Round Two caught this by explicitly enforcing a 32-character Zod string."

## 2. Correctness & Edge Cases
* **Round One:** Did it use raw `useState`? Did it forget to prevent default form submission? Did it handle empty submits?
* **Round Two:** Note how React Hook Form handles the submission cycle and how Zod strictly blocks the edge case (e.g., typing exactly 31 characters). 
* **Specific Diff:** Quote a specific line difference (e.g., "Round 1 used `const [key, setKey] = useState('')` whereas Round 2 implemented `const { register, handleSubmit } = useForm(...)`").

## 3. Accessibility (a11y)
* **Round One:** Did it just wrap text in `<div>` tags? Did it lack `htmlFor`?
* **Round Two:** Detail the specific ARIA attributes Cursor added because you asked for them (e.g., `aria-invalid={!!errors.apiKey}`, `<label htmlFor="apiKey">`). 

## 4. Review Effort & End-to-End Time
* **Round One:** It took 10 seconds to prompt and generate, but fixing the missing validation, rewriting the state management, and adding accessibility manually would take an estimated 30-45 minutes of manual coding.
* **Round Two:** It took 3-5 minutes to write the precise prompt and wait for the Agent to run the tests, but the review effort was near zero. The code was production-ready and fully tested end-to-end immediately.

## 5. Lessons Learned (The Rules)
1. All forms must use React Hook Form and Zod; no raw `useState` for form fields.
2. Every new UI component must be accompanied by a React Testing Library `.test.tsx` file.
3. Form inputs must include `<label htmlFor="...">` and `aria-invalid` attributes tied to the form's error state.