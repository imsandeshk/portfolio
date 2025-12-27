import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  MapPin, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Truck,
  Store,
  ShoppingCart,
  Shield
} from 'lucide-react';
import MobileNavigation from './MobileNavigation';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getRoleIcon = (userRole: string) => {
    switch (userRole) {
      case 'farmer': return User;
      case 'logistics': return Truck;
      case 'market_agent': return Store;
      case 'buyer': return ShoppingCart;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (userRole: string) => {
    switch (userRole) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'logistics': return 'bg-blue-100 text-blue-800';
      case 'market_agent': return 'bg-purple-100 text-purple-800';
      case 'buyer': return 'bg-orange-100 text-orange-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (userRole: string) => {
    switch (userRole) {
      case 'farmer': return 'Farmer';
      case 'logistics': return 'Logistics Partner';
      case 'market_agent': return 'Market Agent';
      case 'buyer': return 'Buyer';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Shipments', href: '/dashboard/shipments', icon: Package },
    { name: 'Tracking', href: '/dashboard/tracking', icon: MapPin },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const RoleIcon = getRoleIcon(role || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-green-800">
                Supply Chain
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-green-800">
              Supply Chain
            </h2>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-green-100 text-green-800'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <MobileNavigation />
              <h1 className="text-xl font-semibold text-gray-900">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className={getRoleColor(role || '')}>
                <RoleIcon className="h-3 w-3 mr-1" />
                {getRoleLabel(role || '')}
              </Badge>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {userProfile?.full_name || 'User'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;