import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Users,
  TrendingUp,
  Building,
  Lightbulb,
  Target,
  MapPin,
  Clock,
  Award,
  Network
} from 'lucide-react';

interface TransitionCenterProps {
  userProfile: any;
}

export function TransitionCenter({ userProfile }: TransitionCenterProps) {
  const [transitionReadiness, setTransitionReadiness] = useState({
    overall: 45,
    skills: 62,
    education: 38,
    network: 54,
    planning: 41
  });

  const [careerPaths, setCareerPaths] = useState([
    {
      title: 'Sports Management',
      match: 88,
      timeToReady: '18 months',
      salaryRange: '$75K - $150K',
      requiredSkills: ['Leadership', 'Business', 'Communication'],
      color: 'from-blue-500 to-cyan-500',
      icon: Briefcase
    },
    {
      title: 'Sports Broadcasting',
      match: 76,
      timeToReady: '12 months',
      salaryRange: '$60K - $120K',
      requiredSkills: ['Communication', 'Media Training', 'Analysis'],
      color: 'from-purple-500 to-pink-500',
      icon: Network
    },
    {
      title: 'Fitness/Wellness Coaching',
      match: 92,
      timeToReady: '8 months',
      salaryRange: '$45K - $90K',
      requiredSkills: ['Training', 'Motivation', 'Health Knowledge'],
      color: 'from-green-500 to-emerald-500',
      icon: Award
    },
    {
      title: 'Business Entrepreneurship',
      match: 65,
      timeToReady: '24 months',
      salaryRange: '$50K - $500K+',
      requiredSkills: ['Business Planning', 'Finance', 'Marketing'],
      color: 'from-yellow-500 to-orange-500',
      icon: Building
    }
  ]);

  const create3DCareerPath = () => {
    return (
      <div className="relative w-full h-96 overflow-hidden">
        <svg width="100%" height="400" className="absolute inset-0">
          {/* Career Path Timeline */}
          <motion.path
            d="M 50 350 Q 150 250 250 300 Q 350 350 450 250 Q 550 150 650 200"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          
          {/* Career Milestones */}
          {[
            { x: 50, y: 350, stage: 'Current', color: '#3b82f6', progress: 100 },
            { x: 250, y: 300, stage: 'Skills Dev', color: '#10b981', progress: 62 },
            { x: 450, y: 250, stage: 'Education', color: '#f59e0b', progress: 38 },
            { x: 650, y: 200, stage: 'New Career', color: '#8b5cf6', progress: 15 }
          ].map((milestone, index) => (
            <g key={milestone.stage}>
              <motion.circle
                cx={milestone.x}
                cy={milestone.y}
                r="20"
                fill={milestone.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.5, duration: 0.5 }}
              />
              <motion.circle
                cx={milestone.x}
                cy={milestone.y}
                r="15"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.5 + 0.2, duration: 0.3 }}
              />
              <motion.text
                x={milestone.x}
                y={milestone.y - 30}
                textAnchor="middle"
                className="text-sm font-medium fill-white"
                initial={{ opacity: 0, y: milestone.y - 20 }}
                animate={{ opacity: 1, y: milestone.y - 30 }}
                transition={{ delay: index * 0.5 + 0.4 }}
              >
                {milestone.stage}
              </motion.text>
              <motion.text
                x={milestone.x}
                y={milestone.y + 45}
                textAnchor="middle"
                className="text-xs fill-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.5 + 0.6 }}
              >
                {milestone.progress}%
              </motion.text>
              
              {/* Progress indicator */}
              <motion.circle
                cx={milestone.x}
                cy={milestone.y}
                r="10"
                fill="none"
                stroke={milestone.color}
                strokeWidth="2"
                strokeDasharray={`${milestone.progress * 0.628} 62.8`}
                initial={{ strokeDasharray: "0 62.8" }}
                animate={{ strokeDasharray: `${milestone.progress * 0.628} 62.8` }}
                transition={{ delay: index * 0.5 + 0.8, duration: 1 }}
                transform={`rotate(-90 ${milestone.x} ${milestone.y})`}
              />
            </g>
          ))}
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="33%" stopColor="#10b981" />
              <stop offset="66%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#8b5cf6" />
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
        <Card className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mr-4"
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
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                  Transition Command Center
                </CardTitle>
                <CardDescription className="text-indigo-200">
                  Career pivot planning, skill development, and transition roadmaps
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {transitionReadiness.overall}%
                </div>
                <p className="text-indigo-200 text-sm">Transition Ready</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Target className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="careers" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Briefcase className="w-4 h-4 mr-2" />
            Career Paths
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Award className="w-4 h-4 mr-2" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <GraduationCap className="w-4 h-4 mr-2" />
            Education
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl">
            <Users className="w-4 h-4 mr-2" />
            Network
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Readiness Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(transitionReadiness).filter(([key]) => key !== 'overall').map(([metric, value], index) => (
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
                        <Badge 
                          variant="outline" 
                          className={`${
                            value > 70 ? 'border-green-400 text-green-400' :
                            value > 40 ? 'border-yellow-400 text-yellow-400' :
                            'border-red-400 text-red-400'
                          }`}
                        >
                          {value > 70 ? 'Ready' : value > 40 ? 'Developing' : 'Needs Work'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-white">{value}%</span>
                        </div>
                        <Progress value={value} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 3D Career Path Visualization */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Career Transition Roadmap</CardTitle>
              <CardDescription className="text-gray-300">
                3D visualization of your personalized transition journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {create3DCareerPath()}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Skills Assessment',
                description: 'Identify transferable skills and gaps',
                icon: Award,
                color: 'from-blue-500 to-cyan-500',
                action: 'Start Assessment'
              },
              {
                title: 'Mentor Matching',
                description: 'Connect with successful former athletes',
                icon: Users,
                color: 'from-green-500 to-emerald-500',
                action: 'Find Mentors'
              },
              {
                title: 'Education Planning',
                description: 'Fast-track programs and certifications',
                icon: GraduationCap,
                color: 'from-purple-500 to-pink-500',
                action: 'Explore Programs'
              }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <action.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-white font-medium">{action.title}</h3>
                          <p className="text-gray-300 text-sm">{action.description}</p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        {action.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="careers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`w-12 h-12 bg-gradient-to-br ${career.color} rounded-xl flex items-center justify-center`}
                            whileHover={{ rotate: 15 }}
                          >
                            <career.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-white font-medium">{career.title}</h3>
                            <p className="text-gray-300 text-sm">{career.salaryRange}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            career.match > 80 ? 'border-green-400 text-green-400' :
                            career.match > 60 ? 'border-yellow-400 text-yellow-400' :
                            'border-blue-400 text-blue-400'
                          }`}
                        >
                          {career.match}% Match
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Skills Match</span>
                          <span className="text-white">{career.match}%</span>
                        </div>
                        <Progress value={career.match} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Time to Ready: {career.timeToReady}
                        </p>
                        
                        <div>
                          <p className="text-gray-300 text-sm mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {career.requiredSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className={`flex-1 bg-gradient-to-r ${career.color} hover:opacity-80`}
                        >
                          Start Path
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Transferable Skills</CardTitle>
                <CardDescription className="text-gray-300">
                  Athletic skills that translate to business success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: 'Leadership', current: 88, target: 90, industry: 'High Demand' },
                    { skill: 'Teamwork', current: 95, target: 95, industry: 'High Demand' },
                    { skill: 'Discipline', current: 92, target: 92, industry: 'High Demand' },
                    { skill: 'Pressure Management', current: 89, target: 90, industry: 'High Demand' },
                    { skill: 'Goal Setting', current: 91, target: 95, industry: 'Medium Demand' },
                    { skill: 'Communication', current: 72, target: 85, industry: 'Critical' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{item.skill}</span>
                        <Badge 
                          variant="outline" 
                          className={`${
                            item.industry === 'High Demand' ? 'border-green-400 text-green-400' :
                            item.industry === 'Critical' ? 'border-red-400 text-red-400' :
                            'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {item.industry}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Current: {item.current}%</span>
                          <span className="text-gray-300">Target: {item.target}%</span>
                        </div>
                        <Progress value={item.current} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Skill Development Plan</CardTitle>
                <CardDescription className="text-gray-300">
                  Targeted training to fill identified gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      skill: 'Public Speaking',
                      priority: 'High',
                      duration: '6 weeks',
                      method: 'Online Course + Practice',
                      status: 'In Progress'
                    },
                    {
                      skill: 'Financial Analysis',
                      priority: 'Medium',
                      duration: '12 weeks',
                      method: 'Certificate Program',
                      status: 'Recommended'
                    },
                    {
                      skill: 'Digital Marketing',
                      priority: 'Medium',
                      duration: '8 weeks',
                      method: 'Online Bootcamp',
                      status: 'Available'
                    },
                    {
                      skill: 'Project Management',
                      priority: 'High',
                      duration: '10 weeks',
                      method: 'PMP Certification',
                      status: 'Scheduled'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{item.skill}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            item.priority === 'High' ? 'border-red-400 text-red-400' :
                            'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {item.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{item.method}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">{item.duration}</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                type: 'University Partnership',
                program: 'Executive MBA',
                duration: '18 months',
                format: 'Part-time/Online',
                cost: '$45,000',
                match: 85,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                type: 'Certification',
                program: 'Sports Business Certificate',
                duration: '6 months',
                format: 'Online',
                cost: '$2,500',
                match: 92,
                color: 'from-green-500 to-emerald-500'
              },
              {
                type: 'Bootcamp',
                program: 'Digital Marketing Intensive',
                duration: '12 weeks',
                format: 'Hybrid',
                cost: '$8,000',
                match: 76,
                color: 'from-purple-500 to-pink-500'
              }
            ].map((program, index) => (
              <motion.div
                key={program.program}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{program.type}</Badge>
                        <Badge 
                          variant="outline" 
                          className={`${
                            program.match > 85 ? 'border-green-400 text-green-400' :
                            program.match > 70 ? 'border-yellow-400 text-yellow-400' :
                            'border-blue-400 text-blue-400'
                          }`}
                        >
                          {program.match}% Match
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="text-white font-medium mb-2">{program.program}</h3>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {program.duration}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {program.format}
                          </p>
                          <p className="text-white font-medium">{program.cost}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Program Match</span>
                          <span className="text-white">{program.match}%</span>
                        </div>
                        <Progress value={program.match} className="h-2" />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                          Learn More
                        </Button>
                        <Button 
                          size="sm" 
                          className={`flex-1 bg-gradient-to-r ${program.color} hover:opacity-80`}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white">Mentor Network</CardTitle>
                <CardDescription className="text-blue-200">
                  Connect with successfully transitioned former athletes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Marcus Johnson',
                      sport: 'Basketball → Sports Management',
                      company: 'NBA Team Executive',
                      match: 94,
                      available: true
                    },
                    {
                      name: 'Sarah Williams',
                      sport: 'Soccer → Broadcasting',
                      company: 'ESPN Analyst',
                      match: 87,
                      available: true
                    },
                    {
                      name: 'David Chen',
                      sport: 'Tennis → Entrepreneurship',
                      company: 'Fitness App Founder',
                      match: 82,
                      available: false
                    }
                  ].map((mentor, index) => (
                    <motion.div
                      key={mentor.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors"
                    >
                      <div>
                        <h4 className="text-white font-medium">{mentor.name}</h4>
                        <p className="text-gray-300 text-sm">{mentor.sport}</p>
                        <p className="text-blue-200 text-xs">{mentor.company}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="border-green-400 text-green-400">
                          {mentor.match}% Match
                        </Badge>
                        <Button 
                          size="sm" 
                          disabled={!mentor.available}
                          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                          {mentor.available ? 'Connect' : 'Unavailable'}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Industry Connections</CardTitle>
                <CardDescription className="text-gray-300">
                  Business leaders and potential employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Jennifer Adams',
                      role: 'Hiring Manager',
                      company: 'Sports Marketing Agency',
                      connection: 'Mutual Connection',
                      relevance: 'High'
                    },
                    {
                      name: 'Robert Miller',
                      role: 'VP of Operations',
                      company: 'Fitness Chain',
                      connection: 'Alumni Network',
                      relevance: 'Medium'
                    },
                    {
                      name: 'Lisa Zhang',
                      role: 'Startup Investor',
                      company: 'VC Fund',
                      connection: 'Industry Event',
                      relevance: 'High'
                    }
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">{contact.name}</h4>
                          <p className="text-gray-300 text-sm">{contact.role}</p>
                          <p className="text-gray-400 text-xs">{contact.company}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            contact.relevance === 'High' ? 'border-green-400 text-green-400' :
                            'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {contact.relevance}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">{contact.connection}</span>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          Connect
                        </Button>
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