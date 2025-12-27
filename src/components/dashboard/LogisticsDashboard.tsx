import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Route,
  Package
} from 'lucide-react';

// Mock data
const mockDeliveries = [
  {
    id: 'DL001',
    shipmentId: 'SH001',
    origin: 'Farm A',
    destination: 'Central Market',
    status: 'In Transit',
    progress: 65,
    estimatedDelivery: '2024-01-15 14:00',
    currentLocation: 'Highway Checkpoint 3',
    driver: 'John Smith',
    vehicle: 'Truck-ABC123',
    distance: '45 km remaining'
  },
  {
    id: 'DL002',
    shipmentId: 'SH002',
    origin: 'Farm B',
    destination: 'Local Market',
    status: 'Delivered',
    progress: 100,
    estimatedDelivery: '2024-01-10 10:30',
    currentLocation: 'Local Market',
    driver: 'Mike Johnson',
    vehicle: 'Van-XYZ789',
    distance: '0 km'
  },
  {
    id: 'DL003',
    shipmentId: 'SH003',
    origin: 'Farm C',
    destination: 'Export Terminal',
    status: 'Delayed',
    progress: 25,
    estimatedDelivery: '2024-01-20 16:00',
    currentLocation: 'Loading Dock',
    driver: 'Sarah Wilson',
    vehicle: 'Truck-DEF456',
    distance: '120 km remaining',
    delayReason: 'Weather conditions'
  }
];

const LogisticsDashboard = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

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
          <h1 className="text-3xl font-bold text-gray-900">Logistics Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage deliveries and track vehicles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Delivery
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently in transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
          <CardDescription>Track and manage your current delivery operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDeliveries.map((delivery) => {
              const StatusIcon = getStatusIcon(delivery.status);
              return (
                <div
                  key={delivery.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <StatusIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {delivery.origin} → {delivery.destination}
                          </h3>
                          <Badge className={getStatusColor(delivery.status)}>
                            {delivery.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Delivery ID: {delivery.id} • Shipment: {delivery.shipmentId}
                        </p>
                        <p className="text-sm text-gray-500">
                          Driver: {delivery.driver} • Vehicle: {delivery.vehicle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {delivery.currentLocation}
                        </p>
                        <p className="text-xs text-gray-500">
                          {delivery.distance}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDelivery(
                          selectedDelivery === delivery.id ? null : delivery.id
                        )}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedDelivery === delivery.id ? 'Hide' : 'View'}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedDelivery === delivery.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{delivery.progress}%</span>
                          </div>
                          <Progress value={delivery.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Current Location:</span>
                            <p className="text-gray-600">{delivery.currentLocation}</p>
                          </div>
                          <div>
                            <span className="font-medium">Estimated Delivery:</span>
                            <p className="text-gray-600">{delivery.estimatedDelivery}</p>
                          </div>
                        </div>
                        {delivery.delayReason && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">
                              <strong>Delay Reason:</strong> {delivery.delayReason}
                            </p>
                          </div>
                        )}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common logistics operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Truck className="h-6 w-6" />
                <span>Update Location</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <CheckCircle className="h-6 w-6" />
                <span>Mark Delivered</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Route className="h-6 w-6" />
                <span>Optimize Route</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <AlertCircle className="h-6 w-6" />
                <span>Report Delay</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status</CardTitle>
            <CardDescription>Current vehicle locations and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">Truck-ABC123</p>
                  <p className="text-sm text-green-600">In Transit</p>
                </div>
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Van-XYZ789</p>
                  <p className="text-sm text-blue-600">Available</p>
                </div>
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-800">Truck-DEF456</p>
                  <p className="text-sm text-yellow-600">Loading</p>
                </div>
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogisticsDashboard;