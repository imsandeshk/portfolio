import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Package, Thermometer, Droplets, CheckCircle, Clock } from 'lucide-react';
import Layout from '@/components/scm/Layout';
import { Shipment, Checkpoint } from '@/types/scm';
import ShipmentMap from '@/components/scm/ShipmentMap';

const ShipmentTracking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    // Mock data - replace with API call
    const mockShipment: Shipment = {
      id: id || '1',
      batchNumber: 'BATCH-2025-001',
      cropType: 'Wheat',
      quantity: 5000,
      unit: 'kg',
      status: 'in_transit',
      origin: {
        address: 'Green Valley Farm, 123 Rural Road',
        city: 'Springfield',
        state: 'IL',
        coordinates: { lat: 39.7817, lng: -89.6501 }
      },
      destination: {
        address: 'Central Market Hub, 456 Market Street',
        city: 'Chicago',
        state: 'IL',
        coordinates: { lat: 41.8781, lng: -87.6298 }
      },
      currentLocation: { lat: 40.8, lng: -88.5 },
      farmerId: '123',
      farmerName: 'Green Valley Farms',
      buyerId: '456',
      buyerName: 'Fresh Markets Co.',
      logisticsPartnerId: '789',
      logisticsPartnerName: 'Swift Logistics',
      estimatedDelivery: new Date('2025-10-26'),
      createdAt: new Date('2025-10-23'),
      updatedAt: new Date(),
      conditions: {
        temperature: 18,
        humidity: 55,
        quality: 'good',
        packaging: 'Sealed bags',
      },
      checkpoints: [
        {
          id: 'c1',
          shipmentId: id || '1',
          location: {
            address: 'Green Valley Farm',
            city: 'Springfield',
            state: 'IL',
            coordinates: { lat: 39.7817, lng: -89.6501 }
          },
          timestamp: new Date('2025-10-23T08:00:00'),
          handlerName: 'John Farmer',
          handlerId: '123',
          status: 'Shipment created and loaded',
          temperature: 20,
          humidity: 60,
        },
        {
          id: 'c2',
          shipmentId: id || '1',
          location: {
            address: 'Distribution Center A',
            city: 'Bloomington',
            state: 'IL',
            coordinates: { lat: 40.4842, lng: -88.9937 }
          },
          timestamp: new Date('2025-10-23T14:30:00'),
          handlerName: 'Mike Logistics',
          handlerId: '789',
          status: 'Checkpoint - All conditions normal',
          temperature: 18,
          humidity: 55,
        },
        {
          id: 'c3',
          shipmentId: id || '1',
          location: {
            address: 'Transit Hub B',
            city: 'Normal',
            state: 'IL',
            coordinates: { lat: 40.5142, lng: -88.9906 }
          },
          timestamp: new Date('2025-10-24T09:15:00'),
          handlerName: 'Sarah Handler',
          handlerId: '790',
          status: 'In transit - On schedule',
          temperature: 19,
          humidity: 53,
        },
      ]
    };
    setShipment(mockShipment);
  }, [id]);

  if (!shipment) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading shipment details...</p>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'in_transit': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      case 'at_checkpoint': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Shipment Tracking</h1>
            <p className="text-muted-foreground">{shipment.batchNumber}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Shipment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Live Location</CardTitle>
                <CardDescription>Real-time shipment tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ShipmentMap shipment={shipment} />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Timeline</CardTitle>
                <CardDescription>Checkpoints and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {shipment.checkpoints.map((checkpoint, index) => (
                    <div key={checkpoint.id} className="relative pl-8">
                      {/* Timeline line */}
                      {index !== shipment.checkpoints.length - 1 && (
                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
                      )}
                      
                      {/* Checkpoint marker */}
                      <div className="absolute left-0 top-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>

                      {/* Checkpoint details */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{checkpoint.status}</h4>
                            <p className="text-sm text-muted-foreground">
                              {checkpoint.location.address}, {checkpoint.location.city}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {checkpoint.timestamp.toLocaleString()}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Handler: {checkpoint.handlerName}</span>
                          {checkpoint.temperature && (
                            <span className="flex items-center gap-1">
                              <Thermometer className="h-4 w-4" />
                              {checkpoint.temperature}°C
                            </span>
                          )}
                          {checkpoint.humidity && (
                            <span className="flex items-center gap-1">
                              <Droplets className="h-4 w-4" />
                              {checkpoint.humidity}%
                            </span>
                          )}
                        </div>

                        {checkpoint.notes && (
                          <p className="text-sm">{checkpoint.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Destination (future checkpoint) */}
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">Destination</h4>
                          <p className="text-sm text-muted-foreground">
                            {shipment.destination.address}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {shipment.estimatedDelivery?.toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Estimated arrival
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Shipment Info */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(shipment.status)}`} />
                  <Badge variant="secondary" className="text-base capitalize">
                    {shipment.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Batch Number</p>
                  <p className="font-medium">{shipment.batchNumber}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Crop Type</p>
                  <p className="font-medium">{shipment.cropType}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{shipment.quantity} {shipment.unit}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Farmer</p>
                  <p className="font-medium">{shipment.farmerName}</p>
                </div>
                {shipment.buyerName && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="font-medium">{shipment.buyerName}</p>
                    </div>
                  </>
                )}
                {shipment.logisticsPartnerName && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Logistics Partner</p>
                      <p className="font-medium">{shipment.logisticsPartnerName}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Conditions Card */}
            {shipment.conditions && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shipment.conditions.temperature && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-medium">{shipment.conditions.temperature}°C</span>
                    </div>
                  )}
                  {shipment.conditions.humidity && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <span className="font-medium">{shipment.conditions.humidity}%</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quality</span>
                    <Badge variant={shipment.conditions.quality === 'excellent' ? 'default' : 'secondary'}>
                      {shipment.conditions.quality}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Packaging</p>
                    <p className="text-sm font-medium">{shipment.conditions.packaging}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentTracking;
