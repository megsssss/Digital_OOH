import { useState, useEffect } from 'react'

// ─── EMBEDDED MOCK DATA (works without backend) ────────────────────────────
const SITES_SEED = [
  { siteId:'MUM001', name:'WEH Andheri Overbridge North', city:'Mumbai', state:'Maharashtra', tier:'Metro', format:'LED Billboard', location:'Western Express Highway, Andheri E', mediaOwner:'Bright Outdoor Media', dailyRateINR:32000 },
  { siteId:'MUM002', name:'Bandra-Worli Sea Link South Tower', city:'Mumbai', state:'Maharashtra', tier:'Metro', format:'LED Billboard', location:'Bandra-Worli Sea Link', mediaOwner:'Selvel Media', dailyRateINR:45000 },
  { siteId:'MUM003', name:'Chembur ROB Amar Mahal Facing', city:'Mumbai', state:'Maharashtra', tier:'Metro', format:'LED Billboard', location:'Chembur ROB, Amar Mahal Jn', mediaOwner:'Devangi Outdoor', dailyRateINR:28000 },
  { siteId:'MUM004', name:'Thane Station East Exit', city:'Thane', state:'Maharashtra', tier:'Tier1', format:'Transit Screen', location:'Thane Railway Station, East', mediaOwner:'Pioneer Publicity', dailyRateINR:18000 },
  { siteId:'MUM005', name:'Navi Mumbai Vashi Junction', city:'Navi Mumbai', state:'Maharashtra', tier:'Tier1', format:'Unipole', location:'Vashi Junction, Palm Beach Rd', mediaOwner:'TDI International', dailyRateINR:16000 },
  { siteId:'DEL001', name:'NH-48 Signature Bridge Approach', city:'Delhi', state:'Delhi', tier:'Metro', format:'LED Billboard', location:'NH-48 near Signature Bridge', mediaOwner:'TDI International', dailyRateINR:38000 },
  { siteId:'DEL002', name:'DMRC Blue Line Rajiv Chowk', city:'Delhi', state:'Delhi', tier:'Metro', format:'Transit Screen', location:'Rajiv Chowk Metro Station', mediaOwner:'EG Communications', dailyRateINR:22000 },
  { siteId:'DEL003', name:'Gurugram Golf Course Road Median', city:'Gurugram', state:'Haryana', tier:'Tier1', format:'Unipole', location:'Golf Course Road, DLF Phase 3', mediaOwner:'Laqshya Media', dailyRateINR:29000 },
  { siteId:'DEL004', name:'Noida Expressway Sector 18 Gate', city:'Noida', state:'Uttar Pradesh', tier:'Tier1', format:'LED Billboard', location:'Noida Expressway, Sec 18 Entry', mediaOwner:'Bright Outdoor Media', dailyRateINR:24000 },
  { siteId:'DEL005', name:'Faridabad NH-48 Badarpur Toll', city:'Faridabad', state:'Haryana', tier:'Tier2', format:'Unipole', location:'NH-48, Badarpur Toll Approach', mediaOwner:'Pioneer Publicity', dailyRateINR:12000 },
  { siteId:'BLR001', name:'Outer Ring Road Marathahalli Signal', city:'Bengaluru', state:'Karnataka', tier:'Metro', format:'LED Billboard', location:'ORR, Marathahalli Junction', mediaOwner:'Laqshya Media', dailyRateINR:34000 },
  { siteId:'BLR002', name:'Silk Board Flyover North', city:'Bengaluru', state:'Karnataka', tier:'Metro', format:'LED Billboard', location:'Silk Board Junction, Elevated', mediaOwner:'Times OOH', dailyRateINR:40000 },
  { siteId:'BLR003', name:'Namma Metro Purple Line Majestic', city:'Bengaluru', state:'Karnataka', tier:'Metro', format:'Transit Screen', location:'Majestic Metro, Platform Level', mediaOwner:'Times OOH', dailyRateINR:18000 },
  { siteId:'BLR004', name:'Whitefield ITPL Road Junction', city:'Bengaluru', state:'Karnataka', tier:'Tier1', format:'LED Billboard', location:'ITPL Main Road, Hope Farm', mediaOwner:'Selvel Media', dailyRateINR:21000 },
  { siteId:'BLR005', name:'Electronic City Hosur Rd Toll', city:'Bengaluru', state:'Karnataka', tier:'Tier1', format:'Unipole', location:'Hosur Road, E-City Phase 1 Toll', mediaOwner:'Khushi Advertising', dailyRateINR:19000 },
  { siteId:'HYD001', name:'HITEC City Cyber Towers Flyover', city:'Hyderabad', state:'Telangana', tier:'Metro', format:'LED Billboard', location:'HITEC City Main Rd, Flyover', mediaOwner:'Srichakra Advertising', dailyRateINR:31000 },
  { siteId:'HYD002', name:'ORR Shamshabad Airport Exit', city:'Hyderabad', state:'Telangana', tier:'Metro', format:'Airport Panel', location:'ORR Exit, RGIA Junction', mediaOwner:'JCDecaux', dailyRateINR:52000 },
  { siteId:'HYD003', name:'Warangal NH-163 Entry Hoarding', city:'Warangal', state:'Telangana', tier:'Tier2', format:'Unipole', location:'NH-163, Warangal City Entry', mediaOwner:'Nagarjuna Advertising', dailyRateINR:8000 },
  { siteId:'CHE001', name:'Anna Salai Cathedral Road Signal', city:'Chennai', state:'Tamil Nadu', tier:'Metro', format:'LED Billboard', location:'Anna Salai, Cathedral Rd Jn', mediaOwner:'Selvel Media', dailyRateINR:27000 },
  { siteId:'CHE002', name:'Porur IT Corridor Motorway', city:'Chennai', state:'Tamil Nadu', tier:'Tier1', format:'Unipole', location:'Mount-Poonamallee Highway, Porur', mediaOwner:'Bright Outdoor Media', dailyRateINR:16000 },
  { siteId:'CHE003', name:'Coimbatore Avinashi Road Textile Zone', city:'Coimbatore', state:'Tamil Nadu', tier:'Tier2', format:'Unipole', location:'Avinashi Road, RS Puram', mediaOwner:'Srichakra Advertising', dailyRateINR:9500 },
  { siteId:'PUN001', name:'Hinjewadi IT Park Phase 1 Gate', city:'Pune', state:'Maharashtra', tier:'Tier1', format:'LED Billboard', location:'Hinjewadi IT Park, Phase 1', mediaOwner:'Saathi Advertising', dailyRateINR:22000 },
  { siteId:'PUN002', name:'Katraj-Dehu Road Bypass Median', city:'Pune', state:'Maharashtra', tier:'Tier1', format:'Unipole', location:'Katraj Bypass, Kondhwa Side', mediaOwner:'Selvel Media', dailyRateINR:14000 },
  { siteId:'AMD001', name:'SG Highway Prahlad Nagar Signal', city:'Ahmedabad', state:'Gujarat', tier:'Tier1', format:'LED Billboard', location:'SG Highway, Prahlad Nagar', mediaOwner:'Xtreme Media', dailyRateINR:23000 },
  { siteId:'AMD002', name:'GIFT City Gandhinagar Access Road', city:'Gandhinagar', state:'Gujarat', tier:'Tier2', format:'Unipole', location:'GIFT City Access Road, Gate 1', mediaOwner:'Xtreme Media', dailyRateINR:11000 },
  { siteId:'KOL001', name:'EM Bypass Ruby Crossing', city:'Kolkata', state:'West Bengal', tier:'Metro', format:'LED Billboard', location:'EM Bypass, Ruby Hospital Crossing', mediaOwner:'Selvel One Group', dailyRateINR:26000 },
  { siteId:'KOL002', name:'Howrah Station Approach Causeway', city:'Kolkata', state:'West Bengal', tier:'Metro', format:'Unipole', location:'Howrah Station Approach', mediaOwner:'Selvel One Group', dailyRateINR:19000 },
  { siteId:'KOL003', name:'Durgapur NH-19 Industrial Belt', city:'Durgapur', state:'West Bengal', tier:'Tier2', format:'Unipole', location:'NH-19, Durgapur Industrial Area', mediaOwner:'Century Advertising', dailyRateINR:6500 },
  { siteId:'GUW001', name:'GS Road Christian Basti Flyover', city:'Guwahati', state:'Assam', tier:'Tier2', format:'Unipole', location:'GS Road, Christian Basti', mediaOwner:'Northeast Outdoors', dailyRateINR:7000 },
  { siteId:'GUW002', name:'Lokra NH-27 APRO Entry', city:'Guwahati', state:'Assam', tier:'Tier2', format:'LED Billboard', location:'NH-27, Lokra Industrial', mediaOwner:'Northeast Outdoors', dailyRateINR:7800 },
  { siteId:'VJA001', name:'Eluru Road Benz Circle', city:'Vijayawada', state:'Andhra Pradesh', tier:'Tier2', format:'LED Billboard', location:'Eluru Road, Benz Circle', mediaOwner:'Nagarjuna Advertising', dailyRateINR:8500 },
  { siteId:'VJA002', name:'NH-16 Vijayawada Bypass', city:'Vijayawada', state:'Andhra Pradesh', tier:'Tier2', format:'Unipole', location:'NH-16, Kanuru Junction', mediaOwner:'Nagarjuna Advertising', dailyRateINR:7200 },
  { siteId:'NAG001', name:'Wardha Road Sitabuldi Main', city:'Nagpur', state:'Maharashtra', tier:'Tier2', format:'LED Billboard', location:'Wardha Road, Sitabuldi', mediaOwner:'Pratap Advertising', dailyRateINR:9000 },
  { siteId:'NAG002', name:'MIHAN SEZ Approach Gate', city:'Nagpur', state:'Maharashtra', tier:'Tier2', format:'Unipole', location:'MIHAN-SEZ Access Road', mediaOwner:'Pratap Advertising', dailyRateINR:8200 },
  { siteId:'KOC001', name:'Marine Drive Boat Jetty Facing', city:'Kochi', state:'Kerala', tier:'Tier1', format:'LED Billboard', location:'Marine Drive, Wellington Island', mediaOwner:'Kerala Outdoors', dailyRateINR:14000 },
  { siteId:'KOC002', name:'Edapally Toll Plaza NH-66', city:'Kochi', state:'Kerala', tier:'Tier1', format:'Unipole', location:'Edapally Toll, NH-66 North', mediaOwner:'Kerala Outdoors', dailyRateINR:11000 },
  { siteId:'JAI001', name:'Ajmer Road Statue Circle', city:'Jaipur', state:'Rajasthan', tier:'Tier1', format:'LED Billboard', location:'Ajmer Road, Statue Circle', mediaOwner:'Rajasthan Outdoors', dailyRateINR:16000 },
  { siteId:'JAI002', name:'Tonk Road Sanganer Airport Stretch', city:'Jaipur', state:'Rajasthan', tier:'Tier2', format:'Unipole', location:'Tonk Road, Sanganeri Gate', mediaOwner:'Rajasthan Outdoors', dailyRateINR:10000 },
  { siteId:'CHD001', name:'Sector 17 Plaza Facing', city:'Chandigarh', state:'Chandigarh', tier:'Tier1', format:'LED Billboard', location:'Sector 17 Bus Stand Plaza', mediaOwner:'TDI International', dailyRateINR:15000 },
  { siteId:'BHU001', name:'Nandankanan Road Infocity Stretch', city:'Bhubaneswar', state:'Odisha', tier:'Tier2', format:'Unipole', location:'Nandankanan Rd, Infocity Square', mediaOwner:'East India Outdoors', dailyRateINR:7500 },
  { siteId:'IND001', name:'AB Road Vijay Nagar Square', city:'Indore', state:'Madhya Pradesh', tier:'Tier2', format:'LED Billboard', location:'AB Road, Vijay Nagar Square', mediaOwner:'MP Outdoors', dailyRateINR:10500 },
  { siteId:'IND002', name:'Bypass Road Super Corridor', city:'Indore', state:'Madhya Pradesh', tier:'Tier2', format:'Unipole', location:'Super Corridor, IT Park Side', mediaOwner:'MP Outdoors', dailyRateINR:8800 },
  { siteId:'SUR001', name:'Ring Road Adajan Patia', city:'Surat', state:'Gujarat', tier:'Tier2', format:'LED Billboard', location:'Ring Road, Adajan Patia', mediaOwner:'Xtreme Media', dailyRateINR:12000 },
  { siteId:'LKO001', name:'Gomti Nagar Shaheed Path Junction', city:'Lucknow', state:'Uttar Pradesh', tier:'Tier1', format:'LED Billboard', location:'Shaheed Path, Gomti Nagar', mediaOwner:'UP Outdoors', dailyRateINR:13000 },
  { siteId:'LKO002', name:'Hazratganj Crossing Facing', city:'Lucknow', state:'Uttar Pradesh', tier:'Tier1', format:'Unipole', location:'Hazratganj Main Crossing', mediaOwner:'UP Outdoors', dailyRateINR:11500 },
  { siteId:'NSK001', name:'Mumbai-Agra Highway Nashik Phata', city:'Nashik', state:'Maharashtra', tier:'Tier2', format:'Unipole', location:'NH-3, Nashik Phata', mediaOwner:'Saathi Advertising', dailyRateINR:8000 },
  { siteId:'RJK001', name:'Rajkot Ring Road Kalawad Road Junction', city:'Rajkot', state:'Gujarat', tier:'Tier2', format:'LED Billboard', location:'Ring Road, Kalawad Rd Jn', mediaOwner:'Xtreme Media', dailyRateINR:9000 },
  { siteId:'MNG001', name:'KS Rao Road Hampankatta Signal', city:'Mangaluru', state:'Karnataka', tier:'Tier2', format:'Unipole', location:'KS Rao Road, Hampankatta', mediaOwner:'Karnataka Outdoors', dailyRateINR:7800 },
  { siteId:'TVM001', name:'NH-66 Karamana Junction South', city:'Thiruvananthapuram', state:'Kerala', tier:'Tier2', format:'Unipole', location:'NH-66, Karamana Junction', mediaOwner:'Kerala Outdoors', dailyRateINR:8500 },
  { siteId:'VAD001', name:'Race Course Road Express Highway', city:'Vadodara', state:'Gujarat', tier:'Tier2', format:'LED Billboard', location:'Race Course Road, Sayajigunj', mediaOwner:'Xtreme Media', dailyRateINR:10000 },
]

