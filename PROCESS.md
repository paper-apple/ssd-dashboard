# PROCESS.md

## 1. Tools Used

- ChatGPT — used for understanding Next.js concepts, generating initial structure, debugging, and improving implementation
- VS Code — main development environment

---

## 2. Conversation Log

### Session 1 — Project understanding
- Asked AI about Next.js fundamentals and how to build the application without a backend
- Decided to use mock data instead of implementing a backend

### Session 2 — Architecture and structure
- Asked AI about proper project structure and module interaction
- Applied suggested structure and adapted it to the project

### Session 3 — UI prototype
- Asked AI to generate an initial UI layout
- Implemented the generated structure and verified that it works

### Session 4 — Iterative development
- Asked AI follow-up questions to understand how components and logic work
- Gradually improved the implementation

### Session 5 — Feature expansion
- Decided that the project was too simple
- Asked AI how to extend functionality and make the project more complex

### Session 6 — Debugging and fixes
- Encountered multiple issues during development and resolved them with AI assistance (see Course Corrections)

---

## 3. Timeline

1. Researched Next.js basics and project approach
2. Defined architecture and project structure
3. Built initial UI layout
4. Iteratively improved functionality
5. Expanded project scope
6. Fixed runtime and configuration issues
7. Final testing and adjustments

---

## 4. Key Decisions

- Chose Next.js as the main framework for building the dashboard
- Decided not to implement a backend and use mock data instead
- Focused on understanding generated code instead of blindly copying it
- Expanded the project scope to better match real-world complexity

---

## 5. What the Developer Controlled

- Reviewed generated code and asked for explanations before using it
- Identified and fixed framework-related issues (SSR, config, hydration)
- Adjusted component structure when necessary
- Verified that the application works correctly across different environments (browsers)

---

## 6. Course Corrections

- Used `ssr: false` inside a Server Component (`page.tsx`) → identified as invalid and refactored the structure
- Misunderstood Next.js configuration → replaced `next.config.ts` with `next.config.js`
- Hydration mismatch error in browser → identified external cause (browser extensions) and mitigated with `suppressHydrationWarning`
- Deprecated API usage (`Cell` in chart module) → replaced with modern API approach
- Initial project was too simple → expanded functionality after reevaluation

---

## 7. Self-Assessment

- Traceability: PARTIAL — requirements are not fully linked to components and tests
- DRY: PARTIAL — some improvements in structure, but potential duplication may remain
- Deterministic Enforcement: PARTIAL — basic validation done, but could be improved with stricter automation
- Parsimony: PARTIAL — some parts of the codebase could be simplified and reduced