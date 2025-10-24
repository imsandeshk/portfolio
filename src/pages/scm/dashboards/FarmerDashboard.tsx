import React, { useState, useEffect } from 'react';
import { useSCMAuth } from '@/contexts/SCMAuthContext';
import { Shipment } from '@/types/scm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, TrendingUp, Truck, AlertCircle, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/scm/Layout';

const FarmerDashboard: React.FC = () => {
  const { user } = useSCMAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockShipments: Shipment[] = [
      {
        id: '1',
        batchNumber: 'BATCH-2025-001',
        cropType: 'Wheat',
        quantity: 5000,
        unit: 'kg',
        status: 'in_transit',
        origin: {
          address: 'Farm 123',
          city: 'Springfield',
          state: 'IL',
          coordinates: { lat: 39.7817, lng: -89.6501 }
        },
        destination: {
          address: 'Market Hub',
          city: 'Chicago',
          state: 'IL',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        farmerId: user?.id || '',
        farmerName: user?.name || '',
        estimatedDelivery: new Date('2025-10-26'),
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date(),
        checkpoints: []
      },
      {
        id: '2',
        batchNumber: 'BATCH-2025-002',
        cropType: 'Corn',
        quantity: 3000,
        unit: 'kg',
        status: 'delivered',
        origin: {
          address: 'Farm 123',
          city: 'Springfield',
          state: 'IL',
          coordinates: { lat: 39.7817, lng: -89.6501 }
        },
        destination: {
          address: 'Market Hub',
          city: 'Chicago',
          state: 'IL',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        farmerId: user?.id || '',
        farmerName: user?.name || '',
        actualDelivery: new Date('2025-10-22'),
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date(),
        checkpoints: []
      },
    ];
    setShipments(mockShipments);
  }, [user]);

  const stats = {
    totalShipments: shipments.length,
    activeShipments: shipments.filter(s => s.status === 'in_transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    delayed: shipments.filter(s => s.status === 'delayed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'in_transit': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      delivered: 'default',
      in_transit: 'secondary',
      delayed: 'destructive',
      pending: 'outline',
    };
    return variants[status] || 'default';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={() => navigate('/scm/shipments/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Shipment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalShipments}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeShipments}</div>
              <p className="text-xs text-muted-foreground">Currently in transit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delayed</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delayed}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Shipments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
            <CardDescription>Track and manage your crop shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="all">All Shipments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4 mt-4">
                {shipments.filter(s => s.status === 'in_transit').map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{shipment.batchNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          {shipment.cropType} - {shipment.quantity} {shipment.unit}
                        </p>
                      </div>
                      <Badge variant={getStatusBadge(shipment.status)}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">From:</span>
                      <span>{shipment.origin.city}, {shipment.origin.state}</span>
                      <span className="text-muted-foreground">→</span>
                      <span>{shipment.destination.city}, {shipment.destination.state}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Progress</span>
                        <span className="text-muted-foreground">
                          Est: {shipment.estimatedDelivery?.toLocaleDateString()}
                        </span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/scm/shipments/${shipment.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/scm/shipments/${shipment.id}/track`)}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-4 mt-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{shipment.batchNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          {shipment.cropType} - {shipment.quantity} {shipment.unit}
                        </p>
                      </div>
                      <Badge variant={getStatusBadge(shipment.status)}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">From:</span>
                      <span>{shipment.origin.city}, {shipment.origin.state}</span>
                      <span className="text-muted-foreground">→</span>
                      <span>{shipment.destination.city}, {shipment.destination.state}</span>
                    </div>

                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/scm/shipments/${shipment.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FarmerDashboard;
