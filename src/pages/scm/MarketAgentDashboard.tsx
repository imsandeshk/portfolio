import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { listShipments, Shipment } from '@/services/scmService';

export default function MarketAgentDashboard() {
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
              <CardTitle>Market View • {s.batchId}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">From {s.origin} to {s.destination}</div>
              <div>Condition: {s.condition}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScmLayout>
  );
}
