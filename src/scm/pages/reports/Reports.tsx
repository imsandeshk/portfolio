import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MockApi } from "../../services/mockApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const Reports: React.FC = () => {
  const { data: metrics } = useQuery({ queryKey: ["metrics"], queryFn: MockApi.getMetrics });

  const data = (metrics?.bottleneckCheckpoints || []).map(b => ({ name: b.name, delays: b.delays }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>KPIs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm">
            <li>Average delivery time: {metrics?.avgDeliveryTimeHours ?? "--"} hours</li>
            <li>On-time delivery rate: {metrics ? Math.round(metrics.onTimeDeliveryRate * 100) : "--"}%</li>
            <li>Delays: {metrics?.delaysCount ?? "--"}</li>
            <li>Exceptions: {metrics?.exceptionsCount ?? "--"}</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bottleneck Checkpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ delays: { label: "Delays", color: "hsl(var(--primary))" } }}
            className="max-h-72"
          >
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} width={24} />
              <Bar dataKey="delays" fill="var(--color-delays)" radius={4} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
