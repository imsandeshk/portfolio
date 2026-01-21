import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye
} from 'lucide-react';

// Mock data - in real app, this would come from API
const mockShipments = [
  {
    id: 'SH001',
    crop: 'Wheat',
    quantity: '500 kg',
    destination: 'Central Market',
    status: 'In Transit',
    progress: 65,
    estimatedDelivery: '2024-01-15',
    currentLocation: 'Distribution Center A',
    logisticsPartner: 'Green Logistics Co.'
  },
  {
    id: 'SH002',
    crop: 'Rice',
    quantity: '300 kg',
    destination: 'Local Market',
    status: 'Delivered',
    progress: 100,
    estimatedDelivery: '2024-01-10',
    currentLocation: 'Local Market',
    logisticsPartner: 'Fast Track Logistics'
  },
  {
    id: 'SH003',
    crop: 'Corn',
    quantity: '750 kg',
    destination: 'Export Terminal',
    status: 'Processing',
    progress: 30,
    estimatedDelivery: '2024-01-20',
    currentLocation: 'Farm',
    logisticsPartner: 'Global Shipping Ltd.'
  }
];

const FarmerDashboard = () => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

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
      case 'In Transit': return Truck;
      case 'Processing': return Clock;
      case 'Delayed': return AlertCircle;
      default: return Package;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your crops and manage shipments</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active shipments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <span className="text-green-600 text-lg">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,600</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>Track your crop shipments and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockShipments.map((shipment) => {
              const StatusIcon = getStatusIcon(shipment.status);
              return (
                <div
                  key={shipment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <StatusIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {shipment.crop} - {shipment.quantity}
                          </h3>
                          <Badge className={getStatusColor(shipment.status)}>
                            {shipment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Shipment ID: {shipment.id} • Destination: {shipment.destination}
                        </p>
                        <p className="text-sm text-gray-500">
                          Logistics Partner: {shipment.logisticsPartner}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {shipment.currentLocation}
                        </p>
                        <p className="text-xs text-gray-500">
                          ETA: {shipment.estimatedDelivery}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedShipment(
                          selectedShipment === shipment.id ? null : shipment.id
                        )}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedShipment === shipment.id ? 'Hide' : 'View'}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedShipment === shipment.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{shipment.progress}%</span>
                          </div>
                          <Progress value={shipment.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Current Location:</span>
                            <p className="text-gray-600">{shipment.currentLocation}</p>
                          </div>
                          <div>
                            <span className="font-medium">Estimated Delivery:</span>
                            <p className="text-gray-600">{shipment.estimatedDelivery}</p>
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Package className="h-6 w-6" />
              <span>Create Shipment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <MapPin className="h-6 w-6" />
              <span>Track Shipment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Clock className="h-6 w-6" />
              <span>Update Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;