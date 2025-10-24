import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, AlertTriangle, TrendingUp, Shield, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/scm/Layout';
import { User, Dispute } from '@/types/scm';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockUsers: User[] = [
      { id: '1', email: 'farmer@test.com', name: 'John Farmer', role: 'farmer' },
      { id: '2', email: 'logistics@test.com', name: 'Mike Logistics', role: 'logistics' },
      { id: '3', email: 'buyer@test.com', name: 'Sarah Buyer', role: 'buyer' },
    ];

    const mockDisputes: Dispute[] = [
      {
        id: 'd1',
        shipmentId: 's1',
        reportedBy: '1',
        reporterName: 'John Farmer',
        category: 'delay',
        description: 'Shipment delayed by 2 days without notification',
        status: 'open',
        createdAt: new Date('2025-10-23'),
      },
    ];

    setUsers(mockUsers);
    setDisputes(mockDisputes);
  }, []);

  const stats = {
    totalUsers: users.length,
    activeShipments: 15,
    openDisputes: disputes.filter(d => d.status === 'open').length,
    systemHealth: 98,
  };

  const usersByRole = {
    farmers: users.filter(u => u.role === 'farmer').length,
    logistics: users.filter(u => u.role === 'logistics').length,
    buyers: users.filter(u => u.role === 'buyer').length,
    marketAgents: users.filter(u => u.role === 'market_agent').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and oversee supply chain operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeShipments}</div>
              <p className="text-xs text-muted-foreground">Currently in transit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Disputes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.openDisputes}</div>
              <p className="text-xs text-muted-foreground">Needs resolution</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Users and Disputes */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{usersByRole.farmers}</div>
                    <div className="text-sm text-muted-foreground">Farmers</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">{usersByRole.logistics}</div>
                    <div className="text-sm text-muted-foreground">Logistics</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <UserCheck className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold">{usersByRole.buyers}</div>
                    <div className="text-sm text-muted-foreground">Buyers</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <div className="text-2xl font-bold">{usersByRole.marketAgents}</div>
                    <div className="text-sm text-muted-foreground">Market Agents</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/scm/admin/users')}
                >
                  Manage All Users
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
              <CardDescription>Handle and resolve conflicts</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="open">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="open" className="space-y-4 mt-4">
                  {disputes.filter(d => d.status === 'open').map((dispute) => (
                    <div key={dispute.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold capitalize">{dispute.category}</h3>
                          <p className="text-sm text-muted-foreground">
                            Reported by: {dispute.reporterName}
                          </p>
                        </div>
                        <Badge variant="destructive">Open</Badge>
                      </div>
                      <p className="text-sm">{dispute.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/scm/disputes/${dispute.id}`)}
                        >
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {disputes.filter(d => d.status === 'open').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No open disputes</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="resolved" className="space-y-4 mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No resolved disputes to display</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => navigate('/scm/analytics')}
              >
                <TrendingUp className="h-6 w-6" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => navigate('/scm/reports')}
              >
                <Package className="h-6 w-6" />
                Generate Reports
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => navigate('/scm/shipments')}
              >
                <Shield className="h-6 w-6" />
                Monitor Shipments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
