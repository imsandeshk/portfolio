import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package,
  Settings,
  Filter,
  MarkAsRead
} from 'lucide-react';

// Mock data for notifications
const mockNotifications = [
  {
    id: 'NOT001',
    type: 'delay',
    title: 'Shipment Delay Alert',
    message: 'Shipment SH001 is delayed by 2 hours due to traffic congestion',
    timestamp: '2024-01-14 15:30',
    isRead: false,
    priority: 'high',
    shipmentId: 'SH001',
    actionRequired: true
  },
  {
    id: 'NOT002',
    type: 'delivery',
    title: 'Delivery Confirmation',
    message: 'Shipment SH002 has been successfully delivered to Central Market',
    timestamp: '2024-01-14 14:15',
    isRead: true,
    priority: 'medium',
    shipmentId: 'SH002',
    actionRequired: false
  },
  {
    id: 'NOT003',
    type: 'quality',
    title: 'Quality Issue Reported',
    message: 'Quality issue reported for shipment SH003. Please review the details.',
    timestamp: '2024-01-14 12:45',
    isRead: false,
    priority: 'high',
    shipmentId: 'SH003',
    actionRequired: true
  },
  {
    id: 'NOT004',
    type: 'update',
    title: 'Status Update',
    message: 'Shipment SH004 has reached Distribution Center A',
    timestamp: '2024-01-14 11:20',
    isRead: true,
    priority: 'low',
    shipmentId: 'SH004',
    actionRequired: false
  },
  {
    id: 'NOT005',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM',
    timestamp: '2024-01-14 09:00',
    isRead: false,
    priority: 'medium',
    actionRequired: false
  }
];

const Notifications = () => {
  const { role } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'delay': return AlertTriangle;
      case 'delivery': return CheckCircle;
      case 'quality': return Package;
      case 'update': return Truck;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'delay': return 'text-red-600';
      case 'delivery': return 'text-green-600';
      case 'quality': return 'text-yellow-600';
      case 'update': return 'text-blue-600';
      case 'system': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'unread') return !notification.isRead;
    if (selectedTab === 'high-priority') return notification.priority === 'high';
    if (selectedTab === 'action-required') return notification.actionRequired;
    return notification.type === selectedTab;
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.isRead).length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with supply chain activities and alerts</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <MarkAsRead className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">New notifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highPriorityCount}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Action Required</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actionRequiredCount}</div>
              <p className="text-xs text-muted-foreground">Pending actions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">All notifications</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="high-priority">High Priority</TabsTrigger>
            <TabsTrigger value="action-required">Action Required</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  {filteredNotifications.length} notification(s) found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No notifications found</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => {
                      const IconComponent = getNotificationIcon(notification.type);
                      return (
                        <div
                          key={notification.id}
                          className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                            !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <IconComponent className={`h-6 w-6 ${getNotificationColor(notification.type)}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {notification.title}
                                  </h3>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                  )}
                                  <Badge className={getPriorityColor(notification.priority)}>
                                    {notification.priority}
                                  </Badge>
                                  {notification.actionRequired && (
                                    <Badge variant="destructive">
                                      Action Required
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {notification.timestamp}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              {notification.shipmentId && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Related to: {notification.shipmentId}
                                </p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              {!notification.isRead && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common notification operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Bell className="h-6 w-6" />
                <span>View All</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <MarkAsRead className="h-6 w-6" />
                <span>Mark All Read</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Filter className="h-6 w-6" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;