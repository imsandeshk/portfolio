import { Notification } from '@/types/scm';

export const generateDemoNotifications = (userId: string): Omit<Notification, 'id' | 'createdAt' | 'isRead'>[] => {
  return [
    {
      userId,
      title: 'Shipment Delay Alert',
      message: 'Shipment BATCH-2025-001 is experiencing a 2-hour delay due to traffic conditions.',
      type: 'warning',
      category: 'delay',
      shipmentId: '1',
    },
    {
      userId,
      title: 'Delivery Completed',
      message: 'Shipment BATCH-2025-002 has been successfully delivered to the destination.',
      type: 'success',
      category: 'delivery',
      shipmentId: '2',
    },
    {
      userId,
      title: 'Temperature Alert',
      message: 'Temperature reading for shipment BATCH-2025-003 exceeds recommended range.',
      type: 'error',
      category: 'exception',
      shipmentId: '3',
    },
    {
      userId,
      title: 'Checkpoint Update',
      message: 'Shipment BATCH-2025-001 has reached Distribution Center A.',
      type: 'info',
      category: 'update',
      shipmentId: '1',
    },
    {
      userId,
      title: 'Route Optimization',
      message: 'New optimized route available for shipment BATCH-2025-004 - estimated time saved: 30 minutes.',
      type: 'info',
      category: 'update',
      shipmentId: '4',
    },
  ];
};