const OUTAGE_OVERRIDES = [
  { siteId:'BLR002', status:'offline',     hoursAgo:7   },
  { siteId:'MUM004', status:'offline',     hoursAgo:2.5 },
  { siteId:'HYD003', status:'offline',     hoursAgo:18  },
  { siteId:'VJA002', status:'maintenance', hoursAgo:4   },
  { siteId:'GUW001', status:'offline',     hoursAgo:31  },
  { siteId:'BHU001', status:'offline',     hoursAgo:12  },
  { siteId:'NAG002', status:'maintenance', hoursAgo:3   },
]

const CAMPAIGNS_SEED = [
  { campaignId:'CMP001', advertiser:'Zepto', brand:'Zepto 10-Min Delivery', sector:'Quick Commerce', sites:['MUM001','MUM002','BLR001','BLR002','HYD001','PUN001','AMD001'], totalBudgetINR:4200000, status:'active' },
  { campaignId:'CMP002', advertiser:'Aditya Birla Sun Life', brand:'#BoodheHokeKyaBanoge', sector:'BFSI', sites:['MUM001','MUM003','DEL001','BLR001','CHE001','HYD001','KOL001'], totalBudgetINR:6800000, status:'active' },
  { campaignId:'CMP003', advertiser:'Parle Agro', brand:'Smoodh Lassi Campaign', sector:'FMCG', sites:['MUM004','MUM005','NAG001','IND001','LKO001','NSK001','VAD001','SUR001','RJK001'], totalBudgetINR:2800000, status:'active' },
  { campaignId:'CMP004', advertiser:'Swiggy', brand:'Swiggy Instamart Launch', sector:'Quick Commerce', sites:['DEL001','DEL002','DEL003','DEL004','BLR003','BLR004','CHD001'], totalBudgetINR:5500000, status:'active' },
  { campaignId:'CMP005', advertiser:'HDFC Bank', brand:'HDFC Home Loans FY26', sector:'BFSI', sites:['HYD001','HYD002','VJA001','VJA002','CHE001','CHE002','KOC001','TVM001'], totalBudgetINR:3900000, status:'active' },
  { campaignId:'CMP006', advertiser:'Hyundai', brand:'Creta Electric Launch', sector:'Automotive', sites:['BLR001','BLR002','BLR003','BLR004','BLR005','PUN001','PUN002'], totalBudgetINR:7200000, status:'active' },
  { campaignId:'CMP007', advertiser:"BYJU's", brand:"BYJU's NEET 2025", sector:'EdTech', sites:['JAI001','JAI002','LKO001','LKO002','NAG001','BHU001','GUW001'], totalBudgetINR:1900000, status:'active' },
  { campaignId:'CMP008', advertiser:'Tanishq', brand:'Akshaya Tritiya Gold Collection', sector:'Jewellery', sites:['AMD001','AMD002','SUR001','VAD001','RJK001','JAI001','CHD001'], totalBudgetINR:3100000, status:'active' },
]

