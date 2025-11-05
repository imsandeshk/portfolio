import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Search, Filter, Eye, MapPin } from 'lucide-react';
import Layout from '@/components/scm/Layout';
import { Shipment } from '@/types/scm';

const AllShipments: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
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
        farmerId: '123',
        farmerName: 'Green Valley Farms',
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
          address: 'Farm 456',
          city: 'Peoria',
          state: 'IL',
          coordinates: { lat: 40.6936, lng: -89.5890 }
        },
        destination: {
          address: 'Central Market',
          city: 'Chicago',
          state: 'IL',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        farmerId: '456',
        farmerName: 'Fresh Harvest Co.',
        actualDelivery: new Date('2025-10-22'),
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date(),
        checkpoints: []
      },
    ];
    setShipments(mockShipments);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      delivered: 'default',
      in_transit: 'secondary',
      delayed: 'destructive',
      pending: 'outline',
    };
    return variants[status] || 'default';
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8" />
            All Shipments
          </h1>
          <p className="text-muted-foreground">View and track all shipments in the system</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by batch number, crop type, or farmer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipments List */}
        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
            <CardDescription>
              {filteredShipments.length} shipment{filteredShipments.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="delayed">Delayed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredShipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{shipment.batchNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          {shipment.cropType} - {shipment.quantity} {shipment.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: {shipment.farmerName}
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
                        <MapPin className="mr-2 h-4 w-4" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="active" className="space-y-4 mt-4">
                {filteredShipments.filter(s => s.status === 'in_transit').map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{shipment.batchNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          {shipment.cropType} - {shipment.quantity} {shipment.unit}
                        </p>
                      </div>
                      <Badge variant="secondary">In Transit</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/scm/shipments/${shipment.id}/track`)}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="delivered" className="space-y-4 mt-4">
                {filteredShipments.filter(s => s.status === 'delivered').map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{shipment.batchNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          {shipment.cropType} - {shipment.quantity} {shipment.unit}
                        </p>
                      </div>
                      <Badge>Delivered</Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/scm/shipments/${shipment.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="delayed" className="space-y-4 mt-4">
                {filteredShipments.filter(s => s.status === 'delayed').length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No delayed shipments</p>
                  </div>
                ) : (
                  filteredShipments.filter(s => s.status === 'delayed').map((shipment) => (
                    <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{shipment.batchNumber}</h3>
                          <p className="text-sm text-muted-foreground">
                            {shipment.cropType} - {shipment.quantity} {shipment.unit}
                          </p>
                        </div>
                        <Badge variant="destructive">Delayed</Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/scm/shipments/${shipment.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AllShipments;
