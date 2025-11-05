import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';

interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  progress: number;
  checkpoints: Checkpoint[];
  carrier: string;
  vehicleId: string;
  driver: string;
  phone: string;
}

interface Checkpoint {
  id: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  description: string;
  handler: string;
}

const ShipmentTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // Mock data - in real app, this would come from API
  const [shipments] = useState<Shipment[]>([
    {
      id: '1',
      trackingNumber: 'SCM-001-2024',
      status: 'in_transit',
      origin: 'Farm A, California',
      destination: 'Market B, New York',
      currentLocation: 'Denver, Colorado',
      estimatedDelivery: '2024-01-15T14:00:00Z',
      progress: 65,
      carrier: 'Green Logistics Co.',
      vehicleId: 'V-001',
      driver: 'John Smith',
      phone: '+1-555-0123',
      checkpoints: [
        {
          id: '1',
          location: 'Farm A, California',
          timestamp: '2024-01-10T08:00:00Z',
          status: 'completed',
          description: 'Package picked up from farm',
          handler: 'John Smith'
        },
        {
          id: '2',
          location: 'Los Angeles Distribution Center',
          timestamp: '2024-01-10T12:00:00Z',
          status: 'completed',
          description: 'Package processed at distribution center',
          handler: 'Sarah Johnson'
        },
        {
          id: '3',
          location: 'Denver, Colorado',
          timestamp: '2024-01-12T16:30:00Z',
          status: 'in_progress',
          description: 'Package in transit to destination',
          handler: 'John Smith'
        },
        {
          id: '4',
          location: 'Chicago, Illinois',
          timestamp: '2024-01-14T10:00:00Z',
          status: 'pending',
          description: 'Scheduled stop at Chicago hub',
          handler: 'TBD'
        },
        {
          id: '5',
          location: 'Market B, New York',
          timestamp: '2024-01-15T14:00:00Z',
          status: 'pending',
          description: 'Final delivery to market',
          handler: 'TBD'
        }
      ]
    },
    {
      id: '2',
      trackingNumber: 'SCM-002-2024',
      status: 'delivered',
      origin: 'Farm C, Texas',
      destination: 'Market D, Florida',
      currentLocation: 'Market D, Florida',
      estimatedDelivery: '2024-01-12T16:00:00Z',
      actualDelivery: '2024-01-12T15:45:00Z',
      progress: 100,
      carrier: 'Fast Track Logistics',
      vehicleId: 'V-002',
      driver: 'Mike Wilson',
      phone: '+1-555-0456',
      checkpoints: [
        {
          id: '1',
          location: 'Farm C, Texas',
          timestamp: '2024-01-08T09:00:00Z',
          status: 'completed',
          description: 'Package picked up from farm',
          handler: 'Mike Wilson'
        },
        {
          id: '2',
          location: 'Houston Distribution Center',
          timestamp: '2024-01-08T13:00:00Z',
          status: 'completed',
          description: 'Package processed at distribution center',
          handler: 'Lisa Brown'
        },
        {
          id: '3',
          location: 'New Orleans, Louisiana',
          timestamp: '2024-01-10T11:00:00Z',
          status: 'completed',
          description: 'Package in transit to destination',
          handler: 'Mike Wilson'
        },
        {
          id: '4',
          location: 'Market D, Florida',
          timestamp: '2024-01-12T15:45:00Z',
          status: 'completed',
          description: 'Package delivered successfully',
          handler: 'Mike Wilson'
        }
      ]
    },
    {
      id: '3',
      trackingNumber: 'SCM-003-2024',
      status: 'delayed',
      origin: 'Farm E, Oregon',
      destination: 'Market F, Washington',
      currentLocation: 'Portland, Oregon',
      estimatedDelivery: '2024-01-13T12:00:00Z',
      progress: 25,
      carrier: 'Pacific Transport',
      vehicleId: 'V-003',
      driver: 'David Lee',
      phone: '+1-555-0789',
      checkpoints: [
        {
          id: '1',
          location: 'Farm E, Oregon',
          timestamp: '2024-01-11T10:00:00Z',
          status: 'completed',
          description: 'Package picked up from farm',
          handler: 'David Lee'
        },
        {
          id: '2',
          location: 'Portland, Oregon',
          timestamp: '2024-01-11T14:00:00Z',
          status: 'in_progress',
          description: 'Package delayed due to weather conditions',
          handler: 'David Lee'
        },
        {
          id: '3',
          location: 'Seattle, Washington',
          timestamp: '2024-01-14T08:00:00Z',
          status: 'pending',
          description: 'Scheduled stop at Seattle hub',
          handler: 'TBD'
        },
        {
          id: '4',
          location: 'Market F, Washington',
          timestamp: '2024-01-15T12:00:00Z',
          status: 'pending',
          description: 'Final delivery to market',
          handler: 'TBD'
        }
      ]
    }
  ]);

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'in_transit': return <Truck className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Shipments</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by tracking number, origin, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <Label htmlFor="status">Filter by Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredShipments.map((shipment) => (
            <Card key={shipment.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Package className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{shipment.trackingNumber}</h3>
                      <p className="text-sm text-gray-600">
                        {shipment.origin} → {shipment.destination}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(shipment.status)}>
                    {getStatusIcon(shipment.status)}
                    <span className="ml-1 capitalize">{shipment.status.replace('_', ' ')}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Location</p>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-red-500" />
                      {shipment.currentLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Estimated Delivery</p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      {formatDate(shipment.estimatedDelivery)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Progress</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{shipment.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Carrier: {shipment.carrier}</p>
                    <p>Driver: {shipment.driver} ({shipment.phone})</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>Real-time shipment locations and routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive map view</p>
                  <p className="text-sm text-gray-500">Map integration would be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <Card className="fixed inset-4 z-50 overflow-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Shipment Details - {selectedShipment.trackingNumber}
              <Button variant="ghost" onClick={() => setSelectedShipment(null)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Timeline */}
              <div>
                <h3 className="font-semibold mb-4">Shipment Progress</h3>
                <div className="space-y-4">
                  {selectedShipment.checkpoints.map((checkpoint, index) => (
                    <div key={checkpoint.id} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        checkpoint.status === 'completed' ? 'bg-green-500' :
                        checkpoint.status === 'in_progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{checkpoint.location}</p>
                          <Badge className={getStatusColor(checkpoint.status)}>
                            {checkpoint.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{checkpoint.description}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(checkpoint.timestamp)} • {checkpoint.handler}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Carrier</p>
                    <p>{selectedShipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Driver</p>
                    <p>{selectedShipment.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p>{selectedShipment.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vehicle ID</p>
                    <p>{selectedShipment.vehicleId}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShipmentTracking;