import React, { useState, useEffect } from 'react';
import { useSCMAuth } from '@/contexts/SCMAuthContext';
import { Shipment, Vehicle } from '@/types/scm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, MapPin, Package, Clock, Navigation, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/scm/Layout';

const LogisticsDashboard: React.FC = () => {
  const { user } = useSCMAuth();
  const navigate = useNavigate();
  const [activeShipments, setActiveShipments] = useState<Shipment[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

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
        currentLocation: { lat: 40.8, lng: -88.5 },
        farmerId: '123',
        farmerName: 'John Farmer',
        logisticsPartnerId: user?.id,
        logisticsPartnerName: user?.name || '',
        estimatedDelivery: new Date('2025-10-26'),
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date(),
        checkpoints: []
      },
    ];

    const mockVehicles: Vehicle[] = [
      {
        id: 'v1',
        vehicleNumber: 'TRK-001',
        type: 'Refrigerated Truck',
        capacity: 10000,
        status: 'in_transit',
        driverId: 'd1',
        driverName: 'Mike Driver',
        currentLocation: { lat: 40.8, lng: -88.5 }
      },
      {
        id: 'v2',
        vehicleNumber: 'TRK-002',
        type: 'Standard Truck',
        capacity: 8000,
        status: 'available',
        driverId: 'd2',
        driverName: 'Sarah Driver',
      },
    ];

    setActiveShipments(mockShipments);
    setVehicles(mockVehicles);
  }, [user]);

  const stats = {
    activeDeliveries: activeShipments.filter(s => s.status === 'in_transit').length,
    completedToday: 5,
    availableVehicles: vehicles.filter(v => v.status === 'available').length,
    totalVehicles: vehicles.length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Logistics Dashboard</h1>
          <p className="text-muted-foreground">Manage deliveries and vehicle fleet</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDeliveries}</div>
              <p className="text-xs text-muted-foreground">In transit now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedToday}</div>
              <p className="text-xs text-muted-foreground">Delivered successfully</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableVehicles}</div>
              <p className="text-xs text-muted-foreground">Ready for assignment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fleet Size</CardTitle>
              <Navigation className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVehicles}</div>
              <p className="text-xs text-muted-foreground">Total vehicles</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Shipments and Vehicles */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
              <CardDescription>Shipments currently in transit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeShipments.map((shipment) => (
                <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{shipment.batchNumber}</h3>
                      <p className="text-sm text-muted-foreground">{shipment.cropType}</p>
                    </div>
                    <Badge>In Transit</Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{shipment.destination.city}, {shipment.destination.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>ETA: {shipment.estimatedDelivery?.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/scm/shipments/${shipment.id}/update`)}
                    >
                      Update Status
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/scm/shipments/${shipment.id}/track`)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Fleet</CardTitle>
              <CardDescription>Manage your delivery vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="all">All Vehicles</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4 mt-4">
                  {vehicles.filter(v => v.status === 'in_transit').map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{vehicle.vehicleNumber}</h3>
                          <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                        </div>
                        <Badge variant="secondary">In Transit</Badge>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Driver: {vehicle.driverName}</p>
                        <p className="text-muted-foreground">Capacity: {vehicle.capacity} kg</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        Track Vehicle
                      </Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{vehicle.vehicleNumber}</h3>
                          <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                        </div>
                        <Badge variant={vehicle.status === 'available' ? 'default' : 'secondary'}>
                          {vehicle.status}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Driver: {vehicle.driverName}</p>
                        <p className="text-muted-foreground">Capacity: {vehicle.capacity} kg</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LogisticsDashboard;
