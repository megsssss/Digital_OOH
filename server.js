const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ─── SEED DATA ───────────────────────────────────────────
const SITES_SEED = [
  { siteId: 'MUM001', name: 'WEH Andheri Overbridge North', city: 'Mumbai', state: 'Maharashtra', tier: 'Metro', format: 'LED Billboard', location: 'Western Express Highway, Andheri E', mediaOwner: 'Bright Outdoor Media', dailyRateINR: 32000 },
  { siteId: 'MUM002', name: 'Bandra-Worli Sea Link South Tower', city: 'Mumbai', state: 'Maharashtra', tier: 'Metro', format: 'LED Billboard', location: 'Bandra-Worli Sea Link', mediaOwner: 'Selvel Media', dailyRateINR: 45000 },
  { siteId: 'MUM003', name: 'Chembur ROB Amar Mahal Facing', city: 'Mumbai', state: 'Maharashtra', tier: 'Metro', format: 'LED Billboard', location: 'Chembur ROB, Amar Mahal Jn', mediaOwner: 'Devangi Outdoor', dailyRateINR: 28000 },
  { siteId: 'MUM004', name: 'Thane Station East Exit', city: 'Thane', state: 'Maharashtra', tier: 'Tier1', format: 'Transit Screen', location: 'Thane Railway Station, East', mediaOwner: 'Pioneer Publicity', dailyRateINR: 18000 },
  { siteId: 'MUM005', name: 'Navi Mumbai Vashi Junction', city: 'Navi Mumbai', state: 'Maharashtra', tier: 'Tier1', format: 'Unipole', location: 'Vashi Junction, Palm Beach Rd', mediaOwner: 'TDI International', dailyRateINR: 16000 },
  { siteId: 'DEL001', name: 'NH-48 Signature Bridge Approach', city: 'Delhi', state: 'Delhi', tier: 'Metro', format: 'LED Billboard', location: 'NH-48 near Signature Bridge', mediaOwner: 'TDI International', dailyRateINR: 38000 },
  { siteId: 'DEL002', name: 'DMRC Blue Line Rajiv Chowk', city: 'Delhi', state: 'Delhi', tier: 'Metro', format: 'Transit Screen', location: 'Rajiv Chowk Metro Station', mediaOwner: 'EG Communications', dailyRateINR: 22000 },
  { siteId: 'DEL003', name: 'Gurugram Golf Course Road Median', city: 'Gurugram', state: 'Haryana', tier: 'Tier1', format: 'Unipole', location: 'Golf Course Road, DLF Phase 3', mediaOwner: 'Laqshya Media', dailyRateINR: 29000 },
  { siteId: 'DEL004', name: 'Noida Expressway Sector 18 Gate', city: 'Noida', state: 'Uttar Pradesh', tier: 'Tier1', format: 'LED Billboard', location: 'Noida Expressway, Sec 18 Entry', mediaOwner: 'Bright Outdoor Media', dailyRateINR: 24000 },
  { siteId: 'DEL005', name: 'Faridabad NH-48 Badarpur Toll', city: 'Faridabad', state: 'Haryana', tier: 'Tier2', format: 'Unipole', location: 'NH-48, Badarpur Toll Approach', mediaOwner: 'Pioneer Publicity', dailyRateINR: 12000 },
  { siteId: 'BLR001', name: 'Outer Ring Road Marathahalli Signal', city: 'Bengaluru', state: 'Karnataka', tier: 'Metro', format: 'LED Billboard', location: 'ORR, Marathahalli Junction', mediaOwner: 'Laqshya Media', dailyRateINR: 34000 },
  { siteId: 'BLR002', name: 'Silk Board Flyover North', city: 'Bengaluru', state: 'Karnataka', tier: 'Metro', format: 'LED Billboard', location: 'Silk Board Junction, Elevated', mediaOwner: 'Times OOH', dailyRateINR: 40000 },
  { siteId: 'BLR003', name: 'Namma Metro Purple Line Majestic', city: 'Bengaluru', state: 'Karnataka', tier: 'Metro', format: 'Transit Screen', location: 'Majestic Metro, Platform Level', mediaOwner: 'Times OOH', dailyRateINR: 18000 },
  { siteId: 'BLR004', name: 'Whitefield ITPL Road Junction', city: 'Bengaluru', state: 'Karnataka', tier: 'Tier1', format: 'LED Billboard', location: 'ITPL Main Road, Hope Farm', mediaOwner: 'Selvel Media', dailyRateINR: 21000 },
  { siteId: 'BLR005', name: 'Electronic City Hosur Rd Toll', city: 'Bengaluru', state: 'Karnataka', tier: 'Tier1', format: 'Unipole', location: 'Hosur Road, E-City Phase 1 Toll', mediaOwner: 'Khushi Advertising', dailyRateINR: 19000 },
  { siteId: 'HYD001', name: 'HITEC City Cyber Towers Flyover', city: 'Hyderabad', state: 'Telangana', tier: 'Metro', format: 'LED Billboard', location: 'HITEC City Main Rd, Flyover', mediaOwner: 'Srichakra Advertising', dailyRateINR: 31000 },
  { siteId: 'HYD002', name: 'ORR Shamshabad Airport Exit', city: 'Hyderabad', state: 'Telangana', tier: 'Metro', format: 'Airport Panel', location: 'ORR Exit, RGIA Junction', mediaOwner: 'JCDecaux', dailyRateINR: 52000 },
  { siteId: 'HYD003', name: 'Warangal NH-163 Entry Hoarding', city: 'Warangal', state: 'Telangana', tier: 'Tier2', format: 'Unipole', location: 'NH-163, Warangal City Entry', mediaOwner: 'Nagarjuna Advertising', dailyRateINR: 8000 },
  { siteId: 'CHE001', name: 'Anna Salai Cathedral Road Signal', city: 'Chennai', state: 'Tamil Nadu', tier: 'Metro', format: 'LED Billboard', location: 'Anna Salai, Cathedral Rd Jn', mediaOwner: 'Selvel Media', dailyRateINR: 27000 },
  { siteId: 'CHE002', name: 'Porur IT Corridor Motorway', city: 'Chennai', state: 'Tamil Nadu', tier: 'Tier1', format: 'Unipole', location: 'Mount-Poonamallee Highway, Porur', mediaOwner: 'Bright Outdoor Media', dailyRateINR: 16000 },
  { siteId: 'CHE003', name: 'Coimbatore Avinashi Road Textile Zone', city: 'Coimbatore', state: 'Tamil Nadu', tier: 'Tier2', format: 'Unipole', location: 'Avinashi Road, RS Puram', mediaOwner: 'Srichakra Advertising', dailyRateINR: 9500 },
  { siteId: 'PUN001', name: 'Hinjewadi IT Park Phase 1 Gate', city: 'Pune', state: 'Maharashtra', tier: 'Tier1', format: 'LED Billboard', location: 'Hinjewadi IT Park, Phase 1', mediaOwner: 'Saathi Advertising', dailyRateINR: 22000 },
  { siteId: 'PUN002', name: 'Katraj-Dehu Road Bypass Median', city: 'Pune', state: 'Maharashtra', tier: 'Tier1', format: 'Unipole', location: 'Katraj Bypass, Kondhwa Side', mediaOwner: 'Selvel Media', dailyRateINR: 14000 },
  { siteId: 'AMD001', name: 'SG Highway Prahlad Nagar Signal', city: 'Ahmedabad', state: 'Gujarat', tier: 'Tier1', format: 'LED Billboard', location: 'SG Highway, Prahlad Nagar', mediaOwner: 'Xtreme Media', dailyRateINR: 23000 },
  { siteId: 'AMD002', name: 'GIFT City Gandhinagar Access Road', city: 'Gandhinagar', state: 'Gujarat', tier: 'Tier2', format: 'Unipole', location: 'GIFT City Access Road, Gate 1', mediaOwner: 'Xtreme Media', dailyRateINR: 11000 },
  { siteId: 'KOL001', name: 'EM Bypass Ruby Crossing', city: 'Kolkata', state: 'West Bengal', tier: 'Metro', format: 'LED Billboard', location: 'EM Bypass, Ruby Hospital Crossing', mediaOwner: 'Selvel One Group', dailyRateINR: 26000 },
  { siteId: 'KOL002', name: 'Howrah Station Approach Causeway', city: 'Kolkata', state: 'West Bengal', tier: 'Metro', format: 'Unipole', location: 'Howrah Station Approach', mediaOwner: 'Selvel One Group', dailyRateINR: 19000 },
  { siteId: 'KOL003', name: 'Durgapur NH-19 Industrial Belt', city: 'Durgapur', state: 'West Bengal', tier: 'Tier2', format: 'Unipole', location: 'NH-19, Durgapur Industrial Area', mediaOwner: 'Century Advertising', dailyRateINR: 6500 },
  { siteId: 'GUW001', name: 'GS Road Christian Basti Flyover', city: 'Guwahati', state: 'Assam', tier: 'Tier2', format: 'Unipole', location: 'GS Road, Christian Basti', mediaOwner: 'Northeast Outdoors', dailyRateINR: 7000 },
  { siteId: 'GUW002', name: 'Lokra NH-27 APRO Entry', city: 'Guwahati', state: 'Assam', tier: 'Tier2', format: 'LED Billboard', location: 'NH-27, Lokra Industrial', mediaOwner: 'Northeast Outdoors', dailyRateINR: 7800 },
  { siteId: 'VJA001', name: 'Eluru Road Benz Circle', city: 'Vijayawada', state: 'Andhra Pradesh', tier: 'Tier2', format: 'LED Billboard', location: 'Eluru Road, Benz Circle', mediaOwner: 'Nagarjuna Advertising', dailyRateINR: 8500 },
  { siteId: 'VJA002', name: 'NH-16 Vijayawada Bypass', city: 'Vijayawada', state: 'Andhra Pradesh', tier: 'Tier2', format: 'Unipole', location: 'NH-16, Kanuru Junction', mediaOwner: 'Nagarjuna Advertising', dailyRateINR: 7200 },
  { siteId: 'NAG001', name: 'Wardha Road Sitabuldi Main', city: 'Nagpur', state: 'Maharashtra', tier: 'Tier2', format: 'LED Billboard', location: 'Wardha Road, Sitabuldi', mediaOwner: 'Pratap Advertising', dailyRateINR: 9000 },
  { siteId: 'NAG002', name: 'MIHAN SEZ Approach Gate', city: 'Nagpur', state: 'Maharashtra', tier: 'Tier2', format: 'Unipole', location: 'MIHAN-SEZ Access Road', mediaOwner: 'Pratap Advertising', dailyRateINR: 8200 },
  { siteId: 'KOC001', name: 'Marine Drive Boat Jetty Facing', city: 'Kochi', state: 'Kerala', tier: 'Tier1', format: 'LED Billboard', location: 'Marine Drive, Wellington Island', mediaOwner: 'Kerala Outdoors', dailyRateINR: 14000 },
  { siteId: 'KOC002', name: 'Edapally Toll Plaza NH-66', city: 'Kochi', state: 'Kerala', tier: 'Tier1', format: 'Unipole', location: 'Edapally Toll, NH-66 North', mediaOwner: 'Kerala Outdoors', dailyRateINR: 11000 },
  { siteId: 'JAI001', name: 'Ajmer Road Statue Circle', city: 'Jaipur', state: 'Rajasthan', tier: 'Tier1', format: 'LED Billboard', location: 'Ajmer Road, Statue Circle', mediaOwner: 'Rajasthan Outdoors', dailyRateINR: 16000 },
  { siteId: 'JAI002', name: 'Tonk Road Sanganer Airport Stretch', city: 'Jaipur', state: 'Rajasthan', tier: 'Tier2', format: 'Unipole', location: 'Tonk Road, Sanganeri Gate', mediaOwner: 'Rajasthan Outdoors', dailyRateINR: 10000 },
  { siteId: 'CHD001', name: 'Sector 17 Plaza Facing', city: 'Chandigarh', state: 'Chandigarh', tier: 'Tier1', format: 'LED Billboard', location: 'Sector 17 Bus Stand Plaza', mediaOwner: 'TDI International', dailyRateINR: 15000 },
  { siteId: 'BHU001', name: 'Nandankanan Road Infocity Stretch', city: 'Bhubaneswar', state: 'Odisha', tier: 'Tier2', format: 'Unipole', location: 'Nandankanan Rd, Infocity Square', mediaOwner: 'East India Outdoors', dailyRateINR: 7500 },
  { siteId: 'IND001', name: 'AB Road Vijay Nagar Square', city: 'Indore', state: 'Madhya Pradesh', tier: 'Tier2', format: 'LED Billboard', location: 'AB Road, Vijay Nagar Square', mediaOwner: 'MP Outdoors', dailyRateINR: 10500 },
  { siteId: 'IND002', name: 'Bypass Road Super Corridor', city: 'Indore', state: 'Madhya Pradesh', tier: 'Tier2', format: 'Unipole', location: 'Super Corridor, IT Park Side', mediaOwner: 'MP Outdoors', dailyRateINR: 8800 },
  { siteId: 'SUR001', name: 'Ring Road Adajan Patia', city: 'Surat', state: 'Gujarat', tier: 'Tier2', format: 'LED Billboard', location: 'Ring Road, Adajan Patia', mediaOwner: 'Xtreme Media', dailyRateINR: 12000 },
  { siteId: 'LKO001', name: 'Gomti Nagar Shaheed Path Junction', city: 'Lucknow', state: 'Uttar Pradesh', tier: 'Tier1', format: 'LED Billboard', location: 'Shaheed Path, Gomti Nagar', mediaOwner: 'UP Outdoors', dailyRateINR: 13000 },
  { siteId: 'LKO002', name: 'Hazratganj Crossing Facing', city: 'Lucknow', state: 'Uttar Pradesh', tier: 'Tier1', format: 'Unipole', location: 'Hazratganj Main Crossing', mediaOwner: 'UP Outdoors', dailyRateINR: 11500 },
  { siteId: 'NSK001', name: 'Mumbai-Agra Highway Nashik Phata', city: 'Nashik', state: 'Maharashtra', tier: 'Tier2', format: 'Unipole', location: 'NH-3, Nashik Phata', mediaOwner: 'Saathi Advertising', dailyRateINR: 8000 },
  { siteId: 'RJK001', name: 'Rajkot Ring Road Kalawad Road Junction', city: 'Rajkot', state: 'Gujarat', tier: 'Tier2', format: 'LED Billboard', location: 'Ring Road, Kalawad Rd Jn', mediaOwner: 'Xtreme Media', dailyRateINR: 9000 },
  { siteId: 'MNG001', name: 'KS Rao Road Hampankatta Signal', city: 'Mangaluru', state: 'Karnataka', tier: 'Tier2', format: 'Unipole', location: 'KS Rao Road, Hampankatta', mediaOwner: 'Karnataka Outdoors', dailyRateINR: 7800 },
  { siteId: 'TVM001', name: 'NH-66 Karamana Junction South', city: 'Thiruvananthapuram', state: 'Kerala', tier: 'Tier2', format: 'Unipole', location: 'NH-66, Karamana Junction', mediaOwner: 'Kerala Outdoors', dailyRateINR: 8500 },
  { siteId: 'VAD001', name: 'Race Course Road Express Highway', city: 'Vadodara', state: 'Gujarat', tier: 'Tier2', format: 'LED Billboard', location: 'Race Course Road, Sayajigunj', mediaOwner: 'Xtreme Media', dailyRateINR: 10000 },
];

