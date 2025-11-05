import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MockApi } from "../../services/mockApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TimelineItem: React.FC<{ label: string; time: string; desc?: string }> = ({ label, time, desc }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{new Date(time).toLocaleString()}</div>
      {desc && <div className="text-xs">{desc}</div>}
    </div>
  </div>
);

const ShipmentDetail: React.FC = () => {
  const { id } = useParams();
  const { data: shipment } = useQuery({ queryKey: ["shipment", id], queryFn: () => MockApi.getShipment(id!), enabled: !!id });

  const statusColor = useMemo(() => {
    switch (shipment?.currentStatus) {
      case "delivered": return "bg-emerald-500";
      case "delayed": return "bg-amber-500";
      case "exception": return "bg-red-500";
      default: return "bg-blue-500";
    }
  }, [shipment?.currentStatus]);

  if (!shipment) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{shipment.crop} • {shipment.batchId}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm grid gap-2">
            <div>Route: {shipment.origin} → {shipment.destination}</div>
            <div>Quantity: {shipment.quantityKg} kg • Condition: {shipment.condition}</div>
            <div>ETA: {shipment.eta ? new Date(shipment.eta).toLocaleString() : "--"}</div>
            <div className="flex items-center gap-2">Status: <span className={`inline-block h-2 w-2 rounded-full ${statusColor}`} /> {shipment.currentStatus}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shipment.checkpoints.map(cp => (
              <TimelineItem key={cp.id} label={`${cp.name} • ${cp.handlerName} (${cp.handlerRole})`} time={cp.timestamp} desc={cp.notes} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 grid place-items-center border rounded text-sm text-muted-foreground">
            Map placeholder (lat: {shipment.currentLocation?.lat?.toFixed(3)}, lng: {shipment.currentLocation?.lng?.toFixed(3)})
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentDetail;
