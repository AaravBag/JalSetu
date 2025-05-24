import { useState } from 'react';
import { useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Droplet, Sprout } from 'lucide-react';

const registerSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email' }).optional(),
});

export default function Register() {
  const [, navigate] = useLocation();
  const { register, registerIsPending, login } = useAuth();
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    register(values, {
      onSuccess: () => {
        // Auto-login after successful registration
        login(
          { username: values.username, password: values.password },
          {
            onSuccess: () => {
              navigate('/');
            }
          }
        );
      }
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden z-0">
        <div className="absolute top-[15%] right-[10%] w-48 h-48 rounded-full bg-green-400 opacity-10 animate-pulse"></div>
        <div className="absolute top-[35%] left-[10%] w-36 h-36 rounded-full bg-blue-400 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[15%] right-[20%] w-24 h-24 rounded-full bg-cyan-400 opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center">
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-600">Jal</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">Setu</span>
              <Droplet className="ml-1 h-7 w-7 text-blue-500" fill="#3b82f6" fillOpacity={0.2} />
            </h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Smart Water Management for Farmers</p>
        </div>
        
        <Card className="w-full border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl text-center font-bold text-gray-800 dark:text-white">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Join JalSetu to optimize your farm's water management
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200">Username <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Choose a username" 
                          className="rounded-lg border-gray-300 bg-white/50 dark:bg-gray-700/50 focus:border-primary focus:ring-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200">Password <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Create a strong password" 
                          className="rounded-lg border-gray-300 bg-white/50 dark:bg-gray-700/50 focus:border-primary focus:ring-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your first name" 
                            className="rounded-lg border-gray-300 bg-white/50 dark:bg-gray-700/50 focus:border-primary focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your last name" 
                            className="rounded-lg border-gray-300 bg-white/50 dark:bg-gray-700/50 focus:border-primary focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Your email address" 
                          className="rounded-lg border-gray-300 bg-white/50 dark:bg-gray-700/50 focus:border-primary focus:ring-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg" 
                  disabled={registerIsPending}
                >
                  {registerIsPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Sprout className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
            <div className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300" 
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
          © 2025 JalSetu • Smart Irrigation Platform
        </div>
      </div>
    </div>
  );
}