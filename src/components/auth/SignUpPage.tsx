import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Activity,
  ArrowRight,
  Chrome,
  Github,
  AlertCircle,
  CheckCircle2,
  Star
} from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import athlineLogo from 'figma:asset/763c8fbb717d0fcfb04a4df0e51c329c48e187e4.png';

interface SignUpPageProps {
  onSignUp: (user: any) => void;
  onSwitchToLogin: () => void;
}

export function SignUpPage({ onSignUp, onSwitchToLogin }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    sport: '',
    position: '',
    experience: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }
    
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // First create user via server endpoint
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e0e89edd/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          user_metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            fullName: `${formData.firstName} ${formData.lastName}`,
            sport: formData.sport,
            position: formData.position,
            experience: formData.experience,
            onboardingComplete: false
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to create account');
        return;
      }

      setSuccess('Account created successfully! You can now sign in.');
      setTimeout(() => onSwitchToLogin(), 2000);

    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setError(`${provider} sign up failed: ${error.message}`);
      }
    } catch (err) {
      setError('Social sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const sports = [
    'Basketball', 'Football', 'Soccer', 'Tennis', 'Baseball', 'Hockey', 
    'Golf', 'Track & Field', 'Swimming', 'Volleyball', 'Boxing', 'MMA', 
    'Cycling', 'Wrestling', 'Gymnastics', 'Other'
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 bg-slate-800/50 backdrop-blur-xl rounded-3xl mb-6 shadow-2xl border-4 border-blue-500/30"
            whileHover={{ 
              scale: 1.15,
              rotate: [0, -10, 10, 0],
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={athlineLogo} 
              alt="ATHLINE" 
              className="w-24 h-24 object-contain"
            />
          </motion.div>
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight bg-gradient-to-r from-blue-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            ATHLINE
          </h1>
          <p className="text-white/70 text-lg font-medium">Join the Elite Athletic Community</p>
        </motion.div>

        {/* Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Create Your Account</CardTitle>
              <CardDescription className="text-white/70">
                Start your journey to athletic excellence
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Alert className="bg-red-500/20 border-red-500/50 text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Alert className="bg-green-500/20 border-green-500/50 text-green-200">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="athlete@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                      required
                    />
                  </div>
                </div>

                {/* Athletic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sport" className="text-white">Primary Sport</Label>
                    <Select onValueChange={(value) => handleInputChange('sport', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        {sports.map((sport) => (
                          <SelectItem key={sport} value={sport.toLowerCase()} className="text-white hover:bg-white/10">
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-white">Position</Label>
                    <Input
                      id="position"
                      placeholder="e.g., Point Guard"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-white">Experience Level</Label>
                  <Select onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/20">
                      <SelectItem value="amateur" className="text-white hover:bg-white/10">Amateur</SelectItem>
                      <SelectItem value="semi-pro" className="text-white hover:bg-white/10">Semi-Professional</SelectItem>
                      <SelectItem value="professional" className="text-white hover:bg-white/10">Professional</SelectItem>
                      <SelectItem value="elite" className="text-white hover:bg-white/10">Elite/Olympic</SelectItem>
                      <SelectItem value="retired" className="text-white hover:bg-white/10">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 text-white/40 hover:text-white hover:bg-white/10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 text-white/40 hover:text-white hover:bg-white/10"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                    className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="terms" className="text-sm text-white/70 leading-relaxed">
                    I agree to the{' '}
                    <Button variant="link" className="text-white hover:text-white/80 p-0 h-auto underline">
                      Terms of Service
                    </Button>
                    {' '}and{' '}
                    <Button variant="link" className="text-white hover:text-white/80 p-0 h-auto underline">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                    />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Social Sign Up */}
              <div className="space-y-4">
                <div className="relative">
                  <Separator className="bg-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black px-4 text-white/60 text-sm">Or sign up with</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Prominent Google Sign Up */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      className="w-full bg-white text-black hover:bg-gray-100 font-semibold text-base py-3 shadow-lg"
                      onClick={() => handleSocialSignUp('google')}
                      disabled={isLoading}
                    >
                      <Chrome className="mr-3 h-5 w-5 text-blue-600" />
                      Sign up with Google
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </Button>
                  </motion.div>
                  
                  {/* Secondary GitHub Sign Up */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => handleSocialSignUp('github')}
                    disabled={isLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Sign up with GitHub
                  </Button>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-white/60">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    className="text-white hover:text-white/80 p-0 h-auto font-semibold"
                    onClick={onSwitchToLogin}
                  >
                    Sign In
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center space-x-6 text-white/40 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Elite Training</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Performance Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Career Protection</span>
            </div>
          </div>
          <p className="mt-4 text-white/40 text-sm">© 2024 ATHLINE. Trusted by professionals worldwide.</p>
        </motion.div>
      </div>
    </div>
  );
}