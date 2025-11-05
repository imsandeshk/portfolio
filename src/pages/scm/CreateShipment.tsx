import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Package } from 'lucide-react';
import Layout from '@/components/scm/Layout';
import { useToast } from '@/hooks/use-toast';

const CreateShipment: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    unit: 'kg',
    quality: 'good',
    packaging: '',
    originAddress: '',
    originCity: '',
    originState: '',
    destAddress: '',
    destCity: '',
    destState: '',
    buyerId: '',
    logisticsId: '',
    temperature: '',
    humidity: '',
    specialInstructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the data to your backend API
    toast({
      title: 'Shipment Created',
      description: 'Your shipment has been successfully created and assigned a batch number.',
    });

    navigate('/scm/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8" />
              Create New Shipment
            </h1>
            <p className="text-muted-foreground">Enter shipment details and logistics information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Crop Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Crop Details</CardTitle>
                  <CardDescription>Information about the crop being shipped</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cropType">Crop Type *</Label>
                      <Input
                        id="cropType"
                        placeholder="e.g., Wheat, Corn, Rice"
                        value={formData.cropType}
                        onChange={(e) => handleChange('cropType', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quality">Quality Grade *</Label>
                      <Select value={formData.quality} onValueChange={(value) => handleChange('quality', value)}>
                        <SelectTrigger id="quality">
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

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 5000"
                        value={formData.quantity}
                        onChange={(e) => handleChange('quantity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit *</Label>
                      <Select value={formData.unit} onValueChange={(value) => handleChange('unit', value)}>
                        <SelectTrigger id="unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="ton">Tons</SelectItem>
                          <SelectItem value="lb">Pounds (lb)</SelectItem>
                          <SelectItem value="bushel">Bushels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="packaging">Packaging Type *</Label>
                      <Input
                        id="packaging"
                        placeholder="e.g., Sealed bags, Crates, Bulk"
                        value={formData.packaging}
                        onChange={(e) => handleChange('packaging', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Origin Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Origin Details</CardTitle>
                  <CardDescription>Where the shipment starts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="originAddress">Address *</Label>
                    <Input
                      id="originAddress"
                      placeholder="Street address"
                      value={formData.originAddress}
                      onChange={(e) => handleChange('originAddress', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="originCity">City *</Label>
                      <Input
                        id="originCity"
                        placeholder="City"
                        value={formData.originCity}
                        onChange={(e) => handleChange('originCity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originState">State *</Label>
                      <Input
                        id="originState"
                        placeholder="State"
                        value={formData.originState}
                        onChange={(e) => handleChange('originState', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Destination Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Destination Details</CardTitle>
                  <CardDescription>Where the shipment is going</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="destAddress">Address *</Label>
                    <Input
                      id="destAddress"
                      placeholder="Street address"
                      value={formData.destAddress}
                      onChange={(e) => handleChange('destAddress', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="destCity">City *</Label>
                      <Input
                        id="destCity"
                        placeholder="City"
                        value={formData.destCity}
                        onChange={(e) => handleChange('destCity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destState">State *</Label>
                      <Input
                        id="destState"
                        placeholder="State"
                        value={formData.destState}
                        onChange={(e) => handleChange('destState', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Storage Conditions</CardTitle>
                  <CardDescription>Temperature and humidity requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="e.g., 18"
                      value={formData.temperature}
                      onChange={(e) => handleChange('temperature', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 55"
                      value={formData.humidity}
                      onChange={(e) => handleChange('humidity', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Special Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                  <CardDescription>Any special handling requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter any special instructions or notes..."
                    value={formData.specialInstructions}
                    onChange={(e) => handleChange('specialInstructions', e.target.value)}
                    rows={5}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Create Shipment
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateShipment;
