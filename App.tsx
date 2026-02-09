
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldAlert, 
  Search, 
  LayoutDashboard, 
  Fingerprint, 
  Share2, 
  Settings, 
  Sun, 
  Moon, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Zap,
  Activity
} from 'lucide-react';
import { Profile, RiskLevel, Platform, NetworkNode, NetworkLink } from './types';
import { MOCK_PROFILES, APP_THEME_KEY } from './constants';
import NetworkGraph from './components/NetworkGraph';
import BehavioralDNA from './components/BehavioralDNA';
import RiskBadge from './components/RiskBadge';
import { analyzeProfileAI } from './services/geminiService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(APP_THEME_KEY);
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analyzer' | 'networks' | 'cross-platform'>('dashboard');
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [searchHandle, setSearchHandle] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.TWITTER);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);

  // Toggle Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(APP_THEME_KEY, theme);
  }, [theme]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHandle) return;
    
    setIsAnalyzing(true);
    setActiveTab('analyzer');
    try {
      const result = await analyzeProfileAI(searchHandle, selectedPlatform);
      setLastAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const dashboardStats = [
    { label: 'Total Scanned', value: '1.2M', icon: Search, color: 'indigo' },
    { label: 'Threats Blocked', value: '45.2K', icon: ShieldAlert, color: 'red' },
    { label: 'Botnets Identified', value: '124', icon: Share2, color: 'amber' },
    { label: 'Network Confidence', value: '98.2%', icon: UserCheck, color: 'green' },
  ];

  const mockNetworkData: { nodes: NetworkNode[], links: NetworkLink[] } = {
    nodes: [
      { id: '1', label: 'Root Node', risk: RiskLevel.CRITICAL },
      { id: '2', label: 'Bot A', risk: RiskLevel.HIGH },
      { id: '3', label: 'Bot B', risk: RiskLevel.HIGH },
      { id: '4', label: 'Amplifier 1', risk: RiskLevel.MEDIUM },
      { id: '5', label: 'Amplifier 2', risk: RiskLevel.MEDIUM },
      { id: '6', label: 'Sleeper 1', risk: RiskLevel.LOW },
    ],
    links: [
      { source: '1', target: '2', weight: 5 },
      { source: '1', target: '3', weight: 5 },
      { source: '2', target: '4', weight: 2 },
      { source: '3', target: '5', weight: 2 },
      { source: '4', target: '6', weight: 1 },
      { source: '5', target: '6', weight: 1 },
      { source: '1', target: '6', weight: 1 },
    ]
  };

  const dnaData = [
    { subject: 'Temporal Entropy', A: 85, fullMark: 100 },
    { subject: 'Linguistic Rhythm', A: 92, fullMark: 100 },
    { subject: 'Reaction Velocity', A: 78, fullMark: 100 },
    { subject: 'Content Stability', A: 45, fullMark: 100 },
    { subject: 'Network Motif', A: 90, fullMark: 100 },
    { subject: 'Automation Marker', A: 88, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col z-20 sticky top-0 h-auto md:h-screen">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShieldAlert className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">SentinAI</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('analyzer')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analyzer' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            <Activity size={20} />
            <span>Profile Analyzer</span>
          </button>
          <button 
            onClick={() => setActiveTab('networks')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'networks' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            <Share2 size={20} />
            <span>Network Motifs</span>
          </button>
          <button 
            onClick={() => setActiveTab('cross-platform')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cross-platform' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            <Fingerprint size={20} />
            <span>Cross-Platform BSV</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm text-gray-500">Theme</span>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-500 hover:text-indigo-500 transition-colors">
            <Settings size={20} />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        
        {/* Header Search Bar */}
        <header className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {activeTab === 'dashboard' && 'Operations Overview'}
                {activeTab === 'analyzer' && 'Behavioral Audit'}
                {activeTab === 'networks' && 'Coordinated Ring Detection'}
                {activeTab === 'cross-platform' && 'CBBF Linking Engine'}
              </h1>
              <p className="text-gray-500 mt-1">Enterprise-grade social trust intelligence.</p>
            </div>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-sm border border-gray-200 dark:border-slate-700">
              <select 
                value={selectedPlatform} 
                onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                className="bg-transparent text-sm font-medium px-4 border-r border-gray-200 dark:border-slate-700 focus:outline-none"
              >
                {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="flex-1 flex items-center px-2">
                <Search className="text-gray-400 mr-2" size={18} />
                <input 
                  type="text" 
                  placeholder="Analyze handle (e.g. @botmaster_01)" 
                  value={searchHandle}
                  onChange={(e) => setSearchHandle(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={isAnalyzing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center disabled:opacity-50"
              >
                {isAnalyzing ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white mr-2"></div> : <Zap size={16} className="mr-2" />}
                Analyze
              </button>
            </form>
          </div>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 hover:scale-[1.02] transition-transform cursor-default">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                        <stat.icon size={22} />
                      </div>
                      <span className="text-xs font-medium text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">+12%</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Main Content Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent High Risk Alerts */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold flex items-center">
                        <AlertTriangle className="text-red-500 mr-2" size={20} />
                        High-Risk Detections
                      </h3>
                      <button className="text-indigo-500 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {profiles.filter(p => p.riskLevel !== RiskLevel.LOW).map((profile) => (
                        <div key={profile.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/50 border border-transparent hover:border-gray-100 dark:hover:border-slate-600 transition-all">
                          <div className="flex items-center space-x-4">
                            <img src={profile.avatar} alt={profile.handle} className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-slate-700" />
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-bold text-sm">@{profile.handle}</p>
                                <RiskBadge level={profile.riskLevel} />
                              </div>
                              <p className="text-xs text-gray-500">{profile.platform} • {new Date(profile.detectedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="hidden sm:block text-right">
                              <p className="text-xs text-gray-400 font-medium">Risk Score</p>
                              <p className="font-bold text-sm text-red-500">{profile.riskScore}%</p>
                            </div>
                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coordinated Network Peek */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold flex items-center">
                        <Share2 className="text-indigo-500 mr-2" size={20} />
                        Active Coordination Ring #421
                      </h3>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded uppercase font-bold tracking-wider">Critical Threat</span>
                    </div>
                    <NetworkGraph nodes={mockNetworkData.nodes} links={mockNetworkData.links} height={300} />
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Insight:</strong> This network exhibits synchronized posting behavior (entropy &lt; 0.15) across 14 identified seed nodes and 200+ automated amplifiers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar Stats / Global Threat Map Placeholder */}
                <div className="space-y-6">
                  <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 dark:shadow-none relative overflow-hidden">
                    <Zap className="absolute top-[-20px] right-[-20px] w-48 h-48 opacity-10 rotate-12" />
                    <h3 className="text-xl font-bold mb-2">System Health</h3>
                    <div className="space-y-4 relative z-10">
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium opacity-80">
                          <span>API Latency</span>
                          <span>24ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full">
                          <div className="h-full w-[95%] bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium opacity-80">
                          <span>Model Accuracy</span>
                          <span>99.8%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full">
                          <div className="h-full w-[99%] bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium opacity-80">
                          <span>Real-time Ingestion</span>
                          <span>15.2k msg/s</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full">
                          <div className="h-full w-[70%] bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Threat Vectors</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Influencer Fraud', val: 45, color: 'bg-indigo-500' },
                        { name: 'Disinformation', val: 78, color: 'bg-red-500' },
                        { name: 'Financial Scams', val: 62, color: 'bg-amber-500' },
                        { name: 'Political Bots', val: 30, color: 'bg-emerald-500' },
                      ].map((v) => (
                        <div key={v.name}>
                          <div className="flex justify-between text-xs mb-1.5 font-bold text-gray-500 uppercase tracking-widest">
                            <span>{v.name}</span>
                            <span>{v.val}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full">
                            <div className={`h-full ${v.color} rounded-full`} style={{ width: `${v.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analyzer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {isAnalyzing ? (
                <div className="lg:col-span-2 flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-slate-600">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-6"></div>
                  <h3 className="text-2xl font-bold">Initializing Deep Analysis...</h3>
                  <p className="text-gray-500 mt-2 text-center max-w-sm">Checking micro-behavioral entropy, temporal patterns, and linguistic markers across our global network...</p>
                </div>
              ) : lastAnalysis ? (
                <>
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm space-y-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-3xl font-bold flex items-center">
                          Audit Report: {searchHandle}
                          <ExternalLink className="ml-2 text-indigo-500 cursor-pointer" size={20} />
                        </h2>
                        <div className="flex items-center space-x-3 mt-4">
                          <span className={`text-5xl font-black ${lastAnalysis.trustScore < 40 ? 'text-red-500' : 'text-green-500'}`}>{lastAnalysis.trustScore}%</span>
                          <div>
                            <p className="font-bold text-lg uppercase tracking-wider">Trust Score</p>
                            <p className="text-sm text-gray-500">Confidence: 0.992</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <RiskBadge level={lastAnalysis.trustScore < 40 ? RiskLevel.CRITICAL : RiskLevel.LOW} />
                        <p className="text-xs text-gray-500 mt-2">Analysis ID: AUD-882-PQL</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Behavioral Findings</h4>
                      {lastAnalysis.findings.map((finding: any, idx: number) => (
                        <div key={idx} className="flex items-start p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700">
                          <div className={`p-2 rounded-lg mr-4 ${finding.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                            {finding.severity === 'CRITICAL' ? <ShieldAlert size={18} /> : <Zap size={18} />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm">{finding.category}</span>
                              <RiskBadge level={finding.severity} />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{finding.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
                      <h3 className="text-xl font-bold mb-6 flex items-center">
                        <Fingerprint className="mr-2 text-indigo-500" size={22} />
                        Behavioral DNA Signature (BSV)
                      </h3>
                      <BehavioralDNA data={dnaData} />
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                          <p className="text-xs font-bold text-gray-500 mb-1">SIGNATURE VECTOR</p>
                          <p className="text-xs font-mono break-all text-indigo-500">BSV_DNA:eJwlj0sKwkAQRbe8i0...[ENCRYPTED]</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                          <p className="text-xs font-bold text-gray-500 mb-1">LAST MATCH</p>
                          <p className="text-sm font-bold">Cross-Platform identified (Telegram)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
                      <h3 className="text-xl font-bold mb-6 flex items-center">
                        <Share2 className="mr-2 text-indigo-500" size={22} />
                        Local Interaction Cluster
                      </h3>
                      <NetworkGraph nodes={mockNetworkData.nodes.slice(0, 4)} links={mockNetworkData.links.slice(0, 3)} height={200} />
                      <p className="text-xs text-gray-500 mt-4 text-center italic">Graph shows local coordination motif matching known spam rings.</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="lg:col-span-2 flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
                  <div className="bg-indigo-50 dark:bg-slate-700 p-6 rounded-3xl mb-4">
                    <Search className="text-indigo-600 dark:text-indigo-400" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold">Ready for Profiling</h3>
                  <p className="text-gray-500 mt-2 text-center max-w-sm">Enter a handle in the search bar above to begin high-fidelity forensic behavioral analysis.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'networks' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">Coordinated Engagement Map</h2>
                    <p className="text-gray-500">Visualizing 1,240 active bots identified in the last 24 hours.</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 dark:shadow-none">Mass Quarantine</button>
                     <button className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-xl text-sm font-bold">Export Graph</button>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <NetworkGraph nodes={mockNetworkData.nodes} links={mockNetworkData.links} height={500} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Centrality Entropy', val: '0.84', desc: 'Higher indicates more human-like variety.' },
                  { title: 'Clustering Coeff.', val: '0.92', desc: 'Indicates dense bot engagement rings.' },
                  { title: 'Burst Frequency', val: '15/sec', desc: 'Peak coordinated message spikes.' },
                ].map(stat => (
                  <div key={stat.title} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.title}</h4>
                    <p className="text-2xl font-black mb-1">{stat.val}</p>
                    <p className="text-xs text-gray-500">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cross-platform' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-indigo-600 rounded-3xl p-8 text-white">
                  <Fingerprint size={48} className="mb-4 opacity-50" />
                  <h3 className="text-2xl font-bold mb-4">The DNA of Malice</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Our Behavioral Signature Vector (BSV) identifies actors across platforms by tracking unconscious micro-behaviors like reaction delays and linguistic cadence.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700">
                  <h4 className="font-bold mb-4">Detection Parameters</h4>
                  <div className="space-y-4">
                    {['Linguistic Jitter', 'Post Time Entropy', 'Sentiment Drift', 'Scroll Cadence'].map(p => (
                      <div key={p} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{p}</span>
                        <div className="w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-100 dark:ring-green-900/30"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-bold mb-6">Identified Threat Clusters (Cross-Platform)</h3>
                  <div className="space-y-6">
                    {[
                      { 
                        signature: 'BSV-882-QX', 
                        matches: [
                          { platform: Platform.TWITTER, handle: 'crypto_boss', risk: 95 },
                          { platform: Platform.TELEGRAM, handle: 'alpha_signals_bot', risk: 98 },
                          { platform: Platform.INSTAGRAM, handle: 'luxury_lifestyle_01', risk: 85 }
                        ]
                      },
                      { 
                        signature: 'BSV-012-ZZ', 
                        matches: [
                          { platform: Platform.FACEBOOK, handle: 'News_Patriot_Today', risk: 78 },
                          { platform: Platform.TWITTER, handle: 'real_truth_finder', risk: 82 }
                        ]
                      }
                    ].map((cluster, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                          <div className="flex items-center space-x-2">
                             <Fingerprint className="text-indigo-500" size={20} />
                             <span className="font-mono text-sm font-bold tracking-tighter">{cluster.signature}</span>
                          </div>
                          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Active Linking</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {cluster.matches.map((m, j) => (
                            <div key={j} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                              <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">{m.platform}</p>
                                <p className="text-sm font-bold">@{m.handle}</p>
                              </div>
                              <span className="text-xs font-black text-red-500">{m.risk}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Persistence Floating Help */}
      <button className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 z-50">
        <ShieldAlert size={24} />
      </button>
    </div>
  );
};

export default App;
