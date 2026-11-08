export interface RegionalChallenge {
  id: string;
  regionName: string;
  statesCovered: string;
  coreCrisisType: string;
  keyDrivers: string[];
  medianHomePriceToIncome: string;
  homelessnessRate: string;
  regulatoryBottlenecks: string[];
  promisingAiOpportunities: string[];
  caseStudyCity: {
    city: string;
    description: string;
    recentInitiative: string;
  };
}

export const REGIONAL_CHALLENGES: RegionalChallenge[] = [
  {
    id: 'west-coast',
    regionName: 'West Coast & Pacific Northwest',
    statesCovered: 'California, Washington, Oregon, Hawaii',
    coreCrisisType: 'Severe Supply Deficit & Cost-Prohibitive Land/Labor',
    keyDrivers: [
      'Decades of underbuilding relative to tech and economic job growth',
      'High land costs, prevailing wage requirements, and lengthy environmental reviews (e.g. CEQA)',
      'Acoustic and design discretionary review delays lasting 2 to 5 years',
      'Acute unhoused populations and severe rent burden on service workers'
    ],
    medianHomePriceToIncome: '8.4x to 12.1x (Extreme crisis threshold is >5.0x)',
    homelessnessRate: '42 to 78 per 10,000 residents',
    regulatoryBottlenecks: [
      'Discretionary CEQA / SEPA lawsuit abuse by neighborhood opposition',
      'Impact fees reaching $50,000 to $120,000 per multi-family door',
      'Local historical district overlays weaponized to block infill'
    ],
    promisingAiOpportunities: [
      'Automated CEQA exemption & by-right infill qualification scanners',
      'Pre-approved ADU massing engines (SB 9 and statewide ADU laws)',
      'Automated tenant eviction legal triage clinics in high-displacement urban cores'
    ],
    caseStudyCity: {
      city: 'Oakland & San Jose, CA',
      description: 'Massive affordability gap with teachers and service workers forced to commute 2+ hours from the Central Valley.',
      recentInitiative: 'State Density Bonus Law updates and SB 423 by-right ministerial housing approvals.'
    }
  },
  {
    id: 'sun-belt',
    regionName: 'Sun Belt & Southern Corridor',
    statesCovered: 'Texas, Florida, Georgia, Arizona, North Carolina, Tennessee',
    coreCrisisType: 'Rapid In-Migration Sprawl & Skyrocketing Insurance Premiums',
    keyDrivers: [
      'Unprecedented population inflow from coastal states seeking lower taxes',
      'Car-dependent sprawl straining highway and municipal water infrastructure',
      'Historic 200%+ surges in property insurance premiums and carrier insolvencies (especially FL & TX)',
      'Rapid displacement of historically Black and Latino legacy neighborhoods'
    ],
    medianHomePriceToIncome: '4.8x to 7.2x (Fastest worsening ratio in the U.S.)',
    homelessnessRate: '12 to 25 per 10,000 residents (rapidly increasing)',
    regulatoryBottlenecks: [
      'Minimum lot size requirements (e.g. 5,000–10,000 sq ft per home)',
      'Onerous parking minimums (2+ spots per residential unit)',
      'State-level pre-emption preventing cities from passing local inclusionary zoning'
    ],
    promisingAiOpportunities: [
      'Subdivision & small-lot split optimizer (leveraging Austin HOME Phase 2 ordinances)',
      'Climate insurance solvency & risk-mitigation grant matching',
      'Regional transit-oriented corridor densification modeling'
    ],
    caseStudyCity: {
      city: 'Austin, TX',
      description: 'Passed nation-leading "HOME Phase 1 & 2" allowing up to 3 units on single-family lots and reducing minimum lot sizes from 5,750 to 1,800 sq ft.',
      recentInitiative: 'Pioneering gentle density code transformation that needs software tools for citizens to utilize.'
    }
  },
  {
    id: 'midwest-rust-belt',
    regionName: 'Midwest & Legacy Rust Belt',
    statesCovered: 'Ohio, Michigan, Pennsylvania, Indiana, Illinois, Wisconsin',
    coreCrisisType: 'Appraisal Gap, Aging Housing Stock & Vacant Land Utilization',
    keyDrivers: [
      'Appraisal gap: Cost to renovate an older home ($180k) exceeds its appraised post-repair market value ($130k), freezing private bank lending',
      'Pre-1978 lead paint, asbestos, and structural deterioration in naturally occurring affordable housing (NOAH)',
      'Thousands of vacant, tax-foreclosed municipal land bank parcels sitting dormant',
      'Disinvestment in urban cores alongside subsidized greenfield suburban sprawl'
    ],
    medianHomePriceToIncome: '2.8x to 4.2x (Statistically affordable on paper, but capital-frozen)',
    homelessnessRate: '10 to 18 per 10,000 residents',
    regulatoryBottlenecks: [
      'Outdated building codes requiring expensive modern plumbing/electrical retrofits for minor rehabs',
      'Complex land bank title clearing and quiet-title court procedures',
      'Strict historic preservation rules applied to non-historic dilapidated structures'
    ],
    promisingAiOpportunities: [
      'Municipal land bank parcel clustering AI (aggregating scattered lots for modular prefab developments)',
      'Automated rehab cost-estimator & lead remediation grant packager',
      'Adaptive reuse scanner for closed industrial and school facilities'
    ],
    caseStudyCity: {
      city: 'Cleveland, OH & Detroit, MI',
      description: 'Tens of thousands of Land Bank parcels and sturdy brick homes needing rehabilitation capital rather than new construction.',
      recentInitiative: 'Affordable Housing Trust Fund and whole-home repair grant matching programs.'
    }
  },
  {
    id: 'northeast-mid-atlantic',
    regionName: 'Northeast & Mid-Atlantic Metros',
    statesCovered: 'New York, Massachusetts, New Jersey, Pennsylvania, Maryland, D.C.',
    coreCrisisType: 'Historic Preservation Gridlock & High-Cost Multi-Family Conversion',
    keyDrivers: [
      'Oldest housing stock in the United States, with severe spatial constraints and minimal greenfield land',
      'Fierce suburban exclusionary zoning in transit-rich commuter rail towns',
      'Complex, highly litigated rent stabilization systems (e.g. NYC Rent Guidelines Board)',
      'Massive inventory of aging Class B/C commercial office space in transit cores'
    ],
    medianHomePriceToIncome: '6.5x to 9.8x',
    homelessnessRate: '35 to 88 per 10,000 residents',
    regulatoryBottlenecks: [
      'Suburban Home Rule allowing affluent suburbs to ban multi-family apartments outright',
      'Landmark Preservation Commission delays for minor window/envelope modifications',
      'Multiple dwelling law (MDL) restrictions on floor-to-area ratios and light access'
    ],
    promisingAiOpportunities: [
      'Commercial-to-residential interior floorplate geometry optimizer',
      'Tenant eviction triage & rent stabilization cap auditor',
      'Commuter rail station density simulation & consensus builder'
    ],
    caseStudyCity: {
      city: 'New York City & Boston Metro',
      description: 'Extreme vacancy in commercial towers alongside sub-1.4% residential rental vacancy rate.',
      recentInitiative: 'NYC "City of Yes for Housing Opportunity" zoning text amendments and Boston office-to-residential pilot.'
    }
  },
  {
    id: 'mountain-west',
    regionName: 'Mountain West & Resort Communities',
    statesCovered: 'Colorado, Montana, Idaho, Utah, Wyoming, Nevada',
    coreCrisisType: 'Service-Worker Displacement & Short-Term Rental Distortion',
    keyDrivers: [
      'Proliferation of short-term vacation rentals (Airbnb/VRBO) cannibalizing long-term workforce rentals',
      'Wealthy remote workers and second-home buyers bidding up mountain towns beyond local wages',
      'Severe labor shortages for construction trades due to lack of local workforce housing',
      'Water rights, steep topography, and wildfire danger constraining outward growth'
    ],
    medianHomePriceToIncome: '7.5x to 11.5x in mountain valleys',
    homelessnessRate: '15 to 30 per 10,000 residents (often living in vehicles or campgrounds)',
    regulatoryBottlenecks: [
      'Water tap moratoriums and complex water rights adjudication',
      'Strict mountain aesthetic design guidelines requiring heavy timber/stone masonry',
      'Lack of regional transit connecting worker satellite towns to resort job centers'
    ],
    promisingAiOpportunities: [
      'Short-term rental compliance and illegal conversion detection scanner',
      'Community Land Trust (CLT) deed-restricted workforce home matching platform',
      'Wildfire defensible space and water-neutral housing cluster modeler'
    ],
    caseStudyCity: {
      city: 'Bozeman, MT & Summit County, CO',
      description: 'Police officers, nurses, and ski resort staff forced to commute over mountain passes or live in converted campers.',
      recentInitiative: 'Deed-restriction incentive buy-down programs ("Lease to Locals") requiring algorithmic monitoring.'
    }
  }
];
