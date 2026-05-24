<div align="center">

<img src="https://dhanadevunoori.github.io/Tech.Care/favicon.ico" width="60" alt="Tech.Care Logo" />

# Tech.Care — Patient Management Dashboard

**A production-quality healthcare dashboard with live API data, interactive charts, and dynamic patient profiles.**

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-Visit_Site-01F0D0?style=for-the-badge)](https://dhanadevunoori.github.io/Tech.Care/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://dhanadevunoori.github.io/Tech.Care/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://dhanadevunoori.github.io/Tech.Care/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://dhanadevunoori.github.io/Tech.Care/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://dhanadevunoori.github.io/Tech.Care/)

</div>

---

## 🔗 Live Demo

👉 **[https://dhanadevunoori.github.io/Tech.Care/](https://dhanadevunoori.github.io/Tech.Care/)**

> Open in your browser — no setup required.

---

## 📌 About The Project

Tech.Care is a **fully functional patient management dashboard** built from scratch using vanilla HTML, CSS, and JavaScript. It connects to a live REST API, dynamically renders patient data, and visualizes health metrics with interactive charts — all without any frontend framework.

This project was built as part of a frontend skills assessment, replicating a professional UI design with pixel-level accuracy.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔄 **Live API Integration** | Fetches real patient data from a REST API with Basic Auth |
| 📊 **Blood Pressure Chart** | Interactive 6-month trend chart built with Chart.js |
| 🫀 **Vitals Dashboard** | Respiratory rate, temperature, and heart rate cards |
| 👤 **Dynamic Patient Profiles** | Clickable patient list — each patient loads their own data |
| 🧪 **Lab Results** | Scrollable lab results list per patient |
| 📋 **Diagnostic List** | Full diagnosis history table with status indicators |
| 🎨 **Pixel-perfect UI** | Faithful recreation of a professional Figma/XD design |
| ⚡ **Zero Dependencies** | No React, no Vue, no build tools — pure vanilla JS |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Grid layout, Flexbox, custom scrollbars, CSS variables
- **JavaScript (ES6+)** — Async/await, DOM manipulation, dynamic rendering
- **Chart.js** — Blood pressure line chart with smooth curves
- **REST API** — Live data with Basic Auth headers
- **Google Fonts** — Manrope typeface
- **GitHub Pages** — Deployment

---

## 📁 Project Structure

```
Tech.Care/
│
├── index.html       # App structure and layout
├── style.css        # All styling — grid, cards, charts, scrollbars
└── script.js        # API calls, DOM rendering, chart logic
```

---

## 🚀 Run Locally

No build step needed — just clone and open:

```bash
git clone https://github.com/dhanadevunoori/Tech.Care.git
cd Tech.Care
# Open index.html in your browser
```

Or use VS Code Live Server for hot reload.

---

## 💡 Key Technical Highlights

- **API + fallback pattern** — gracefully handles API failures with local fallback data
- **Chart destroy/recreate** — prevents Chart.js memory leaks when switching patients
- **Dynamic DOM rendering** — entire UI is JS-driven, no hardcoded patient data in HTML
- **Custom CSS scrollbars** — pixel-matched to the original design spec
- **onerror image fallback** — broken profile images fall back to placeholder automatically

---

## 📸 Screenshot

<!-- Replace this with your actual screenshot after visiting the live demo -->
> 🖼️ *Add a screenshot here by dragging an image into this file on GitHub*

---

<div align="center">

Made with ❤️ by [Dhanalaxmi Devunoori](https://github.com/dhanadevunoori)

</div>
