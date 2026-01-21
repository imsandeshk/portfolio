import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Star,
  TrendingUp
} from 'lucide-react';

// Mock data
const mockOrders = [
  {
    id: 'ORD001',
    crop: 'Wheat',
    quantity: '500 kg',
    farmer: 'John Smith',
    price: '₹25,000',
    status: 'In Transit',
    progress: 75,
    estimatedDelivery: '2024-01-15 14:00',
    currentLocation: 'Distribution Center',
    quality: 'Premium',
    rating: 4.8
  },
  {
    id: 'ORD002',
    crop: 'Rice',
    quantity: '300 kg',
    farmer: 'Sarah Johnson',
    price: '₹18,000',
    status: 'Delivered',
    progress: 100,
    estimatedDelivery: '2024-01-10 10:30',
    currentLocation: 'Your Location',
    quality: 'Standard',
    rating: 4.5
  },
  {
    id: 'ORD003',
    crop: 'Corn',
    quantity: '750 kg',
    farmer: 'Mike Wilson',
    price: '₹37,500',
    status: 'Processing',
    progress: 30,
    estimatedDelivery: '2024-01-20 16:00',
    currentLocation: 'Farm',
    quality: 'Organic',
    rating: 4.9
  }
];

const mockFavorites = [
  {
    id: 'FAV001',
    farmer: 'John Smith',
    crop: 'Wheat',
    quality: 'Premium',
    rating: 4.8,
    lastOrder: '2024-01-10',
    totalOrders: 12
  },
  {
    id: 'FAV002',
    farmer: 'Sarah Johnson',
    crop: 'Rice',
    quality: 'Standard',
    rating: 4.5,
    lastOrder: '2024-01-08',
    totalOrders: 8
  }
];

const BuyerDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return CheckCircle;
      case 'In Transit': return Package;
      case 'Processing': return Clock;
      case 'Delayed': return AlertCircle;
      default: return ShoppingCart;
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Organic': return 'bg-green-100 text-green-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-600 mt-1">Track orders and manage your purchases</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Currently tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,000</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Farmers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Trusted suppliers</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Current Orders</CardTitle>
          <CardDescription>Track your active orders and their delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <StatusIcon className="h-8 w-8 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {order.crop} - {order.quantity}
                          </h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge className={getQualityColor(order.quality)}>
                            {order.quality}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Order ID: {order.id} • Farmer: {order.farmer}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: {order.price} • Rating: {order.rating}/5
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {order.currentLocation}
                        </p>
                        <p className="text-xs text-gray-500">
                          ETA: {order.estimatedDelivery}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(
                          selectedOrder === order.id ? null : order.id
                        )}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedOrder === order.id ? 'Hide' : 'View'}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{order.progress}%</span>
                          </div>
                          <Progress value={order.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Current Location:</span>
                            <p className="text-gray-600">{order.currentLocation}</p>
                          </div>
                          <div>
                            <span className="font-medium">Estimated Delivery:</span>
                            <p className="text-gray-600">{order.estimatedDelivery}</p>
                          </div>
                          <div>
                            <span className="font-medium">Quality:</span>
                            <p className="text-gray-600">{order.quality}</p>
                          </div>
                          <div>
                            <span className="font-medium">Farmer Rating:</span>
                            <p className="text-gray-600">{order.rating}/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Farmers */}
      <Card>
        <CardHeader>
          <CardTitle>Favorite Farmers</CardTitle>
          <CardDescription>Your trusted suppliers and their ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFavorites.map((farmer) => (
              <div
                key={farmer.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {farmer.farmer}
                        </h3>
                        <Badge className={getQualityColor(farmer.quality)}>
                          {farmer.quality}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Specializes in: {farmer.crop}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total orders: {farmer.totalOrders} • Last order: {farmer.lastOrder}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900">
                          {farmer.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Order Again
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common buyer operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <ShoppingCart className="h-6 w-6" />
              <span>Place Order</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Package className="h-6 w-6" />
              <span>Track Order</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Star className="h-6 w-6" />
              <span>Rate Farmer</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>View History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboard;