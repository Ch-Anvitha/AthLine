import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  PiggyBank,
  Target,
  Zap,
  BarChart3,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface FinancialFortressProps {
  userProfile: any;
}

export function FinancialFortress({ userProfile }: FinancialFortressProps) {
  const [financialData, setFinancialData] = useState({
    totalSavings: 2450000,
    monthlyIncome: 180000,
    monthlyExpenses: 42000,
    investments: 850000,
    emergencyFund: 360000,
    autoSaveRate: 35
  });

  const [spendingAlerts, setSpendingAlerts] = useState([
    { type: 'warning', message: 'Luxury spending up 15% this month', amount: 8400 },
    { type: 'success', message: 'Emergency fund goal achieved', amount: 360000 },
    { type: 'info', message: 'Investment portfolio rebalanced', amount: 12000 }
  ]);

  const [investmentPerformance, setInvestmentPerformance] = useState([
    { category: 'Index Funds', allocation: 45, performance: 8.2, amount: 382500 },
    { category: 'Real Estate', allocation: 25, performance: 12.1, amount: 212500 },
    { category: 'Bonds', allocation: 20, performance: 4.5, amount: 170000 },
    { category: 'Cash', allocation: 10, performance: 2.1, amount: 85000 }
  ]);

  const create3DChart = () => {
    return (
      <div className="relative w-full h-64 flex items-center justify-center">
        <svg width="300" height="200" className="overflow-visible">
          {/* 3D Bars */}
          {investmentPerformance.map((item, index) => {
            const barHeight = (item.allocation / 50) * 120;
            const x = index * 60 + 40;
            const y = 160 - barHeight;
            
            return (
              <g key={item.category}>
                {/* Bar shadow */}
                <motion.rect
                  x={x + 5}
                  y={y + 5}
                  width="40"
                  height={barHeight}
                  fill="rgba(0,0,0,0.3)"
                  initial={{ height: 0 }}
                  animate={{ height: barHeight }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
                
                {/* Main bar */}
                <motion.rect
                  x={x}
                  y={y}
                  width="40"
                  height={barHeight}
                  fill={`url(#gradient-${index})`}
                  initial={{ height: 0 }}
                  animate={{ height: barHeight }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Top face */}
                <motion.polygon
                  points={`${x},${y} ${x + 40},${y} ${x + 45},${y - 5} ${x + 5},${y - 5}`}
                  fill={`url(#gradient-top-${index})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.4 }}
                />
                
                {/* Right face */}
                <motion.polygon
                  points={`${x + 40},${y} ${x + 45},${y - 5} ${x + 45},${y + barHeight - 5} ${x + 40},${y + barHeight}`}
                  fill={`url(#gradient-right-${index})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.6, duration: 0.4 }}
                />
                
                {/* Value label */}
                <motion.text
                  x={x + 20}
                  y={y - 10}
                  textAnchor="middle"
                  className="text-xs fill-white font-medium"
                  initial={{ opacity: 0, y: y + 10 }}
                  animate={{ opacity: 1, y: y - 10 }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                >
                  {item.allocation}%
                </motion.text>
              </g>
            );
          })}
          
          {/* Gradients */}
          <defs>
            {investmentPerformance.map((_, index) => (
              <g key={index}>
                <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={
                    index === 0 ? '#3b82f6' : 
                    index === 1 ? '#10b981' : 
                    index === 2 ? '#f59e0b' : '#8b5cf6'
                  } />
                  <stop offset="100%" stopColor={
                    index === 0 ? '#1d4ed8' : 
                    index === 1 ? '#059669' : 
                    index === 2 ? '#d97706' : '#7c3aed'
                  } />
                </linearGradient>
                <linearGradient id={`gradient-top-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={
                    index === 0 ? '#60a5fa' : 
                    index === 1 ? '#34d399' : 
                    index === 2 ? '#fbbf24' : '#a78bfa'
                  } />
                  <stop offset="100%" stopColor={
                    index === 0 ? '#3b82f6' : 
                    index === 1 ? '#10b981' : 
                    index === 2 ? '#f59e0b' : '#8b5cf6'
                  } />
                </linearGradient>
                <linearGradient id={`gradient-right-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={
                    index === 0 ? '#1e40af' : 
                    index === 1 ? '#047857' : 
                    index === 2 ? '#b45309' : '#6d28d9'
                  } />
                  <stop offset="100%" stopColor={
                    index === 0 ? '#1d4ed8' : 
                    index === 1 ? '#059669' : 
                    index === 2 ? '#d97706' : '#7c3aed'
                  } />
                </linearGradient>
              </g>
            ))}
          </defs>
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 text-xs">
          {investmentPerformance.map((item, index) => (
            <div key={item.category} className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded ${
                index === 0 ? 'bg-blue-500' : 
                index === 1 ? 'bg-green-500' : 
                index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
              }`} />
              <span className="text-white">{item.category}</span>
            </div>
          ))}
        </div>
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
        <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <DollarSign className="w-5 h-5 text-white" />
                  </motion.div>
                  Financial Fortress
                </CardTitle>
                <CardDescription className="text-yellow-200">
                  Smart savings, investment management, and financial security
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  ${(financialData.totalSavings / 1000000).toFixed(1)}M
                </div>
                <p className="text-yellow-200 text-sm">Total Protected</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="autosave" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <PiggyBank className="w-4 h-4 mr-2" />
            Auto-Save
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <TrendingUp className="w-4 h-4 mr-2" />
            Investments
          </TabsTrigger>
          <TabsTrigger value="spending" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Wallet className="w-4 h-4 mr-2" />
            Spending
          </TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Target className="w-4 h-4 mr-2" />
            Planning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Monthly Income', 
                value: financialData.monthlyIncome, 
                change: '+12%', 
                positive: true, 
                icon: ArrowUpRight,
                color: 'from-green-500 to-emerald-500'
              },
              { 
                title: 'Monthly Expenses', 
                value: financialData.monthlyExpenses, 
                change: '-8%', 
                positive: true, 
                icon: ArrowDownRight,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'Auto-Save Rate', 
                value: financialData.autoSaveRate, 
                change: '+5%', 
                positive: true, 
                icon: PiggyBank,
                color: 'from-purple-500 to-pink-500',
                isPercentage: true
              },
              { 
                title: 'Emergency Fund', 
                value: financialData.emergencyFund, 
                change: 'Goal Met', 
                positive: true, 
                icon: Shield,
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <Badge 
                        variant="outline" 
                        className={`${item.positive ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}`}
                      >
                        {item.change}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">{item.title}</p>
                      <motion.p 
                        className="text-2xl font-bold text-white"
                        key={item.value}
                        initial={{ scale: 1.1, color: '#60a5fa' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                      >
                        {item.isPercentage ? `${item.value}%` : `$${(item.value / 1000).toFixed(0)}K`}
                      </motion.p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 3D Investment Portfolio Chart */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Investment Portfolio Allocation</CardTitle>
              <CardDescription className="text-gray-300">
                3D visualization of your diversified investment strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              {create3DChart()}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Smart Spending Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {spendingAlerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                    {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {alert.type === 'info' && <Zap className="w-5 h-5 text-blue-400" />}
                    <span className="text-gray-300">{alert.message}</span>
                  </div>
                  <span className="text-white font-medium">${(alert.amount / 1000).toFixed(0)}K</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autosave" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Smart Auto-Save Settings</CardTitle>
                <CardDescription className="text-green-200">
                  Automatically save 35% of your earnings during peak seasons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Current Save Rate</span>
                      <span className="text-white">{financialData.autoSaveRate}%</span>
                    </div>
                    <Progress value={financialData.autoSaveRate} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/10 rounded-lg">
                      <p className="text-gray-300 text-sm">This Month</p>
                      <p className="text-white font-bold text-xl">$63K</p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-lg">
                      <p className="text-gray-300 text-sm">This Year</p>
                      <p className="text-white font-bold text-xl">$588K</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Adjust Save Rate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Savings Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { goal: 'Emergency Fund', target: 360000, current: 360000, color: 'green' },
                  { goal: 'Post-Career Fund', target: 5000000, current: 2450000, color: 'blue' },
                  { goal: 'Property Investment', target: 1500000, current: 850000, color: 'purple' }
                ].map((item, index) => (
                  <motion.div
                    key={item.goal}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.goal}</span>
                        <span className="text-white">
                          ${(item.current / 1000).toFixed(0)}K / ${(item.target / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <Progress value={(item.current / item.target) * 100} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPerformance.map((investment, index) => (
              <motion.div
                key={investment.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">{investment.category}</h3>
                        <Badge 
                          variant="outline" 
                          className={`${
                            investment.performance > 8 ? 'border-green-400 text-green-400' :
                            investment.performance > 5 ? 'border-yellow-400 text-yellow-400' :
                            'border-blue-400 text-blue-400'
                          }`}
                        >
                          +{investment.performance}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Allocation</span>
                          <span className="text-white">{investment.allocation}%</span>
                        </div>
                        <Progress value={investment.allocation} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-2xl font-bold text-white">
                          ${(investment.amount / 1000).toFixed(0)}K
                        </p>
                        <p className="text-sm text-gray-300">Current Value</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="spending" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Spending Guardian</CardTitle>
              <CardDescription className="text-gray-300">
                Real-time alerts for risky financial behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg border border-red-400/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Luxury Spending Alert</h4>
                      <p className="text-red-200 text-sm">15% increase from last month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">$8,400</p>
                      <p className="text-red-200 text-sm">Over budget</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { category: 'Essentials', amount: 18500, budget: 20000, color: 'green' },
                    { category: 'Lifestyle', amount: 15200, budget: 12000, color: 'yellow' },
                    { category: 'Luxury', amount: 8400, budget: 5000, color: 'red' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-white font-medium mb-2">{item.category}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Spent / Budget</span>
                            <span className="text-white">
                              ${(item.amount / 1000).toFixed(1)}K / ${(item.budget / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <Progress value={(item.amount / item.budget) * 100} className="h-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Retirement Planning</CardTitle>
                <CardDescription className="text-blue-200">
                  Financial roadmap for your post-career life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Projected Retirement Age</h4>
                    <p className="text-3xl font-bold text-blue-400">32</p>
                    <p className="text-blue-200 text-sm">Based on current savings rate</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Passive Income Goal</span>
                      <span className="text-white font-medium">$25K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Years to Goal</span>
                      <span className="text-white font-medium">8.2 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Success Probability</span>
                      <span className="text-green-400 font-medium">87%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Financial Education</CardTitle>
                <CardDescription className="text-gray-300">
                  Gamified learning for smarter money management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { module: 'Investment Basics', progress: 100, badge: 'Complete' },
                    { module: 'Tax Optimization', progress: 75, badge: 'In Progress' },
                    { module: 'Real Estate', progress: 30, badge: 'Started' },
                    { module: 'Business Formation', progress: 0, badge: 'Locked' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.module}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white">{item.module}</span>
                          <Badge 
                            variant="outline" 
                            className={`${
                              item.badge === 'Complete' ? 'border-green-400 text-green-400' :
                              item.badge === 'In Progress' ? 'border-yellow-400 text-yellow-400' :
                              item.badge === 'Started' ? 'border-blue-400 text-blue-400' :
                              'border-gray-400 text-gray-400'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        </div>
                        <Progress value={item.progress} className="h-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}