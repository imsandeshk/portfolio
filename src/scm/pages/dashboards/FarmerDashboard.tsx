import React from "react";
import { useSCMAuth } from "../../auth/SCMAuthContext";
import { MockApi } from "../../services/mockApi";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FarmerDashboard: React.FC = () => {
  const { currentUser } = useSCMAuth();
  const { data: shipments } = useQuery({
    queryKey: ["shipments", currentUser?.id],
    queryFn: () => MockApi.listShipments({ role: "farmer", userId: currentUser!.id }),
    enabled: !!currentUser,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>My Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shipments?.map(s => (
              <div key={s.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">{s.crop} - {s.batchId}</div>
                  <div className="text-sm text-muted-foreground">{s.origin} → {s.destination}</div>
                </div>
                <Button asChild size="sm"><Link to={`/scm/shipments/${s.id}`}>Track</Link></Button>
              </div>
            ))}
            {!shipments?.length && <div className="text-sm text-muted-foreground">No shipments yet.</div>}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button asChild variant="outline"><Link to="/scm/forms">Add Update</Link></Button>
            <Button asChild variant="outline"><Link to="/scm/notifications">View Alerts</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
