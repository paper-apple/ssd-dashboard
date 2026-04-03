# SDD Dashboard

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/yourusername/sdd-navigator-dashboard/pulls)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-red)](https://tailwindcss.com/)

<p align="left">
  <a href="README.ru.md">Русский</a>
</p>

## 📋 About the Project

SDD Dashboard is a web application for monitoring specification coverage that allows you to:
- Track coverage metrics
- Analyze the status of each specification
- Filter and search specifications by various criteria

The project is built with Next.js and demonstrates:
- Client-server architecture with REST API
- Interactive charts and data visualization
- Backend emulation through Next.js API Routes

## ▶️ Demo

**[Try the application online](https://sdd-dashboard-delta.vercel.app)**

## ⚙️ Features

- **Coverage Metrics** — overall coverage percentage, statistics by status
- **Data Visualization** — horizontal bar chart showing coverage for each specification
- **Filtering** — by status, priority, minimum coverage
- **Search** — by specification ID and name
- **Detailed Information** — description, components
- **API Emulation** — REST API via Next.js API Routes
- **Interactive Cards** — expandable component lists

## 🛠️ Tech Stack

**Frontend:**
- Next.js — React framework
- TypeScript — type safety
- Tailwind CSS — styling
- Recharts — charts

**Backend (emulation):**
- Next.js API Routes — REST API endpoints
- JSON — data storage

## 📸 Screenshots

<table>
  <tr>
    <th width="50%">Statistics</th>
    <th width="50%">Filters & Specifications</th>
  </tr>
  <tr>
    <td align="center">
      <img src="assets/screenshots/stats.png" width="100%"/>
    </td>
    <td align="center">
      <img src="assets/screenshots/filters-and-specifications.png" width="100%"/>
    </td>
  </tr>
</table>

## 🧱 Project Architecture

<details>
<summary>Click to expand</summary>

SDD-DASHBOARD/<br>
├── app/<br>
│   ├── api/<br>
│   │   └── specs/<br>
│   │       └── route.ts       # Route handler<br>
│   ├── components/<br>
│   │   ├── CoverageChart.tsx  # Bar chart<br>
│   │   ├── Filters.tsx        # Filters<br>
│   │   ├── SpecCard.tsx       # Specification cards<br>
│   │   └── StatsCards.tsx     # Statistics<br>
│   ├── layout.tsx             # Entry point<br>
│   └── page.tsx               # Main page<br>
├── data/<br>
│   └── specifications.json    # Specifications list<br>
└── README.md

</details>

## 💾 Data Structure

```json
{
  "totalCoverage": 62.3,
  "specifications": [
    {
      "id": "REQ-102",
      "title": "User Dashboard",
      "description": "Display of key metrics and charts",
      "coverage": 45,
      "status": "partial",
      "components": ["DashboardLayout", "MetricCard"],
      "priority": "high"
    },
  ]
}
```

**Main Entities:**
- `specifications` — specifications with coverage metrics
- `coverage` — coverage percentage (0-100)
- `status` — coverage status (covered/partial/missing)
- `priority` — specification priority (high/medium/low)
- `components` — related components

## 🧪 Testing

This project uses:
- Jest
- React Testing Library

Tests cover:
- UI components (Filters, SpecCard, StatsCards, CoverageChart)
- Data filtering and transformation logic

Tests are linked to requirements using identifiers:
```ts
// @req SDD-UI-002
test('SDD-UI-002: calculates average coverage correctly', ...)
```

**Run tests:**
```bash
npm test
```

## 🖐️ Manual Setup

**Requirements:**
- Node.js v22+
- npm or yarn

**1. Clone the repository:**
```bash
git clone https://github.com/paper-apple/sdd-dashboard.git
cd sdd-dashboard
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run the application:**
- Start in development mode
```bash
npm run dev
```

- Start in production mode
```bash
npm run build
npm run start
```

**4. Open the application:**
- The application is available at: [http://localhost:3000](http://localhost:3000)

## 📞 Contact

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](birdcherrytea@gmail.com)</br>
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/submarino_amarillo)</br>
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dzmitry-paklonski/)