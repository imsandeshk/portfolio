import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { listShipments, Shipment } from '@/services/scmService';

export default function AdminScmDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    listShipments().then(setShipments);
  }, []);

  return (
    <ScmLayout>
      <div className="grid gap-4 md:grid-cols-2">
        {shipments.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle>Admin Oversight • {s.batchId}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Status: {s.currentStatus}</div>
              <div>Checkpoints: {s.checkpoints.length}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScmLayout>
  );
}
