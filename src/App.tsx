import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { SmartOnboarding } from './components/SmartOnboarding';
import { HealthGuardian } from './components/HealthGuardian';
import { FinancialFortress } from './components/FinancialFortress';
import { MentalPerformance } from './components/MentalPerformance';
import { TransitionCenter } from './components/TransitionCenter';
import { CrisisMonitoring } from './components/CrisisMonitoring';
import { DashboardOverview } from './components/DashboardOverview';
import { 
  Activity, 
  Shield, 
  DollarSign, 
  Brain, 
  ArrowRight, 
  AlertTriangle,
  Home,
  User,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { supabase } from './utils/supabase/client';
import athlineLogo from 'figma:asset/763c8fbb717d0fcfb04a4df0e51c329c48e187e4.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: 'Elite Athlete',
    sport: 'Professional',
    position: 'Performer',
    careerStage: 'Active',
    riskLevel: 'Optimized'
  });



  // Check for existing session on app load
  useEffect(() => {
    // Apply dark theme class to document
    document.documentElement.classList.add('dark');
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Load user profile data
          if (session.user.user_metadata) {
            setUserProfile({
              name: session.user.user_metadata.fullName || 'Elite Athlete',
              sport: session.user.user_metadata.sport || 'Professional',
              position: session.user.user_metadata.position || 'Performer',
              careerStage: session.user.user_metadata.experience || 'Active',
              riskLevel: 'Optimized'
            });
          }
        } else {
          setAuthMode('login');
        }
      } catch (error) {
        console.error('Session check error:', error);
        setAuthMode('login');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setAuthMode(null);
      } else {
        setUser(null);
        setAuthMode('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setAuthMode(null);
  };

  const handleSignUp = (userData: any) => {
    setUser(userData);
    setAuthMode(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAuthMode('login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-32 h-32 bg-slate-800/50 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl border-4 border-blue-500/30"
            animate={{ 
              scale: [1, 1.05, 1],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <img 
              src={athlineLogo} 
              alt="ATHLINE" 
              className="w-24 h-24 object-contain"
            />
          </motion.div>
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight bg-gradient-to-r from-blue-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            ATHLINE
          </h1>
          <p className="text-blue-300/80">Loading your elite experience...</p>
        </motion.div>
      </div>
    );
  }

  // Show auth pages if not authenticated
  if (!user) {
    if (authMode === 'signup') {
      return (
        <SignUpPage 
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
    return (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToSignUp={() => setAuthMode('signup')}
      />
    );
  }

  const mainFeatures = [
    {
      id: 'onboarding',
      title: 'Smart Onboarding',
      description: 'AI-powered profile building and risk assessment',
      icon: User,
      color: 'from-blue-600 to-blue-800',
      status: 'Complete'
    },
    {
      id: 'health',
      title: 'Health Guardian',
      description: 'Injury prevention and recovery optimization',
      icon: Activity,
      color: 'from-orange-500 to-orange-700',
      status: 'Active'
    },
    {
      id: 'financial',
      title: 'Financial Fortress',
      description: 'Smart savings and investment management',
      icon: DollarSign,
      color: 'from-yellow-500 to-amber-600',
      status: 'Active'
    },
    {
      id: 'mental',
      title: 'Mental Performance',
      description: 'Psychology tools and identity development',
      icon: Brain,
      color: 'from-blue-700 to-indigo-800',
      status: 'Active'
    },
    {
      id: 'transition',
      title: 'Transition Center',
      description: 'Career pivot planning and skill development',
      icon: ArrowRight,
      color: 'from-orange-600 to-red-600',
      status: 'Planning'
    },
    {
      id: 'crisis',
      title: 'Crisis Monitoring',
      description: '24/7 real-time risk detection and intervention',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-500',
      status: 'Monitoring'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Professional Header */}
      <motion.header 
        className="relative bg-slate-800/95 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 bg-slate-800/50 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-xl border-2 border-blue-500/20"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  scale: 1.1,
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={athlineLogo} 
                  alt="ATHLINE" 
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight bg-gradient-to-r from-blue-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  ATHLINE
                </h1>
                <p className="text-sm text-blue-300/80 font-semibold">Elite Performance Platform</p>
              </div>
            </motion.div>
            
            {/* User Section */}
            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Bell className="w-5 h-5" />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Button>
              </motion.div>

              {/* Status Badge */}
              <Badge 
                variant="outline" 
                className="border-blue-400/40 text-blue-300 bg-blue-600/20 font-medium px-3 py-1"
              >
                {userProfile.careerStage}
              </Badge>
              
              {/* User Info */}
              <div className="text-right">
                <p className="font-semibold text-white">{userProfile.name}</p>
                <p className="text-sm text-white/60">{userProfile.sport} • {userProfile.position}</p>
              </div>
              
              {/* Logout Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-orange-500/40 text-orange-300 hover:bg-orange-600/30 hover:border-orange-400 font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Professional Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-7 bg-slate-800/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-2 shadow-2xl">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-orange-500 data-[state=active]:text-white text-blue-200/80 hover:text-blue-100 rounded-xl transition-all duration-300 font-medium"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              {mainFeatures.map((feature) => (
                <TabsTrigger 
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-orange-500 data-[state=active]:text-white text-blue-200/80 hover:text-blue-100 rounded-xl transition-all duration-300 font-medium"
                >
                  <feature.icon className="w-4 h-4 mr-2" />
                  {feature.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Contents */}
          <div className="mt-6">
            <TabsContent value="dashboard">
              <DashboardOverview 
                features={mainFeatures} 
                userProfile={userProfile}
                onFeatureSelect={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="onboarding">
              <SmartOnboarding 
                userProfile={userProfile}
                onProfileUpdate={setUserProfile}
              />
            </TabsContent>

            <TabsContent value="health">
              <HealthGuardian userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="financial">
              <FinancialFortress userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="mental">
              <MentalPerformance userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="transition">
              <TransitionCenter userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="crisis">
              <CrisisMonitoring userProfile={userProfile} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Professional Footer */}
      <motion.footer 
        className="relative bg-slate-800/95 backdrop-blur-xl border-t border-blue-500/20 shadow-2xl mt-16"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Section */}
            <motion.div 
              className="col-span-1 md:col-span-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div 
                  className="w-20 h-20 bg-slate-800/50 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-blue-500/20"
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.1,
                    boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={athlineLogo} 
                    alt="ATHLINE" 
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-blue-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                    ATHLINE
                  </h3>
                  <p className="text-sm text-blue-300/80 font-semibold">Elite Performance Platform</p>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed max-w-md">
                Comprehensive athlete lifecycle management platform supporting professional athletes from first contract through retirement and beyond.
              </p>
            </motion.div>

            {/* Platform Features */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Platform</h4>
              <ul className="space-y-2 text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">Smart Onboarding</li>
                <li className="hover:text-white transition-colors cursor-pointer">Health Guardian</li>
                <li className="hover:text-white transition-colors cursor-pointer">Financial Fortress</li>
                <li className="hover:text-white transition-colors cursor-pointer">Mental Performance</li>
                <li className="hover:text-white transition-colors cursor-pointer">Transition Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Crisis Monitoring</li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Support</h4>
              <ul className="space-y-2 text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">24/7 Crisis Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">Performance Analytics</li>
                <li className="hover:text-white transition-colors cursor-pointer">Career Guidance</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Support</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Badge 
                variant="outline" 
                className="border-blue-400/40 text-blue-300 bg-blue-600/20 font-medium"
              >
                Trusted by Elite Athletes
              </Badge>
              <Badge 
                variant="outline" 
                className="border-orange-500/40 text-orange-300 bg-orange-600/20 font-medium"
              >
                Platform Status: Active
              </Badge>
            </div>
            <p className="text-white/40 text-sm">
              © 2024 ATHLINE. All rights reserved. • Powering athletic excellence worldwide.
            </p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Professional Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full" 
             style={{
               backgroundImage: 'linear-gradient(rgb(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgb(59, 130, 246, 0.2) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }} 
        />
      </div>
    </div>
  );
}