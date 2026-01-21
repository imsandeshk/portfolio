import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Types
export interface Shipment {
  id: string;
  crop: string;
  quantity: string;
  origin: string;
  destination: string;
  status: 'processing' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled';
  progress: number;
  currentLocation: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  logisticsPartner: string;
  driver?: string;
  vehicle?: string;
  checkpoints: Checkpoint[];
  quality: string;
  temperature?: string;
  humidity?: string;
  specialInstructions?: string;
  created_at: string;
  updated_at: string;
}

export interface Checkpoint {
  name: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Notification {
  id: string;
  type: 'delay' | 'delivery' | 'quality' | 'update' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  shipmentId?: string;
  actionRequired: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'farmer' | 'logistics' | 'market_agent' | 'buyer' | 'admin';
  organization?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

// State interface
interface SupplyChainState {
  shipments: Shipment[];
  notifications: Notification[];
  users: User[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

// Action types
type SupplyChainAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SHIPMENTS'; payload: Shipment[] }
  | { type: 'ADD_SHIPMENT'; payload: Shipment }
  | { type: 'UPDATE_SHIPMENT'; payload: Shipment }
  | { type: 'DELETE_SHIPMENT'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UPDATE_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LAST_UPDATED'; payload: string };

// Initial state
const initialState: SupplyChainState = {
  shipments: [],
  notifications: [],
  users: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Reducer
const supplyChainReducer = (state: SupplyChainState, action: SupplyChainAction): SupplyChainState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_SHIPMENTS':
      return { ...state, shipments: action.payload };
    
    case 'ADD_SHIPMENT':
      return { ...state, shipments: [...state.shipments, action.payload] };
    
    case 'UPDATE_SHIPMENT':
      return {
        ...state,
        shipments: state.shipments.map(shipment =>
          shipment.id === action.payload.id ? action.payload : shipment
        ),
      };
    
    case 'DELETE_SHIPMENT':
      return {
        ...state,
        shipments: state.shipments.filter(shipment => shipment.id !== action.payload),
      };
    
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    
    case 'UPDATE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload.id ? action.payload : notification
        ),
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        ),
      };
    
    case 'SET_USERS':
      return { ...state, users: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    
    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload };
    
    default:
      return state;
  }
};

// Context interface
interface SupplyChainContextType {
  state: SupplyChainState;
  dispatch: React.Dispatch<SupplyChainAction>;
  
  // Shipment actions
  createShipment: (shipment: Omit<Shipment, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateShipment: (id: string, updates: Partial<Shipment>) => Promise<void>;
  deleteShipment: (id: string) => Promise<void>;
  getShipment: (id: string) => Shipment | undefined;
  getShipmentsByUser: (userId: string) => Shipment[];
  
  // Notification actions
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  getUnreadNotifications: () => Notification[];
  getNotificationsByType: (type: string) => Notification[];
  
  // User actions
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  getUser: (id: string) => User | undefined;
  
  // Utility actions
  refreshData: () => Promise<void>;
  clearError: () => void;
}

// Context
const SupplyChainContext = createContext<SupplyChainContextType | undefined>(undefined);

// Provider component
export const SupplyChainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(supplyChainReducer, initialState);
  const { user, role } = useAuth();

  // Mock data - in real app, this would come from API
  const mockShipments: Shipment[] = [
    {
      id: 'SH001',
      crop: 'Wheat',
      quantity: '500 kg',
      origin: 'Farm A, Punjab',
      destination: 'Central Market, Delhi',
      status: 'in_transit',
      progress: 65,
      currentLocation: 'Highway Checkpoint 3',
      estimatedDelivery: '2024-01-15 14:00',
      logisticsPartner: 'Green Logistics Co.',
      driver: 'John Smith',
      vehicle: 'Truck-ABC123',
      checkpoints: [
        { name: 'Farm A, Punjab', timestamp: '2024-01-14 08:00', status: 'completed' },
        { name: 'Loading Dock', timestamp: '2024-01-14 09:30', status: 'completed' },
        { name: 'Highway Checkpoint 1', timestamp: '2024-01-14 11:00', status: 'completed' },
        { name: 'Highway Checkpoint 2', timestamp: '2024-01-14 13:30', status: 'completed' },
        { name: 'Highway Checkpoint 3', timestamp: '2024-01-14 15:45', status: 'current' },
        { name: 'Distribution Center', timestamp: '2024-01-15 10:00', status: 'pending' },
        { name: 'Central Market, Delhi', timestamp: '2024-01-15 14:00', status: 'pending' }
      ],
      quality: 'premium',
      temperature: '25',
      humidity: '60',
      specialInstructions: 'Handle with care',
      created_at: '2024-01-14T08:00:00Z',
      updated_at: '2024-01-14T15:45:00Z'
    }
  ];

