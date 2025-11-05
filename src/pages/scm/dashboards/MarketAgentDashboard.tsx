import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/scm/Layout';
import { Shipment } from '@/types/scm';

const MarketAgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [incomingShipments, setIncomingShipments] = useState<Shipment[]>([]);

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
        farmerName: 'John Farmer',
        estimatedDelivery: new Date('2025-10-26'),
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date(),
        checkpoints: []
      },
    ];
    setIncomingShipments(mockShipments);
  }, []);

  const stats = {
    incomingShipments: incomingShipments.length,
    processedToday: 12,
    activeFarmers: 45,
    monthlyRevenue: 125000,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Market Agent Dashboard</h1>
          <p className="text-muted-foreground">Manage market operations and shipments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incoming Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.incomingShipments}</div>
              <p className="text-xs text-muted-foreground">Expected arrivals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.processedToday}</div>
              <p className="text-xs text-muted-foreground">Shipments handled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeFarmers}</div>
              <p className="text-xs text-muted-foreground">Connected suppliers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.monthlyRevenue / 1000).toFixed(0)}k</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Incoming Shipments */}
        <Card>
          <CardHeader>
            <CardTitle>Incoming Shipments</CardTitle>
            <CardDescription>Shipments arriving at the market</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomingShipments.map((shipment) => (
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
                  <Badge>In Transit</Badge>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Expected: {shipment.estimatedDelivery?.toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/scm/shipments/${shipment.id}`)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Track Shipment
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MarketAgentDashboard;
