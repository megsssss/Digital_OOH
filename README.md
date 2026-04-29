# DigitalOOH.IO — Site Health & Revenue-at-Risk Monitor

**Take-home submission · Technical BA role · Megha**

---

## What This Is

A full-stack prototype of a **site health and revenue-at-risk monitor** for OOH media owners. It answers two questions in real time:

1. Which screens in my network are down right now?
2. How much money am I losing — and which advertiser campaigns are affected?

The backend is Node.js + MongoDB. The frontend is React. The dataset covers **50 sites across 18 Indian cities**, seeded with 8 active advertiser campaigns.

---

## Live Demo

→ **[Deployed URL — add after deployment]**

Or run locally (see below).

---

## Quick Start (Local)

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) OR just run without it — the backend falls back to mock mode automatically.

### Backend

```bash
cd backend
npm install
node server.js
# → Starts on http://localhost:5000
# → Auto-seeds 50 sites + 8 campaigns if DB is empty
# → Falls back to in-memory mock mode if MongoDB isn't running
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → Starts on http://localhost:5173
```

Set `VITE_API_URL=http://localhost:5000` in `frontend/.env` to connect to the live backend.

The **frontend also works fully standalone** — it has all 50 sites and 8 campaigns embedded as mock data. You don't need the backend running to see the full UI.

---

## API Reference

| Endpoint | Description |
|---|---|
| `GET /api/dashboard` | Aggregate stats: uptime %, total risk, affected campaigns |
| `GET /api/sites` | All 50 sites with current status |
| `GET /api/outages` | Active outages with site + campaign details |
| `GET /api/campaigns` | Active campaigns |
| `GET /api/sites/:id/status` | Single site detail + affected campaigns |
| `POST /api/sites/:id/resolve` | Mark outage resolved |
| `GET /api/cities` | City-level breakdown |

---

## City Selection — Why These 18

The brief said "50 sites across Indian cities of your choosing — pick cities the way an OOH founder would, not the obvious five."

So I didn't just do Mumbai, Delhi, Bengaluru, Chennai, Hyderabad. Here's my actual reasoning:

| City | Why an OOH founder would care |
|---|---|
| **Mumbai + satellite towns (Thane, Navi Mumbai)** | Highest CPMs in India. Thane/NM are where budget-constrained brands go when they can't afford WEH. |
| **Delhi + NCR (Gurugram, Noida, Faridabad)** | NCR is 4 distinct markets with different CPMs and audience profiles. |
| **Bengaluru** | Tech-brand advertising hub. ORR has the highest frequency traffic. |
| **Hyderabad + Warangal** | Telangana government is aggressive on DOOH. Warangal is where the regional operators sit. |
| **Coimbatore** | Tamil Nadu's second city. Textile money, FMCG brands, zero sophisticated OOH tooling. |
| **Vijayawada** | Coastal AP's commercial capital. High Telugu-market brand spend; no tech in the OOH chain. |
| **Guwahati** | Entire Northeast served from here. Brands entering NE start with one Guwahati hoard. Often forgotten in national plans. |
| **Nagpur** | The geographic centre of India. Major logistics corridor. Real estate and education spend. |
| **Bhubaneswar** | Odisha's fastest-growing city. Government-backed smart city spend. Underserved by platforms. |
| **Indore** | MP's commercial capital. FMCG corridor. Tier-2 pricing with Tier-1 footfall on AB Road. |
| **Kochi + Thiruvananthapuram** | Kerala has the highest per-capita consumer spend in South India. Two distinct markets. |
| **Chandigarh** | Serves Punjab + Haryana together. FMCG and real estate money. |
| **Jaipur** | Tourism + real estate + gold retail. Big Akshaya Tritiya and Diwali spends. |
| **Nashik** | Mumbai overflow market. Also wine country — aspirational brands spend here. |
| **Rajkot, Vadodara, Surat, Gandhinagar** | Gujarat's non-Ahmedabad markets. Textile, diamond, and chemical industry money. |
| **Mangaluru** | Karnataka's port city. High-income coastal market. Ignored by most national OOH buys. |

