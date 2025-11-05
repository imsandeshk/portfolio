// Lightweight ID generator suitable for demo/mock data
const generateId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id_${Math.random().toString(36).slice(2)}`);

// Domain types
export type Role = 'farmer' | 'logistics' | 'market-agent' | 'buyer' | 'admin';

export type Checkpoint = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  timestamp: string; // ISO
  handlerRole: Role;
  notes?: string;
};

export type ShipmentStatus =
  | 'created'
  | 'in_transit'
  | 'delayed'
  | 'delivered'
  | 'cancelled';

export type Shipment = {
  id: string;
  batchId: string;
  cropType: string;
  quantityKg: number;
  condition: 'good' | 'fair' | 'poor';
  origin: string;
  destination: string;
  currentStatus: ShipmentStatus;
  currentLocation?: { lat: number; lng: number };
  eta?: string; // ISO
  checkpoints: Checkpoint[];
  buyerId?: string;
  farmerId?: string;
  logisticsPartnerId?: string;
};

export type Notification = {
  id: string;
  type: 'delay' | 'exception' | 'delivered' | 'update';
  title: string;
  message: string;
  createdAt: string; // ISO
  relatedShipmentId?: string;
  read: boolean;
};

export type PerformanceMetric = {
  id: string;
  label: string;
  value: number;
  unit?: string;
};

// In-memory mock store (replace with API integration later)
const store = {
  shipments: [] as Shipment[],
  notifications: [] as Notification[],
};

// Seed a sample shipment
(function seed() {
  if (store.shipments.length > 0) return;
  const shipment: Shipment = {
    id: generateId(),
    batchId: 'BATCH-1001',
    cropType: 'Maize',
    quantityKg: 1200,
    condition: 'good',
    origin: 'Farm A, Nashik',
    destination: 'Market Yard, Pune',
    currentStatus: 'in_transit',
    currentLocation: { lat: 18.5204, lng: 73.8567 },
    eta: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    checkpoints: [
      {
        id: generateId(),
        name: 'Farm Gate',
        location: { lat: 19.9975, lng: 73.7898 },
        timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        handlerRole: 'farmer',
        notes: 'Loaded in good condition',
      },
      {
        id: generateId(),
        name: 'Highway Checkpost',
        location: { lat: 19.0, lng: 74.0 },
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        handlerRole: 'logistics',
        notes: 'All clear',
      },
    ],
    buyerId: 'buyer-1',
    farmerId: 'farmer-1',
    logisticsPartnerId: 'log-1',
  };
  store.shipments.push(shipment);
  store.notifications.push({
    id: generateId(),
    type: 'update',
    title: 'Shipment created',
    message: `Shipment ${shipment.batchId} created`,
    createdAt: new Date().toISOString(),
    relatedShipmentId: shipment.id,
    read: false,
  });
})();

// Query functions
export async function listShipments(): Promise<Shipment[]> {
  return structuredClone(store.shipments);
}

export async function getShipmentById(id: string): Promise<Shipment | undefined> {
  return structuredClone(store.shipments.find((s) => s.id === id));
}

export async function listNotifications(): Promise<Notification[]> {
  return structuredClone(store.notifications).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function markNotificationRead(id: string): Promise<void> {
  const n = store.notifications.find((n) => n.id === id);
  if (n) n.read = true;
}

// Mutation functions
export type ShipmentUpdateInput = Partial<Pick<Shipment, 'quantityKg' | 'condition' | 'currentStatus' | 'currentLocation' | 'eta'>> & {
  addCheckpoint?: Omit<Checkpoint, 'id' | 'timestamp'> & { timestamp?: string };
};

export async function updateShipment(id: string, input: ShipmentUpdateInput): Promise<Shipment | undefined> {
  const s = store.shipments.find((s) => s.id === id);
  if (!s) return undefined;

  if (input.quantityKg !== undefined) s.quantityKg = input.quantityKg;
  if (input.condition !== undefined) s.condition = input.condition;
  if (input.currentStatus !== undefined) s.currentStatus = input.currentStatus;
  if (input.currentLocation !== undefined) s.currentLocation = input.currentLocation;
  if (input.eta !== undefined) s.eta = input.eta;

  if (input.addCheckpoint) {
    const cp: Checkpoint = {
      id: generateId(),
      name: input.addCheckpoint.name,
      location: input.addCheckpoint.location,
      timestamp: input.addCheckpoint.timestamp || new Date().toISOString(),
      handlerRole: input.addCheckpoint.handlerRole,
      notes: input.addCheckpoint.notes,
    };
    s.checkpoints.push(cp);
  }

  store.notifications.unshift({
    id: generateId(),
    type: s.currentStatus === 'delayed' ? 'delay' : 'update',
    title: `Shipment ${s.batchId} updated`,
    message: `Status: ${s.currentStatus}`,
    createdAt: new Date().toISOString(),
    relatedShipmentId: s.id,
    read: false,
  });

  return structuredClone(s);
}

export async function createShipment(shipment: Omit<Shipment, 'id' | 'checkpoints'> & { checkpoints?: Checkpoint[] }): Promise<Shipment> {
  const newShipment: Shipment = {
    ...shipment,
    id: generateId(),
    checkpoints: shipment.checkpoints || [],
  };
  store.shipments.push(newShipment);
  store.notifications.unshift({
    id: generateId(),
    type: 'update',
    title: `Shipment ${newShipment.batchId} created`,
    message: `From ${newShipment.origin} to ${newShipment.destination}`,
    createdAt: new Date().toISOString(),
    relatedShipmentId: newShipment.id,
    read: false,
  });
  return structuredClone(newShipment);
}

export async function getPerformanceMetrics(): Promise<PerformanceMetric[]> {
  // Stub analytics
  const shipments = store.shipments;
  const total = shipments.length;
  const delivered = shipments.filter((s) => s.currentStatus === 'delivered').length;
  const delayed = shipments.filter((s) => s.currentStatus === 'delayed').length;
  const onTimeRate = total === 0 ? 0 : Math.round(((delivered - delayed) / Math.max(delivered, 1)) * 100);

  return [
    { id: 'total', label: 'Total Shipments', value: total },
    { id: 'delivered', label: 'Delivered', value: delivered },
    { id: 'delayed', label: 'Delayed', value: delayed },
    { id: 'onTime', label: 'On-time Rate', value: onTimeRate, unit: '%' },
  ];
}
