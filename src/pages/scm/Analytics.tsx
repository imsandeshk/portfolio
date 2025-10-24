import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, Clock, AlertTriangle } from 'lucide-react';
import Layout from '@/components/scm/Layout';
import { AnalyticsData } from '@/types/scm';

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Mock data - replace with API call
    const mockData: AnalyticsData = {
      totalShipments: 245,
      activeShipments: 32,
      deliveredShipments: 198,
      delayedShipments: 15,
      averageDeliveryTime: 3.5,
      onTimeDeliveryRate: 87.5,
      bottlenecks: [
        { location: 'Distribution Center A', delayCount: 8, averageDelay: 2.5, affectedShipments: 12 },
        { location: 'Transit Hub B', delayCount: 5, averageDelay: 1.8, affectedShipments: 7 },
        { location: 'Checkpoint C', delayCount: 3, averageDelay: 1.2, affectedShipments: 4 },
      ],
      performanceMetrics: [
        { date: '2025-10-17', shipments: 24, onTime: 21, delayed: 3, avgDeliveryTime: 3.2 },
        { date: '2025-10-18', shipments: 28, onTime: 25, delayed: 3, avgDeliveryTime: 3.4 },
        { date: '2025-10-19', shipments: 22, onTime: 19, delayed: 3, avgDeliveryTime: 3.6 },
        { date: '2025-10-20', shipments: 30, onTime: 27, delayed: 3, avgDeliveryTime: 3.3 },
        { date: '2025-10-21', shipments: 26, onTime: 23, delayed: 3, avgDeliveryTime: 3.5 },
        { date: '2025-10-22', shipments: 25, onTime: 22, delayed: 3, avgDeliveryTime: 3.4 },
        { date: '2025-10-23', shipments: 27, onTime: 24, delayed: 3, avgDeliveryTime: 3.3 },
      ],
    };
    setAnalyticsData(mockData);
  }, []);

  if (!analyticsData) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading analytics...</p>
        </div>
      </Layout>
    );
  }

  const statusDistribution = [
    { name: 'Delivered', value: analyticsData.deliveredShipments, color: '#10b981' },
    { name: 'In Transit', value: analyticsData.activeShipments, color: '#3b82f6' },
    { name: 'Delayed', value: analyticsData.delayedShipments, color: '#ef4444' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Performance insights and metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalShipments}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.onTimeDeliveryRate}%</div>
              <p className="text-xs text-muted-foreground">Delivery performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.averageDeliveryTime} days</div>
              <p className="text-xs text-muted-foreground">Typical duration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delayed Shipments</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.delayedShipments}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="performance">
          <TabsList>
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            <TabsTrigger value="distribution">Status Distribution</TabsTrigger>
            <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Performance Over Time</CardTitle>
                <CardDescription>Daily shipment trends and delivery times</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={analyticsData.performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="shipments" stroke="#8884d8" name="Total Shipments" />
                    <Line type="monotone" dataKey="onTime" stroke="#10b981" name="On Time" />
                    <Line type="monotone" dataKey="delayed" stroke="#ef4444" name="Delayed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Delivery Time Trend</CardTitle>
                <CardDescription>Daily average delivery times in days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgDeliveryTime" fill="#3b82f6" name="Avg Delivery Time (days)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Status Distribution</CardTitle>
                <CardDescription>Current status breakdown of all shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {statusDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{item.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {((item.value / analyticsData.totalShipments) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bottlenecks">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Bottlenecks</CardTitle>
                <CardDescription>Locations with frequent delays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{bottleneck.location}</h3>
                          <p className="text-sm text-muted-foreground">
                            Delay frequency: {bottleneck.delayCount} incidents
                          </p>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Average Delay</p>
                          <p className="font-semibold">{bottleneck.averageDelay} days</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Affected Shipments</p>
                          <p className="font-semibold">{bottleneck.affectedShipments}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ResponsiveContainer width="100%" height={100}>
                          <BarChart data={[bottleneck]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="location" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="delayCount" fill="#f59e0b" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