---

## Advertiser Campaigns — Why These 8

These are real brands running real OOH campaigns in India right now (as of early 2025), chosen to show the range of sectors that use OOH:

1. **Zepto** — Quick commerce, heavy on metro corridors
2. **Aditya Birla Sun Life** — BFSI, the #BoodheHokeKyaBanoge DOOH campaign was actually launched at Juhu Beach in Jan 2025
3. **Parle Agro / Smoodh Lassi** — FMCG, the 70-market campaign mentioned in public EY/FICCI reports
4. **Swiggy** — Quick commerce, metro transit focus
5. **HDFC Bank** — BFSI home loans, South India corridor
6. **Hyundai** — Auto, Creta Electric launch was a real early 2025 OOH push
7. **BYJU's** — EdTech, exam season (NEET) buys in Tier-2 cities
8. **Tanishq** — Jewellery, Akshaya Tritiya is the biggest OOH spend window in the year

---

## The Revenue-at-Risk Calculation

```
Revenue at Risk (₹) = (Daily Rate ÷ 1440 minutes) × Minutes offline
```

Daily rates are seeded from publicly available OOH rate cards and EY/FICCI industry reports. They're directionally accurate, not contractually precise. In production, these would be pulled from the media owner's actual booking system.

---

## What I'd Push Back On

**"Node + MongoDB for this use case"**
I built it as specified. But I'd flag: campaign bookings and financial data have relational integrity requirements (a campaign links to specific sites, which have specific rates, which produce billable outage records). That's Postgres territory. MongoDB is fine for telemetry events and site pings. This is worth a conversation before locking the production architecture.

**"Flag which advertisers are affected when something's down"**
This requires that campaign data already exists in the system. In the prototype, I seeded it. In production, the real problem is: how do you get media owners to digitise their existing booking ledgers? They're in Excel or WhatsApp notes. The right answer is a CSV import or a WhatsApp-bot ingestion flow — not a web form. The prototype assumes the data is there; the product challenge is getting it there.

**"50 sites"**
Fine for a demo. A real media owner in a single city can have 200–500 sites. The architecture needs to handle 50,000 sites with real-time ping monitoring before it's production-ready. I'd verify the WebSocket/polling strategy well before the first enterprise onboarding.

**The 12-feature roadmap framing**
I haven't seen the roadmap, but: 12 features in 12 months before you have real users is a product death march. I'd prioritise 3 features validated by 10 paying media owners over 12 features that look great in a demo.

---

## Where I Used AI Heavily

- **Market research synthesis** — I used Claude to help organise and fact-check market data from EY, FICCI-EY, Mordor Intelligence, and Media4Growth. All statistics cited in the strategy doc are from primary reports.
- **Boilerplate React/Node code** — The component structure and Express routes were AI-assisted. The data design (which cities, which campaigns, which rate cards, the revenue-at-risk formula) was done by me.
- **Document formatting** — The Word doc was generated programmatically using the `docx` JS library.

**Where I didn't use AI:**
- The city selection rationale — that's my judgment about Indian geography and OOH market dynamics.
- The "What I'd Push Back On" section — written by me, directly.
- The OOH observation (Section 4 of the doc) — real, personal.

---

## If I Ran Out of Time

I ran out of time on:
- A real-time ping monitor (cron job that actually pings screens and updates status) — the architecture is there in `server.js` but I'd wire it to `node-cron` properly in production
- Map visualisation — I'd use Mapbox GL JS to show site locations with status dots. The lat/lng coordinates are all seeded.
- WhatsApp alert integration — the logical alert channel for Indian media owners

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Backend | Node.js + Express | As specified |
| Database | MongoDB + Mongoose | As specified; mock mode for local dev |
| Frontend | React (Vite) | Fast setup, component model fits the dashboard |
| Styling | Inline CSS | Zero config, easy to read in a review context |
| Data | Seeded from industry reports | EY, FICCI-EY, Mordor Intelligence, Media4Growth |
