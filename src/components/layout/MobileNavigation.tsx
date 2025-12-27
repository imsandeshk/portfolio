import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Shield,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile, role, signOut } = useAuth();
  const location = useLocation();

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

  const quickActions = [
    { name: 'New Shipment', href: '/dashboard/shipments/new', icon: Plus, roles: ['farmer', 'logistics'] },
    { name: 'Track Shipment', href: '/dashboard/tracking', icon: MapPin, roles: ['farmer', 'logistics', 'buyer'] },
    { name: 'View Reports', href: '/dashboard/reports', icon: BarChart3, roles: ['admin', 'logistics'] },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const RoleIcon = getRoleIcon(role || '');

  const filteredQuickActions = quickActions.filter(action => 
    !action.roles || action.roles.includes(role || '')
  );

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Supply Chain
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-200 rounded-full">
                  <RoleIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userProfile?.full_name || 'User'}
                  </p>
                  <Badge className={getRoleColor(role || '')} size="sm">
                    {getRoleLabel(role || '')}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
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
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                {filteredQuickActions.length > 0 && (
                  <div className="space-y-1 mt-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Quick Actions
                    </h3>
                    {filteredQuickActions.map((action) => (
                      <Link
                        key={action.name}
                        to={action.href}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <action.icon className="h-4 w-4" />
                        <span>{action.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;