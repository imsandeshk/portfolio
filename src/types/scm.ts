// Supply Chain Management Types

export type UserRole = 'farmer' | 'logistics' | 'market_agent' | 'buyer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
}

export interface Shipment {
  id: string;
  batchNumber: string;
  cropType: string;
  quantity: number;
  unit: string;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  currentLocation?: Coordinates;
  farmerId: string;
  farmerName: string;
  buyerId?: string;
  buyerName?: string;
  logisticsPartnerId?: string;
  logisticsPartnerName?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
  checkpoints: Checkpoint[];
  conditions?: ShipmentConditions;
}

export type ShipmentStatus = 
  | 'pending'
  | 'in_transit'
  | 'at_checkpoint'
  | 'delayed'
  | 'delivered'
  | 'cancelled'
  | 'exception';

export interface Location {
  address: string;
  city: string;
  state: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Checkpoint {
  id: string;
  shipmentId: string;
  location: Location;
  timestamp: Date;
  handlerName: string;
  handlerId: string;
  status: string;
  notes?: string;
  vehicleId?: string;
  temperature?: number;
  humidity?: number;
  photos?: string[];
}

export interface ShipmentConditions {
  temperature?: number;
  humidity?: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  packaging: string;
  specialInstructions?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'delay' | 'exception' | 'delivery' | 'update' | 'alert';
  shipmentId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: string;
  capacity: number;
  currentLocation?: Coordinates;
  status: 'available' | 'in_transit' | 'maintenance';
  driverId: string;
  driverName: string;
}

export interface Dispute {
  id: string;
  shipmentId: string;
  reportedBy: string;
  reporterName: string;
  category: 'delay' | 'damage' | 'missing' | 'quality' | 'other';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo?: string;
  resolution?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface AnalyticsData {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  delayedShipments: number;
  averageDeliveryTime: number;
  onTimeDeliveryRate: number;
  bottlenecks: Bottleneck[];
  performanceMetrics: PerformanceMetric[];
}

export interface Bottleneck {
  location: string;
  delayCount: number;
  averageDelay: number;
  affectedShipments: number;
}

export interface PerformanceMetric {
  date: string;
  shipments: number;
  onTime: number;
  delayed: number;
  avgDeliveryTime: number;
}
