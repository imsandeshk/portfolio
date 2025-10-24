import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Notification } from '@/types/scm';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load demo notifications on mount
  React.useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: '1',
        userId: 'demo',
        title: 'Shipment Delay Alert',
        message: 'Shipment BATCH-2025-001 is experiencing a 2-hour delay due to traffic conditions.',
        type: 'warning',
        category: 'delay',
        shipmentId: '1',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        id: '2',
        userId: 'demo',
        title: 'Delivery Completed',
        message: 'Shipment BATCH-2025-002 has been successfully delivered to the destination.',
        type: 'success',
        category: 'delivery',
        shipmentId: '2',
        isRead: false,
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      },
      {
        id: '3',
        userId: 'demo',
        title: 'Temperature Alert',
        message: 'Temperature reading for shipment BATCH-2025-003 exceeds recommended range.',
        type: 'error',
        category: 'exception',
        shipmentId: '3',
        isRead: true,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
    ];
    setNotifications(demoNotifications);
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
