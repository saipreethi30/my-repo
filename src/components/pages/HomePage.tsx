// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMember, BaseCrudService } from '@/integrations';
import { Students } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Bed, 
  Utensils, 
  CreditCard, 
  Wifi, 
  Users, 
  Home, 
  Building2, 
  User, 
  Activity, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types & Interfaces ---
interface FeatureCard {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color: string;
  delay: number;
}

// --- Components ---

const TechSeparator = () => (
  <div className="w-full flex items-center justify-center gap-4 opacity-30 my-8">
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    <div className="w-2 h-2 rotate-45 border border-primary" />
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
);

const CornerBrackets = ({ className = "" }: { className?: string }) => (
  <>
    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/60 rounded-tl-sm ${className}`} />
    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/60 rounded-tr-sm ${className}`} />
    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/60 rounded-bl-sm ${className}`} />
    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/60 rounded-br-sm ${className}`} />
  </>
);

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Sources ---
  const { member, isAuthenticated } = useMember();
  const [student, setStudent] = useState<Students | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll hooks for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // --- Data Fetching Logic (Preserved) ---
  useEffect(() => {
    loadStudentData();
  }, [member]);

  const loadStudentData = async () => {
    if (!isAuthenticated || !member?.loginEmail) {
      setIsLoading(false);
      return;
    }

    try {
      const { items } = await BaseCrudService.getAll<Students>('students');
      // Find student by matching email or name
      const studentData = items.find(s => 
        s.studentName?.toLowerCase().includes(member.profile?.nickname?.toLowerCase() || '') ||
        s.studentName?.toLowerCase().includes(member.contact?.firstName?.toLowerCase() || '')
      ) || items[0]; // Fallback to first student for demo
      
      setStudent(studentData || null);
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Static Data (Preserved & Enhanced) ---
  const featureCards: FeatureCard[] = [
    {
      icon: Bed,
      title: 'Room Details',
      description: 'Occupancy & Status',
      link: '/rooms',
      color: 'text-accent-teal',
      delay: 0.1,
    },
    {
      icon: Utensils,
      title: 'Food Menu',
      description: 'Daily Nutrition Plan',
      link: '/food-menu',
      color: 'text-secondary',
      delay: 0.2,
    },
    {
      icon: CreditCard,
      title: 'Fee Records',
      description: 'Transaction History',
      link: '/fee-records',
      color: 'text-primary',
      delay: 0.3,
    },
    {
      icon: Wifi,
      title: 'Facilities',
      description: 'Network & Amenities',
      link: '/hostels',
      color: 'text-accent-purple',
      delay: 0.4,
    },
    {
      icon: Users,
      title: 'Parent Access',
      description: 'Guardian Portal',
      link: '/parent-dashboard',
      color: 'text-accent-teal',
      delay: 0.5,
    },
    {
      icon: Building2,
      title: 'Find Hostels',
      description: 'Vacancy Search',
      link: '/hostels',
      color: 'text-primary',
      delay: 0.6,
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip selection:bg-primary/30 font-paragraph">
      <div className="w-full">
        <div ref={containerRef} className="w-full">
          <Header />

          {/* --- Ambient Background Layer --- */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2C2C44_1px,transparent_1px),linear-gradient(to_bottom,#2C2C44_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            <motion.div 
              style={{ y: yBackground }}
              className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" 
            />
            <motion.div 
              style={{ y: yBackground }}
              className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-accent-purple/10 rounded-full blur-[120px] mix-blend-screen" 
            />
          </div>

          <main className="relative z-10 w-full pt-24 pb-20">
          
          {/* --- Hero Section: The Digital HUD --- */}
          <section className="w-full max-w-[120rem] mx-auto px-4 md:px-8 mb-24">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[60vh]">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            ) : isAuthenticated && student ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Identity Module */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-5 xl:col-span-4 sticky top-32"
              >
                <div className="relative group">
                  {/* Holographic Card Container */}
                  <div className="relative bg-monospaced-background/60 backdrop-blur-2xl border border-primary/30 rounded-3xl overflow-hidden p-1 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
                    
                    {/* Decorative Scanner Line */}
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl">
                      <div className="w-full h-[2px] bg-primary/50 shadow-[0_0_15px_#00FFFF] animate-[scan_4s_ease-in-out_infinite]" />
                    </div>

                    <div className="bg-background/40 rounded-[20px] p-6 md:p-8 relative overflow-hidden">
                      <CornerBrackets />
                      
                      {/* Header Status */}
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse" />
                          <span className="text-xs font-mono text-accent-teal tracking-widest">SYSTEM ONLINE</span>
                        </div>
                        <Cpu className="w-5 h-5 text-primary/50" />
                      </div>

                      {/* Profile Image Area */}
                      <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-8 group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="absolute inset-0 rounded-full border border-primary/30 border-dashed animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-2 rounded-full border border-accent-purple/30 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
                        
                        <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,255,0.2)] bg-monospaced-background z-10">
                          {student.profilePhoto ? (
                            <Image
                              src={student.profilePhoto}
                              alt={student.studentName || 'Student'}
                              width={400}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-monospaced-background">
                              <User className="w-24 h-24 text-primary/50" />
                            </div>
                          )}
                        </div>
                        
                        {/* Floating Badge */}
                        <div className="absolute bottom-4 right-4 z-20 bg-background/90 backdrop-blur border border-accent-teal/50 px-4 py-1 rounded-full shadow-lg">
                          <span className="text-xs font-bold text-accent-teal font-mono">ID: {student._id.slice(0, 6).toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Identity Data */}
                      <div className="text-center space-y-2 mb-6">
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">
                          {student.studentName}
                        </h1>
                        <p className="text-primary/80 font-mono text-sm tracking-widest uppercase">
                          {student.collegeName || 'Unassigned Institute'}
                        </p>
                      </div>

                      {/* Quick Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg text-center">
                          <span className="block text-[10px] text-primary/60 uppercase tracking-wider mb-1">Room Unit</span>
                          <span className="block text-xl font-mono font-bold text-white">{student.roomNumber || '---'}</span>
                        </div>
                        <div className="bg-accent-purple/5 border border-accent-purple/10 p-3 rounded-lg text-center">
                          <span className="block text-[10px] text-accent-purple/60 uppercase tracking-wider mb-1">Year Level</span>
                          <span className="block text-xl font-mono font-bold text-white">{student.yearOfStudy ? `0${student.yearOfStudy}` : '--'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Command Center */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                
                {/* Welcome Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary p-8"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Activity className="w-24 h-24 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                    Welcome back, <span className="text-primary">{student.studentName?.split(' ')[0]}</span>
                  </h2>
                  <p className="text-foreground/70 max-w-xl">
                    Hostel management systems are fully operational. Your current residence status is active. Check your dashboard below for real-time updates.
                  </p>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {featureCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: card.delay, duration: 0.4 }}
                    >
                      <Link to={card.link} className="block h-full">
                        <div className="group relative h-full bg-monospaced-background/40 backdrop-blur-md border border-white/5 hover:border-primary/40 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:-translate-y-1 overflow-hidden">
                          
                          {/* Hover Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                              <div className={`p-3 rounded-lg bg-white/5 ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon className="w-6 h-6" />
                              </div>
                              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
                            </div>
                            
                            <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                              {card.title}
                            </h3>
                            <p className="text-sm text-foreground/50 font-mono">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* System Status Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
                >
                  {[
                    { label: 'WIFI STATUS', value: 'OPTIMAL', icon: Wifi, color: 'text-accent-teal' },
                    { label: 'SECURITY', value: 'ARMED', icon: ShieldCheck, color: 'text-primary' },
                    { label: 'POWER', value: 'STABLE', icon: Zap, color: 'text-secondary' },
                    { label: 'SERVER', value: 'ONLINE', icon: Activity, color: 'text-accent-purple' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-monospaced-background/30 border border-white/5 rounded-lg p-4 flex items-center gap-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <div>
                        <div className="text-[10px] text-foreground/40 font-mono tracking-wider">{stat.label}</div>
                        <div className={`text-sm font-bold ${stat.color} tracking-wide`}>{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

              </div>
            </div>
          ) : (
            // Guest View
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none"
              />
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-heading text-6xl md:text-8xl font-bold bg-gradient-to-b from-white via-primary/80 to-transparent bg-clip-text text-transparent mb-6 relative z-10"
              >
                DIGITAL NEXUS
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-paragraph text-xl text-foreground/60 max-w-2xl mb-12 relative z-10"
              >
                Advanced hostel management infrastructure. Please authenticate to access your personal command center.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative z-10"
              >
                <Link to="/hostels">
                  <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none">
                    <div className="absolute inset-0 w-full h-full bg-primary/10 border border-primary/50 skew-x-[-12deg] group-hover:bg-primary/20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_#00FFFF]" />
                    <span className="relative font-mono font-bold text-primary tracking-widest group-hover:text-white transition-colors">
                      EXPLORE FACILITIES
                    </span>
                  </button>
                </Link>
              </motion.div>
            </div>
          )}
        </section>

        <TechSeparator />

        {/* --- Secondary Section: Visual Narrative --- */}
        <section className="w-full max-w-[120rem] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group"
            >
              <Image 
                src="https://static.wixstatic.com/media/9646ff_4437dff492c64252930ce0f218cc6a56~mv2.png?originWidth=576&originHeight=384" 
                alt="Hostel Interior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-heading text-2xl text-white mb-2">Premium Living Spaces</h3>
                <p className="text-foreground/70 mb-4">Experience the future of student accommodation.</p>
                <Link to="/hostels" className="text-primary font-mono text-sm hover:underline">VIEW VACANCIES &rarr;</Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  Intelligent <span className="text-accent-purple">Monitoring</span>
                </h2>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  Our integrated systems provide real-time updates on fee status, meal plans, and facility availability. Parents can access a dedicated secure portal for peace of mind.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/parent-dashboard" className="block">
                  <div className="p-4 border border-accent-teal/30 bg-accent-teal/5 rounded-lg hover:bg-accent-teal/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="text-accent-teal" />
                      <span className="font-bold text-white">Parent Portal</span>
                    </div>
                    <p className="text-xs text-foreground/50">Secure payment gateway & monitoring</p>
                  </div>
                </Link>
                <Link to="/food-menu" className="block">
                  <div className="p-4 border border-secondary/30 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Utensils className="text-secondary" />
                      <span className="font-bold text-white">Smart Dining</span>
                    </div>
                    <p className="text-xs text-foreground/50">View daily nutritional breakdown</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Mobile Navigation Dock (Visual Only) --- */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md md:hidden">
          <div className="bg-monospaced-background/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex justify-between items-center">
            <Link to="/" className="flex flex-col items-center gap-1 text-primary">
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-mono">HOME</span>
            </Link>
            <Link to="/hostels" className="flex flex-col items-center gap-1 text-foreground/60 hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
              <span className="text-[10px] font-mono">HOSTELS</span>
            </Link>
            <Link to="/fee-records" className="flex flex-col items-center gap-1 text-foreground/60 hover:text-white transition-colors">
              <CreditCard className="w-5 h-5" />
              <span className="text-[10px] font-mono">PAY</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center gap-1 text-foreground/60 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-mono">ID</span>
            </Link>
          </div>
        </div>

          </main>
          <Footer />
          
          {/* Global Styles for Custom Animations */}
          <style>{`
            @keyframes scan {
              0%, 100% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}