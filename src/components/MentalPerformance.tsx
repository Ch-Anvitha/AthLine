import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Brain, 
  Heart, 
  Target, 
  Lightbulb,
  Users,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface MentalPerformanceProps {
  userProfile: any;
}

export function MentalPerformance({ userProfile }: MentalPerformanceProps) {
  const [mentalStats, setMentalStats] = useState({
    overall: 76,
    stress: 23,
    confidence: 84,
    focus: 78,
    resilience: 82,
    identity: 65
  });

  const [dailyCheckin, setDailyCheckin] = useState({
    mood: 7,
    energy: 8,
    motivation: 6,
    pressure: 4
  });

  const create3DBrainVisualization = () => {
    return (
      <div className="relative w-full h-80 flex items-center justify-center">
        <svg width="320" height="280" className="overflow-visible">
          {/* Brain Base */}
          <motion.ellipse
            cx="160"
            cy="140"
            rx="140"
            ry="100"
            fill="url(#brainGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Brain Lobes with Activity */}
          <motion.ellipse
            cx="120"
            cy="120"
            rx="50"
            ry="40"
            fill="url(#leftLobeGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.ellipse
            cx="200"
            cy="120"
            rx="50"
            ry="40"
            fill="url(#rightLobeGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          />
          
          {/* Neural Activity Pulses */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={100 + Math.cos(i * 0.785) * 80}
              cy={120 + Math.sin(i * 0.785) * 60}
              r="4"
              fill="#60a5fa"
              initial={{ r: 0, opacity: 0 }}
              animate={{ 
                r: [4, 8, 4],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                delay: i * 0.2,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Performance Indicators */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            {/* Focus Area */}
            <motion.circle
              cx="160"
              cy="100"
              r="15"
              fill={mentalStats.focus > 75 ? "#10b981" : mentalStats.focus > 50 ? "#f59e0b" : "#ef4444"}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="160" y="85" textAnchor="middle" className="text-xs fill-white font-medium">
              Focus: {mentalStats.focus}%
            </text>
            
            {/* Confidence Area */}
            <motion.circle
              cx="140"
              cy="160"
              r="12"
              fill={mentalStats.confidence > 75 ? "#10b981" : mentalStats.confidence > 50 ? "#f59e0b" : "#ef4444"}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <text x="140" y="185" textAnchor="middle" className="text-xs fill-white font-medium">
              Confidence: {mentalStats.confidence}%
            </text>
            
            {/* Resilience Area */}
            <motion.circle
              cx="180"
              cy="160"
              r="12"
              fill={mentalStats.resilience > 75 ? "#10b981" : mentalStats.resilience > 50 ? "#f59e0b" : "#ef4444"}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <text x="180" y="185" textAnchor="middle" className="text-xs fill-white font-medium">
              Resilience: {mentalStats.resilience}%
            </text>
          </motion.g>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="leftLobeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="rightLobeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 15, -15, 0] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </motion.div>
                  Mental Performance Hub
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Psychology tools, identity development, and mental wellness tracking
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {mentalStats.overall}%
                </div>
                <p className="text-purple-200 text-sm">Mental Wellness</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Brain className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Target className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="identity" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Users className="w-4 h-4 mr-2" />
            Identity
          </TabsTrigger>
          <TabsTrigger value="coaching" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Lightbulb className="w-4 h-4 mr-2" />
            Coaching
          </TabsTrigger>
          <TabsTrigger value="crisis" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Shield className="w-4 h-4 mr-2" />
            Crisis Detection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Check-in */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(dailyCheckin).map(([metric, value], index) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium capitalize">{metric}</h3>
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            value >= 7 ? 'bg-green-500' :
                            value >= 5 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-white font-bold text-sm">{value}</span>
                        </motion.div>
                      </div>
                      <Progress value={value * 10} className="h-2" />
                      <p className="text-gray-300 text-sm">
                        {value >= 7 ? 'Excellent' : value >= 5 ? 'Good' : 'Needs attention'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 3D Brain Visualization */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Mental Performance Analysis</CardTitle>
              <CardDescription className="text-gray-300">
                3D visualization of your cognitive and emotional states
              </CardDescription>
            </CardHeader>
            <CardContent>
              {create3DBrainVisualization()}
            </CardContent>
          </Card>

          {/* Mental Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Stress Level', value: mentalStats.stress, target: 'Below 30%', color: 'red', inverted: true },
              { title: 'Confidence', value: mentalStats.confidence, target: 'Above 80%', color: 'green' },
              { title: 'Identity Score', value: mentalStats.identity, target: 'Above 70%', color: 'purple' }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">{metric.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`${
                            (metric.inverted ? metric.value < 30 : metric.value > 75) ? 
                            'border-green-400 text-green-400' :
                            (metric.inverted ? metric.value < 50 : metric.value > 50) ?
                            'border-yellow-400 text-yellow-400' :
                            'border-red-400 text-red-400'
                          }`}
                        >
                          {(metric.inverted ? metric.value < 30 : metric.value > 75) ? 'Good' :
                           (metric.inverted ? metric.value < 50 : metric.value > 50) ? 'Fair' : 'Needs Work'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Current</span>
                          <span className="text-white">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-3" />
                        <p className="text-gray-300 text-sm">Target: {metric.target}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Performance Psychology Tools</CardTitle>
              <CardDescription className="text-gray-300">
                Techniques for handling pressure, media, and competition stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Pressure Management',
                    description: 'Techniques for high-pressure situations',
                    progress: 78,
                    sessions: 12,
                    icon: Target,
                    color: 'from-red-500 to-pink-500'
                  },
                  {
                    title: 'Media Training',
                    description: 'Confident communication with press',
                    progress: 65,
                    sessions: 8,
                    icon: Users,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Focus Enhancement',
                    description: 'Concentration and attention training',
                    progress: 82,
                    sessions: 15,
                    icon: Brain,
                    color: 'from-purple-500 to-indigo-500'
                  },
                  {
                    title: 'Visualization',
                    description: 'Mental rehearsal and imagery',
                    progress: 90,
                    sessions: 20,
                    icon: Lightbulb,
                    color: 'from-yellow-500 to-orange-500'
                  },
                  {
                    title: 'Resilience Building',
                    description: 'Bouncing back from setbacks',
                    progress: 75,
                    sessions: 10,
                    icon: Shield,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    title: 'Competition Mindset',
                    description: 'Peak performance psychology',
                    progress: 88,
                    sessions: 18,
                    icon: TrendingUp,
                    color: 'from-indigo-500 to-purple-500'
                  }
                ].map((tool, index) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <tool.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-white font-medium">{tool.title}</h3>
                              <p className="text-gray-300 text-sm">{tool.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Progress</span>
                              <span className="text-white">{tool.progress}%</span>
                            </div>
                            <Progress value={tool.progress} className="h-2" />
                            <p className="text-gray-300 text-sm">{tool.sessions} sessions completed</p>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-white/20 text-white hover:bg-white/10"
                          >
                            Continue Training
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="identity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Identity Development</CardTitle>
                <CardDescription className="text-purple-200">
                  Building self-worth beyond athletic performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Athletic Identity</span>
                      <span className="text-white">45%</span>
                    </div>
                    <Progress value={45} className="h-3" />
                    <p className="text-gray-300 text-xs mt-1">Healthy level</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Personal Identity</span>
                      <span className="text-white">72%</span>
                    </div>
                    <Progress value={72} className="h-3" />
                    <p className="text-gray-300 text-xs mt-1">Growing stronger</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Future Self Vision</span>
                      <span className="text-white">68%</span>
                    </div>
                    <Progress value={68} className="h-3" />
                    <p className="text-gray-300 text-xs mt-1">Well developed</p>
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Start Identity Workshop
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Personal Strengths</CardTitle>
                <CardDescription className="text-gray-300">
                  Transferable skills and qualities beyond sports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { strength: 'Leadership', level: 85 },
                    { strength: 'Teamwork', level: 92 },
                    { strength: 'Discipline', level: 88 },
                    { strength: 'Problem Solving', level: 74 },
                    { strength: 'Communication', level: 67 },
                    { strength: 'Adaptability', level: 79 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.strength}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-300">{item.strength}</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={item.level} className="w-20 h-2" />
                        <span className="text-white font-medium w-10">{item.level}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coaching" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Mental Coaching Sessions</CardTitle>
              <CardDescription className="text-gray-300">
                Personalized coaching for mental wellness and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: 'Today, 3:00 PM',
                    coach: 'Dr. Sarah Martinez',
                    topic: 'Pressure Management',
                    type: 'Video Call',
                    status: 'upcoming'
                  },
                  {
                    date: 'Dec 18, 10:00 AM',
                    coach: 'Dr. Mike Thompson',
                    topic: 'Identity Development',
                    type: 'In Person',
                    status: 'scheduled'
                  },
                  {
                    date: 'Dec 15, 2:00 PM',
                    coach: 'Dr. Sarah Martinez',
                    topic: 'Focus Training',
                    type: 'Video Call',
                    status: 'completed'
                  }
                ].map((session, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      session.status === 'upcoming' ? 'bg-blue-600/20 border-blue-400/40' :
                      session.status === 'scheduled' ? 'bg-yellow-600/20 border-yellow-400/40' :
                      'bg-green-600/20 border-green-400/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{session.topic}</h4>
                        <p className="text-gray-300 text-sm">{session.coach} • {session.type}</p>
                        <p className="text-gray-400 text-xs">{session.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${
                            session.status === 'upcoming' ? 'border-blue-400 text-blue-400' :
                            session.status === 'scheduled' ? 'border-yellow-400 text-yellow-400' :
                            'border-green-400 text-green-400'
                          }`}
                        >
                          {session.status}
                        </Badge>
                        {session.status === 'upcoming' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Join Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crisis" className="space-y-6">
          <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-white/20 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                Crisis Detection System
              </CardTitle>
              <CardDescription className="text-orange-200">
                AI monitors communication patterns for depression/anxiety signs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-600/20 border border-green-400/40 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <h4 className="text-white font-medium">All Systems Normal</h4>
                      <p className="text-green-200 text-sm">No crisis indicators detected</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-400 rounded-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { indicator: 'Communication Tone', status: 'normal', value: 8.2 },
                    { indicator: 'Social Engagement', status: 'normal', value: 7.8 },
                    { indicator: 'Sleep Patterns', status: 'attention', value: 6.1 }
                  ].map((item, index) => (
                    <div key={item.indicator} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white text-sm font-medium">{item.indicator}</h4>
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'normal' ? 'bg-green-400' :
                          item.status === 'attention' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`} />
                      </div>
                      <p className="text-2xl font-bold text-white">{item.value}/10</p>
                      <p className="text-gray-300 text-xs capitalize">{item.status}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-600/20 border border-blue-400/40 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Emergency Support Available 24/7</h4>
                  <p className="text-blue-200 text-sm mb-4">
                    Licensed professionals ready to help within minutes if crisis indicators are detected
                  </p>
                  <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
                    Contact Support Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}