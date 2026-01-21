import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { listShipments, Shipment } from '@/services/scmService';
import MiniRouteMap from '@/components/scm/MiniRouteMap';
import { useEffect, useMemo, useState } from 'react';

function Timeline({ shipment }: { shipment: Shipment }) {
  const items = useMemo(() => shipment.checkpoints.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)), [shipment.checkpoints]);
  return (
    <ol className="relative border-s pl-6">
      {items.map((cp) => (
        <li key={cp.id} className="mb-6 ms-6">
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">•</span>
          <h4 className="font-medium">{cp.name} <span className="text-xs text-muted-foreground">({cp.handlerRole})</span></h4>
          <p className="text-sm text-muted-foreground">{new Date(cp.timestamp).toLocaleString()}</p>
          {cp.notes ? <p className="text-sm mt-1">{cp.notes}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export default function ShipmentTracking() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    listShipments().then(setShipments);
  }, []);

  return (
    <ScmLayout>
      <div className="grid gap-4 lg:grid-cols-2">
        {shipments.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle>{s.batchId} • {s.cropType}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{s.origin} → {s.destination}</div>
              <div className="mt-2">Status: {s.currentStatus} {s.eta ? `(ETA ${new Date(s.eta).toLocaleString()})` : ''}</div>
              <div className="mt-4">
                <MiniRouteMap checkpoints={s.checkpoints} />
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Timeline</h3>
                <Timeline shipment={s} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScmLayout>
  );
}
