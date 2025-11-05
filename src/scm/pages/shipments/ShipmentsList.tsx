import React from "react";
import { useSCMAuth } from "../../auth/SCMAuthContext";
import { MockApi } from "../../services/mockApi";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ShipmentsList: React.FC = () => {
  const { currentUser, role } = useSCMAuth();
  const { data: shipments, isLoading } = useQuery({
    queryKey: ["shipments", role, currentUser?.id],
    queryFn: () => MockApi.listShipments({ role: role!, userId: currentUser!.id }),
    enabled: !!currentUser && !!role,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {shipments?.map(s => (
            <div key={s.id} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-medium">{s.crop} - {s.batchId}</div>
                <div className="text-sm text-muted-foreground">{s.origin} → {s.destination} • {s.currentStatus}</div>
              </div>
              <Button asChild size="sm"><Link to={`/scm/shipments/${s.id}`}>View</Link></Button>
            </div>
          ))}
          {!shipments?.length && <div className="text-sm text-muted-foreground">No shipments to display.</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentsList;
