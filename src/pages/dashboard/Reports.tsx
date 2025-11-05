import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Package, 
  Truck,
  MapPin,
  AlertTriangle,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts
  const deliveryPerformanceData = [
    { month: 'Jan', onTime: 95, delayed: 5 },
    { month: 'Feb', onTime: 92, delayed: 8 },
    { month: 'Mar', onTime: 88, delayed: 12 },
    { month: 'Apr', onTime: 94, delayed: 6 },
    { month: 'May', onTime: 96, delayed: 4 },
    { month: 'Jun', onTime: 93, delayed: 7 },
  ];

  const shipmentVolumeData = [
    { day: 'Mon', shipments: 45 },
    { day: 'Tue', shipments: 52 },
    { day: 'Wed', shipments: 48 },
    { day: 'Thu', shipments: 61 },
    { day: 'Fri', shipments: 55 },
    { day: 'Sat', shipments: 38 },
    { day: 'Sun', shipments: 42 },
  ];

  const routeEfficiencyData = [
    { route: 'CA-NY', efficiency: 94, avgTime: 48 },
    { route: 'TX-FL', efficiency: 89, avgTime: 36 },
    { route: 'OR-WA', efficiency: 96, avgTime: 24 },
    { route: 'IL-OH', efficiency: 91, avgTime: 18 },
    { route: 'CO-NV', efficiency: 87, avgTime: 30 },
  ];

  const qualityMetricsData = [
    { name: 'Excellent', value: 45, color: '#10B981' },
    { name: 'Good', value: 35, color: '#3B82F6' },
    { name: 'Fair', value: 15, color: '#F59E0B' },
    { name: 'Poor', value: 5, color: '#EF4444' },
  ];

  const temperatureData = [
    { time: '00:00', temp: 4.2 },
    { time: '04:00', temp: 3.8 },
    { time: '08:00', temp: 4.1 },
    { time: '12:00', temp: 4.5 },
    { time: '16:00', temp: 4.3 },
    { time: '20:00', temp: 4.0 },
  ];

  const kpiData = [
    {
      title: 'On-Time Delivery Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Total Shipments',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Average Transit Time',
      value: '2.3 days',
      change: '-0.4 days',
      trend: 'down',
      icon: Truck,
      color: 'text-purple-600'
    },
    {
      title: 'Quality Score',
      value: '8.7/10',
      change: '+0.3',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const alertData = [
    {
      id: '1',
      type: 'temperature',
      severity: 'high',
      message: 'Temperature exceeded safe limits in 3 shipments',
      count: 3,
      trend: 'up'
    },
    {
      id: '2',
      type: 'delay',
      severity: 'medium',
      message: 'Weather-related delays affecting 5 routes',
      count: 5,
      trend: 'down'
    },
    {
      id: '3',
      type: 'quality',
      severity: 'low',
      message: 'Quality issues reported in 2 deliveries',
      count: 2,
      trend: 'down'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into supply chain performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(kpi.trend)}
                    <span className={`text-sm ml-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shipment Volume Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Volume Trend</CardTitle>
                <CardDescription>Daily shipment counts over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={shipmentVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="shipments" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quality Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Distribution</CardTitle>
                <CardDescription>Product quality ratings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={qualityMetricsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {qualityMetricsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {qualityMetricsData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle>Route Efficiency Analysis</CardTitle>
              <CardDescription>Performance metrics by shipping route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeEfficiencyData.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{route.route}</p>
                      <p className="text-sm text-gray-600">Average time: {route.avgTime}h</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{route.efficiency}%</p>
                        <p className="text-xs text-gray-600">Efficiency</p>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${route.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
              <CardDescription>On-time vs delayed deliveries over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={deliveryPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="onTime" fill="#10B981" name="On Time" />
                  <Bar dataKey="delayed" fill="#EF4444" name="Delayed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Monitoring</CardTitle>
                <CardDescription>Temperature trends during transit</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Delivery Time</span>
                  <span className="text-lg font-bold text-blue-600">2.3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-lg font-bold text-green-600">4.7/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cost per Shipment</span>
                  <span className="text-lg font-bold text-purple-600">$45.20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fuel Efficiency</span>
                  <span className="text-lg font-bold text-orange-600">8.2 mpg</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Trends</CardTitle>
                <CardDescription>Quality metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Excellent Quality</span>
                    <Badge className="bg-green-100 text-green-800">45%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Good Quality</span>
                    <Badge className="bg-blue-100 text-blue-800">35%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Fair Quality</span>
                    <Badge className="bg-yellow-100 text-yellow-800">15%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Poor Quality</span>
                    <Badge className="bg-red-100 text-red-800">5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Issues by Category</CardTitle>
                <CardDescription>Common quality problems identified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temperature Damage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '60%' }} />
                      </div>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Physical Damage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '40%' }} />
                      </div>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contamination</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }} />
                      </div>
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Packaging Issues</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }} />
                      </div>
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts & Issues</CardTitle>
              <CardDescription>Current alerts and their impact on operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertData.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-gray-600">
                          Affecting {alert.count} {alert.type === 'temperature' ? 'shipments' : 'routes'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      {getTrendIcon(alert.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;