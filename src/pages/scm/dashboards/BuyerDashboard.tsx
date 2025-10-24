import React, { useState, useEffect } from 'react';
import { useSCMAuth } from '@/contexts/SCMAuthContext';
import { Shipment } from '@/types/scm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Clock, TrendingUp, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/scm/Layout';
import { Progress } from '@/components/ui/progress';

const BuyerDashboard: React.FC = () => {
  const { user } = useSCMAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Shipment[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockOrders: Shipment[] = [
      {
        id: '1',
        batchNumber: 'ORD-2025-101',
        cropType: 'Organic Wheat',
        quantity: 2000,
        unit: 'kg',
        status: 'in_transit',
        origin: {
          address: 'Farm 456',
          city: 'Springfield',
          state: 'IL',
          coordinates: { lat: 39.7817, lng: -89.6501 }
        },
        destination: {
          address: user?.address || 'Buyer Location',
          city: 'Chicago',
          state: 'IL',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        farmerId: '123',
        farmerName: 'Green Valley Farms',
        buyerId: user?.id,
        buyerName: user?.name || '',
        estimatedDelivery: new Date('2025-10-26'),
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date(),
        checkpoints: []
      },
      {
        id: '2',
        batchNumber: 'ORD-2025-102',
        cropType: 'Fresh Vegetables',
        quantity: 1500,
        unit: 'kg',
        status: 'delivered',
        origin: {
          address: 'Farm 789',
          city: 'Peoria',
          state: 'IL',
          coordinates: { lat: 40.6936, lng: -89.5890 }
        },
        destination: {
          address: user?.address || 'Buyer Location',
          city: 'Chicago',
          state: 'IL',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        farmerId: '456',
        farmerName: 'Fresh Harvest Co.',
        buyerId: user?.id,
        buyerName: user?.name || '',
        actualDelivery: new Date('2025-10-22'),
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date(),
        checkpoints: []
      },
    ];
    setOrders(mockOrders);
  }, [user]);

  const stats = {
    activeOrders: orders.filter(o => o.status === 'in_transit').length,
    pendingDeliveries: orders.filter(o => ['in_transit', 'at_checkpoint'].includes(o.status)).length,
    completedOrders: orders.filter(o => o.status === 'delivered').length,
    totalOrders: orders.length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Track your orders and shipments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">Currently in transit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDeliveries}</div>
              <p className="text-xs text-muted-foreground">Arriving soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedOrders}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>Track your current shipments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.filter(o => o.status === 'in_transit').map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{order.batchNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.cropType} - {order.quantity} {order.unit}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {order.farmerName}
                    </p>
                  </div>
                  <Badge>In Transit</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.origin.city}, {order.origin.state}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>{order.destination.city}, {order.destination.state}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Delivery</span>
                      <span className="font-medium">
                        {order.estimatedDelivery?.toLocaleDateString()}
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => navigate(`/scm/shipments/${order.id}/track`)}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Track Shipment
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/scm/shipments/${order.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}

            {orders.filter(o => o.status === 'in_transit').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No active orders at the moment</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
            <CardDescription>Your completed orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.filter(o => o.status === 'delivered').map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{order.batchNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.cropType} - {order.quantity} {order.unit}
                    </p>
                  </div>
                  <Badge variant="default">Delivered</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Delivered on: {order.actualDelivery?.toLocaleDateString()}
                </p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate(`/scm/shipments/${order.id}`)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BuyerDashboard;
