import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { listShipments, Shipment, updateShipment } from '@/services/scmService';

export default function FarmerDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    listShipments().then(setShipments);
  }, []);

  const markLoaded = async (shipmentId: string) => {
    const updated = await updateShipment(shipmentId, { currentStatus: 'in_transit' });
    if (!updated) return;
    setShipments((prev) => prev.map((s) => (s.id === shipmentId ? updated : s)));
  };

  return (
    <ScmLayout>
      <div className="grid gap-4 md:grid-cols-2">
        {shipments.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle>{s.cropType} • {s.batchId}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{s.origin} → {s.destination}</div>
              <div className="mt-2">Quantity: {s.quantityKg} kg</div>
              <div>Status: {s.currentStatus}</div>
              <Button className="mt-3" variant="outline" onClick={() => markLoaded(s.id)}>Mark Loaded</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScmLayout>
  );
}