  const mockNotifications: Notification[] = [
    {
      id: 'NOT001',
      type: 'delay',
      title: 'Shipment Delay Alert',
      message: 'Shipment SH001 is delayed by 2 hours due to traffic congestion',
      timestamp: '2024-01-14 15:30',
      isRead: false,
      priority: 'high',
      shipmentId: 'SH001',
      actionRequired: true
    }
  ];

  // Initialize data
  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_SHIPMENTS', payload: mockShipments });
      dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date().toISOString() });
    }
  }, [user]);

  // Shipment actions
  const createShipment = async (shipmentData: Omit<Shipment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In real app, this would be an API call
      const newShipment: Shipment = {
        ...shipmentData,
        id: `SH${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_SHIPMENT', payload: newShipment });
      
      // Add notification
      const notification: Notification = {
        id: `NOT${Date.now()}`,
        type: 'update',
        title: 'New Shipment Created',
        message: `Shipment ${newShipment.id} has been created successfully`,
        timestamp: new Date().toISOString(),
        isRead: false,
        priority: 'medium',
        shipmentId: newShipment.id,
        actionRequired: false
      };
      
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create shipment' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateShipment = async (id: string, updates: Partial<Shipment>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In real app, this would be an API call
      const existingShipment = state.shipments.find(s => s.id === id);
      if (existingShipment) {
        const updatedShipment = {
          ...existingShipment,
          ...updates,
          updated_at: new Date().toISOString(),
        };
        
        dispatch({ type: 'UPDATE_SHIPMENT', payload: updatedShipment });
        
        // Add notification if status changed
        if (updates.status && updates.status !== existingShipment.status) {
          const notification: Notification = {
            id: `NOT${Date.now()}`,
            type: 'update',
            title: 'Shipment Status Updated',
            message: `Shipment ${id} status changed to ${updates.status}`,
            timestamp: new Date().toISOString(),
            isRead: false,
            priority: 'medium',
            shipmentId: id,
            actionRequired: false
          };
          
          dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
        }
      }
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update shipment' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteShipment = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In real app, this would be an API call
      dispatch({ type: 'DELETE_SHIPMENT', payload: id });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete shipment' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getShipment = (id: string) => {
    return state.shipments.find(shipment => shipment.id === id);
  };

  const getShipmentsByUser = (userId: string) => {
    // In real app, this would filter by user ID
    return state.shipments;
  };

  // Notification actions
  const markNotificationAsRead = async (id: string) => {
    try {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark notification as read' });
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      state.notifications.forEach(notification => {
        if (!notification.isRead) {
          dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
        }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark all notifications as read' });
    }
  };

  const getUnreadNotifications = () => {
    return state.notifications.filter(notification => !notification.isRead);
  };

  const getNotificationsByType = (type: string) => {
    return state.notifications.filter(notification => notification.type === type);
  };

  // User actions
  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In real app, this would be an API call
      const existingUser = state.users.find(u => u.id === id);
      if (existingUser) {
        const updatedUser = {
          ...existingUser,
          ...updates,
          updated_at: new Date().toISOString(),
        };
        
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      }
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update user' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getUser = (id: string) => {
    return state.users.find(user => user.id === id);
  };

  // Utility actions
  const refreshData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In real app, this would fetch fresh data from API
      dispatch({ type: 'SET_LAST_UPDATED', payload: new Date().toISOString() });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: SupplyChainContextType = {
    state,
    dispatch,
    createShipment,
    updateShipment,
    deleteShipment,
    getShipment,
    getShipmentsByUser,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotifications,
    getNotificationsByType,
    updateUser,
    getUser,
    refreshData,
    clearError,
  };

  return (
    <SupplyChainContext.Provider value={value}>
      {children}
    </SupplyChainContext.Provider>
  );
};

// Hook to use the context
export const useSupplyChain = (): SupplyChainContextType => {
  const context = useContext(SupplyChainContext);
  if (context === undefined) {
    throw new Error('useSupplyChain must be used within a SupplyChainProvider');
  }
  return context;
};