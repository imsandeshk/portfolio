import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Package, 
  MapPin, 
  BarChart3,
  Shield,
  Truck,
  Store,
  ShoppingCart,
  User,
  Globe,
  Smartphone,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Package,
      title: 'Real-time Tracking',
      description: 'Track shipments from farm to market with live updates and GPS location tracking.'
    },
    {
      icon: Users,
      title: 'Multi-role Support',
      description: 'Designed for farmers, logistics partners, market agents, buyers, and administrators.'
    },
    {
      icon: MapPin,
      title: 'Interactive Maps',
      description: 'Visualize supply chain routes and current locations with interactive mapping.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Comprehensive insights into delivery performance and supply chain metrics.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based access control and data protection.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Responsive design that works seamlessly on all devices and screen sizes.'
    }
  ];

  const userRoles = [
    {
      icon: User,
      title: 'Farmers',
      description: 'Track crops, update shipment status, and view logistics details',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Truck,
      title: 'Logistics Partners',
      description: 'Update transit checkpoints, delivery statuses, and vehicle locations',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Store,
      title: 'Market Agents',
      description: 'Facilitate transactions between farmers and buyers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: ShoppingCart,
      title: 'Buyers',
      description: 'View shipment status and estimated delivery times for orders',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Shield,
      title: 'Administrators',
      description: 'Oversee supply chain activities, user management, and dispute resolution',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Shipments Tracked' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">SupplyChain Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              New: Real-time GPS Tracking
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Revolutionize Your
              <span className="text-green-600"> Supply Chain</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive platform that connects farmers, logistics partners, market agents, 
              and buyers in a seamless, transparent, and efficient supply chain ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
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
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Supply Chain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools and features needed to streamline 
              your supply chain operations and improve efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Stakeholder
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform serves all participants in the supply chain with 
              role-specific features and interfaces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userRoles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${role.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${role.color}`} />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {role.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are already benefiting from our 
            comprehensive supply chain management platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">SupplyChain Pro</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing supply chain management with transparency, 
                efficiency, and real-time tracking.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
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

export default LandingPage;