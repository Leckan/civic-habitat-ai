# CivicHabitat AI: U.S. Housing Innovation Lab

> **AI-focused multi-agent solutions and interactive prototypes addressing local and regional housing challenges across the United States.** Built with the **Google Agent Development Kit (ADK 2.0)** and **Google Gemini 3.8 Flash**.

---

## 🏛️ Overview

The United States faces an estimated shortfall of over **3.8 million homes**. While states and municipalities are passing historic regulatory reforms (such as California SB 9/10, Austin HOME Phase 2, and Washington HB 1110), housing production and affordability remain paralyzed by:

* **Fragmented Land Development Codes:** Opaque municipal bylaws, variable setbacks, and discretionary design reviews.
* **Complex Multi-Tiered Subsidies:** Structuring Low-Income Housing Tax Credits (LIHTC) and gap financing takes 12–18 months.
* **Severe Legal Asymmetry in Eviction Courts:** Over 85% of renters face displacement without legal counsel.
* **Downtown Commercial Vacancy:** Millions of square feet of underutilized office space that resist traditional residential conversion.
* **Escalating Climate & Insurance Shocks:** Rapid carrier non-renewals and premium spikes across the Sun Belt and coastal regions.

**CivicHabitat AI** translates policy reforms, open municipal geospatial records, and legal frameworks into actionable, production-grade AI prototypes that empower city planners, gentle-density builders, non-profit Community Development Corporations (CDCs), and tenant legal aid clinics.

---

## 🤖 Google Agent Development Kit (ADK) Architecture

