import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { listShipments, Shipment, updateShipment } from '@/services/scmService';

export default function LogisticsDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    listShipments().then(setShipments);
  }, []);

  const addCheckpoint = async (shipmentId: string) => {
    const updated = await updateShipment(shipmentId, {
      addCheckpoint: {
        name: 'Transit Checkpoint',
        location: { lat: 18.6, lng: 73.9 },
        handlerRole: 'logistics',
        notes: 'On schedule',
      },
    });
    if (!updated) return;
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));
  };

  const markDelivered = async (shipmentId: string) => {
    const updated = await updateShipment(shipmentId, { currentStatus: 'delivered' });
    if (!updated) return;
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));
  };

  return (
    <ScmLayout>
      <div className="grid gap-4 md:grid-cols-2">
        {shipments.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle>{s.batchId} • {s.currentStatus}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Vehicle near route</div>
              <div className="mt-2">Checkpoints: {s.checkpoints.length}</div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => addCheckpoint(s.id)}>Add Checkpoint</Button>
                <Button onClick={() => markDelivered(s.id)}>Mark Delivered</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScmLayout>
  );
}