const OUTAGE_OVERRIDES = [
  { siteId: 'BLR002', status: 'offline',     hoursAgo: 7   },
  { siteId: 'MUM004', status: 'offline',     hoursAgo: 2.5 },
  { siteId: 'HYD003', status: 'offline',     hoursAgo: 18  },
  { siteId: 'VJA002', status: 'maintenance', hoursAgo: 4   },
  { siteId: 'GUW001', status: 'offline',     hoursAgo: 31  },
  { siteId: 'BHU001', status: 'offline',     hoursAgo: 12  },
  { siteId: 'NAG002', status: 'maintenance', hoursAgo: 3   },
];

const CAMPAIGNS_SEED = [
  { campaignId: 'CMP001', advertiser: 'Zepto', brand: 'Zepto 10-Min Delivery', sector: 'Quick Commerce',
    sites: ['MUM001','MUM002','BLR001','BLR002','HYD001','PUN001','AMD001'], totalBudgetINR: 4200000, status: 'active' },
  { campaignId: 'CMP002', advertiser: 'Aditya Birla Sun Life', brand: '#BoodheHokeKyaBanoge', sector: 'BFSI',
    sites: ['MUM001','MUM003','DEL001','BLR001','CHE001','HYD001','KOL001'], totalBudgetINR: 6800000, status: 'active' },
  { campaignId: 'CMP003', advertiser: 'Parle Agro', brand: 'Smoodh Lassi Campaign', sector: 'FMCG',
    sites: ['MUM004','MUM005','NAG001','IND001','LKO001','NSK001','VAD001','SUR001','RJK001'], totalBudgetINR: 2800000, status: 'active' },
  { campaignId: 'CMP004', advertiser: 'Swiggy', brand: 'Swiggy Instamart Launch', sector: 'Quick Commerce',
    sites: ['DEL001','DEL002','DEL003','DEL004','BLR003','BLR004','CHD001'], totalBudgetINR: 5500000, status: 'active' },
  { campaignId: 'CMP005', advertiser: 'HDFC Bank', brand: 'HDFC Home Loans FY26', sector: 'BFSI',
    sites: ['HYD001','HYD002','VJA001','VJA002','CHE001','CHE002','KOC001','TVM001'], totalBudgetINR: 3900000, status: 'active' },
  { campaignId: 'CMP006', advertiser: 'Hyundai', brand: 'Creta Electric Launch', sector: 'Automotive',
    sites: ['BLR001','BLR002','BLR003','BLR004','BLR005','PUN001','PUN002'], totalBudgetINR: 7200000, status: 'active' },
  { campaignId: 'CMP007', advertiser: "BYJU's", brand: "BYJU's NEET 2025", sector: 'EdTech',
    sites: ['JAI001','JAI002','LKO001','LKO002','NAG001','BHU001','GUW001'], totalBudgetINR: 1900000, status: 'active' },
  { campaignId: 'CMP008', advertiser: 'Tanishq', brand: 'Akshaya Tritiya Gold Collection', sector: 'Jewellery',
    sites: ['AMD001','AMD002','SUR001','VAD001','RJK001','JAI001','CHD001'], totalBudgetINR: 3100000, status: 'active' },
];