CivicHabitat AI integrates **Google ADK** ([adk.dev](https://adk.dev)) to implement modular, team-based multi-agent systems rather than monolithic prompt scripts:

```
                  ┌──────────────────────────────────────────────┐
                  │ HousingOrchestratorAgent (RootLlmAgent)      │
                  │ Model: gemini-3.8-flash                      │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ SequentialAgent: ZoningInfillPipeline        │
                  │  ├─ ZoningGISSpecialistAgent (GIS + Municode)│
                  │  └─ ZoningEnvelopeAgent (Setback Solver)     │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ ParallelAgent: FeasibilityReviewBranch       │
                  │  ├─ FinancialStackAgent (LIHTC Underwriting) │
                  │  └─ CommunityConsensusLoop (LoopAgent CBA)   │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ Published Artifact: Verified Feasibility     │
                  │ Dossier & Community Benefits Agreement       │
                  └──────────────────────────────────────────────┘
```

### Core ADK Primitives Used
* **`LlmAgent`**: Autonomous execution unit binding Gemini 3.8 Flash with task-specific instructions and domain tools.
* **`SequentialAgent`**: Deterministic pipeline coordinating parcel GIS queries, land development code parsing, and by-right density limits.
* **`ParallelAgent`**: Concurrently evaluates financial underwriting alongside neighborhood impact simulations.
* **`LoopAgent`**: Iteratively refines architectural massing and community benefits until stakeholder approval exceeds 80%.
* **`defineTool` / `@tool`**: Strongly typed tools interfacing with County GIS Assessor shapefiles, Municode vector search, and HUD Fair Market Rent APIs.
* **Shared Session State**: Centralized mutable key-value map (`{buildable_envelope}`, `{capital_stack}`, `{max_by_right_units}`) passed between sub-agents.
* **Artifacts Engine**: Generates immutable, auditable municipal compliance dossiers and legal pleadings.

---

## 🚀 6 Flagship AI Housing Solutions

| # | Prototype | Category | Regional Focus | Core Innovation |
|---|---|---|---|---|
| **1** | **ZoningLens AI** | Zoning & Infill | CA, TX, WA, MN, CO | Converts municipal land-use codes into instant 3D build envelopes, ADU yield calculations, and by-right permit checklists. |
| **2** | **AffordStack AI** | Capital Stacking | Nationwide (LIHTC Metros) | Combinatorial optimizer balancing LIHTC 9%/4% equity, debt coverage ratios (DSCR), and HUD subsidies to eliminate multi-million dollar funding gaps. |
| **3** | **TenantGuard AI** | Eviction Defense | CA, NY, GA, AZ, PA | Computer vision document triage cross-referencing landlord notices against regional tenant protection acts to generate verified court answers within hours. |
| **4** | **AdaptiveReuse Vision** | Commercial Infill | SF, NYC, Chicago, D.C. | Computer vision and floorplate geometry scanner evaluating office floorplates for residential lightwells, plumbing cores, and conversion feasibility. |
| **5** | **CivicConsensus AI** | Civic Engagement | Suburban Boston, NY, Bay Area | Multi-agent town hall simulator synthesizing homeowner, teacher, merchant, and planner concerns into win-win Community Benefits Agreements (CBAs). |
| **6** | **ClimateShield Housing** | Insurance Solvency | FL, CA (WUI), Gulf Coast | Machine learning model predicting insurance drop-offs and quantifying the ROI of physical retrofits (IBHS Fortified standards) paired with FEMA mitigation grants. |

---

## 🎮 Interactive Features & Live Sandboxes

* **Google ADK Studio (`/adk`):** Interactive multi-agent graph inspector, real-time event trace debugger (`AGENT_START`, `TOOL_CALL`, `STATE_UPDATE`, `ARTIFACT_GEN`), session state inspector, and copyable TypeScript/Python SDK code.
* **ZoningLens Sandbox (`/demos`):** Live 2D parcel visualizer scaling lot street frontage, depth, existing home footprint, setbacks, and local zoning codes (Austin HOME Phase 2, Oakland SB 9, Seattle HB 1110, Minneapolis 2040).
* **AffordStack Sandbox (`/demos`):** Real-time pro forma modeler testing unit counts, turnkey costs, LIHTC 9% vs. 4% programs, and mortgage interest rate sensitivity.
* **TenantGuard Sandbox (`/demos`):** Natural language legal notice scanner testing real-world notices (LA 25% rent spikes, Austin 3-day no-cause notices, NYC non-renewals) with statutory violation detection and emergency response letters.
* **CivicConsensus Sandbox (`/demos`):** Multi-agent town hall deliberation producing realistic public testimonies and mediated compromise agreements.
* **AI Spec Studio (`/spec_studio`):** Gemini 3.8 Flash prompt engine synthesizing custom product specifications, open data pipelines, and 90-day pilot roadmaps for any U.S. city.
* **Regional Crisis Explorer (`/regions`):** Comparative policy diagnostics across West Coast, Sun Belt, Midwest Rust Belt, Northeast, and Mountain West resort markets.
* **Strategic Feasibility Matrix (`/matrix`):** Multi-factor scoring framework evaluating ideas across technical feasibility, civic ROI, regulatory hurdles, and time-to-MVP.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
* **Backend:** Express full-stack server running Vite in middleware mode (`server.ts`)
* **AI & Agent Runtime:** Google GenAI SDK (`@google/genai`) with `gemini-3.8-flash`
* **Agent Framework:** Google Agent Development Kit (ADK 2.0)
* **Build System:** Vite, `tsx`, TypeScript compiler (`tsc --noEmit`)

---

## 💻 Getting Started

### Prerequisites
* Node.js 20+ installed
* (Optional) `GEMINI_API_KEY` for live generative responses (high-fidelity deterministic fallbacks are included automatically if unset)

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd civic-habitat-ai

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
```

### Running Locally
```bash
# Start development server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Type Checking & Building
```bash
# Run TypeScript validation
npm run lint

# Production build
npm run build

# Start production server
npm start
```

---

## 📊 Open Public Data Sources Utilized

* **HUD:** Fair Market Rents (FMR) API & Area Median Income (AMI) Income Limits
* **U.S. Census Bureau:** American Community Survey (ACS) 5-Year Estimates
* **County GIS Assessors:** OpenStreetMap & County Land Parcel GIS Layers
* **Municode & eCode360:** Municipal Land Development & Zoning Ordinances
* **Princeton Eviction Lab:** Regional Eviction Filings & Court Records
* **FEMA & USFS:** National Flood Hazard Layer (NFHL) & Wildfire Risk to Communities

---

## ⚖️ Ethical AI & Policy Guardrails

* **Assistance, Not Legal Advice (UPL Guardrail):** Tenant legal triage tools operate strictly as informational intake and educational aids designed for use under licensed attorney supervision.
* **Transparency & Human-in-the-Loop:** All municipal zoning and capital stack calculations provide clear mathematical derivations and explicit citations to local statutory codes.
* **Anti-Bias Verification:** Demographic inputs in consensus simulations are designed to elevate historically underrepresented voices (teachers, healthcare workers, local service staff) rather than solely vocal property owners.

---

## 📄 License

Apache-2.0 License. Built for the civic technology and housing innovation community.
