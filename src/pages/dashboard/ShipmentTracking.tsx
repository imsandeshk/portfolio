import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Navigation
} from 'lucide-react';

// Mock data for shipments
const mockShipments = [
  {
    id: 'SH001',
    crop: 'Wheat',
    quantity: '500 kg',
    origin: 'Farm A, Punjab',
    destination: 'Central Market, Delhi',
    status: 'In Transit',
    progress: 65,
    currentLocation: 'Highway Checkpoint 3',
    estimatedDelivery: '2024-01-15 14:00',
    logisticsPartner: 'Green Logistics Co.',
    driver: 'John Smith',
    vehicle: 'Truck-ABC123',
    checkpoints: [
      { name: 'Farm A, Punjab', timestamp: '2024-01-14 08:00', status: 'completed' },
      { name: 'Loading Dock', timestamp: '2024-01-14 09:30', status: 'completed' },
      { name: 'Highway Checkpoint 1', timestamp: '2024-01-14 11:00', status: 'completed' },
      { name: 'Highway Checkpoint 2', timestamp: '2024-01-14 13:30', status: 'completed' },
      { name: 'Highway Checkpoint 3', timestamp: '2024-01-14 15:45', status: 'current' },
      { name: 'Distribution Center', timestamp: '2024-01-15 10:00', status: 'pending' },
      { name: 'Central Market, Delhi', timestamp: '2024-01-15 14:00', status: 'pending' }
    ],
    coordinates: {
      current: { lat: 28.7041, lng: 77.1025 },
      origin: { lat: 31.1471, lng: 75.3412 },
      destination: { lat: 28.6139, lng: 77.2090 }
    }
  },
  {
    id: 'SH002',
    crop: 'Rice',
    quantity: '300 kg',
    origin: 'Farm B, Haryana',
    destination: 'Local Market, Gurgaon',
    status: 'Delivered',
    progress: 100,
    currentLocation: 'Local Market, Gurgaon',
    estimatedDelivery: '2024-01-10 10:30',
    logisticsPartner: 'Fast Track Logistics',
    driver: 'Mike Johnson',
    vehicle: 'Van-XYZ789',
    checkpoints: [
      { name: 'Farm B, Haryana', timestamp: '2024-01-09 07:00', status: 'completed' },
      { name: 'Loading Dock', timestamp: '2024-01-09 08:30', status: 'completed' },
      { name: 'Highway Checkpoint 1', timestamp: '2024-01-09 10:00', status: 'completed' },
      { name: 'Local Market, Gurgaon', timestamp: '2024-01-10 10:30', status: 'completed' }
    ],
    coordinates: {
      current: { lat: 28.4595, lng: 77.0266 },
      origin: { lat: 29.0588, lng: 76.0856 },
      destination: { lat: 28.4595, lng: 77.0266 }
    }
  }
];

const ShipmentTracking = () => {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [shipments, setShipments] = useState(mockShipments);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

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
      default: return MapPin;
    }
  };

  const getCheckpointStatus = (checkpoint: any) => {
    switch (checkpoint.status) {
      case 'completed': return 'text-green-600';
      case 'current': return 'text-blue-600';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipment Tracking</h1>
            <p className="text-gray-600 mt-1">Track shipments in real-time across the supply chain</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by shipment ID, crop, origin, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredShipments.map((shipment) => {
            const StatusIcon = getStatusIcon(shipment.status);
            return (
              <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className="h-6 w-6 text-green-600" />
                      <CardTitle className="text-lg">{shipment.crop} - {shipment.quantity}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Shipment ID: {shipment.id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Origin:</span>
                      <p className="text-gray-900">{shipment.origin}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Destination:</span>
                      <p className="text-gray-900">{shipment.destination}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Current Location:</span>
                      <p className="text-gray-900">{shipment.currentLocation}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">ETA:</span>
                      <p className="text-gray-900">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{shipment.progress}%</span>
                    </div>
                    <Progress value={shipment.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {shipment.logisticsPartner} • {shipment.driver}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedShipment(
                        selectedShipment === shipment.id ? null : shipment.id
                      )}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      {selectedShipment === shipment.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </div>

                  {selectedShipment === shipment.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Checkpoints</h4>
                      <div className="space-y-3">
                        {shipment.checkpoints.map((checkpoint, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                              checkpoint.status === 'completed' ? 'bg-green-500' :
                              checkpoint.status === 'current' ? 'bg-blue-500' :
                              'bg-gray-300'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${getCheckpointStatus(checkpoint)}`}>
                                {checkpoint.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {checkpoint.timestamp}
                              </p>
                            </div>
                            {checkpoint.status === 'completed' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {checkpoint.status === 'current' && (
                              <Clock className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Map Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Map</CardTitle>
            <CardDescription>Visual representation of shipment routes and current locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Interactive map visualization</p>
                <p className="text-sm text-gray-400 mt-2">
                  This would integrate with a mapping service like Google Maps or Mapbox
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tracking operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Search className="h-6 w-6" />
                <span>Search Shipment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <RefreshCw className="h-6 w-6" />
                <span>Refresh Status</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <MapPin className="h-6 w-6" />
                <span>View on Map</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <AlertCircle className="h-6 w-6" />
                <span>Report Issue</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ShipmentTracking;