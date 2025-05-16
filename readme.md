# 🧱 CV Builder – Local-First, Markdown-Friendly, Beginner-Friendly

## ⚡ TL;DR

A simple, local-first CV builder written in vanilla HTML/CSS/JS.
**No frameworks. No dependencies. No data leaves your browser.**
Use it directly or [host it yourself](#usage).

---

## 🚀 Usage

You can either:

* Clone (https://github.com/xintamosaik/vc9.git) and run locally with any static server (e.g. `Live Server`, `python3 -m http.server`, or `npx serve`)
* Or try the [GitHub Pages version](https://xintamosaik.github.io/vc9/)

> Your data is stored in `localStorage`, so it persists between sessions **but stays on your machine**.

---

## ✨ Features & USPs

* **📍 Local-first** – No login, no server, no tracking. All your data is saved in your browser.
* **📝 Markdown support** – Write your summary and skills in plain markdown (lists, bold).
* **🔄 Import/Export** – Easily transfer data with JSON using the `Import/Export` tab.
* **🧱 MPA (Multi-Page App)** – No client-side router, each view is a standalone HTML page.
* **💾 PDF-Ready** – The Preview page is print-ready and optimised for A4 export.

---

## 💡 Philosophy

This project deliberately avoids SPA frameworks like React/Vue/Svelte to explore how far a **Multi-Page App** (MPA) can go when:

* Paired with `localStorage` for persistence
* Designed with **separation of concerns** and good defaults
* Built for **developer ownership** and inspectability

Think of this as an architectural experiment:

* How does it feel to build a tool *without React/Vite/Next.js*?
* What do we gain (or lose) in terms of speed, clarity, complexity?

All logic is modular and written in small JS files to encourage inspection and learning.

---

## 🛠 Caveats
- 🎨 Style editor not implemented yet – Styling is consistent and clean by default, but there’s no UI to customise it.
    - You can easily override the CSS in shared.css if you clone the repo.

- 📦 No cloud storage or account system
    - This is by design, but keep backups using the Export button.

- 📄 Multiple CVs: work in progress
    - You can create and preview multiple CV drafts, but:
    - There's no delete UI
    - Drafts can only be distinguished by metadata (e.g. company/sector)
    - Editing saved drafts is functional but not yet seamless

---

## 🤝 Contribute / Feedback Welcome!

This tool is intentionally beginner-friendly:

* No build step
* You can inspect or edit any HTML file directly
* Functions are short and named for readability

> If you're learning web dev, feel free to fork it, modify it, or break it on purpose.
> If you're an expert: What would you improve without turning this into a SPA?

Create an issue or email me with thoughts!

---

## 📂 Folder Structure

```
xintamosaik-vc9/
├── index.html           # Entry point
├── shared.css           # Unified styling (dark mode)
├── shared.js            # Markdown helpers
├── editor/              # All editing views
└── preview/             # Print/export-ready CV preview
```

