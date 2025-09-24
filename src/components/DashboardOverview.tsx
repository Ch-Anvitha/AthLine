import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';

interface DashboardOverviewProps {
  features: any[];
  userProfile: any;
  onFeatureSelect: (featureId: string) => void;
}

export function DashboardOverview({ features, userProfile, onFeatureSelect }: DashboardOverviewProps) {
  const stats = [
    { 
      label: 'Injury Risk', 
      value: 23, 
      status: 'OPTIMIZED', 
      color: 'green',
      action: () => onFeatureSelect('health'),
      description: 'AI-powered risk assessment active'
    },
    { 
      label: 'Financial Health', 
      value: 87, 
      status: 'EXCELLENT', 
      color: 'blue',
      action: () => onFeatureSelect('financial'),
      description: 'Portfolio performing above target'
    },
    { 
      label: 'Mental Wellness', 
      value: 76, 
      status: 'STRONG', 
      color: 'purple',
      action: () => onFeatureSelect('mental'),
      description: 'Peak performance psychology engaged'
    },
    { 
      label: 'Transition Readiness', 
      value: 45, 
      status: 'DEVELOPING', 
      color: 'orange',
      action: () => onFeatureSelect('transition'),
      description: 'Career evolution pathway active'
    }
  ];

  const handleEmergencyContact = () => {
    alert('Emergency support activated. A crisis specialist will contact you within 2 minutes.');
  };

  const handleSystemCheck = () => {
    alert('Running comprehensive system diagnostics... All systems operational. Performance optimized.');
  };

  return (
    <div className="space-y-8">
      {/* Professional Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10" />
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-black text-white mb-2">
                  Welcome back, {userProfile.name}
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Your elite performance command center
                </CardDescription>
              </div>
              <motion.div
                className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.05, 1] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Shield className="w-8 h-8 text-black" />
              </motion.div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats Grid with 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              z: 50
            }}
            className="transform-gpu"
          >
            <Card 
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 shadow-xl cursor-pointer"
              onClick={stat.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                    {stat.status === 'OPTIMIZED' && <Shield className="w-6 h-6 text-black" />}
                    {stat.status === 'EXCELLENT' && <TrendingUp className="w-6 h-6 text-black" />}
                    {stat.status === 'STRONG' && <CheckCircle className="w-6 h-6 text-black" />}
                    {stat.status === 'DEVELOPING' && <Clock className="w-6 h-6 text-black" />}
                  </div>
                  <Badge 
                    variant="outline" 
                    className="border-white/30 text-white bg-white/10 font-bold text-xs"
                  >
                    {stat.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-white/70 font-medium">{stat.label}</p>
                    <p className="text-xs text-white/50">{stat.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress 
                      value={stat.value} 
                      className="flex-1 h-3"
                    />
                    <span className="text-xl font-black text-white">{stat.value}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feature Cards Grid with 3D Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              rotateX: 2,
              rotateY: 2,
              z: 10
            }}
            className="transform-gpu perspective-1000"
          >
            <Card 
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group shadow-xl"
              onClick={() => onFeatureSelect(feature.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover:from-white/10 group-hover:to-white/15 transition-all" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ 
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-6 h-6 text-black" />
                  </motion.div>
                  <Badge 
                    variant="outline" 
                    className="border-white/30 text-white bg-white/10 font-medium"
                  >
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-white mb-2 font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-white/70">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <Button 
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold shadow-lg"
                >
                  <span>Access {feature.title}</span>
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Eye className="w-4 h-4" />
                  </motion.div>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Real-time Status Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-white font-bold">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-green-400 rounded-full mr-3 shadow-lg"
                  />
                  SYSTEM STATUS: ALL SYSTEMS OPERATIONAL
                </CardTitle>
                <CardDescription className="text-white/70 font-medium mt-2">
                  Crisis monitoring active • Financial tracking enabled • Health sensors connected • AI systems online
                </CardDescription>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSystemCheck}
                  className="border-white/20 text-white hover:bg-white/10 font-medium"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  System Check
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmergencyContact}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 font-medium"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Emergency
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}