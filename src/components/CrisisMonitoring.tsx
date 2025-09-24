import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  Phone, 
  MessageCircle,
  Heart,
  DollarSign,
  Scale,
  Brain,
  Activity,
  CheckCircle,
  Clock,
  Users,
  Zap
} from 'lucide-react';

interface CrisisMonitoringProps {
  userProfile: any;
}

export function CrisisMonitoring({ userProfile }: CrisisMonitoringProps) {
  const [systemStatus, setSystemStatus] = useState('operational');
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [riskMetrics, setRiskMetrics] = useState({
    financial: { level: 15, trend: 'stable', lastCheck: '2 min ago' },
    health: { level: 12, trend: 'improving', lastCheck: '1 min ago' },
    mental: { level: 23, trend: 'stable', lastCheck: '30 sec ago' },
    legal: { level: 5, trend: 'stable', lastCheck: '5 min ago' }
  });

  const [responseTeam, setResponseTeam] = useState([
    {
      name: 'Dr. Sarah Martinez',
      role: 'Crisis Psychologist',
      specialty: 'Mental Health',
      available: true,
      responseTime: '< 5 min'
    },
    {
      name: 'Robert Chen',
      role: 'Financial Advisor',
      specialty: 'Financial Crisis',
      available: true,
      responseTime: '< 10 min'
    },
    {
      name: 'Attorney Johnson',
      role: 'Legal Counsel',
      specialty: 'Legal Issues',
      available: true,
      responseTime: '< 15 min'
    },
    {
      name: 'Dr. Wilson',
      role: 'Sports Medicine',
      specialty: 'Health Crisis',
      available: false,
      responseTime: '< 30 min'
    }
  ]);

  // Simulate real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskMetrics(prev => ({
        ...prev,
        mental: {
          ...prev.mental,
          level: Math.max(5, Math.min(50, prev.mental.level + (Math.random() - 0.5) * 6)),
          lastCheck: 'just now'
        },
        financial: {
          ...prev.financial,
          level: Math.max(5, Math.min(40, prev.financial.level + (Math.random() - 0.5) * 4)),
          lastCheck: 'just now'
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const create3DMonitoringDisplay = () => {
    return (
      <div className="relative w-full h-80 flex items-center justify-center">
        <svg width="400" height="320" className="overflow-visible">
          {/* Central Monitoring Hub */}
          <motion.circle
            cx="200"
            cy="160"
            r="60"
            fill="url(#hubGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Monitoring Rings */}
          <motion.circle
            cx="200"
            cy="160"
            r="80"
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="200"
            cy="160"
            r="100"
            fill="none"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="2"
            strokeDasharray="3,3"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Risk Indicators */}
          {Object.entries(riskMetrics).map(([type, data], index) => {
            const angle = (index * 90) * (Math.PI / 180);
            const x = 200 + Math.cos(angle) * 120;
            const y = 160 + Math.sin(angle) * 120;
            const iconColor = data.level < 20 ? '#10b981' : data.level < 40 ? '#f59e0b' : '#ef4444';
            
            return (
              <g key={type}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="25"
                  fill={iconColor}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: 1 
                  }}
                  transition={{ 
                    delay: index * 0.3,
                    duration: 2,
                    repeat: Infinity 
                  }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill="white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.3 + 0.2 }}
                />
                
                {/* Risk Level Indicator */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill="none"
                  stroke={iconColor}
                  strokeWidth="3"
                  strokeDasharray={`${data.level * 0.94} 94.2`}
                  initial={{ strokeDasharray: "0 94.2" }}
                  animate={{ strokeDasharray: `${data.level * 0.94} 94.2` }}
                  transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
                  transform={`rotate(-90 ${x} ${y})`}
                />
                
                {/* Type Label */}
                <motion.text
                  x={x}
                  y={y - 40}
                  textAnchor="middle"
                  className="text-xs font-medium fill-white capitalize"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 + 0.7 }}
                >
                  {type}
                </motion.text>
                
                {/* Risk Level */}
                <motion.text
                  x={x}
                  y={y + 50}
                  textAnchor="middle"
                  className="text-xs fill-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 + 0.9 }}
                >
                  {data.level}%
                </motion.text>
                
                {/* Connection Line */}
                <motion.line
                  x1="200"
                  y1="160"
                  x2={x}
                  y2={y}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: index * 0.3 + 1.1, duration: 0.5 }}
                />
              </g>
            );
          })}
          
          {/* Central Status Icon */}
          <motion.circle
            cx="200"
            cy="160"
            r="25"
            fill="#10b981"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
          />
          
          {/* Status Text */}
          <motion.text
            x="200"
            y="165"
            textAnchor="middle"
            className="text-sm font-bold fill-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            ALL CLEAR
          </motion.text>
          
          {/* Gradients */}
          <defs>
            <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
            </radialGradient>
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
        <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 10px rgba(239, 68, 68, 0.5)',
                        '0 0 20px rgba(239, 68, 68, 0.8)',
                        '0 0 10px rgba(239, 68, 68, 0.5)'
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </motion.div>
                  Crisis Intervention System
                </CardTitle>
                <CardDescription className="text-orange-200">
                  24/7 real-time monitoring and immediate response protocols
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-green-400 rounded-full"
                />
                <div className="text-right">
                  <div className="text-white font-medium">System Status</div>
                  <p className="text-green-200 text-sm">Operational</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Real-time Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(riskMetrics).map(([type, data], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          data.level < 20 ? 'bg-green-500' :
                          data.level < 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        animate={{ 
                          scale: data.level > 30 ? [1, 1.1, 1] : [1],
                          boxShadow: data.level > 30 ? [
                            '0 0 10px rgba(239, 68, 68, 0.5)',
                            '0 0 20px rgba(239, 68, 68, 0.8)',
                            '0 0 10px rgba(239, 68, 68, 0.5)'
                          ] : ['0 0 5px rgba(16, 185, 129, 0.5)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {type === 'financial' && <DollarSign className="w-5 h-5 text-white" />}
                        {type === 'health' && <Heart className="w-5 h-5 text-white" />}
                        {type === 'mental' && <Brain className="w-5 h-5 text-white" />}
                        {type === 'legal' && <Scale className="w-5 h-5 text-white" />}
                      </motion.div>
                      <div>
                        <h3 className="text-white font-medium capitalize">{type} Risk</h3>
                        <p className="text-gray-300 text-sm">{data.lastCheck}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        data.level < 20 ? 'border-green-400 text-green-400' :
                        data.level < 40 ? 'border-yellow-400 text-yellow-400' :
                        'border-red-400 text-red-400'
                      }`}
                    >
                      {data.level < 20 ? 'Low' : data.level < 40 ? 'Medium' : 'High'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Risk Level</span>
                      <span className="text-white">{data.level}%</span>
                    </div>
                    <Progress value={data.level} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 capitalize">Trend: {data.trend}</span>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-400">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3D Monitoring Display */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Real-time Monitoring Hub</CardTitle>
          <CardDescription className="text-gray-300">
            3D visualization of all monitored risk factors and system status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {create3DMonitoringDisplay()}
        </CardContent>
      </Card>

      {/* Response Team */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-6 h-6 mr-3" />
            Crisis Response Team
          </CardTitle>
          <CardDescription className="text-gray-300">
            Licensed professionals ready for immediate intervention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responseTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  member.available 
                    ? 'bg-green-600/20 border-green-400/40' 
                    : 'bg-gray-600/20 border-gray-400/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{member.name}</h4>
                    <p className="text-gray-300 text-sm">{member.role}</p>
                    <p className="text-gray-400 text-xs">{member.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          member.available ? 'bg-green-400' : 'bg-gray-400'
                        }`}
                        animate={member.available ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Badge 
                        variant="outline" 
                        className={`${
                          member.available 
                            ? 'border-green-400 text-green-400' 
                            : 'border-gray-400 text-gray-400'
                        }`}
                      >
                        {member.available ? 'Available' : 'On Call'}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-xs">Response: {member.responseTime}</p>
                  </div>
                </div>
                
                {member.available && (
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-green-400 text-green-400 hover:bg-green-400/10"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-blue-400 text-blue-400 hover:bg-blue-400/10"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-6 h-6 mr-3" />
              Emergency Response Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                'AI Triage: Assess severity and type of crisis',
                'Human Intervention: Licensed professionals contacted',
                'Resource Deployment: Emergency funds, counseling activated',
                'Peer Support: Connect with similar crisis survivors',
                'Recovery Tracking: Long-term monitoring for prevention'
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{step}</p>
                </motion.div>
              ))}
            </div>
            
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Test Emergency Protocol
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
            <CardDescription className="text-gray-300">
              Monitoring system performance and reliability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { component: 'AI Detection Engine', status: 'Operational', uptime: '99.9%' },
              { component: 'Communication Monitoring', status: 'Operational', uptime: '99.8%' },
              { component: 'Financial Tracking', status: 'Operational', uptime: '100%' },
              { component: 'Health Integration', status: 'Operational', uptime: '99.7%' },
              { component: 'Response Team Network', status: 'Operational', uptime: '100%' }
            ].map((system, index) => (
              <motion.div
                key={system.component}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white text-sm font-medium">{system.component}</p>
                    <p className="text-gray-400 text-xs">{system.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm font-medium">{system.uptime}</p>
                  <p className="text-gray-400 text-xs">Uptime</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Alert className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-400/40">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-white">
          <strong>24/7 Emergency Support:</strong> If you're experiencing a crisis, click the emergency button or call our crisis hotline at 
          <Button variant="link" className="text-red-300 hover:text-red-200 p-0 h-auto ml-1">
            1-800-ATHLETE
          </Button>
          . Help is available immediately.
        </AlertDescription>
      </Alert>
    </div>
  );
}