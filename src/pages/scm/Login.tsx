import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSCMAuth } from '@/contexts/SCMAuthContext';
import { UserRole } from '@/types/scm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, Users, Package, ShoppingCart, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useSCMAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, role);
      toast({
        title: 'Login successful',
        description: `Welcome back!`,
      });
      navigate('/scm/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    farmer: Users,
    logistics: Truck,
    market_agent: Package,
    buyer: ShoppingCart,
    admin: Shield,
  };

  const RoleIcon = roleIcons[role];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Supply Chain Portal</CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your supply chain operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Farmer
                    </div>
                  </SelectItem>
                  <SelectItem value="logistics">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      Logistics Partner
                    </div>
                  </SelectItem>
                  <SelectItem value="market_agent">
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      Market Agent
                    </div>
                  </SelectItem>
                  <SelectItem value="buyer">
                    <div className="flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buyer
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Administrator
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo accounts available for all roles</p>
            <p className="text-xs mt-1">Email: any@email.com | Password: any</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
