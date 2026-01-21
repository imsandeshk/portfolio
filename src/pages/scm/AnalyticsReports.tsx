import ScmLayout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { getPerformanceMetrics, PerformanceMetric } from '@/services/scmService';

export default function AnalyticsReports() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    getPerformanceMetrics().then(setMetrics);
  }, []);

  const data = metrics.map((m) => ({ name: m.label, value: m.value }));

  return (
    <ScmLayout>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ value: { label: 'Value', color: 'hsl(var(--primary))' } }}>
              <BarChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4,4,0,0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </ScmLayout>
  );
}
