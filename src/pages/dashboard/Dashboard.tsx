import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { userProfile, role } = useAuth();

  const getDashboardContent = () => {
    switch (role) {
      case 'farmer':
        return {
          title: 'Farmer Dashboard',
          description: 'Track your crops and shipments',
          stats: [
            { label: 'Active Crops', value: '12', icon: Package, color: 'text-green-600' },
            { label: 'Pending Shipments', value: '3', icon: Truck, color: 'text-blue-600' },
            { label: 'Completed Deliveries', value: '45', icon: CheckCircle, color: 'text-green-600' },
            { label: 'Total Revenue', value: '$12,450', icon: TrendingUp, color: 'text-green-600' },
          ],
          quickActions: [
            { label: 'Add New Crop', href: '/dashboard/crops/new', icon: Package },
            { label: 'Track Shipments', href: '/dashboard/tracking', icon: MapPin },
            { label: 'View Reports', href: '/dashboard/reports', icon: TrendingUp },
          ],
          recentActivity: [
            { action: 'Crop "Tomatoes" shipped', time: '2 hours ago', status: 'shipped' },
            { action: 'New order received', time: '4 hours ago', status: 'new' },
            { action: 'Delivery completed', time: '1 day ago', status: 'completed' },
          ]
        };
      case 'logistics':
        return {
          title: 'Logistics Dashboard',
          description: 'Manage shipments and deliveries',
          stats: [
            { label: 'Active Shipments', value: '8', icon: Truck, color: 'text-blue-600' },
            { label: 'Vehicles in Transit', value: '5', icon: MapPin, color: 'text-orange-600' },
            { label: 'Deliveries Today', value: '12', icon: CheckCircle, color: 'text-green-600' },
            { label: 'On-Time Rate', value: '94%', icon: TrendingUp, color: 'text-green-600' },
          ],
          quickActions: [
            { label: 'Update Shipment Status', href: '/dashboard/update-status', icon: Truck },
            { label: 'Track Vehicles', href: '/dashboard/vehicles', icon: MapPin },
            { label: 'View Reports', href: '/dashboard/reports', icon: TrendingUp },
          ],
          recentActivity: [
            { action: 'Shipment #1234 delivered', time: '1 hour ago', status: 'completed' },
            { action: 'Vehicle #V001 location updated', time: '2 hours ago', status: 'updated' },
            { action: 'New shipment assigned', time: '3 hours ago', status: 'new' },
          ]
        };
      case 'market_agent':
        return {
          title: 'Market Agent Dashboard',
          description: 'Facilitate market transactions',
          stats: [
            { label: 'Active Orders', value: '15', icon: Package, color: 'text-blue-600' },
            { label: 'Pending Transactions', value: '7', icon: Clock, color: 'text-orange-600' },
            { label: 'Completed Today', value: '23', icon: CheckCircle, color: 'text-green-600' },
            { label: 'Commission Earned', value: '$1,250', icon: TrendingUp, color: 'text-green-600' },
          ],
          quickActions: [
            { label: 'View Orders', href: '/dashboard/orders', icon: Package },
            { label: 'Process Transactions', href: '/dashboard/transactions', icon: TrendingUp },
            { label: 'View Reports', href: '/dashboard/reports', icon: TrendingUp },
          ],
          recentActivity: [
            { action: 'Order #ORD-001 processed', time: '30 minutes ago', status: 'completed' },
            { action: 'New buyer registered', time: '1 hour ago', status: 'new' },
            { action: 'Transaction completed', time: '2 hours ago', status: 'completed' },
          ]
        };
      case 'buyer':
        return {
          title: 'Buyer Dashboard',
          description: 'Track your orders and deliveries',
          stats: [
            { label: 'Active Orders', value: '5', icon: Package, color: 'text-blue-600' },
            { label: 'In Transit', value: '2', icon: Truck, color: 'text-orange-600' },
            { label: 'Delivered This Month', value: '18', icon: CheckCircle, color: 'text-green-600' },
            { label: 'Total Spent', value: '$3,450', icon: TrendingUp, color: 'text-green-600' },
          ],
          quickActions: [
            { label: 'Place New Order', href: '/dashboard/orders/new', icon: Package },
            { label: 'Track Orders', href: '/dashboard/tracking', icon: MapPin },
            { label: 'Order History', href: '/dashboard/history', icon: Clock },
          ],
          recentActivity: [
            { action: 'Order #ORD-123 delivered', time: '1 hour ago', status: 'completed' },
            { action: 'Order #ORD-124 shipped', time: '3 hours ago', status: 'shipped' },
            { action: 'New order placed', time: '1 day ago', status: 'new' },
          ]
        };
      case 'admin':
        return {
          title: 'Admin Dashboard',
          description: 'Oversee supply chain operations',
          stats: [
            { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
            { label: 'Active Shipments', value: '45', icon: Truck, color: 'text-orange-600' },
            { label: 'System Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600' },
            { label: 'Platform Revenue', value: '$45,670', icon: TrendingUp, color: 'text-green-600' },
          ],
          quickActions: [
            { label: 'Manage Users', href: '/dashboard/users', icon: Users },
            { label: 'View All Shipments', href: '/dashboard/shipments', icon: Truck },
            { label: 'Resolve Disputes', href: '/dashboard/disputes', icon: AlertTriangle },
            { label: 'System Analytics', href: '/dashboard/analytics', icon: TrendingUp },
          ],
          recentActivity: [
            { action: 'New user registered', time: '15 minutes ago', status: 'new' },
            { action: 'Dispute #D-001 resolved', time: '1 hour ago', status: 'completed' },
            { action: 'System maintenance completed', time: '2 hours ago', status: 'completed' },
          ]
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Welcome to Supply Chain Management',
          stats: [],
          quickActions: [],
          recentActivity: []
        };
    }
  };

  const content = getDashboardContent();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'updated': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
        <p className="text-green-100 mb-4">{content.description}</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Welcome back,</span>
          <span className="font-semibold">{userProfile?.full_name}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {content.quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Button variant="outline" className="w-full justify-start">
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;