// Build mock sites with outage state
function buildMockSites() {
  return SITES_SEED.map(s => {
    const ov = OUTAGE_OVERRIDES.find(o => o.siteId === s.siteId)
    if (ov) {
      const offlineSince = new Date(Date.now() - ov.hoursAgo * 3600000)
      return { ...s, status: ov.status, offlineSince, lastSeen: offlineSince }
    }
    return { ...s, status: 'online', offlineSince: null, lastSeen: new Date() }
  })
}

function computeOutages(sites) {
  return sites
    .filter(s => s.status !== 'online')
    .map(s => {
      const durationMinutes = Math.round((Date.now() - new Date(s.offlineSince)) / 60000)
      const revenueAtRiskINR = Math.round((s.dailyRateINR / 1440) * durationMinutes)
      const affectedCampaigns = CAMPAIGNS_SEED.filter(c => c.sites.includes(s.siteId) && c.status === 'active')
      return { siteId: s.siteId, startTime: s.offlineSince, durationMinutes, revenueAtRiskINR, site: s, affectedCampaigns }
    })
    .sort((a, b) => b.revenueAtRiskINR - a.revenueAtRiskINR)
}

// ─── HELPERS ───────────────────────────────────────────────
const API = import.meta.env.VITE_API_URL || null

async function apiFetch(path) {
  if (!API) return null
  try {
    const r = await fetch(`${API}${path}`)
    if (!r.ok) return null
    return r.json()
  } catch { return null }
}

