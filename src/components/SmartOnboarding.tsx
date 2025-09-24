import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  User, 
  Activity, 
  DollarSign, 
  GraduationCap,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SmartOnboardingProps {
  userProfile: any;
  onProfileUpdate: (profile: any) => void;
}

export function SmartOnboarding({ userProfile, onProfileUpdate }: SmartOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: userProfile.name || '',
      age: '',
      height: '',
      weight: '',
      nationality: ''
    },
    athleticInfo: {
      sport: userProfile.sport || '',
      position: userProfile.position || '',
      experienceYears: '',
      currentTeam: '',
      contractValue: '',
      contractEnd: ''
    },
    healthInfo: {
      injuryHistory: '',
      currentInjuries: '',
      fitnessLevel: '',
      medicalConditions: ''
    },
    education: {
      highestDegree: '',
      institution: '',
      additionalCerts: '',
      currentStudies: ''
    },
    financial: {
      annualIncome: '',
      savings: '',
      investments: '',
      expenses: ''
    }
  });

  const [riskAssessment, setRiskAssessment] = useState({
    injury: 25,
    financial: 15,
    career: 35,
    mental: 20,
    overall: 'Medium'
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Athletic Profile', icon: Activity, color: 'from-green-500 to-emerald-500' },
    { id: 3, title: 'Health Assessment', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 4, title: 'Education', icon: GraduationCap, color: 'from-purple-500 to-indigo-500' },
    { id: 5, title: 'Financial Status', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
    { id: 6, title: 'AI Risk Analysis', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' }
  ];

  const updateFormData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    onProfileUpdate({
      ...userProfile,
      ...formData.personalInfo,
      ...formData.athleticInfo,
      riskLevel: riskAssessment.overall
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.personalInfo.name}
                  onChange={(e) => updateFormData('personalInfo', 'name', e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.personalInfo.age}
                  onChange={(e) => updateFormData('personalInfo', 'age', e.target.value)}
                  placeholder="Age"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.personalInfo.height}
                  onChange={(e) => updateFormData('personalInfo', 'height', e.target.value)}
                  placeholder="Height in cm"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.personalInfo.weight}
                  onChange={(e) => updateFormData('personalInfo', 'weight', e.target.value)}
                  placeholder="Weight in kg"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sport">Sport</Label>
                <Select onValueChange={(value) => updateFormData('athleticInfo', 'sport', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select your sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="soccer">Soccer</SelectItem>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="baseball">Baseball</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.athleticInfo.position}
                  onChange={(e) => updateFormData('athleticInfo', 'position', e.target.value)}
                  placeholder="Your playing position"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.athleticInfo.experienceYears}
                  onChange={(e) => updateFormData('athleticInfo', 'experienceYears', e.target.value)}
                  placeholder="Professional years"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="team">Current Team</Label>
                <Input
                  id="team"
                  value={formData.athleticInfo.currentTeam}
                  onChange={(e) => updateFormData('athleticInfo', 'currentTeam', e.target.value)}
                  placeholder="Team name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <TrendingUp className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">AI Risk Assessment Complete</h3>
              <p className="text-gray-300">Analysis based on your profile data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(riskAssessment).filter(([key]) => key !== 'overall').map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="capitalize text-white font-medium">{key} Risk</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            value < 30 ? 'border-green-400 text-green-400' :
                            value < 60 ? 'border-yellow-400 text-yellow-400' :
                            'border-red-400 text-red-400'
                          }`}
                        >
                          {value < 30 ? 'Low' : value < 60 ? 'Medium' : 'High'}
                        </Badge>
                      </div>
                      <Progress value={value} className="h-3" />
                      <p className="text-sm text-gray-300 mt-2">{value}% risk level</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className={`bg-gradient-to-r ${
              riskAssessment.overall === 'Low' ? 'from-green-600/20 to-emerald-600/20' :
              riskAssessment.overall === 'Medium' ? 'from-yellow-600/20 to-orange-600/20' :
              'from-red-600/20 to-pink-600/20'
            } border-white/20 backdrop-blur-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      riskAssessment.overall === 'Low' ? 'from-green-500 to-emerald-500' :
                      riskAssessment.overall === 'Medium' ? 'from-yellow-500 to-orange-500' :
                      'from-red-500 to-pink-500'
                    } rounded-full flex items-center justify-center`}
                    animate={{ 
                      scale: [1, 1.1, 1] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  >
                    {riskAssessment.overall === 'Low' ? 
                      <CheckCircle className="w-6 h-6 text-white" /> :
                      <AlertTriangle className="w-6 h-6 text-white" />
                    }
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Overall Risk Level: {riskAssessment.overall}</h3>
                    <p className="text-gray-300">
                      Personalized recommendations and monitoring protocols have been activated.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return (
          <div className="space-y-6">
            <p className="text-gray-300">Step {currentStep} content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">Smart Onboarding</CardTitle>
            <CardDescription className="text-blue-200">
              Complete your profile for personalized AI recommendations
            </CardDescription>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Step {currentStep} of {steps.length}</span>
                <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Step Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentStep === step.id 
                ? 'bg-white/20 text-white' 
                : currentStep > step.id 
                  ? 'bg-green-600/20 text-green-400'
                  : 'bg-white/10 text-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`w-8 h-8 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}
              animate={currentStep === step.id ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: currentStep === step.id ? Infinity : 0 }}
            >
              <step.icon className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-sm font-medium">{step.title}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Step Content */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <motion.div
              className={`w-10 h-10 bg-gradient-to-br ${steps[currentStep - 1]?.color} rounded-full flex items-center justify-center mr-4`}
              whileHover={{ rotate: 15 }}
            >
              {React.createElement(steps[currentStep - 1]?.icon, { className: "w-5 h-5 text-white" })}
            </motion.div>
            {steps[currentStep - 1]?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between"
      >
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Previous
        </Button>
        
        {currentStep === steps.length ? (
          <Button
            onClick={completeOnboarding}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            Complete Onboarding
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            Next Step
          </Button>
        )}
      </motion.div>
    </div>
  );
}