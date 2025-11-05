import React from "react";
import { useSCMAuth } from "../../auth/SCMAuthContext";
import { MockApi } from "../../services/mockApi";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BuyerDashboard: React.FC = () => {
  const { currentUser } = useSCMAuth();
  const { data: shipments } = useQuery({
    queryKey: ["shipments", currentUser?.id],
    queryFn: () => MockApi.listShipments({ role: "buyer", userId: currentUser!.id }),
    enabled: !!currentUser,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shipments?.map(s => (
              <div key={s.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">{s.crop} - {s.batchId}</div>
                  <div className="text-sm text-muted-foreground">ETA: {s.eta ? new Date(s.eta).toLocaleString() : "--"}</div>
                </div>
                <Button asChild size="sm"><Link to={`/scm/shipments/${s.id}`}>Track</Link></Button>
              </div>
            ))}
            {!shipments?.length && <div className="text-sm text-muted-foreground">No orders yet.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboard;