function fmt(n) { return '₹' + n.toLocaleString('en-IN') }
function fmtDur(mins) {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60), m = mins % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

const STATUS_COLORS = {
  online:      { bg:'#e6f9f0', text:'#1a7a4a', dot:'#22c55e' },
  offline:     { bg:'#fef2f2', text:'#b91c1c', dot:'#ef4444' },
  maintenance: { bg:'#fffbeb', text:'#92400e', dot:'#f59e0b' },
}

const SECTOR_COLORS = {
  'Quick Commerce': '#6366f1',
  'BFSI':           '#0ea5e9',
  'FMCG':           '#10b981',
  'Automotive':     '#f59e0b',
  'EdTech':         '#ec4899',
  'Jewellery':      '#8b5cf6',
}

// ─── SUB-COMPONENTS ────────────────────────────────────────

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:12, padding:'20px 24px', borderTop:`3px solid ${accent}` }}>
      <div style={{ fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'#9ca3af', marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:32, fontWeight:700, color:'#111', lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:13, color:'#6b7280', marginTop:6 }}>{sub}</div>}
    </div>
  )
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.online
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:c.bg, color:c.text, fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:20, textTransform:'uppercase', letterSpacing:'0.06em' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:c.dot, flexShrink:0 }} />
      {status}
    </span>
  )
}

