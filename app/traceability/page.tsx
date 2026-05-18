'use client';

import React, { useState } from 'react';
import { 
  Search, MapPin, Calendar, Compass, ShieldCheck, 
  FileText, FlaskConical, Thermometer, Droplets, 
  ArrowRight, Sparkles, CheckCircle2, AlertCircle, Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BatchDetail {
  code: string;
  name: string;
  category: string;
  purityScore: number;
  extractionDate: string;
  hiveTemp: string;
  moisture: string;
  mgo: string;
  hmf: string;
  beekeeper: string;
  farmName: string;
  coordinates: {
    farm: string;
    lab: string;
    factory: string;
  };
  geoCoords: {
    farm: { lat: number; lng: number };
    lab: { lat: number; lng: number };
    factory: { lat: number; lng: number };
  };
  steps: {
    title: string;
    date: string;
    location: string;
    details: string;
    status: 'completed' | 'pending';
    icon: 'hive' | 'filter' | 'lab' | 'jar' | 'check';
  }[];
}

const BATCH_DATABASE: Record<string, BatchDetail> = {
  'BEE-ORG-2026': {
    code: 'BEE-ORG-2026',
    name: 'Beevora Original Organic Honey',
    category: 'Original Honey',
    purityScore: 99.8,
    extractionDate: 'April 12, 2026',
    hiveTemp: '34.2 °C',
    moisture: '17.2%',
    mgo: '100+',
    hmf: '< 10 mg/kg',
    beekeeper: 'Master Beekeeper Al-Amin',
    farmName: 'Sundarbans Reserve, Apiary Block A',
    coordinates: {
      farm: 'Sundarbans Reserve, Block A (21.9497° N, 89.1833° E)',
      lab: 'Dhaka Scientific Laboratories (23.7104° N, 90.4074° E)',
      factory: 'Beevora Premium Packaging Hub, Gazipur (23.9889° N, 90.4124° E)'
    },
    geoCoords: {
      farm: { lat: 21.9497, lng: 89.1833 },
      lab: { lat: 23.7104, lng: 90.4074 },
      factory: { lat: 23.9889, lng: 90.4124 }
    },
    steps: [
      {
        title: 'Hive Harvest & Extraction',
        date: 'April 10, 2026',
        location: 'Sundarbans Reserve, Block A',
        details: 'Extracted under cold press from organic hives. Core hive temperature logged at 34.2°C.',
        status: 'completed',
        icon: 'hive'
      },
      {
        title: 'Cold Micro-Filtration',
        date: 'April 12, 2026',
        location: 'Beevora Harvesting Station',
        details: 'Raw honey passed through micro-mesh filters. Moisture tested at an optimal 17.2%.',
        status: 'completed',
        icon: 'filter'
      },
      {
        title: 'Purity & Activity Lab Testing',
        date: 'April 14, 2026',
        location: 'Dhaka Scientific Laboratories',
        details: 'Chemical tests passed. MGO rating logged at 100+ and HMF at <10mg/kg. 0% synthetic sugars.',
        status: 'completed',
        icon: 'lab'
      },
      {
        title: 'Jarring & Tamper Sealing',
        date: 'April 15, 2026',
        location: 'Gazipur Premium Packaging Hub',
        details: 'Bottled in amber UV-protective glass jars. QR verification tag locked to Jar #ORG-9921.',
        status: 'completed',
        icon: 'jar'
      },
      {
        title: 'Quality Assurance Release',
        date: 'April 16, 2026',
        location: 'Beevora Distribution Center',
        details: 'Batch approved for consumer distribution with a certified 99.8% supply chain purity rating.',
        status: 'completed',
        icon: 'check'
      }
    ]
  },
  'BEE-MNK-7711': {
    code: 'BEE-MNK-7711',
    name: 'Beevora Premium Manuka Gold',
    category: 'Manuka Honey',
    purityScore: 99.9,
    extractionDate: 'May 02, 2026',
    hiveTemp: '33.8 °C',
    moisture: '16.5%',
    mgo: '500+ (Ultra High Activity)',
    hmf: '< 8 mg/kg',
    beekeeper: 'Dr. Sarah Jenkins',
    farmName: 'Beevora Highlands Apiary, Sector 7',
    coordinates: {
      farm: 'Highlands Apiary, Sector 7 (22.5726° N, 88.3639° E)',
      lab: 'National Purity Labs, Dhaka (23.7204° N, 90.3974° E)',
      factory: 'Beevora Premium Packaging Hub, Gazipur (23.9889° N, 90.4124° E)'
    },
    geoCoords: {
      farm: { lat: 22.5726, lng: 88.3639 },
      lab: { lat: 23.7204, lng: 90.3974 },
      factory: { lat: 23.9889, lng: 90.4124 }
    },
    steps: [
      {
        title: 'Hive Harvest & Extraction',
        date: 'May 01, 2026',
        location: 'Highlands Apiary, Sector 7',
        details: 'Carefully collected from native Manuka flora. Hive temperature recorded at 33.8°C.',
        status: 'completed',
        icon: 'hive'
      },
      {
        title: 'Centrifugal Extraction',
        date: 'May 02, 2026',
        location: 'Highlands Extraction Base',
        details: 'Cold centrifugal extraction preserves enzyme vitality. Moisture recorded at 16.5%.',
        status: 'completed',
        icon: 'filter'
      },
      {
        title: 'Activity Testing & Validation',
        date: 'May 04, 2026',
        location: 'National Purity Labs, Dhaka',
        details: 'Certified MGO 500+ grade. Ultra-pure enzymes verified. HMF level exceptionally low (<8mg/kg).',
        status: 'completed',
        icon: 'lab'
      },
      {
        title: 'Gold-Standard Jarring',
        date: 'May 05, 2026',
        location: 'Gazipur Premium Packaging Hub',
        details: 'Sealed in dual-walled UV amber glassware. Gold batch validation seal applied.',
        status: 'completed',
        icon: 'jar'
      },
      {
        title: 'QA Certified Dispatch',
        date: 'May 06, 2026',
        location: 'Beevora Distribution Center',
        details: 'Approved for global logistics. Certified 99.9% premium food-grade rating verified.',
        status: 'completed',
        icon: 'check'
      }
    ]
  },
  'BEE-WLD-8899': {
    code: 'BEE-WLD-8899',
    name: 'Beevora Wildflower Meadow Honey',
    category: 'Wildflower Honey',
    purityScore: 99.6,
    extractionDate: 'April 28, 2026',
    hiveTemp: '34.5 °C',
    moisture: '18.0%',
    mgo: '80+',
    hmf: '< 12 mg/kg',
    beekeeper: 'Beekeeper Zahid Hassan',
    farmName: 'Beevora Wildflower Meadows, Block B',
    coordinates: {
      farm: 'Wildflower Meadows, Block B (24.8949° N, 91.8687° E)',
      lab: 'Sylhet Scientific Division (24.8978° N, 91.8714° E)',
      factory: 'Beevora Premium Packaging Hub, Gazipur (23.9889° N, 90.4124° E)'
    },
    geoCoords: {
      farm: { lat: 24.8949, lng: 91.8687 },
      lab: { lat: 24.8978, lng: 91.8714 },
      factory: { lat: 23.9889, lng: 90.4124 }
    },
    steps: [
      {
        title: 'Hive Harvest & Extraction',
        date: 'April 26, 2026',
        location: 'Wildflower Meadows, Block B',
        details: 'Sourced from diverse spring wildflowers. Hive temperature logged at 34.5°C.',
        status: 'completed',
        icon: 'hive'
      },
      {
        title: 'Multi-Stage Filtration',
        date: 'April 28, 2026',
        location: 'Meadow Packaging Base',
        details: 'Filtered to remove organic hive debris. Moisture tested at a premium 18.0%.',
        status: 'completed',
        icon: 'filter'
      },
      {
        title: 'Independent Purity Check',
        date: 'April 29, 2026',
        location: 'Sylhet Scientific Division',
        details: 'Verified chemical balance. MGO rating logged at 80+ and HMF at <12mg/kg.',
        status: 'completed',
        icon: 'lab'
      },
      {
        title: 'Sustainable Packaging',
        date: 'April 30, 2026',
        location: 'Gazipur Premium Packaging Hub',
        details: 'Jarred in recycled glass container with bio-based sealing caps.',
        status: 'completed',
        icon: 'jar'
      },
      {
        title: 'QA Delivery Approval',
        date: 'May 01, 2026',
        location: 'Beevora Distribution Center',
        details: 'Supply chain safety clearance achieved with 99.6% purity timeline verified.',
        status: 'completed',
        icon: 'check'
      }
    ]
  }
};

export default function TraceabilityPage() {
  const [searchCode, setSearchCode] = useState('');
  const [activeBatch, setActiveBatch] = useState<BatchDetail | null>(BATCH_DATABASE['BEE-MNK-7711']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    if (!query) return;

    if (BATCH_DATABASE[query]) {
      setActiveBatch(BATCH_DATABASE[query]);
      setErrorMsg('');
    } else {
      setErrorMsg(`Batch "${query}" not found in our document store. Please try a valid code.`);
    }
  };

  const loadExample = (code: string) => {
    setSearchCode(code);
    setActiveBatch(BATCH_DATABASE[code]);
    setErrorMsg('');
  };

  const handleDownloadPDF = (batch: BatchDetail) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Purity Analysis Certificate - ${batch.code}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; line-height: 1.6; padding: 40px; background-color: #ffffff; }
            .header { text-align: center; border-bottom: 3px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { font-size: 28px; color: #111827; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
            .header p { font-size: 14px; color: #6b7280; margin: 5px 0 0; }
            .badge { display: inline-block; padding: 6px 12px; background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; font-weight: bold; border-radius: 9999px; font-size: 12px; margin-top: 10px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 16px; font-weight: bold; text-transform: uppercase; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 0.5px; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; }
            .grid-item { font-size: 14px; }
            .grid-item strong { color: #0f172a; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table th, .table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 14px; }
            .table th { background-color: #f8fafc; font-weight: bold; color: #334155; }
            .purity-highlight { text-align: center; margin: 30px 0; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; }
            .purity-highlight h2 { font-size: 36px; color: #16a34a; margin: 0; font-weight: 800; }
            .purity-highlight p { font-size: 14px; color: #15803d; margin: 5px 0 0; font-weight: 600; }
            .signatures { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; margin-top: 60px; text-align: center; }
            .sig-item { border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 14px; color: #475569; }
            .stamp { width: 100px; height: 100px; border: 3px dashed #16a34a; border-radius: 50%; color: #16a34a; font-weight: bold; display: flex; align-items: center; justify-content: center; transform: rotate(-15deg); margin: 0 auto 10px; font-size: 12px; text-align: center; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Beevora Laboratory Analysis</h1>
            <p>Certified Purity & Active Grade Honey Analysis Report</p>
            <div class="badge">Official Batch Certificate: ${batch.code}</div>
          </div>

          <div class="section">
            <div class="section-title">Batch & Origin Information</div>
            <div class="grid">
              <div class="grid-item"><strong>Product Name:</strong> ${batch.name}</div>
              <div class="grid-item"><strong>Honey Category:</strong> ${batch.category}</div>
              <div class="grid-item"><strong>Apiary Location:</strong> ${batch.farmName}</div>
              <div class="grid-item"><strong>Harvest Beekeeper:</strong> ${batch.beekeeper}</div>
              <div class="grid-item"><strong>Extraction Date:</strong> ${batch.extractionDate}</div>
              <div class="grid-item"><strong>Hive Core Temp:</strong> ${batch.hiveTemp}</div>
            </div>
          </div>

          <div class="purity-highlight">
            <h2>${batch.purityScore}%</h2>
            <p>GUARANTEED ANALYSIS PURITY RATING</p>
          </div>

          <div class="section">
            <div class="section-title">Chemical & Bio-Active Profiling</div>
            <table class="table">
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Method / Instrument</th>
                  <th>Target Range</th>
                  <th>Batch Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Methylglyoxal (MGO)</strong></td>
                  <td>High-Performance Liquid Chromatography (HPLC)</td>
                  <td>Activity standard rating</td>
                  <td><strong>${batch.mgo}</strong></td>
                  <td style="color: #16a34a; font-weight: bold;">PASS</td>
                </tr>
                <tr>
                  <td><strong>Hydroxymethylfurfural (HMF)</strong></td>
                  <td>Spectrophotometric White Method</td>
                  <td>&lt; 40 mg/kg</td>
                  <td><strong>${batch.hmf}</strong></td>
                  <td style="color: #16a34a; font-weight: bold;">PASS</td>
                </tr>
                <tr>
                  <td><strong>Moisture Content</strong></td>
                  <td>Digital Refractometer Index</td>
                  <td>15.0% - 19.0%</td>
                  <td><strong>${batch.moisture}</strong></td>
                  <td style="color: #16a34a; font-weight: bold;">PASS</td>
                </tr>
                <tr>
                  <td><strong>C-4 Cane Sugar Adulteration</strong></td>
                  <td>Stable Isotope Ratio Mass Spectrometry (IRMS)</td>
                  <td>0.00% (Undetectable)</td>
                  <td><strong>0.00%</strong></td>
                  <td style="color: #16a34a; font-weight: bold;">PASS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="signatures">
            <div>
              <div class="stamp">Beevora QA<br>Passed<br>2026</div>
              <div class="sig-item">
                <strong>Quality Assurance Stamp</strong><br>
                Beevora Safety Division
              </div>
            </div>
            <div>
              <div style="height: 110px; display: flex; align-items: flex-end; justify-content: center; font-family: 'Courier New', monospace; font-size: 20px; font-style: italic; color: #1e3a8a; margin-bottom: 5px;">Dr. S. Jenkins</div>
              <div class="sig-item">
                <strong>Certified Head Chemist</strong><br>
                Independent Purity Authority
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Supply Chain Transparency
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Honey Batch Traceability
          </h1>
          <p className="text-base text-white/50 leading-relaxed">
            Enter the batch code printed on the lid of your Beevora honey jar. Instantly trace your honey from the exact hive location, view extraction parameters, and download lab verification reports.
          </p>
        </div>

        {/* Search & Selection Deck */}
        <div className="bg-[#0B0F21]/80 border border-white/5 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Batch Code (e.g. BEE-MNK-7711)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-base focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all placeholder:text-white/20"
              />
            </div>
            <Button type="submit" size="xl" className="px-8 shadow-lg shadow-amber-500/15">
              Trace Batch
            </Button>
          </form>

          {/* Quick Selections */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="text-xs font-bold text-white/40 uppercase tracking-wider mr-2">Try Demo Batches:</span>
            {Object.keys(BATCH_DATABASE).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => loadExample(code)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  activeBatch?.code === code
                    ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                #{code}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-3 items-center text-sm text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Supply Chain Dashboard */}
        {activeBatch && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: SVG Animated Timeline (Column Span 5) */}
            <div className="lg:col-span-5 bg-[#0B0F21]/80 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
              <div className="space-y-1 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>⛓️</span> Supply Chain Timeline
                </h2>
                <p className="text-xs text-white/40">Verified steps from natural hives to your table.</p>
              </div>

              <div className="relative pl-6 border-l border-white/10 space-y-10 ml-3">
                {activeBatch.steps.map((step, idx) => {
                  let stepIcon = <span>📅</span>;
                  if (step.icon === 'hive') stepIcon = <Compass className="h-4 w-4" />;
                  if (step.icon === 'filter') stepIcon = <Droplets className="h-4 w-4" />;
                  if (step.icon === 'lab') stepIcon = <FlaskConical className="h-4 w-4" />;
                  if (step.icon === 'jar') stepIcon = <FileText className="h-4 w-4" />;
                  if (step.icon === 'check') stepIcon = <ShieldCheck className="h-4 w-4" />;

                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline Glowing Node */}
                      <span className="absolute -left-[38px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#070913] border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)] text-amber-400 group-hover:scale-110 transition-transform">
                        {stepIcon}
                      </span>

                      <div className="space-y-1 text-left">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                            {step.title}
                          </h3>
                          <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-wider whitespace-nowrap bg-white/5 px-2 py-0.5 rounded">
                            {step.date}
                          </span>
                        </div>
                        <p className="text-xs text-amber-500/70 font-semibold">{step.location}</p>
                        <p className="text-xs text-white/50 leading-relaxed pt-1">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: SVG Vector Route Map & Lab Results (Column Span 7) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Vector Supply Route Map */}
              <div className="bg-[#0B0F21]/80 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-amber-400" />
                      Interactive Supply Route Map
                    </h2>
                    <p className="text-xs text-white/40">Visualizing transport vector from harvest coordinates to packaging hub.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest font-mono">
                    Live Route
                  </span>
                </div>

                {/* Stunning Custom SVG Map Container */}
                <div className="relative h-64 bg-slate-950/60 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center p-4">
                  {/* Grid overlay for radar feel */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* SVG Route Vector Representation */}
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 240">
                    {/* Path Route Line */}
                    <path
                      d="M 120 180 Q 300 60 480 140"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-[dash_10s_linear_infinite]"
                      style={{
                        strokeDashoffset: 100,
                        animation: 'dash 1.5s linear infinite'
                      }}
                    />

                    {/* Glowing Route Pulses */}
                    <path
                      d="M 120 180 Q 300 60 480 140"
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.4)"
                      strokeWidth="4"
                      className="opacity-50"
                    />

                    {/* Nodes (Farm, Lab, Factory) */}
                    {/* Node 1: Farm */}
                    <g transform="translate(120, 180)" className="cursor-pointer group">
                      <circle r="12" fill="rgba(245, 158, 11, 0.15)" className="animate-ping" />
                      <circle r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                      <text y="-14" textAnchor="middle" fill="#ffffff" className="text-[10px] font-bold fill-white/80">Harvest Apiary</text>
                    </g>

                    {/* Node 2: Lab (Middle Curve) */}
                    <g transform="translate(300, 102)" className="cursor-pointer group">
                      <circle r="12" fill="rgba(59, 130, 246, 0.15)" className="animate-ping" />
                      <circle r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                      <text y="-14" textAnchor="middle" fill="#ffffff" className="text-[10px] font-bold fill-white/80">Purity Lab</text>
                    </g>

                    {/* Node 3: Packaging Hub */}
                    <g transform="translate(480, 140)" className="cursor-pointer group">
                      <circle r="12" fill="rgba(16, 185, 129, 0.15)" className="animate-ping" />
                      <circle r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      <text y="-14" textAnchor="middle" fill="#ffffff" className="text-[10px] font-bold fill-white/80">Packaging Hub</text>
                    </g>
                  </svg>

                  {/* Absolute Labels Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono text-white/40">
                    <span>Farm: {batchCodeGeoPrefix(activeBatch.geoCoords.farm)}</span>
                    <span>Lab: {batchCodeGeoPrefix(activeBatch.geoCoords.lab)}</span>
                    <span>Factory: {batchCodeGeoPrefix(activeBatch.geoCoords.factory)}</span>
                  </div>
                </div>

                {/* Coords Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">Harvest Farm</span>
                    <p className="text-xs font-bold text-white truncate">{activeBatch.farmName}</p>
                    <p className="text-[10px] text-white/40 font-mono">Coords: {activeBatch.geoCoords.farm.lat}, {activeBatch.geoCoords.farm.lng}</p>
                  </div>
                  <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">Analysis Lab</span>
                    <p className="text-xs font-bold text-white truncate">Dhaka Scientific Division</p>
                    <p className="text-[10px] text-white/40 font-mono">Coords: {activeBatch.geoCoords.lab.lat}, {activeBatch.geoCoords.lab.lng}</p>
                  </div>
                  <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest block">Packaging Hub</span>
                    <p className="text-xs font-bold text-white truncate">Gazipur Center</p>
                    <p className="text-[10px] text-white/40 font-mono">Coords: {activeBatch.geoCoords.factory.lat}, {activeBatch.geoCoords.factory.lng}</p>
                  </div>
                </div>
              </div>

              {/* Lab Certification Card */}
              <div className="bg-[#0B0F21]/80 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                      Laboratory Purity & Analysis Profile
                    </h2>
                    <p className="text-xs text-white/40">Verified chemical profiling index for batch {activeBatch.code}.</p>
                  </div>
                  <Button
                    onClick={() => handleDownloadPDF(activeBatch)}
                    leftIcon={<Download className="h-4 w-4" />}
                    variant="secondary"
                    className="border-white/10 text-xs py-2 h-auto text-amber-400 hover:bg-white/5"
                  >
                    Download Certificate
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-widest block">Purity Score</span>
                    <span className="text-2xl font-extrabold text-green-400">{activeBatch.purityScore}%</span>
                  </div>
                  <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-widest block">MGO Grade</span>
                    <span className="text-xl font-extrabold text-amber-400">{activeBatch.mgo.split(' ')[0]}</span>
                  </div>
                  <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-widest block">HMF Level</span>
                    <span className="text-xl font-extrabold text-white">{activeBatch.hmf}</span>
                  </div>
                  <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-widest block">Moisture</span>
                    <span className="text-xl font-extrabold text-blue-400">{activeBatch.moisture}</span>
                  </div>
                </div>

                {/* Lab Safety Endorsement banner */}
                <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed text-left">
                    <strong>Purity Standard Guarantee:</strong> Independent lab analysis certifies that this batch has 0% cane-sugar additives, 0% chemicals, and 100% natural, active food enzymes.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function batchCodeGeoPrefix(coords: { lat: number; lng: number }): string {
  return `${coords.lat.toFixed(2)}°N, ${coords.lng.toFixed(2)}°E`;
}
