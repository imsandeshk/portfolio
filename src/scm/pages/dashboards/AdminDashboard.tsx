import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MockApi } from "../../services/mockApi";

const AdminDashboard: React.FC = () => {
  const { data: metrics } = useQuery({ queryKey: ["metrics"], queryFn: MockApi.getMetrics });
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm">
            <li>Avg delivery time: {metrics?.avgDeliveryTimeHours ?? "--"} h</li>
            <li>On-time rate: {metrics ? Math.round(metrics.onTimeDeliveryRate * 100) : "--"}%</li>
            <li>Delays: {metrics?.delaysCount ?? "--"}</li>
            <li>Exceptions: {metrics?.exceptionsCount ?? "--"}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