function OutageCard({ outage, onResolve }) {
  const [expanded, setExpanded] = useState(false)
  const { site, durationMinutes, revenueAtRiskINR, affectedCampaigns } = outage
  return (
    <div style={{ background:'#fff', border:'1px solid #fee2e2', borderLeft:'4px solid #ef4444', borderRadius:10, padding:'16px 20px', marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
            <StatusBadge status={site.status} />
            <span style={{ fontSize:11, color:'#9ca3af' }}>{site.siteId}</span>
          </div>
          <div style={{ fontSize:15, fontWeight:600, color:'#111', marginBottom:2 }}>{site.name}</div>
          <div style={{ fontSize:12, color:'#6b7280' }}>{site.city}, {site.state} · {site.format} · {site.mediaOwner}</div>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:22, fontWeight:700, color:'#dc2626' }}>{fmt(revenueAtRiskINR)}</div>
          <div style={{ fontSize:11, color:'#9ca3af' }}>at risk · {fmtDur(durationMinutes)} down</div>
        </div>
      </div>

      {affectedCampaigns.length > 0 && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid #fef2f2' }}>
          <div style={{ fontSize:11, fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Affected campaigns</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {affectedCampaigns.map(c => (
              <span key={c.campaignId} style={{ fontSize:12, background:'#fef2f2', color:'#b91c1c', padding:'3px 10px', borderRadius:20, fontWeight:500 }}>
                {c.advertiser} — {c.brand}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:8, marginTop:12 }}>
        <button onClick={() => setExpanded(!expanded)} style={{ fontSize:12, color:'#6b7280', background:'none', border:'1px solid #e5e7eb', borderRadius:6, padding:'4px 12px', cursor:'pointer' }}>
          {expanded ? 'Hide details ▲' : 'Show details ▼'}
        </button>
        {onResolve && (
          <button onClick={() => onResolve(site.siteId)} style={{ fontSize:12, color:'#15803d', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:6, padding:'4px 12px', cursor:'pointer', fontWeight:500 }}>
            Mark resolved
          </button>
        )}
      </div>

      {expanded && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid #f3f4f6', fontSize:12, color:'#6b7280', lineHeight:1.8 }}>
          <div><b>Location:</b> {site.location}</div>
          <div><b>Daily rate:</b> {fmt(site.dailyRateINR)}</div>
          <div><b>Offline since:</b> {new Date(outage.startTime).toLocaleString('en-IN')}</div>
          <div><b>Revenue formula:</b> ({fmt(site.dailyRateINR)} ÷ 1440 min) × {durationMinutes} min = {fmt(revenueAtRiskINR)}</div>
        </div>
      )}
    </div>
  )
}

function SiteRow({ site, campaigns }) {
  const c = STATUS_COLORS[site.status] || STATUS_COLORS.online
  const affected = campaigns.filter(camp => camp.sites.includes(site.siteId))
  return (
    <tr style={{ borderBottom:'1px solid #f3f4f6' }}>
      <td style={{ padding:'10px 12px', fontSize:12, color:'#9ca3af', fontFamily:'monospace' }}>{site.siteId}</td>
      <td style={{ padding:'10px 12px' }}>
        <div style={{ fontSize:13, fontWeight:500, color:'#111' }}>{site.name}</div>
        <div style={{ fontSize:11, color:'#9ca3af' }}>{site.location}</div>
      </td>
      <td style={{ padding:'10px 12px', fontSize:12, color:'#374151' }}>{site.city}</td>
      <td style={{ padding:'10px 12px' }}><StatusBadge status={site.status} /></td>
      <td style={{ padding:'10px 12px', fontSize:12, color:'#374151' }}>{fmt(site.dailyRateINR)}</td>
      <td style={{ padding:'10px 12px' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
          {affected.map(c => (
            <span key={c.campaignId} style={{ fontSize:10, background:SECTOR_COLORS[c.sector] + '18', color:SECTOR_COLORS[c.sector], padding:'2px 7px', borderRadius:20, fontWeight:600 }}>
              {c.advertiser}
            </span>
          ))}
        </div>
      </td>
    </tr>
  )
}

function CityBar({ cities }) {
  const max = Math.max(...cities.map(c => c.total))
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      {cities.sort((a,b) => b.total - a.total).map(c => (
        <div key={c.city} style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:90, fontSize:12, color:'#374151', textAlign:'right', flexShrink:0 }}>{c.city}</div>
          <div style={{ flex:1, height:24, background:'#f3f4f6', borderRadius:4, overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', left:0, top:0, height:'100%', width:`${(c.online/c.total)*100}%`, background:'#22c55e', transition:'width 0.5s' }} />
            <div style={{ position:'absolute', left:`${(c.online/c.total)*100}%`, top:0, height:'100%', width:`${((c.offline||0)/c.total)*100}%`, background:'#ef4444' }} />
            <div style={{ position:'absolute', left:`${((c.online+(c.offline||0))/c.total)*100}%`, top:0, height:'100%', width:`${((c.maintenance||0)/c.total)*100}%`, background:'#f59e0b' }} />
          </div>
          <div style={{ fontSize:11, color:'#9ca3af', width:40, textAlign:'right', flexShrink:0 }}>{c.total} sites</div>
        </div>
      ))}
      <div style={{ display:'flex', gap:16, marginTop:4 }}>
        {[['#22c55e','Online'],['#ef4444','Offline'],['#f59e0b','Maintenance']].map(([clr, lbl]) => (
          <span key={lbl} style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#6b7280' }}>
            <span style={{ width:10, height:10, borderRadius:2, background:clr }} />{lbl}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [sites, setSites] = useState(() => buildMockSites())
  const [campaigns] = useState(CAMPAIGNS_SEED)
  const [siteFilter, setSiteFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tick, setTick] = useState(0)

  // Re-calculate every 60 seconds so revenue ticks up live
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  // Try to pull live data from backend if VITE_API_URL is set
  useEffect(() => {
    apiFetch('/api/sites').then(data => { if (data) setSites(data) })
  }, [tick])

  function handleResolve(siteId) {
    apiFetch(`/api/sites/${siteId}/resolve`)
    setSites(prev => prev.map(s => s.siteId === siteId ? { ...s, status:'online', offlineSince:null } : s))
  }

  const outages = computeOutages(sites)
  const totalRisk = outages.reduce((sum, o) => sum + o.revenueAtRiskINR, 0)
  const affectedAdvertisers = [...new Set(outages.flatMap(o => o.affectedCampaigns.map(c => c.advertiser)))]
  const onlineCount = sites.filter(s => s.status === 'online').length
  const offlineCount = sites.filter(s => s.status === 'offline').length
  const maintenanceCount = sites.filter(s => s.status === 'maintenance').length
  const uptimePct = Math.round((onlineCount / sites.length) * 1000) / 10

  // City breakdown
  const cityMap = {}
  sites.forEach(s => {
    if (!cityMap[s.city]) cityMap[s.city] = { city:s.city, state:s.state, tier:s.tier, total:0, online:0, offline:0, maintenance:0 }
    cityMap[s.city].total++
    cityMap[s.city][s.status]++
  })
  const cities = Object.values(cityMap)

  const filteredSites = sites
    .filter(s => statusFilter === 'all' || s.status === statusFilter)
    .filter(s => !siteFilter || s.name.toLowerCase().includes(siteFilter.toLowerCase()) || s.city.toLowerCase().includes(siteFilter.toLowerCase()) || s.siteId.toLowerCase().includes(siteFilter.toLowerCase()))
    .sort((a, b) => a.city.localeCompare(b.city))

  const NAV = [
    { id:'dashboard', label:'Dashboard' },
    { id:'outages',   label:`Outages (${outages.length})` },
    { id:'sites',     label:'All Sites' },
    { id:'campaigns', label:'Campaigns' },
    { id:'cities',    label:'Cities' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fb', fontFamily:"'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background:'#0f172a', color:'#fff', padding:'0 32px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:56 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:28, height:28, background:'#3b82f6', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700 }}>D</div>
            <span style={{ fontWeight:700, fontSize:16, letterSpacing:'-0.02em' }}>DigitalOOH.IO</span>
            <span style={{ fontSize:11, background:'#1e293b', color:'#64748b', padding:'2px 8px', borderRadius:20, marginLeft:4 }}>Site Health Monitor</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background: offlineCount > 0 ? '#ef4444' : '#22c55e', display:'inline-block' }} />
            <span style={{ fontSize:12, color:'#94a3b8' }}>
              {offlineCount > 0 ? `${offlineCount} offline · ${fmt(totalRisk)} at risk` : 'All systems nominal'}
            </span>
          </div>
        </div>
        {/* Nav */}
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:0, borderTop:'1px solid #1e293b' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{ background:'none', border:'none', color: tab===n.id ? '#fff' : '#64748b', fontSize:13, fontWeight: tab===n.id ? 600 : 400, padding:'12px 18px', cursor:'pointer', borderBottom: tab===n.id ? '2px solid #3b82f6' : '2px solid transparent', transition:'all 0.15s' }}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'28px 32px' }}>

        {/* DASHBOARD TAB */}
        {tab === 'dashboard' && (
          <div>
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:22, fontWeight:700, color:'#111', margin:0 }}>Network overview</h1>
              <p style={{ fontSize:13, color:'#6b7280', marginTop:4 }}>50 sites · 18+ cities · 8 active campaigns · live revenue-at-risk tracking</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:16, marginBottom:32 }}>
              <StatCard label="Uptime" value={`${uptimePct}%`} sub={`${onlineCount} of ${sites.length} online`} accent="#22c55e" />
              <StatCard label="Revenue at risk" value={fmt(totalRisk)} sub={`across ${outages.length} outages`} accent="#ef4444" />
              <StatCard label="Offline now" value={offlineCount} sub={`+ ${maintenanceCount} in maintenance`} accent="#f59e0b" />
              <StatCard label="Advertisers hit" value={affectedAdvertisers.length} sub={affectedAdvertisers.slice(0,2).join(', ') + (affectedAdvertisers.length > 2 ? '…' : '')} accent="#6366f1" />
            </div>

            {outages.length > 0 ? (
              <>
                <h2 style={{ fontSize:15, fontWeight:600, color:'#374151', marginBottom:16 }}>Active outages — sorted by revenue impact</h2>
                {outages.map(o => <OutageCard key={o.siteId} outage={o} onResolve={handleResolve} />)}
              </>
            ) : (
              <div style={{ textAlign:'center', padding:'48px 0', color:'#22c55e', fontSize:16, fontWeight:600 }}>
                ✓ All sites online. No active outages.
              </div>
            )}
          </div>
        )}

        {/* OUTAGES TAB */}
        {tab === 'outages' && (
          <div>
            <h1 style={{ fontSize:22, fontWeight:700, color:'#111', marginBottom:6 }}>Active outages</h1>
            <p style={{ fontSize:13, color:'#6b7280', marginBottom:24 }}>Revenue-at-risk formula: (Daily rate ÷ 1440 min) × minutes offline</p>
            {outages.length === 0
              ? <div style={{ textAlign:'center', padding:'48px 0', color:'#22c55e', fontSize:15 }}>✓ No active outages right now.</div>
              : outages.map(o => <OutageCard key={o.siteId} outage={o} onResolve={handleResolve} />)
            }
          </div>
        )}

        {/* SITES TAB */}
        {tab === 'sites' && (
          <div>
            <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
              <h1 style={{ fontSize:22, fontWeight:700, color:'#111', margin:0, flex:1 }}>All sites</h1>
              <input
                placeholder="Search by name, city or ID…"
                value={siteFilter}
                onChange={e => setSiteFilter(e.target.value)}
                style={{ padding:'8px 14px', border:'1px solid #e5e7eb', borderRadius:8, fontSize:13, width:220, outline:'none' }}
              />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding:'8px 12px', border:'1px solid #e5e7eb', borderRadius:8, fontSize:13, outline:'none' }}>
                <option value="all">All statuses</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:12, overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'#f8f9fb', borderBottom:'1px solid #f0f0f0' }}>
                    {['ID','Site','City','Status','Daily Rate','Campaigns'].map(h => (
                      <th key={h} style={{ padding:'10px 12px', fontSize:11, fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', textAlign:'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map(s => <SiteRow key={s.siteId} site={s} campaigns={campaigns} />)}
                </tbody>
              </table>
              {filteredSites.length === 0 && <div style={{ padding:32, textAlign:'center', color:'#9ca3af', fontSize:13 }}>No sites match your filter.</div>}
            </div>
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {tab === 'campaigns' && (
          <div>
            <h1 style={{ fontSize:22, fontWeight:700, color:'#111', marginBottom:20 }}>Active campaigns</h1>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16 }}>
              {campaigns.map(c => {
                const affectedSites = sites.filter(s => c.sites.includes(s.siteId) && s.status !== 'online')
                const totalRiskForCampaign = affectedSites.reduce((sum, s) => {
                  const mins = Math.round((Date.now() - new Date(s.offlineSince)) / 60000)
                  return sum + Math.round((s.dailyRateINR / 1440) * mins)
                }, 0)
                return (
                  <div key={c.campaignId} style={{ background:'#fff', border:`1px solid ${affectedSites.length ? '#fee2e2' : '#f0f0f0'}`, borderTop:`3px solid ${SECTOR_COLORS[c.sector] || '#6b7280'}`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                      <div>
                        <div style={{ fontSize:11, fontWeight:600, color: SECTOR_COLORS[c.sector] || '#6b7280', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{c.sector}</div>
                        <div style={{ fontSize:15, fontWeight:700, color:'#111' }}>{c.advertiser}</div>
                        <div style={{ fontSize:12, color:'#6b7280' }}>{c.brand}</div>
                      </div>
                      {affectedSites.length > 0 && (
                        <span style={{ fontSize:11, background:'#fef2f2', color:'#b91c1c', padding:'3px 9px', borderRadius:20, fontWeight:600, flexShrink:0 }}>
                          {affectedSites.length} site{affectedSites.length > 1 ? 's' : ''} down
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize:12, color:'#9ca3af', marginBottom:10 }}>{c.sites.length} sites · Budget: {fmt(c.totalBudgetINR)}</div>
                    {totalRiskForCampaign > 0 && (
                      <div style={{ background:'#fef2f2', borderRadius:8, padding:'8px 12px', fontSize:12, color:'#dc2626', fontWeight:500 }}>
                        {fmt(totalRiskForCampaign)} currently at risk
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* CITIES TAB */}
        {tab === 'cities' && (
          <div>
            <h1 style={{ fontSize:22, fontWeight:700, color:'#111', marginBottom:6 }}>City breakdown</h1>
            <p style={{ fontSize:13, color:'#6b7280', marginBottom:24 }}>Network coverage across {cities.length} cities</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:12, padding:'20px 24px' }}>
                <h2 style={{ fontSize:14, fontWeight:600, color:'#374151', marginBottom:16 }}>Sites per city</h2>
                <CityBar cities={cities} />
              </div>
              <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:12, padding:'20px 24px' }}>
                <h2 style={{ fontSize:14, fontWeight:600, color:'#374151', marginBottom:16 }}>Tier breakdown</h2>
                {['Metro','Tier1','Tier2'].map(tier => {
                  const tierSites = sites.filter(s => s.tier === tier)
                  const tierOnline = tierSites.filter(s => s.status === 'online').length
                  return (
                    <div key={tier} style={{ marginBottom:16 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                        <span style={{ fontSize:13, fontWeight:500, color:'#374151' }}>{tier}</span>
                        <span style={{ fontSize:12, color:'#9ca3af' }}>{tierOnline}/{tierSites.length} online</span>
                      </div>
                      <div style={{ height:10, background:'#f3f4f6', borderRadius:5, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${tierSites.length ? (tierOnline/tierSites.length)*100 : 0}%`, background:'#22c55e', borderRadius:5 }} />
                      </div>
                    </div>
                  )
                })}
                <div style={{ marginTop:24 }}>
                  <h2 style={{ fontSize:14, fontWeight:600, color:'#374151', marginBottom:16 }}>Alerts summary</h2>
                  {outages.length === 0
                    ? <div style={{ color:'#22c55e', fontSize:13 }}>✓ No active outages</div>
                    : outages.map(o => (
                      <div key={o.siteId} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #f3f4f6', fontSize:12 }}>
                        <div>
                          <span style={{ fontWeight:500, color:'#374151' }}>{o.site.city}</span>
                          <span style={{ color:'#9ca3af' }}> · {o.site.name.substring(0,28)}{o.site.name.length > 28 ? '…' : ''}</span>
                        </div>
                        <span style={{ color:'#dc2626', fontWeight:500 }}>{fmt(o.revenueAtRiskINR)}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}