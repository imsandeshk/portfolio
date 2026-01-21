import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  Eye,
  Settings,
  FileText,
  UserCheck,
  UserX
} from 'lucide-react';

// Mock data
const mockUsers = [
  {
    id: 'USR001',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'farmer',
    status: 'Active',
    joinDate: '2024-01-01',
    lastActivity: '2 hours ago',
    totalShipments: 12
  },
  {
    id: 'USR002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'logistics',
    status: 'Active',
    joinDate: '2024-01-05',
    lastActivity: '1 hour ago',
    totalShipments: 8
  },
  {
    id: 'USR003',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    role: 'buyer',
    status: 'Suspended',
    joinDate: '2024-01-10',
    lastActivity: '1 day ago',
    totalShipments: 5
  }
];

const mockDisputes = [
  {
    id: 'DSP001',
    type: 'Delivery Delay',
    description: 'Shipment SH001 is delayed by 2 days',
    status: 'Open',
    priority: 'High',
    reportedBy: 'John Smith',
    reportedDate: '2024-01-14',
    assignedTo: 'Admin Team'
  },
  {
    id: 'DSP002',
    type: 'Quality Issue',
    description: 'Received damaged goods in shipment SH002',
    status: 'In Progress',
    priority: 'Medium',
    reportedBy: 'Sarah Johnson',
    reportedDate: '2024-01-13',
    assignedTo: 'Quality Team'
  }
];

const mockSystemStats = {
  totalUsers: 156,
  activeUsers: 142,
  totalShipments: 1247,
  completedShipments: 1156,
  pendingDisputes: 8,
  systemUptime: '99.9%'
};

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'logistics': return 'bg-blue-100 text-blue-800';
      case 'market_agent': return 'bg-purple-100 text-purple-800';
      case 'buyer': return 'bg-orange-100 text-orange-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisputeStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Oversee supply chain activities and manage users</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {mockSystemStats.activeUsers} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStats.totalShipments}</div>
            <p className="text-xs text-muted-foreground">
              {mockSystemStats.completedShipments} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStats.pendingDisputes}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {user.name}
                        </h3>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        Joined: {user.joinDate} • Last activity: {user.lastActivity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {user.totalShipments} shipments
                      </p>
                      <p className="text-xs text-gray-500">Total activity</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(
                          selectedUser === user.id ? null : user.id
                        )}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedUser === user.id ? 'Hide' : 'View'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {selectedUser === user.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">User ID:</span>
                        <p className="text-gray-600">{user.id}</p>
                      </div>
                      <div>
                        <span className="font-medium">Role:</span>
                        <p className="text-gray-600 capitalize">{user.role}</p>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <p className="text-gray-600">{user.status}</p>
                      </div>
                      <div>
                        <span className="font-medium">Total Shipments:</span>
                        <p className="text-gray-600">{user.totalShipments}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dispute Management */}
      <Card>
        <CardHeader>
          <CardTitle>Dispute Management</CardTitle>
          <CardDescription>Resolve disputes and issues in the supply chain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDisputes.map((dispute) => (
              <div
                key={dispute.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {dispute.type}
                        </h3>
                        <Badge className={getDisputeStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                        <Badge className={getPriorityColor(dispute.priority)}>
                          {dispute.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {dispute.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reported by: {dispute.reportedBy} • Date: {dispute.reportedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {dispute.assignedTo}
                      </p>
                      <p className="text-xs text-gray-500">Assigned to</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDispute(
                        selectedDispute === dispute.id ? null : dispute.id
                      )}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {selectedDispute === dispute.id ? 'Hide' : 'View'}
                    </Button>
                  </div>
                </div>
                
                {selectedDispute === dispute.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Dispute ID:</span>
                        <p className="text-gray-600">{dispute.id}</p>
                      </div>
                      <div>
                        <span className="font-medium">Priority:</span>
                        <p className="text-gray-600">{dispute.priority}</p>
                      </div>
                      <div>
                        <span className="font-medium">Reported By:</span>
                        <p className="text-gray-600">{dispute.reportedBy}</p>
                      </div>
                      <div>
                        <span className="font-medium">Assigned To:</span>
                        <p className="text-gray-600">{dispute.assignedTo}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-medium">Description:</span>
                      <p className="text-gray-600 mt-1">{dispute.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common admin operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Resolve Disputes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;