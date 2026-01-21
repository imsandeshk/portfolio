import { AppRole, Shipment, NotificationItem, PerformanceMetrics, Checkpoint, UserProfile } from "../types";

// Simple in-memory mock DB
const db = {
  users: new Map<string, UserProfile>(),
  shipments: new Map<string, Shipment>(),
  notifications: new Map<string, NotificationItem[]>(),
};

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// Seed with some example data
(function seed() {
  if (db.users.size > 0) return;
  const farmer: UserProfile = { id: id("u"), name: "Asha", email: "asha@example.com", role: "farmer" };
  const logistics: UserProfile = { id: id("u"), name: "Kiran Logistics", email: "road@example.com", role: "logistics" };
  const buyer: UserProfile = { id: id("u"), name: "FreshMart", email: "buyer@example.com", role: "buyer" };
  const admin: UserProfile = { id: id("u"), name: "Admin", email: "admin@example.com", role: "admin" };

  [farmer, logistics, buyer, admin].forEach(u => db.users.set(u.id, u));

  const shipmentId = id("s");
  const now = new Date();
  const cp: Checkpoint[] = [
    {
      id: id("cp"),
      name: "Farm Gate",
      location: { lat: 19.076, lng: 72.8777 },
      timestamp: new Date(now.getTime() - 6 * 3600 * 1000).toISOString(),
      handlerRole: "farmer",
      handlerName: farmer.name,
      status: "received",
    },
    {
      id: id("cp"),
      name: "Highway Checkpoint",
      location: { lat: 19.2, lng: 72.9 },
      timestamp: new Date(now.getTime() - 3 * 3600 * 1000).toISOString(),
      handlerRole: "logistics",
      handlerName: logistics.name,
      status: "in_transit",
      notes: "Smooth transit",
    },
  ];

  const shipment: Shipment = {
    id: shipmentId,
    batchId: "BATCH-1023",
    crop: "Tomatoes",
    quantityKg: 1200,
    condition: "good",
    origin: "Nashik",
    destination: "Mumbai",
    createdAt: now.toISOString(),
    eta: new Date(now.getTime() + 5 * 3600 * 1000).toISOString(),
    currentStatus: "in_transit",
    currentLocation: { lat: 19.22, lng: 72.88 },
    checkpoints: cp,
    farmerId: farmer.id,
    logisticsPartnerId: logistics.id,
    buyerId: buyer.id,
  };

  db.shipments.set(shipmentId, shipment);
  db.notifications.set(buyer.id, [
    { id: id("n"), type: "update", message: "Shipment left farm gate", shipmentId, createdAt: cp[0].timestamp, read: false },
    { id: id("n"), type: "update", message: "Reached highway checkpoint", shipmentId, createdAt: cp[1].timestamp, read: false },
  ]);
})();

export const MockApi = {
  // Auth-like helpers
  listRoles(): AppRole[] {
    return ["farmer", "logistics", "market_agent", "buyer", "admin"];
  },
  getUserByRole(role: AppRole): UserProfile | undefined {
    return Array.from(db.users.values()).find(u => u.role === role);
  },

  // Shipments
  async listShipments(params?: { role?: AppRole; userId?: string }): Promise<Shipment[]> {
    let shipments = Array.from(db.shipments.values());
    if (params?.role && params.userId) {
      if (params.role === "farmer") shipments = shipments.filter(s => s.farmerId === params.userId);
      if (params.role === "logistics") shipments = shipments.filter(s => s.logisticsPartnerId === params.userId);
      if (params.role === "buyer") shipments = shipments.filter(s => s.buyerId === params.userId);
    }
    await delay(200);
    return shipments;
  },
  async getShipment(id: string): Promise<Shipment | undefined> {
    await delay(150);
    return db.shipments.get(id);
  },
  async addCheckpoint(shipmentId: string, cp: Omit<Checkpoint, "id">): Promise<Shipment | undefined> {
    const shipment = db.shipments.get(shipmentId);
    if (!shipment) return undefined;
    const newCp: Checkpoint = { ...cp, id: id("cp") };
    shipment.checkpoints.push(newCp);
    shipment.currentLocation = cp.location;
    shipment.currentStatus = cp.status === "delivered" ? "delivered" : cp.status === "delayed" ? "delayed" : "in_transit";
    if (shipment.currentStatus === "delivered") shipment.eta = new Date().toISOString();
    db.shipments.set(shipmentId, { ...shipment });
    await delay(200);
    return shipment;
  },

  // Notifications
  async listNotifications(userId: string): Promise<NotificationItem[]> {
    await delay(150);
    return db.notifications.get(userId) || [];
  },
  async markNotificationRead(userId: string, notificationId: string): Promise<void> {
    const list = db.notifications.get(userId) || [];
    db.notifications.set(
      userId,
      list.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
    await delay(100);
  },

  // Reports
  async getMetrics(): Promise<PerformanceMetrics> {
    const shipments = Array.from(db.shipments.values());
    const delaysCount = shipments.filter(s => s.currentStatus === "delayed").length;
    const exceptionsCount = shipments.filter(s => s.currentStatus === "exception").length;

    const avgDeliveryTimeHours = 8.4;
    const onTimeDeliveryRate = 0.92;
    const bottleneckCheckpoints = [
      { name: "City Toll Booth", delays: 5 },
      { name: "Warehouse Inbound", delays: 3 },
    ];
    await delay(200);
    return { avgDeliveryTimeHours, onTimeDeliveryRate, delaysCount, exceptionsCount, bottleneckCheckpoints };
  },
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
