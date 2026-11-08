export interface HousingPrototype {
  id: string;
  name: string;
  tagline: string;
  category: 'Zoning & Supply' | 'Finance & Subsidies' | 'Tenant Rights' | 'Adaptive Reuse' | 'Civic Consensus' | 'Climate & Insurance';
  badgeColor: string;
  primaryProblem: string;
  whyAiNeeded: string;
  keyTargetAudience: string[];
  priorityRegions: string[];
  systemArchitecture: {
    inputs: string[];
    models: string[];
    outputs: string[];
  };
  keyFeatures: string[];
  impactMetrics: {
    label: string;
    value: string;
  }[];
  regulatoryHurdles: string;
  pilotStrategy: string;
  dataSources: string[];
  adkArchitecture: {
    graphType: 'SequentialAgent' | 'ParallelAgent' | 'LoopAgent' | 'HierarchicalTeam';
    primaryAgents: string[];
    adkTools: string[];
    sharedStateSchema: string[];
  };
}

export const HOUSING_PROTOTYPES: HousingPrototype[] = [
  {
    id: 'zoning-lens',
    name: 'ZoningLens AI: Automated Infill & ADU Feasibility Engine',
    tagline: 'Translating complex municipal land-use codes into instant parcel-level 3D build envelopes and ADU yield forecasts.',
    category: 'Zoning & Supply',
    badgeColor: 'from-emerald-500 to-teal-600',
    primaryProblem: 'Single-family zoning has locked up 75% of residential land in U.S. cities. Even when states pass reform (CA SB 9/10, Austin HOME Phase 2, Washington HB 1110), homeowners and small builders find zoning bylaws, setback formulas, lot coverage caps, and utility easements impenetrable without spending $5,000–$15,000 on preliminary civil surveys.',
    whyAiNeeded: 'Zoning codes are written in ambiguous, fragmented legalese spread across municipal ordinances, overlay districts, and historical variance records. Traditional GIS only renders static 2D boundaries. Vision-language models and spatial constraint solvers can ingest unstructured municipal code and automatically compute exact 3D buildable volumes for every parcel in seconds.',
    keyTargetAudience: ['Homeowners wanting ADUs', 'Missing Middle / gentle density builders', 'City planning departments', 'Civic GIS analysts'],
    priorityRegions: ['California (Bay Area, LA, San Diego)', 'Austin & Dallas, TX', 'Seattle & Spokane, WA', 'Minneapolis, MN', 'Denver, CO'],
    systemArchitecture: {
      inputs: ['County parcel APN', 'Municipal Land Development Code (LDC)', 'LIDAR elevation & tree canopy data', 'Utility connection maps'],
      models: ['Spatial Constraint Solver (setbacks, height, daylight planes)', 'RAG Vector Index over Municode/eCode360', 'Generative 3D Mesh Massing model'],
      outputs: ['By-right build envelope', 'Max allowable units & square footage', 'Pre-calculated civil permit clearance checklist', 'Rough order of magnitude (ROM) build cost']
    },
    keyFeatures: [
      'Instant parcel look-up across 1.2M+ U.S. metro parcels',
      'By-right vs. conditional use comparison toggle',
      'Automated ADU template matching (pre-approved modular blueprints)',
      'Utility trenching and setback conflict detection'
    ],
    impactMetrics: [
      { label: 'Feasibility Assessment Time', value: '30s vs 6 weeks' },
      { label: 'Pre-development Cost Savings', value: '$8,500 / parcel' },
      { label: 'ADU Permit Filing Increase', value: '+42% in pilot cities' }
    ],
    regulatoryHurdles: 'Discretionary design review boards and historic preservation overlay zones that override state by-right mandates.',
    pilotStrategy: 'Partner with 2 forward-thinking municipal planning offices (e.g. Austin Planning Dept) to pre-certify ZoningLens calculations as officially accepted expedited submittals.',
    dataSources: ['OpenStreetMap GIS', 'County Tax Assessor Database', 'Municipal Municipal Code (eCode360)', 'USGS 3D Elevation Program (3DEP)'],
    adkArchitecture: {
      graphType: 'SequentialAgent',
      primaryAgents: ['MunicipalGisIngestionAgent (LlmAgent)', 'ZoningSetbackSolverAgent (LlmAgent)', 'PermitClearanceValidator (LlmAgent)'],
      adkTools: ['lookup_municipal_gis_parcel', 'query_municode_rag', 'calculate_buildable_envelope_polygon'],
      sharedStateSchema: ['parcel_apn', 'buildable_envelope', 'max_by_right_units', 'clearance_certificate']
    }
  },
  {
    id: 'afford-stack',
    name: 'AffordStack AI: Affordable Housing Capital Stack Optimizer',
    tagline: 'Algorithmic multi-tier financing synthesis for Low-Income Housing Tax Credits (LIHTC) and gap funding.',
    category: 'Finance & Subsidies',
    badgeColor: 'from-blue-500 to-indigo-600',
    primaryProblem: 'Financing a 60-unit affordable housing development in the U.S. requires layering 6 to 12 distinct funding sources: LIHTC 9% or 4%, state housing finance agency (HFA) bonds, HUD HOME, CDBG, Federal Home Loan Bank (FHLB) AHP, and local housing trust funds. Assembling and balancing these pro formas takes 12–18 months; if interest rates tick up 50 basis points, the entire deal collapses into a multi-million-dollar funding gap.',
    whyAiNeeded: 'The subsidy matrix is a complex combinatorial optimization problem with competing rules: different affordability AMI restrictions (30% vs 50% vs 80% AMI), debt-service coverage ratio (DSCR) constraints, and compliance expiration windows. AI can simulate 5,000 capital stack variations in minutes, identifying the exact subsidy mix that maximizes credits and closes financial gaps.',
    keyTargetAudience: ['Non-profit Community Development Corporations (CDCs)', 'State Housing Finance Agencies (HFAs)', 'Impact investors & Community Development Financial Institutions (CDFIs)'],
    priorityRegions: ['Nationwide (Metros with high LIHTC competition like NY, CA, IL, MA, GA)'],
    systemArchitecture: {
      inputs: ['Total development cost (TDC)', 'Unit mix & AMI targets', 'Current bond interest rates', 'State QAP (Qualified Allocation Plan) scoring criteria'],
      models: ['Combinatorial Constrained Pro Forma Optimizer', 'Predictive QAP Award Probability Model', 'Macro interest rate sensitivity stress-tester'],
      outputs: ['Optimal funding stack breakdown', 'HUD compliance validation report', 'QAP competitive point score projection', 'Real-time gap-closing recommendations']
    },
    keyFeatures: [
      'Multi-scenario capital stack generator (9% vs 4% + Tax-Exempt Bonds)',
      'Automated State QAP scoring optimizer (predicts state award rank)',
      'DSCR & cash-flow sensitivity sliders across 30-year pro forma',
      'One-click export of investor-ready HUD pro forma spreadsheets'
    ],
    impactMetrics: [
      { label: 'Pro Forma Structuring Time', value: '4 hours vs 3 months' },
      { label: 'Deal Dropout Reduction', value: '38% fewer cancelled deals' },
      { label: 'Subsidy Utilization Efficiency', value: '+$1.4M gap closed / project' }
    ],
    regulatoryHurdles: 'Annual shifts in state Qualified Allocation Plans (QAP) and local Davis-Bacon prevailing wage compliance documentation.',
    pilotStrategy: 'Collaborate with a regional association of non-profit housing developers (such as California Housing Consortium or Enterprise Community Partners) on 15 active pipeline developments.',
    dataSources: ['HUD Fair Market Rent & Income Limits API', 'State Housing Finance Agency QAP Archives', 'Federal Reserve Economic Data (FRED)', 'Novogradac LIHTC Equity Pricing Trackers'],
    adkArchitecture: {
      graphType: 'LoopAgent',
      primaryAgents: ['ProFormaFormulatorAgent (LlmAgent)', 'QapScorerAgent (LlmAgent)', 'SubsidyGapReconciler (LoopAgent)'],
      adkTools: ['calculate_lihtc_basis', 'lookup_hud_fair_market_rent', 'optimize_dscr_amortization'],
      sharedStateSchema: ['total_development_cost', 'lihtc_equity', 'hard_debt_capacity', 'unfunded_gap']
    }
  },
  {
    id: 'tenant-guard',
    name: 'TenantGuard AI: Regional Eviction Triage & Defense Platform',
    tagline: 'Democratizing legal parity for vulnerable renters facing unlawful notices, illegal rent hikes, and retaliatory lockouts.',
    category: 'Tenant Rights',
    badgeColor: 'from-amber-500 to-orange-600',
    primaryProblem: 'Over 85% of U.S. tenants in eviction court have no legal representation, while 90% of landlords do. Many eviction notices are procedurally defective (violating California AB 1482, New York HSTPA, or local rent stabilization rules), but tenants miss short 3-to-5 day statutory response windows, resulting in default judgments and chronic displacement.',
    whyAiNeeded: 'Eviction defense requires reading messy, often handwritten notices, checking them against hyper-local municipal rent ordinances, and generating legally accurate procedural answers within hours. LLMs fine-tuned on regional civil procedure can extract critical dates, audit rent calculation math against inflation caps, and produce court-ready verified answers.',
    keyTargetAudience: ['Tenants facing eviction notices', 'Legal Aid societies & pro bono clinics', 'Municipal tenant advocacy ombudsmen', 'Community organizers'],
    priorityRegions: ['Los Angeles & Central Valley, CA', 'New York City & Upstate NY', 'Atlanta & Fulton County, GA', 'Phoenix, AZ', 'Philadelphia, PA'],
    systemArchitecture: {
      inputs: ['Photograph or PDF of landlord notice / summons', 'Rental lease agreement', 'Jurisdiction / Zip Code', 'Rent payment receipts'],
      models: ['OCR Document Parsing & Entity Extraction', 'Municipal Tenant Law Rule Engine (Just Cause / Rent Caps)', 'Court Answer & Formal Declaration Generator'],
      outputs: ['Procedural Validity Score (0-100)', 'Emergency filing countdown timer', 'Customized legal Answer & Demurrer draft', 'Direct routing to local pro bono attorneys']
    },
    keyFeatures: [
      'Smartphone camera photo-to-legal triage in 60 seconds',
      'Calculates exact local rent increase caps (e.g., 5% + local CPI)',
      'Generates affirmative defense declarations (breach of habitability, retaliation)',
      'Multi-lingual accessibility (Spanish, Vietnamese, Cantonese, Tagalog, English)'
    ],
    impactMetrics: [
      { label: 'Default Judgments Prevented', value: '64% reduction in pilot clinics' },
      { label: 'Tenant Legal Aid Capacity', value: '5x more cases handled / attorney' },
      { label: 'Procedural Defects Identified', value: '47% of notices flagged invalid' }
    ],
    regulatoryHurdles: 'Unauthorized Practice of Law (UPL) guardrails; system must operate as an informational intake and legal aid assistive tool under attorney supervision.',
    pilotStrategy: 'Deploy inside 3 high-volume municipal legal aid eviction clinics (e.g. Eviction Defense Collaborative) as an intake triage assistant.',
    dataSources: ['Eviction Lab Data Pipeline', 'County Municipal Court Dockets', 'State Statutory Codes (e.g. CA Civil Code 1946.2)', 'Bureau of Labor Statistics Regional CPI'],
    adkArchitecture: {
      graphType: 'ParallelAgent',
      primaryAgents: ['DocumentOcrAgent (LlmAgent)', 'StatuteAuditorAgent (LlmAgent)', 'LegalPleadingSynthesizer (LlmAgent)'],
      adkTools: ['parse_notice_entities', 'cross_reference_rent_caps', 'generate_verified_answer_pdf'],
      sharedStateSchema: ['notice_ocr_text', 'statute_violations', 'emergency_deadline', 'draft_pleading']
    }
  },
  {
    id: 'adaptive-reuse',
    name: 'AdaptiveReuse Vision: Commercial-to-Residential Feasibility Scanner',
    tagline: 'Computer vision and spatial geometry analysis identifying office-to-housing conversion candidates.',
    category: 'Adaptive Reuse',
    badgeColor: 'from-purple-500 to-pink-600',
    primaryProblem: 'Downtown office vacancy rates in cities like San Francisco, Chicago, and Washington D.C. hover between 20% and 35%. Yet converting commercial buildings to residential fails because 70% of modern office floor plates are too deep (lack of daylight access to bedrooms), have central HVAC rather than unitized ventilation, or lack wet-column plumbing stacks.',
    whyAiNeeded: 'Evaluating a building for adaptive reuse traditionally requires a $50,000 architectural feasibility study per property. Computer vision combined with spatial layout algorithms can ingest floor plans and satellite/LIDAR footprints to automatically score residential conversion viability (window-to-core ratio, egress geometry, elevator core placement, lightwell feasibility).',
    keyTargetAudience: ['Municipal economic development agencies', 'Urban redevelopment builders', 'Downtown commercial property owners', 'Architectural firms'],
    priorityRegions: ['San Francisco & Silicon Valley, CA', 'Chicago, IL', 'New York City (Midtown & FiDi)', 'Washington, D.C.', 'Pittsburgh & Philadelphia, PA'],
    systemArchitecture: {
      inputs: ['Building floor plan PDFs / CAD files', 'Building footprint & height data (LIDAR)', 'Commercial property sales records', 'Municipal conversion tax incentive parameters'],
      models: ['Architectural Floorplate Geometry Scanner', 'Automated Lightwell & Demising Wall Generator', 'Mechanical & Plumbing Retrofit Cost Estimator'],
      outputs: ['Residential Conversion Index (0-100 score)', 'Potential residential unit yield (studios, 1BR, 2BR)', 'Estimated cost per residential square foot', 'Identified structural code bottlenecks']
    },
    keyFeatures: [
      'Automated floorplate depth & core-to-window daylight analysis',
      'Simulated residential layout partitioning with internal lightwells',
      'Comparative financial viability vs. continuing office vacancy',
      'Incorporation of state conversion tax credits (e.g., California AB 2011)'
    ],
    impactMetrics: [
      { label: 'Initial Site Screening Speed', value: 'Minutes vs 8 weeks' },
      { label: 'Feasibility Study Savings', value: '$45,000 / building' },
      { label: 'Viable Unit Identification', value: '18,000+ units mapped across pilot cities' }
    ],
    regulatoryHurdles: 'Building code conflicts between International Commercial Building Code (IBC) and Residential Code (operable windows, egress corridors).',
    pilotStrategy: 'Screen a downtown portfolio of 100 distressed B/C-grade office buildings in partnership with a city downtown business association (e.g. Downtown SF Partnership).',
    dataSources: ['CoStar / Commercial Real CRE GIS', 'Municipal Department of Building Inspection archives', 'OpenBIM standard schemas', 'City Property Assessment GIS'],
    adkArchitecture: {
      graphType: 'HierarchicalTeam',
      primaryAgents: ['FloorplateVisionAgent (LlmAgent)', 'PlumbingCoreSolver (LlmAgent)', 'ConversionFeasibilityScorer (LlmAgent)'],
      adkTools: ['compute_window_to_core_depth', 'simulate_lightwell_carving', 'estimate_mep_retrofit_cost'],
      sharedStateSchema: ['cad_floorplate_data', 'usable_residential_sqft', 'unit_layout_matrix', 'conversion_score']
    }
  },
  {
    id: 'civic-consensus',
    name: 'CivicConsensus AI: Public Hearing & NIMBY-to-YIMBY Mediator',
    tagline: 'Simulating neighborhood stakeholder friction and formulating mutually agreeable Community Benefits Agreements (CBAs).',
    category: 'Civic Consensus',
    badgeColor: 'from-cyan-500 to-blue-600',
    primaryProblem: 'Vocal opposition at public hearings stalls or down-zones thousands of high-quality infill housing developments across the U.S. Developers often arrive at city council hearings blind to specific hyper-local anxieties (traffic choke-points, tree canopy removal, sunlight blockage), leading to reactionary project cancellations.',
    whyAiNeeded: 'Public hearing transcripts, neighborhood association minutes, and public comments contain rich sentiment data that humans cannot parse across dozens of projects. Multi-agent persona simulation can stress-test a proposed building against historical neighborhood objections before filing, automatically suggesting design concessions (e.g. 4th floor step-backs, reserved public EV charging) that win planning board approval.',
    keyTargetAudience: ['Housing developers', 'City council members & planning boards', 'Neighborhood coalitions', 'Civic tech researchers'],
    priorityRegions: ['Suburban Boston, MA', 'Westchester & Long Island, NY', 'Silicon Valley & Peninsula, CA', 'Montgomery County, MD', 'Seattle suburbs, WA'],
    systemArchitecture: {
      inputs: ['Project architectural specs (height, unit count, parking)', 'Past 5 years of municipal planning board hearing transcripts', 'Traffic and school district enrollment forecasts'],
      models: ['Multi-Agent Persona Simulation (Homeowner, Small Business, Renter, Planner)', 'Sentiment & Objection Clustering LLM', 'Automated Compromise & CBA Synthesizer'],
      outputs: ['Predicted approval probability', 'Top 4 anticipated public objections', 'Actionable design compromises that neutralize opposition', 'Ready-to-present Community Benefits Agreement brief']
    },
    keyFeatures: [
      'Interactive public hearing multi-agent debate simulation',
      'Identifies specific high-friction design features (e.g. curb-cuts, shadow lines)',
      'Generates balanced community concessions that preserve project margin',
      'Objective civic impact fact sheets correcting neighborhood misinformation'
    ],
    impactMetrics: [
      { label: 'Discretionary Approval Rate', value: '+34% approval lift' },
      { label: 'Hearing Cycle Reductions', value: '2 fewer public hearings needed' },
      { label: 'Community Concessions Delivered', value: '100% transparent benefit tracking' }
    ],
    regulatoryHurdles: 'Political mistrust of automated consensus systems; must remain strictly transparent and assistive for human planning commissioners.',
    pilotStrategy: 'Test with 5 mid-size municipalities during zoning board review for Missing Middle and transit-adjacent developments.',
    dataSources: ['City Council & Planning Commission Meeting Minutes (Legistar/Granicus)', 'Census Decennial & ACS Demographics', 'Local School District Capacity Reports', 'Regional Transit Agency Ridership Stats'],
    adkArchitecture: {
      graphType: 'LoopAgent',
      primaryAgents: ['StakeholderPersonaSimulator (ParallelAgent)', 'ObjectionSynthesizerAgent (LlmAgent)', 'CbaNegotiatorLoop (LoopAgent)'],
      adkTools: ['query_council_hearing_history', 'evaluate_traffic_shadow_claims', 'generate_community_benefits_agreement'],
      sharedStateSchema: ['project_specs', 'neighborhood_friction_points', 'current_approval_odds', 'final_cba_dossier']
    }
  },
  {
    id: 'climate-shield',
    name: 'ClimateShield Housing: Insurance Solvency & Retrofit Forecaster',
    tagline: 'Predicting property insurance drop-offs and modeling resiliency retrofits to safeguard affordable homeownership.',
    category: 'Climate & Insurance',
    badgeColor: 'from-rose-500 to-red-600',
    primaryProblem: 'An accelerating driver of the U.S. housing crisis is property insurance collapse. In Florida, California, and Louisiana, major insurers are non-renewing policies or doubling premiums to $6,000–$12,000/year, triggering escrow payment shocks and mortgage defaults for lower- and middle-income families.',
    whyAiNeeded: 'Insurance underwriting models are proprietary black boxes. Homeowners and housing counselors have no proactive way to understand why their policy is at risk or which specific physical retrofits (e.g., IBHS Fortified Roof, ember-resistant soffits, backflow valves) would maintain insurability and lower premiums. Machine learning can model regional non-renewal probability and quantify the ROI of mitigation grants.',
    keyTargetAudience: ['At-risk low- and moderate-income homeowners', 'HUD-certified housing counseling agencies', 'State FAIR plan administrators', 'Municipal resilience officers'],
    priorityRegions: ['Florida (Coastal & Central)', 'California (Wildland-Urban Interface zones)', 'Louisiana & Gulf Coast', 'Texas (Houston & Gulf Coast)', 'Appalachian flood zones'],
    systemArchitecture: {
      inputs: ['Property parcel address & building age', 'Roof condition & construction materials', 'FEMA National Flood Hazard Layer (NFHL)', 'CalFire / USFS Wildfire Risk Maps'],
      models: ['Regional Insurance Non-Renewal Risk Predictor', 'Mitigation Retrofit Cost-Benefit Optimization Engine', 'State Hazard Mitigation Grant Program (HMGP) matcher'],
      outputs: ['Insurability Vulnerability Score (1-100)', '3 priority physical retrofits to preserve coverage', 'Estimated annual premium savings', 'Pre-filled state mitigation grant applications']
    },
    keyFeatures: [
      'Early warning alert for anticipated carrier non-renewals',
      'Customized physical hardening checklist (IBHS Fortified standards)',
      'Matching to FEMA BRIC, HUD CDBG-MIT, and state grant funding pools',
      'Neighborhood-level insurance climate risk heatmaps'
    ],
    impactMetrics: [
      { label: 'Unforeseen Policy Drop-offs', value: '52% prevented via early retrofits' },
      { label: 'Average Annual Premium Savings', value: '$2,100 / household' },
      { label: 'Grant Access Rate', value: '3x higher successful grant applications' }
    ],
    regulatoryHurdles: 'Insurance commission rate-filing secrecy and variation in state FAIR Plan safety-net criteria.',
    pilotStrategy: 'Pilot with 3 HUD-approved housing counseling agencies in South Florida and the Sierra Nevada foothills of California.',
    dataSources: ['State Department of Insurance Annual Reports', 'FEMA Flood Hazard & FIRM maps', 'USFS Wildfire Risk to Communities', 'First Street Foundation Climate Risk APIs'],
    adkArchitecture: {
      graphType: 'SequentialAgent',
      primaryAgents: ['PropertyRiskScanner (LlmAgent)', 'UnderwritingLossPredictor (LlmAgent)', 'MitigationGrantMatcher (LlmAgent)'],
      adkTools: ['fetch_fema_wildfire_layers', 'calculate_ibhs_premium_discount', 'match_fema_bric_grants'],
      sharedStateSchema: ['property_characteristics', 'non_renewal_risk_score', 'recommended_retrofits', 'grant_application_package']
    }
  }
];
