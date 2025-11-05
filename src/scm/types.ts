export type AppRole = "farmer" | "logistics" | "market_agent" | "buyer" | "admin";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
};

export type Checkpoint = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string; // ISO
  handlerRole: AppRole;
  handlerName: string;
  notes?: string;
  status: "received" | "in_transit" | "delayed" | "delivered" | "exception";
};

export type Shipment = {
  id: string;
  batchId: string;
  crop: string;
  quantityKg: number;
  condition: "good" | "fair" | "poor";
  origin: string;
  destination: string;
  createdAt: string;
  eta?: string;
  currentStatus: "preparing" | "in_transit" | "delayed" | "delivered" | "exception";
  currentLocation?: { lat: number; lng: number };
  checkpoints: Checkpoint[];
  farmerId: string;
  logisticsPartnerId?: string;
  buyerId?: string;
};

export type NotificationItem = {
  id: string;
  type: "delay" | "exception" | "delivery" | "update";
  message: string;
  shipmentId?: string;
  createdAt: string;
  read: boolean;
};

export type PerformanceMetrics = {
  avgDeliveryTimeHours: number;
  onTimeDeliveryRate: number; // 0-1
  delaysCount: number;
  exceptionsCount: number;
  bottleneckCheckpoints: { name: string; delays: number }[];
};
