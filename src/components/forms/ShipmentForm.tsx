import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Package, Save, X } from 'lucide-react';
import { format } from 'date-fns';

interface ShipmentFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({ onClose, onSave, initialData }) => {
  const { role } = useAuth();
  const [formData, setFormData] = useState({
    crop: initialData?.crop || '',
    quantity: initialData?.quantity || '',
    unit: initialData?.unit || 'kg',
    origin: initialData?.origin || '',
    destination: initialData?.destination || '',
    estimatedDelivery: initialData?.estimatedDelivery || '',
    priority: initialData?.priority || 'medium',
    specialInstructions: initialData?.specialInstructions || '',
    packagingType: initialData?.packagingType || 'standard',
    temperature: initialData?.temperature || '',
    humidity: initialData?.humidity || '',
    quality: initialData?.quality || 'standard',
    ...initialData
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cropOptions = [
    'Wheat', 'Rice', 'Corn', 'Barley', 'Oats', 'Soybeans', 'Cotton', 'Sugarcane',
    'Potatoes', 'Tomatoes', 'Onions', 'Carrots', 'Lettuce', 'Spinach', 'Cabbage',
    'Apples', 'Oranges', 'Bananas', 'Grapes', 'Strawberries', 'Other'
  ];

  const unitOptions = ['kg', 'tons', 'quintals', 'bags', 'boxes', 'crates'];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const qualityOptions = [
    { value: 'premium', label: 'Premium' },
    { value: 'standard', label: 'Standard' },
    { value: 'organic', label: 'Organic' },
    { value: 'grade-a', label: 'Grade A' },
    { value: 'grade-b', label: 'Grade B' }
  ];

  const packagingOptions = [
    'Standard Bags', 'Jute Bags', 'Plastic Bags', 'Wooden Crates', 'Cardboard Boxes',
    'Metal Containers', 'Refrigerated Containers', 'Vacuum Sealed', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.crop) newErrors.crop = 'Crop type is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.origin) newErrors.origin = 'Origin is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.estimatedDelivery) newErrors.estimatedDelivery = 'Estimated delivery date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving shipment:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-green-600" />
              <CardTitle>
                {initialData ? 'Edit Shipment' : 'Create New Shipment'}
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {role === 'farmer' 
              ? 'Create a new shipment to send your crops to market'
              : 'Create a new shipment for logistics management'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crop">Crop Type *</Label>
                  <Select value={formData.crop} onValueChange={(value) => handleInputChange('crop', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.crop && <p className="text-sm text-red-600">{errors.crop}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                    />
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {unitOptions.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin *</Label>
                  <Input
                    id="origin"
                    placeholder="Enter origin location"
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                  />
                  {errors.origin && <p className="text-sm text-red-600">{errors.origin}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination location"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                  />
                  {errors.destination && <p className="text-sm text-red-600">{errors.destination}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedDelivery">Estimated Delivery Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.estimatedDelivery ? format(new Date(formData.estimatedDelivery), 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.estimatedDelivery ? new Date(formData.estimatedDelivery) : undefined}
                        onSelect={(date) => handleInputChange('estimatedDelivery', date ? date.toISOString() : '')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.estimatedDelivery && <p className="text-sm text-red-600">{errors.estimatedDelivery}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Quality and Packaging */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quality & Packaging</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Grade</Label>
                  <Select value={formData.quality} onValueChange={(value) => handleInputChange('quality', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packagingType">Packaging Type</Label>
                  <Select value={formData.packagingType} onValueChange={(value) => handleInputChange('packagingType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {packagingOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="e.g., 25"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="e.g., 60"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="Any special handling requirements or instructions..."
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Shipment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentForm;