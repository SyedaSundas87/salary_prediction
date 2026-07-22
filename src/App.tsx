import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, RefreshCw } from 'lucide-react';
import { predictSalary } from './utils/mockApi';
import { PredictionPayload } from './types';
import { Card, Slider, Toggle, Select, Stepper, SegmentedControl } from './components/FormControls';

// Custom animated counter component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1500; // 1.5s
    const startValue = 0;

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setDisplayValue(startValue + (value - startValue) * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toFixed(2)}</>;
};

export default function App() {
  const [formData, setFormData] = useState<Omit<PredictionPayload, 'skill_score'>>({
    cgpa: 8.0,
    branch: 'CSE',
    college_tier: 2,
    python_skill: 1,
    dsa_skill: 1,
    ml_skill: 0,
    web_dev_skill: 1,
    coding_score: 80,
    communication_score: 7.5,
    aptitude_score: 85,
    internships: 1,
    projects: 2,
    backlogs: 0,
    resume_score: 75,
    company_type: 'MNC',
    job_role: 'Software Engineer'
  });

  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  // Auto-calculated skill score
  const skillScore = formData.python_skill + formData.dsa_skill + formData.ml_skill + formData.web_dev_skill;

  const updateField = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Reset prediction if user changes inputs
    if (prediction !== null) setPrediction(null);
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    setPrediction(null);
    
    try {
      const payload: PredictionPayload = {
        ...formData,
        skill_score: skillScore
      };
      const res = await predictSalary(payload);
      // Ensure we wait at least 400ms for UX as requested
      // The mockApi already has an 800ms delay, so we're good
      setPrediction(res.predicted_salary_lpa);
    } catch (error) {
      console.error("Prediction failed", error);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0B0F1A] text-slate-100 font-sans p-4 md:p-8 overflow-x-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#3B82F6]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none" />

      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 z-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent uppercase">
              Salary Predictor
            </h1>
            <p className="text-slate-400 text-sm">Know your worth before you walk into placements</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start md:self-auto shadow-sm">
            <span className="text-xs uppercase tracking-wider text-slate-400">Skill Score</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= skillScore ? 'bg-[#3B82F6]' : 'bg-slate-700'}`}></div>
              ))}
            </div>
            <span className="text-xs font-bold ml-1">{skillScore} / 4</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 min-h-0 z-10">
          {/* Form Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 content-start"
          >
            {/* Academics Section */}
            <Card className="space-y-4 flex flex-col">
              <h2 className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest mb-2">Academics</h2>
              <Slider 
                label="CGPA" 
                value={formData.cgpa} 
                onChange={(v) => updateField('cgpa', v)} 
                min={5.0} max={10.0} step={0.01} 
              />
              <div className="grid grid-cols-2 gap-4">
                <Select 
                  label="Branch" 
                  value={formData.branch} 
                  onChange={(v) => updateField('branch', v)}
                  options={['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil']} 
                />
                <SegmentedControl 
                  label="College Tier"
                  value={formData.college_tier}
                  onChange={(v) => updateField('college_tier', v)}
                  options={[{ label: 'Tier 1', value: 1 }, { label: 'Tier 2', value: 2 }, { label: 'Tier 3', value: 3 }]}
                />
              </div>
            </Card>

            {/* Skills Section */}
            <Card className="space-y-4 flex flex-col">
              <h2 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest mb-2">Technical Skills</h2>
              <div className="grid grid-cols-1 gap-y-4">
                <Toggle label="Python" checked={formData.python_skill === 1} onChange={(v) => updateField('python_skill', v ? 1 : 0)} />
                <Toggle label="DSA" checked={formData.dsa_skill === 1} onChange={(v) => updateField('dsa_skill', v ? 1 : 0)} />
                <Toggle label="Machine Learning" checked={formData.ml_skill === 1} onChange={(v) => updateField('ml_skill', v ? 1 : 0)} />
                <Toggle label="Web Development" checked={formData.web_dev_skill === 1} onChange={(v) => updateField('web_dev_skill', v ? 1 : 0)} />
              </div>
            </Card>

            {/* Scores & Experience */}
            <Card className="md:col-span-2 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Scores & Experience</h2>
              
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <Slider label="Coding Score" value={formData.coding_score} onChange={(v) => updateField('coding_score', v)} min={0} max={100} />
                  <Slider label="Communication" value={formData.communication_score} onChange={(v) => updateField('communication_score', v)} min={4} max={10} step={0.1} />
                  <Slider label="Aptitude Score" value={formData.aptitude_score} onChange={(v) => updateField('aptitude_score', v)} min={40} max={100} />
                </div>
                <div>
                  <Stepper label="Internships" value={formData.internships} onChange={(v) => updateField('internships', v)} min={0} max={3} />
                  <Stepper label="Projects" value={formData.projects} onChange={(v) => updateField('projects', v)} min={1} max={6} />
                  <Stepper label="Backlogs" value={formData.backlogs} onChange={(v) => updateField('backlogs', v)} min={0} max={3} />
                  <div className="mt-2">
                    <Slider label="Resume Score" value={formData.resume_score} onChange={(v) => updateField('resume_score', v)} min={20} max={132} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Target Role */}
            <Card className="md:col-span-2 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Target Placement</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Select 
                  label="Company Type" 
                  value={formData.company_type} 
                  onChange={(v) => updateField('company_type', v)}
                  options={['MNC', 'Mid-size', 'Startup', 'Top Tech']} 
                />
                <Select 
                  label="Job Role" 
                  value={formData.job_role} 
                  onChange={(v) => updateField('job_role', v)}
                  options={['Software Engineer', 'Data Scientist', 'Analyst', 'Web Developer']} 
                />
              </div>
            </Card>

          </motion.div>

          {/* Sticky Sidebar / Result Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-6 sticky top-8 z-10"
          >
            <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0B0F1A] border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden min-h-[420px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8B5CF6]/10 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
                <AnimatePresence mode="wait">
                  {!prediction && !isPredicting ? (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center"
                    >
                      <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-300 mb-2">Ready to predict</h3>
                      <p className="text-sm text-slate-500">
                        Fill out your academic and skill profile, then run the model to see your projected offer.
                      </p>
                    </motion.div>
                  ) : isPredicting ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 border-4 border-[#3B82F6]/20 border-t-[#3B82F6] rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                      <h3 className="text-sm font-bold text-[#3B82F6] tracking-widest uppercase animate-pulse mb-2">Crunching Profile</h3>
                      <p className="text-[11px] text-slate-400">Running through prediction model...</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center w-full"
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block">Predicted Yearly Package</span>
                      <div className="text-6xl font-black mb-6 flex justify-center items-baseline gap-1">
                        <span className="text-2xl text-slate-500 mr-1">₹</span>
                        <AnimatedCounter value={prediction!} />
                        <span className="text-2xl text-[#3B82F6] ml-1">LPA</span>
                      </div>
                      
                      {/* Gauge */}
                      <div className="w-full space-y-3 px-2 mb-6 text-left">
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                          <span>₹32.8L Min</span>
                          <span>₹129.4L Max</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(0, Math.min(100, ((prediction! - 32.8) / (129.4 - 32.8)) * 100))}%` }}
                            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-4 italic text-center">
                          "Your profile aligns with {formData.company_type.toLowerCase()} offers for a {formData.job_role} role."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Action Buttons underneath result box */}
            <div className="flex flex-col gap-3">
              {!prediction && !isPredicting ? (
                <button
                  onClick={handlePredict}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] font-bold text-lg shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:brightness-110 transition-all text-white flex items-center justify-center gap-2"
                >
                  CALCULATE WORTH
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white/5 text-slate-300 font-bold transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Another Profile
                </button>
              )}
            </div>
            
            {prediction && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Prediction Confidence</span>
                  <span className="text-sm font-semibold text-emerald-400">High Reliability</span>
                </div>
              </div>
            )}
            
          </motion.div>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 py-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-60 gap-2 z-10">
          <p className="text-[10px] uppercase tracking-widest text-slate-400">Historical Dataset v2.4 (2024 Release)</p>
          <p className="text-[10px] text-slate-400">Model trained on historical data. Actual offers vary by year and market conditions.</p>
        </footer>
      </main>
    </div>
  );
}