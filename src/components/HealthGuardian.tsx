import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Activity, 
  Heart, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Camera,
  Zap,
  BarChart3
} from 'lucide-react';

interface HealthGuardianProps {
  userProfile: any;
}

export function HealthGuardian({ userProfile }: HealthGuardianProps) {
  const [realTimeData, setRealTimeData] = useState({
    heartRate: 72,
    movement: 85,
    recovery: 78,
    stress: 23
  });

  const [injuryRisk, setInjuryRisk] = useState({
    overall: 23,
    knee: 15,
    shoulder: 35,
    ankle: 20,
    back: 28
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        heartRate: prev.heartRate + (Math.random() - 0.5) * 4,
        movement: Math.max(60, Math.min(100, prev.movement + (Math.random() - 0.5) * 10)),
        recovery: Math.max(50, Math.min(100, prev.recovery + (Math.random() - 0.5) * 5)),
        stress: Math.max(10, Math.min(80, prev.stress + (Math.random() - 0.5) * 8))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const create3DBodyVisualization = () => {
    return (
      <div className="relative w-full h-96 flex items-center justify-center">
        {/* 3D Body Silhouette */}
        <motion.div
          className="relative w-32 h-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Head */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"
            animate={{ 
              boxShadow: ['0 0 10px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 10px rgba(59, 130, 246, 0.5)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Torso */}
          <motion.div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 w-16 h-32 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg"
            animate={{ 
              boxShadow: ['0 0 15px rgba(59, 130, 246, 0.3)', '0 0 25px rgba(59, 130, 246, 0.6)', '0 0 15px rgba(59, 130, 246, 0.3)']
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          
          {/* Arms */}
          <motion.div
            className="absolute top-12 -left-4 w-8 h-20 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg origin-top"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-12 -right-4 w-8 h-20 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg origin-top"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Legs */}
          <motion.div
            className="absolute top-40 left-2 w-6 h-24 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg"
            animate={{ 
              boxShadow: injuryRisk.knee > 30 ? 
                ['0 0 10px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 10px rgba(239, 68, 68, 0.5)'] :
                ['0 0 10px rgba(34, 197, 94, 0.5)', '0 0 15px rgba(34, 197, 94, 0.7)', '0 0 10px rgba(34, 197, 94, 0.5)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-2 w-6 h-24 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg"
            animate={{ 
              boxShadow: injuryRisk.knee > 30 ? 
                ['0 0 10px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 10px rgba(239, 68, 68, 0.5)'] :
                ['0 0 10px rgba(34, 197, 94, 0.5)', '0 0 15px rgba(34, 197, 94, 0.7)', '0 0 10px rgba(34, 197, 94, 0.5)']
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Risk Indicators */}
        {Object.entries(injuryRisk).filter(([key]) => key !== 'overall').map(([bodyPart, risk], index) => (
          <motion.div
            key={bodyPart}
            className={`absolute ${
              bodyPart === 'knee' ? 'bottom-16 left-1/2 transform -translate-x-1/2' :
              bodyPart === 'shoulder' ? 'top-16 right-8' :
              bodyPart === 'ankle' ? 'bottom-4 left-1/2 transform -translate-x-1/2' :
              'top-24 left-8'
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`w-4 h-4 rounded-full ${
              risk > 30 ? 'bg-red-500' : risk > 20 ? 'bg-yellow-500' : 'bg-green-500'
            } animate-pulse`} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded">
              {bodyPart}: {risk}%
            </div>
          </motion.div>
        ))}
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
        <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 360] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </motion.div>
                  Health Guardian
                </CardTitle>
                <CardDescription className="text-green-200">
                  AI-powered injury prevention and recovery optimization
                </CardDescription>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  injuryRisk.overall < 30 ? 'border-green-400 text-green-400' :
                  injuryRisk.overall < 60 ? 'border-yellow-400 text-yellow-400' :
                  'border-red-400 text-red-400'
                }`}
              >
                {injuryRisk.overall < 30 ? 'Low Risk' : injuryRisk.overall < 60 ? 'Medium Risk' : 'High Risk'}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <Tabs defaultValue="monitoring" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2">
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Activity className="w-4 h-4 mr-2" />
            Real-time
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <BarChart3 className="w-4 h-4 mr-2" />
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="prevention" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Shield className="w-4 h-4 mr-2" />
            Prevention
          </TabsTrigger>
          <TabsTrigger value="recovery" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Heart className="w-4 h-4 mr-2" />
            Recovery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(realTimeData).map(([metric, value], index) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${
                          metric === 'heartRate' ? 'from-red-500 to-pink-500' :
                          metric === 'movement' ? 'from-blue-500 to-cyan-500' :
                          metric === 'recovery' ? 'from-green-500 to-emerald-500' :
                          'from-purple-500 to-indigo-500'
                        } rounded-xl flex items-center justify-center`}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: metric === 'heartRate' ? [0, 10, -10, 0] : 0
                        }}
                        transition={{ 
                          duration: metric === 'heartRate' ? 1 : 2, 
                          repeat: Infinity 
                        }}
                      >
                        {metric === 'heartRate' && <Heart className="w-6 h-6 text-white" />}
                        {metric === 'movement' && <Activity className="w-6 h-6 text-white" />}
                        {metric === 'recovery' && <TrendingUp className="w-6 h-6 text-white" />}
                        {metric === 'stress' && <Zap className="w-6 h-6 text-white" />}
                      </motion.div>
                      <motion.span 
                        className="text-2xl font-bold text-white"
                        key={value}
                        initial={{ scale: 1.2, color: '#60a5fa' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        transition={{ duration: 0.3 }}
                      >
                        {Math.round(value)}{metric === 'heartRate' ? ' BPM' : '%'}
                      </motion.span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300 capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <Progress 
                        value={metric === 'heartRate' ? (value / 100) * 100 : value} 
                        className="flex-1 h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Live Status */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-green-600/20 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-green-400 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">Wearable Sensors Connected</h3>
                    <p className="text-gray-300 text-sm">Real-time biomechanics monitoring active</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Video Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* 3D Body Visualization */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">3D Injury Risk Assessment</CardTitle>
              <CardDescription className="text-gray-300">
                AI-powered biomechanical analysis and risk prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              {create3DBodyVisualization()}
            </CardContent>
          </Card>

          {/* Risk Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Risk Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(injuryRisk).filter(([key]) => key !== 'overall').map(([bodyPart, risk]) => (
                  <div key={bodyPart} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{bodyPart}</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={risk} className="w-24 h-2" />
                      <span className="text-white font-medium w-12">{risk}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Increase shoulder mobility work</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Monitor training load this week</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Continue current recovery protocol</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Training Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">AI-recommended adjustments to prevent overuse injuries</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Training Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Nutrition Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Personalized nutrition for injury prevention and recovery</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Meal Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Sleep Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Recovery-focused sleep recommendations and tracking</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Sleep Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Personalized Recovery Programs</CardTitle>
              <CardDescription className="text-gray-300">
                Rehabilitation and prevention protocols tailored to your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Today's Recovery Plan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Ice Bath (15 min)</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Shoulder Mobility (20 min)</span>
                      <div className="w-5 h-5 border-2 border-gray-400 rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Compression Therapy (30 min)</span>
                      <div className="w-5 h-5 border-2 border-gray-400 rounded" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Recovery Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Overall Recovery</span>
                        <span className="text-white">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Sleep Quality</span>
                        <span className="text-white">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">HRV Score</span>
                        <span className="text-white">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}