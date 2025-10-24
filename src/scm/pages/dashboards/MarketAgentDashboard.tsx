import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketAgentDashboard: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Market Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Monitor pricing, allocate batches, and coordinate with logistics.</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAgentDashboard;
