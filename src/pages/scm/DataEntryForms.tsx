import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { updateShipment, listShipments, Shipment, ShipmentUpdateInput } from '@/services/scmService';
import { useEffect, useState } from 'react';

export default function DataEntryForms() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const { register, handleSubmit, reset } = useForm<{ shipmentId: string; quantityKg: number; condition: 'good'|'fair'|'poor' }>();

  useEffect(() => {
    listShipments().then(setShipments);
  }, []);

  const onSubmit = async (values: { shipmentId: string; quantityKg: number; condition: 'good'|'fair'|'poor' }) => {
    const updated = await updateShipment(values.shipmentId, { quantityKg: Number(values.quantityKg), condition: values.condition } as ShipmentUpdateInput);
    if (updated) {
      setShipments((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      reset();
    }
  };

  return (
    <ScmLayout>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Update Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <Label>Shipment</Label>
                <select className="w-full border rounded-md h-9 px-2" {...register('shipmentId', { required: true })}>
                  <option value="">Select shipment</option>
                  {shipments.map((s) => (
                    <option key={s.id} value={s.id}>{s.batchId} • {s.cropType}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Quantity (kg)</Label>
                <Input type="number" step="1" {...register('quantityKg', { valueAsNumber: true })} />
              </div>
              <div>
                <Label>Condition</Label>
                <select className="w-full border rounded-md h-9 px-2" {...register('condition')}>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <Button type="submit">Save</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ScmLayout>
  );
}