// Build live site objects
const mockSites = SITES_SEED.map(s => {
  const ov = OUTAGE_OVERRIDES.find(o => o.siteId === s.siteId);
  if (ov) {
    const offlineSince = new Date(Date.now() - ov.hoursAgo * 3600000);
    return { ...s, status: ov.status, offlineSince, lastSeen: offlineSince };
  }
  return { ...s, status: 'online', offlineSince: null, lastSeen: new Date() };
});

function computeOutages() {
  return mockSites
    .filter(s => s.status !== 'online')
    .map(s => {
      const durationMinutes = Math.round((Date.now() - new Date(s.offlineSince)) / 60000);
      const revenueAtRiskINR = Math.round((s.dailyRateINR / 1440) * durationMinutes);
      const affectedCampaigns = CAMPAIGNS_SEED.filter(c => c.sites.includes(s.siteId) && c.status === 'active');
      return { siteId: s.siteId, startTime: s.offlineSince, durationMinutes, revenueAtRiskINR, resolved: false, site: s, affectedCampaignDetails: affectedCampaigns };
    })
    .sort((a, b) => b.revenueAtRiskINR - a.revenueAtRiskINR);
}

// ─── API ROUTES ───────────────────────────────────────────
app.get('/api/sites', (req, res) =>
  res.json([...mockSites].sort((a, b) => a.city.localeCompare(b.city))));

