import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Bell, 
  LogOut, 
  User, 
  Settings, 
  Truck, 
  Package, 
  BarChart3, 
  MapPin, 
  FileText,
  Home,
  Users,
  AlertTriangle
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/login');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
    ];

    switch (role) {
      case 'farmer':
        return [
          ...baseItems,
          { name: 'My Crops', href: '/dashboard/crops', icon: Package },
          { name: 'Shipments', href: '/dashboard/shipments', icon: Truck },
          { name: 'Track Shipments', href: '/dashboard/tracking', icon: MapPin },
          { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
        ];
      case 'logistics':
        return [
          ...baseItems,
          { name: 'Active Shipments', href: '/dashboard/shipments', icon: Truck },
          { name: 'Update Status', href: '/dashboard/update-status', icon: Package },
          { name: 'Vehicle Tracking', href: '/dashboard/vehicles', icon: MapPin },
          { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
        ];
      case 'market_agent':
        return [
          ...baseItems,
          { name: 'Market Orders', href: '/dashboard/orders', icon: Package },
          { name: 'Transactions', href: '/dashboard/transactions', icon: FileText },
          { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
        ];
      case 'buyer':
        return [
          ...baseItems,
          { name: 'My Orders', href: '/dashboard/orders', icon: Package },
          { name: 'Track Orders', href: '/dashboard/tracking', icon: MapPin },
          { name: 'Order History', href: '/dashboard/history', icon: FileText },
        ];
      case 'admin':
        return [
          ...baseItems,
          { name: 'All Shipments', href: '/dashboard/shipments', icon: Truck },
          { name: 'User Management', href: '/dashboard/users', icon: Users },
          { name: 'Disputes', href: '/dashboard/disputes', icon: AlertTriangle },
          { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
          { name: 'System Settings', href: '/dashboard/settings', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold text-green-700">Supply Chain</h2>
        <Badge variant="secondary" className="capitalize">
          {role}
        </Badge>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r">
            <SidebarContent />
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top navigation */}
          <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigationItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar} alt={userProfile?.full_name} />
                        <AvatarFallback>
                          {userProfile?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userProfile?.full_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userProfile?.email}
                        </p>
                        <Badge variant="outline" className="w-fit capitalize">
                          {role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;