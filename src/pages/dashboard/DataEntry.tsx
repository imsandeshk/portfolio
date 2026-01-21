import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar,
  Upload,
  Save,
  Plus,
  CheckCircle
} from 'lucide-react';

interface ShipmentData {
  id?: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  carrier: string;
  vehicleId: string;
  driver: string;
  phone: string;
  estimatedDelivery: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
  description: string;
  weight: string;
  dimensions: string;
  temperature: string;
  humidity: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
}

interface CheckpointData {
  id?: string;
  shipmentId: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  description: string;
  handler: string;
  temperature?: string;
  humidity?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
}

const DataEntry: React.FC = () => {
  const { role } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('shipment');

  // Shipment form state
  const [shipmentForm, setShipmentForm] = useState<ShipmentData>({
    trackingNumber: '',
    origin: '',
    destination: '',
    carrier: '',
    vehicleId: '',
    driver: '',
    phone: '',
    estimatedDelivery: '',
    status: 'pending',
    description: '',
    weight: '',
    dimensions: '',
    temperature: '',
    humidity: '',
    quality: 'good',
    notes: ''
  });

  // Checkpoint form state
  const [checkpointForm, setCheckpointForm] = useState<CheckpointData>({
    shipmentId: '',
    location: '',
    timestamp: new Date().toISOString().slice(0, 16),
    status: 'completed',
    description: '',
    handler: '',
    temperature: '',
    humidity: '',
    condition: 'good',
    notes: ''
  });

  const [recentEntries, setRecentEntries] = useState<ShipmentData[]>([
    {
      id: '1',
      trackingNumber: 'SCM-001-2024',
      origin: 'Farm A, California',
      destination: 'Market B, New York',
      carrier: 'Green Logistics Co.',
      vehicleId: 'V-001',
      driver: 'John Smith',
      phone: '+1-555-0123',
      estimatedDelivery: '2024-01-15T14:00:00Z',
      status: 'in_transit',
      description: 'Fresh organic tomatoes',
      weight: '500 kg',
      dimensions: '120x80x60 cm',
      temperature: '4°C',
      humidity: '65%',
      quality: 'excellent',
      notes: 'Handled with care, no damage'
    }
  ]);

  const handleShipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate tracking number if not provided
    if (!shipmentForm.trackingNumber) {
      const trackingNumber = `SCM-${Date.now().toString().slice(-6)}-${new Date().getFullYear()}`;
      setShipmentForm(prev => ({ ...prev, trackingNumber }));
    }

    // Add to recent entries
    const newEntry = { ...shipmentForm, id: Date.now().toString() };
    setRecentEntries(prev => [newEntry, ...prev]);

    toast({
      title: "Shipment Created",
      description: `Shipment ${newEntry.trackingNumber} has been created successfully.`,
    });

    // Reset form
    setShipmentForm({
      trackingNumber: '',
      origin: '',
      destination: '',
      carrier: '',
      vehicleId: '',
      driver: '',
      phone: '',
      estimatedDelivery: '',
      status: 'pending',
      description: '',
      weight: '',
      dimensions: '',
      temperature: '',
      humidity: '',
      quality: 'good',
      notes: ''
    });
  };

  const handleCheckpointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Checkpoint Updated",
      description: `Checkpoint at ${checkpointForm.location} has been recorded.`,
    });

    // Reset form
    setCheckpointForm({
      shipmentId: '',
      location: '',
      timestamp: new Date().toISOString().slice(0, 16),
      status: 'completed',
      description: '',
      handler: '',
      temperature: '',
      humidity: '',
      condition: 'good',
      notes: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Entry</h1>
          <p className="text-gray-600">
            {role === 'farmer' ? 'Record crop shipments and updates' : 'Update shipment status and checkpoints'}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shipment">
            <Package className="mr-2 h-4 w-4" />
            {role === 'farmer' ? 'New Shipment' : 'Shipment Details'}
          </TabsTrigger>
          <TabsTrigger value="checkpoint">
            <MapPin className="mr-2 h-4 w-4" />
            Update Checkpoint
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                {role === 'farmer' ? 'Create New Shipment' : 'Shipment Information'}
              </CardTitle>
              <CardDescription>
                {role === 'farmer' 
                  ? 'Record details of your crop shipment' 
                  : 'Enter shipment details and logistics information'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShipmentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="trackingNumber">Tracking Number</Label>
                    <Input
                      id="trackingNumber"
                      placeholder="Auto-generated if empty"
                      value={shipmentForm.trackingNumber}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, trackingNumber: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={shipmentForm.status} 
                      onValueChange={(value) => setShipmentForm(prev => ({ ...prev, status: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      placeholder="Farm or pickup location"
                      value={shipmentForm.origin}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, origin: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Market or delivery location"
                      value={shipmentForm.destination}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, destination: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {role === 'logistics' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="carrier">Carrier</Label>
                        <Input
                          id="carrier"
                          placeholder="Logistics company name"
                          value={shipmentForm.carrier}
                          onChange={(e) => setShipmentForm(prev => ({ ...prev, carrier: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vehicleId">Vehicle ID</Label>
                        <Input
                          id="vehicleId"
                          placeholder="Vehicle identifier"
                          value={shipmentForm.vehicleId}
                          onChange={(e) => setShipmentForm(prev => ({ ...prev, vehicleId: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="driver">Driver Name</Label>
                        <Input
                          id="driver"
                          placeholder="Driver full name"
                          value={shipmentForm.driver}
                          onChange={(e) => setShipmentForm(prev => ({ ...prev, driver: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Driver Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1-555-0123"
                        value={shipmentForm.phone}
                        onChange={(e) => setShipmentForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                  <Input
                    id="estimatedDelivery"
                    type="datetime-local"
                    value={shipmentForm.estimatedDelivery}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the shipment contents"
                    value={shipmentForm.description}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      placeholder="e.g., 500 kg"
                      value={shipmentForm.weight}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, weight: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      placeholder="e.g., 120x80x60 cm"
                      value={shipmentForm.dimensions}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, dimensions: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality</Label>
                    <Select 
                      value={shipmentForm.quality} 
                      onValueChange={(value) => setShipmentForm(prev => ({ ...prev, quality: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      placeholder="e.g., 4°C"
                      value={shipmentForm.temperature}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, temperature: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity</Label>
                    <Input
                      id="humidity"
                      placeholder="e.g., 65%"
                      value={shipmentForm.humidity}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, humidity: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about the shipment"
                    value={shipmentForm.notes}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {role === 'farmer' ? 'Create Shipment' : 'Update Shipment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkpoint">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Update Checkpoint
              </CardTitle>
              <CardDescription>
                Record shipment progress and location updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckpointSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shipmentId">Shipment ID</Label>
                  <Select 
                    value={checkpointForm.shipmentId} 
                    onValueChange={(value) => setCheckpointForm(prev => ({ ...prev, shipmentId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {recentEntries.map((entry) => (
                        <SelectItem key={entry.id} value={entry.id!}>
                          {entry.trackingNumber} - {entry.origin} → {entry.destination}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Current location"
                      value={checkpointForm.location}
                      onChange={(e) => setCheckpointForm(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timestamp">Timestamp</Label>
                    <Input
                      id="timestamp"
                      type="datetime-local"
                      value={checkpointForm.timestamp}
                      onChange={(e) => setCheckpointForm(prev => ({ ...prev, timestamp: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={checkpointForm.status} 
                      onValueChange={(value) => setCheckpointForm(prev => ({ ...prev, status: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="handler">Handler</Label>
                    <Input
                      id="handler"
                      placeholder="Person handling the shipment"
                      value={checkpointForm.handler}
                      onChange={(e) => setCheckpointForm(prev => ({ ...prev, handler: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what happened at this checkpoint"
                    value={checkpointForm.description}
                    onChange={(e) => setCheckpointForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      placeholder="e.g., 4°C"
                      value={checkpointForm.temperature}
                      onChange={(e) => setCheckpointForm(prev => ({ ...prev, temperature: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity</Label>
                    <Input
                      id="humidity"
                      placeholder="e.g., 65%"
                      value={checkpointForm.humidity}
                      onChange={(e) => setCheckpointForm(prev => ({ ...prev, humidity: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select 
                      value={checkpointForm.condition} 
                      onValueChange={(value) => setCheckpointForm(prev => ({ ...prev, condition: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional observations"
                    value={checkpointForm.notes}
                    onChange={(e) => setCheckpointForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update Checkpoint
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Your latest data entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{entry.trackingNumber}</p>
                    <p className="text-sm text-gray-600">
                      {entry.origin} → {entry.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(entry.status)}>
                    {entry.status.replace('_', ' ')}
                  </Badge>
                  <Badge className={getQualityColor(entry.quality)}>
                    {entry.quality}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataEntry;