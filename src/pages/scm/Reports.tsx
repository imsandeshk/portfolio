import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import Layout from '@/components/scm/Layout';
import { useToast } from '@/hooks/use-toast';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('shipments');
  const [dateRange, setDateRange] = useState('last-7-days');
  const { toast } = useToast();

  const reportTypes = [
    { value: 'shipments', label: 'Shipment Summary' },
    { value: 'performance', label: 'Performance Report' },
    { value: 'delays', label: 'Delays & Exceptions' },
    { value: 'financial', label: 'Financial Summary' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'customer', label: 'Customer Report' },
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleGenerateReport = () => {
    toast({
      title: 'Report Generated',
      description: 'Your report is ready for download.',
    });
  };

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Shipment Summary - October 2025',
      type: 'Shipment Summary',
      date: new Date('2025-10-23'),
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Performance Report - Q4 2025',
      type: 'Performance Report',
      date: new Date('2025-10-20'),
      size: '1.8 MB',
    },
    {
      id: 3,
      name: 'Delays Analysis - Last 30 Days',
      type: 'Delays & Exceptions',
      date: new Date('2025-10-18'),
      size: '856 KB',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Reports
          </h1>
          <p className="text-muted-foreground">Generate and download supply chain reports</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Report Generator */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Create custom reports based on your requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger id="date-range">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-3">
                  <h3 className="font-semibold">Report Preview</h3>
                  <div className="border rounded-lg p-4 space-y-2 bg-muted/50">
                    <p className="text-sm">
                      <span className="font-medium">Type:</span> {reportTypes.find(t => t.value === reportType)?.label}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Period:</span> {dateRanges.find(r => r.value === dateRange)?.label}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Format:</span> PDF, CSV, Excel
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleGenerateReport} className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reports */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
                <CardDescription>Pre-configured reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Today's Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Weekly Overview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Monthly Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Active Shipments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {report.type} • {report.date.toLocaleDateString()} • {report.size}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Available report configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Delivery Performance</h3>
                <p className="text-sm text-muted-foreground">
                  On-time delivery rates, average delivery times, and trends
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Exception Report</h3>
                <p className="text-sm text-muted-foreground">
                  Delays, damages, and quality issues
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Supplier Report</h3>
                <p className="text-sm text-muted-foreground">
                  Farmer performance and crop quality metrics
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Logistics Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Vehicle utilization and route efficiency
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Financial Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Revenue, costs, and profit margins
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Custom Report</h3>
                <p className="text-sm text-muted-foreground">
                  Create your own report configuration
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Create Custom
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