app.get('/api/campaigns', (req, res) => res.json(CAMPAIGNS_SEED));

app.get('/api/outages', (req, res) => res.json(computeOutages()));

app.get('/api/cities', (req, res) => {
  const cityMap = {};
  mockSites.forEach(s => {
    if (!cityMap[s.city]) cityMap[s.city] = { city: s.city, state: s.state, tier: s.tier, total: 0, online: 0, offline: 0, maintenance: 0 };
    cityMap[s.city].total++;
    cityMap[s.city][s.status]++;
  });
  res.json(Object.values(cityMap).sort((a, b) => a.city.localeCompare(b.city)));
});

app.get('/api/dashboard', (req, res) => {
  const outages = computeOutages();
  const totalRevenueAtRisk = outages.reduce((sum, o) => sum + o.revenueAtRiskINR, 0);
  const affectedCampaignIds = [...new Set(outages.flatMap(o => o.affectedCampaignDetails.map(c => c.campaignId)))];
  const affectedAdvertisers = [...new Set(outages.flatMap(o => o.affectedCampaignDetails.map(c => c.advertiser)))];
  res.json({
    totalSites: mockSites.length,
    onlineSites: mockSites.filter(s => s.status === 'online').length,
    offlineSites: mockSites.filter(s => s.status === 'offline').length,
    maintenanceSites: mockSites.filter(s => s.status === 'maintenance').length,
    totalRevenueAtRisk,
    activeCampaigns: CAMPAIGNS_SEED.filter(c => c.status === 'active').length,
    affectedCampaigns: affectedCampaignIds.length,
    affectedAdvertisers,
    uptimePercent: Math.round((mockSites.filter(s => s.status === 'online').length / mockSites.length) * 1000) / 10,
  });
});

app.get('/api/sites/:id/status', (req, res) => {
  const site = mockSites.find(s => s.siteId === req.params.id);
  if (!site) return res.status(404).json({ error: 'Site not found' });
  const outage = computeOutages().find(o => o.siteId === req.params.id) || null;
  const campaigns = CAMPAIGNS_SEED.filter(c => c.sites.includes(req.params.id) && c.status === 'active');
  res.json({ site, outage, affectedCampaigns: campaigns });
});

app.post('/api/sites/:id/resolve', (req, res) => {
  const site = mockSites.find(s => s.siteId === req.params.id);
  if (site) { site.status = 'online'; site.offlineSince = null; site.lastSeen = new Date(); }
  res.json({ success: true, siteId: req.params.id });
});

// ─── START ────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const offline = mockSites.filter(s => s.status !== 'online').length;
  const cities = [...new Set(mockSites.map(s => s.city))].length;
  console.log(`\n✓ DigitalOOH.IO API  →  http://localhost:${PORT}`);
  console.log(`  ${mockSites.length} sites · ${cities} cities · ${offline} offline/maintenance`);
  console.log(`  Routes: /api/dashboard  /api/sites  /api/outages  /api/campaigns  /api/cities\n`);
});
