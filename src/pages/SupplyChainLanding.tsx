import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Package, 
  MapPin, 
  BarChart3, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Zap
} from 'lucide-react';

const SupplyChainLanding: React.FC = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Real-time Tracking",
      description: "Track shipments from farm to market with live updates and GPS monitoring"
    },
    {
      icon: <Package className="h-8 w-8 text-green-600" />,
      title: "Quality Management",
      description: "Monitor temperature, humidity, and quality metrics throughout the supply chain"
    },
    {
      icon: <MapPin className="h-8 w-8 text-purple-600" />,
      title: "Route Optimization",
      description: "AI-powered route planning for efficient and cost-effective deliveries"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Analytics & Reports",
      description: "Comprehensive insights into performance, bottlenecks, and optimization opportunities"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Multi-role Access",
      description: "Tailored dashboards for farmers, logistics partners, buyers, and administrators"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with role-based access control and data encryption"
    }
  ];

  const userTypes = [
    {
      role: "Farmers",
      description: "Track your crops, manage shipments, and monitor delivery status",
      features: ["Crop Management", "Shipment Tracking", "Quality Reports", "Market Insights"],
      color: "bg-green-50 text-green-700"
    },
    {
      role: "Logistics Partners",
      description: "Optimize routes, update delivery status, and manage vehicle fleets",
      features: ["Fleet Management", "Route Optimization", "Status Updates", "Performance Analytics"],
      color: "bg-blue-50 text-blue-700"
    },
    {
      role: "Market Agents",
      description: "Facilitate transactions and coordinate between buyers and suppliers",
      features: ["Order Management", "Transaction Processing", "Market Analysis", "Commission Tracking"],
      color: "bg-purple-50 text-purple-700"
    },
    {
      role: "Buyers",
      description: "Place orders, track deliveries, and manage your supply chain",
      features: ["Order Placement", "Delivery Tracking", "Quality Monitoring", "Order History"],
      color: "bg-orange-50 text-orange-700"
    },
    {
      role: "Administrators",
      description: "Oversee operations, manage users, and resolve disputes",
      features: ["User Management", "System Monitoring", "Dispute Resolution", "Global Analytics"],
      color: "bg-red-50 text-red-700"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Shipments Tracked", value: "50,000+", icon: <Package className="h-6 w-6" /> },
    { label: "Countries Served", value: "25+", icon: <Globe className="h-6 w-6" /> },
    { label: "On-time Delivery", value: "94%", icon: <CheckCircle className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">SupplyChain Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your
              <span className="text-green-600"> Supply Chain</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive platform connecting farmers, logistics partners, and buyers 
              with real-time tracking, quality monitoring, and intelligent analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Supply Chain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive tools for every stakeholder in the agricultural supply chain.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored experiences for each stakeholder in the supply chain ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{userType.role}</h3>
                    <Badge className={userType.color}>
                      {userType.role}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {userType.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose SupplyChain Pro?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Visibility</h3>
                    <p className="text-gray-600">Track every shipment in real-time with GPS monitoring and status updates.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile-First Design</h3>
                    <p className="text-gray-600">Access your dashboard anywhere with our responsive mobile interface.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-full mr-4">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Data-Driven Insights</h3>
                    <p className="text-gray-600">Make informed decisions with comprehensive analytics and reporting.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-green-100 mb-6">
                Join thousands of farmers, logistics partners, and buyers who trust SupplyChain Pro 
                to manage their supply chain operations.
              </p>
              <Link to="/auth/register">
                <Button size="lg" className="w-full bg-white text-green-600 hover:bg-gray-100">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-xl font-bold">SupplyChain Pro</span>
              </div>
              <p className="text-gray-400">
                Connecting the agricultural supply chain with technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SupplyChain Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupplyChainLanding;