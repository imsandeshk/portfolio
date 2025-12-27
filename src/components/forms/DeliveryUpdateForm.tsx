import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Truck, Save, X, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface DeliveryUpdateFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  shipmentData: any;
}

const DeliveryUpdateForm: React.FC<DeliveryUpdateFormProps> = ({ onClose, onSave, shipmentData }) => {
  const [formData, setFormData] = useState({
    status: 'in_transit',
    currentLocation: '',
    nextCheckpoint: '',
    estimatedArrival: '',
    actualArrival: '',
    delayReason: '',
    temperature: '',
    humidity: '',
    condition: 'good',
    notes: '',
    driver: '',
    vehicle: '',
    odometer: '',
    fuelLevel: '',
    ...shipmentData
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const statusOptions = [
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'at_checkpoint', label: 'At Checkpoint' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' }
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
    { value: 'damaged', label: 'Damaged' }
  ];

  const delayReasons = [
    'Traffic congestion',
    'Weather conditions',
    'Vehicle breakdown',
    'Road closure',
    'Loading/unloading delay',
    'Documentation issues',
    'Customs clearance',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.currentLocation) newErrors.currentLocation = 'Current location is required';
    if (formData.status === 'delayed' && !formData.delayReason) {
      newErrors.delayReason = 'Delay reason is required when status is delayed';
    }

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
      console.error('Error updating delivery:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-blue-600" />
              <CardTitle>Update Delivery Status</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Update the current status and location of shipment {shipmentData?.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status and Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status & Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Current Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentLocation">Current Location *</Label>
                  <Input
                    id="currentLocation"
                    placeholder="Enter current location"
                    value={formData.currentLocation}
                    onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                  />
                  {errors.currentLocation && <p className="text-sm text-red-600">{errors.currentLocation}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextCheckpoint">Next Checkpoint</Label>
                <Input
                  id="nextCheckpoint"
                  placeholder="Enter next checkpoint location"
                  value={formData.nextCheckpoint}
                  onChange={(e) => handleInputChange('nextCheckpoint', e.target.value)}
                />
              </div>
            </div>

            {/* Timing Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Timing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actualArrival">Actual Arrival Time</Label>
                  <Input
                    id="actualArrival"
                    type="datetime-local"
                    value={formData.actualArrival}
                    onChange={(e) => handleInputChange('actualArrival', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedArrival">Estimated Arrival at Next Checkpoint</Label>
                  <Input
                    id="estimatedArrival"
                    type="datetime-local"
                    value={formData.estimatedArrival}
                    onChange={(e) => handleInputChange('estimatedArrival', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Delay Information */}
            {formData.status === 'delayed' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Delay Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="delayReason">Delay Reason *</Label>
                  <Select value={formData.delayReason} onValueChange={(value) => handleInputChange('delayReason', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delay reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {delayReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.delayReason && <p className="text-sm text-red-600">{errors.delayReason}</p>}
                </div>
              </div>
            )}

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver Name</Label>
                  <Input
                    id="driver"
                    placeholder="Enter driver name"
                    value={formData.driver}
                    onChange={(e) => handleInputChange('driver', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Number</Label>
                  <Input
                    id="vehicle"
                    placeholder="Enter vehicle number"
                    value={formData.vehicle}
                    onChange={(e) => handleInputChange('vehicle', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="odometer">Odometer Reading</Label>
                  <Input
                    id="odometer"
                    type="number"
                    placeholder="Enter odometer reading"
                    value={formData.odometer}
                    onChange={(e) => handleInputChange('odometer', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelLevel">Fuel Level (%)</Label>
                  <Input
                    id="fuelLevel"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter fuel level"
                    value={formData.fuelLevel}
                    onChange={(e) => handleInputChange('fuelLevel', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Cargo Condition */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cargo Condition</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition">Cargo Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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

            {/* Additional Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes or observations..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
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
                {isLoading ? 'Updating...' : 'Update Delivery'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryUpdateForm;