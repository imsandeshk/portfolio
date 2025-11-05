import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package,
  MapPin,
  Filter,
  CheckCheck,
  Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'shipment' | 'delivery' | 'system' | 'dispute' | 'weather';
  actionUrl?: string;
  actionText?: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Shipment Delay Alert',
      message: 'Shipment SCM-001-2024 is experiencing delays due to weather conditions. Expected delivery time updated to 2:00 PM tomorrow.',
      timestamp: '2024-01-12T10:30:00Z',
      read: false,
      priority: 'high',
      category: 'shipment',
      actionUrl: '/dashboard/tracking/SCM-001-2024',
      actionText: 'View Details'
    },
    {
      id: '2',
      type: 'success',
      title: 'Delivery Completed',
      message: 'Shipment SCM-002-2024 has been successfully delivered to Market B, New York.',
      timestamp: '2024-01-12T09:15:00Z',
      read: false,
      priority: 'medium',
      category: 'delivery',
      actionUrl: '/dashboard/shipments/SCM-002-2024',
      actionText: 'View Shipment'
    },
    {
      id: '3',
      type: 'error',
      title: 'Temperature Alert',
      message: 'Temperature in vehicle V-003 has exceeded safe limits. Immediate action required.',
      timestamp: '2024-01-12T08:45:00Z',
      read: true,
      priority: 'urgent',
      category: 'shipment',
      actionUrl: '/dashboard/vehicles/V-003',
      actionText: 'Check Vehicle'
    },
    {
      id: '4',
      type: 'info',
      title: 'New Order Received',
      message: 'A new order has been placed for 500kg of organic tomatoes. Please prepare for pickup.',
      timestamp: '2024-01-12T07:20:00Z',
      read: true,
      priority: 'medium',
      category: 'shipment',
      actionUrl: '/dashboard/orders/new',
      actionText: 'View Order'
    },
    {
      id: '5',
      type: 'warning',
      title: 'Weather Advisory',
      message: 'Severe weather conditions expected in the Midwest region. Consider alternative routes.',
      timestamp: '2024-01-11T16:30:00Z',
      read: true,
      priority: 'high',
      category: 'weather',
      actionUrl: '/dashboard/weather',
      actionText: 'View Weather'
    },
    {
      id: '6',
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.',
      timestamp: '2024-01-11T14:00:00Z',
      read: true,
      priority: 'low',
      category: 'system'
    },
    {
      id: '7',
      type: 'error',
      title: 'Dispute Reported',
      message: 'A dispute has been reported regarding shipment SCM-003-2024. Please review and respond.',
      timestamp: '2024-01-11T11:30:00Z',
      read: false,
      priority: 'urgent',
      category: 'dispute',
      actionUrl: '/dashboard/disputes/SCM-003-2024',
      actionText: 'Review Dispute'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getNotificationIcon = (type: string, category: string) => {
    if (category === 'shipment') return <Truck className="h-5 w-5" />;
    if (category === 'delivery') return <Package className="h-5 w-5" />;
    if (category === 'weather') return <MapPin className="h-5 w-5" />;
    if (category === 'dispute') return <AlertTriangle className="h-5 w-5" />;
    if (category === 'system') return <Bell className="h-5 w-5" />;
    
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'error': return <AlertTriangle className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'urgent' && notification.priority === 'urgent');
    
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    
    return matchesFilter && matchesCategory;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'shipment', label: 'Shipments' },
    { value: 'delivery', label: 'Deliveries' },
    { value: 'system', label: 'System' },
    { value: 'dispute', label: 'Disputes' },
    { value: 'weather', label: 'Weather' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with alerts and important information</p>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount} unread
            </Badge>
          )}
          {urgentCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {urgentCount} urgent
            </Badge>
          )}
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent ({urgentCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">Filter by category:</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up! No notifications to show.</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 ${
                    !notification.read ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type, notification.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <Badge variant="outline">
                              {notification.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{notification.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {notification.actionUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={notification.actionUrl}>
                                  {notification.actionText}
                                </a>
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <div className="space-y-4">
            {notifications.filter(n => !n.read).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-gray-600">You have no unread notifications.</p>
                </CardContent>
              </Card>
            ) : (
              notifications
                .filter(n => !n.read)
                .map((notification) => (
                  <Card key={notification.id} className="ring-2 ring-blue-200 bg-blue-50/30">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type, notification.category)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              <Badge variant="outline">
                                {notification.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{notification.message}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              {notification.actionUrl && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={notification.actionUrl}>
                                    {notification.actionText}
                                  </a>
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <div className="space-y-4">
            {notifications.filter(n => n.priority === 'urgent' && !n.read).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No urgent notifications</h3>
                  <p className="text-gray-600">All urgent matters have been addressed.</p>
                </CardContent>
              </Card>
            ) : (
              notifications
                .filter(n => n.priority === 'urgent' && !n.read)
                .map((notification) => (
                  <Alert key={notification.id} className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={notification.actionUrl}>
                                {notification.actionText}
                              </a>
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;