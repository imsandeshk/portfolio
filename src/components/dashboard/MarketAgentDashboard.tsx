import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Users, 
  TrendingUp, 
  Handshake,
  Plus,
  Eye,
  MessageSquare,
  FileText
} from 'lucide-react';

// Mock data
const mockTransactions = [
  {
    id: 'TX001',
    farmer: 'John Smith',
    buyer: 'Central Market Co.',
    crop: 'Wheat',
    quantity: '500 kg',
    price: '₹25,000',
    status: 'Completed',
    date: '2024-01-12',
    commission: '₹1,250'
  },
  {
    id: 'TX002',
    farmer: 'Sarah Johnson',
    buyer: 'Local Grocery Store',
    crop: 'Rice',
    quantity: '300 kg',
    price: '₹18,000',
    status: 'Pending',
    date: '2024-01-13',
    commission: '₹900'
  },
  {
    id: 'TX003',
    farmer: 'Mike Wilson',
    buyer: 'Export Company',
    crop: 'Corn',
    quantity: '750 kg',
    price: '₹37,500',
    status: 'In Progress',
    date: '2024-01-14',
    commission: '₹1,875'
  }
];

const mockActiveConnections = [
  {
    id: 'AC001',
    farmer: 'John Smith',
    buyer: 'Central Market Co.',
    crop: 'Wheat',
    quantity: '500 kg',
    status: 'Negotiating',
    lastActivity: '2 hours ago'
  },
  {
    id: 'AC002',
    farmer: 'Sarah Johnson',
    buyer: 'Local Grocery Store',
    crop: 'Rice',
    quantity: '300 kg',
    status: 'Price Agreed',
    lastActivity: '1 hour ago'
  }
];

const MarketAgentDashboard = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiating': return 'bg-purple-100 text-purple-800';
      case 'Price Agreed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">Facilitate transactions between farmers and buyers</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently facilitating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <span className="text-green-600 text-lg">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,500</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Active Connections</CardTitle>
          <CardDescription>Current negotiations and transactions in progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActiveConnections.map((connection) => (
              <div
                key={connection.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {connection.farmer} ↔ {connection.buyer}
                        </h3>
                        <Badge className={getStatusColor(connection.status)}>
                          {connection.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {connection.crop} - {connection.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Last activity: {connection.lastActivity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Track completed and pending transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Handshake className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {transaction.crop} - {transaction.quantity}
                        </h3>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {transaction.farmer} → {transaction.buyer}
                      </p>
                      <p className="text-sm text-gray-500">
                        Transaction ID: {transaction.id} • Date: {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        Commission: {transaction.commission}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTransaction(
                        selectedTransaction === transaction.id ? null : transaction.id
                      )}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {selectedTransaction === transaction.id ? 'Hide' : 'View'}
                    </Button>
                  </div>
                </div>
                
                {selectedTransaction === transaction.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Farmer:</span>
                        <p className="text-gray-600">{transaction.farmer}</p>
                      </div>
                      <div>
                        <span className="font-medium">Buyer:</span>
                        <p className="text-gray-600">{transaction.buyer}</p>
                      </div>
                      <div>
                        <span className="font-medium">Price:</span>
                        <p className="text-gray-600">{transaction.price}</p>
                      </div>
                      <div>
                        <span className="font-medium">Commission:</span>
                        <p className="text-gray-600">{transaction.commission}</p>
                      </div>
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
          <CardDescription>Common market agent operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Handshake className="h-6 w-6" />
              <span>Facilitate Deal</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Connect Parties</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Send Message</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAgentDashboard;