// API service layer for Supply Chain Management
import { Shipment, Notification, User } from '@/contexts/SupplyChainContext';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds

// Request configuration
interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// API Response wrapper
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Custom error class
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = { method: 'GET' }
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout || API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        await response.json().catch(() => null)
      );
    }

    const data = await response.json();
    return {
      data,
      success: true,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500
    );
  }
}

// Authentication API
export const authApi = {
  // Login user
  login: async (email: string, password: string) => {
    return apiRequest<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // Register user
  register: async (userData: {
    email: string;
    password: string;
    full_name: string;
    role: string;
    organization?: string;
    phone?: string;
    address?: string;
  }) => {
    return apiRequest<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: userData,
    });
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
    });
  },

  // Logout user
  logout: async () => {
    return apiRequest<void>('/auth/logout', {
      method: 'POST',
    });
  },

  // Get current user profile
  getProfile: async (token: string) => {
    return apiRequest<User>('/auth/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Update user profile
  updateProfile: async (token: string, updates: Partial<User>) => {
    return apiRequest<User>('/auth/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: updates,
    });
  },
};

// Shipments API
export const shipmentsApi = {
  // Get all shipments
  getShipments: async (token: string, filters?: {
    status?: string;
    userId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    
    const endpoint = `/shipments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest<Shipment[]>(endpoint, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get shipment by ID
  getShipment: async (token: string, id: string) => {
    return apiRequest<Shipment>(`/shipments/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Create new shipment
  createShipment: async (token: string, shipmentData: Omit<Shipment, 'id' | 'created_at' | 'updated_at'>) => {
    return apiRequest<Shipment>('/shipments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: shipmentData,
    });
  },

  // Update shipment
  updateShipment: async (token: string, id: string, updates: Partial<Shipment>) => {
    return apiRequest<Shipment>(`/shipments/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: updates,
    });
  },

  // Delete shipment
  deleteShipment: async (token: string, id: string) => {
    return apiRequest<void>(`/shipments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Update shipment status
  updateStatus: async (token: string, id: string, status: string, location?: string) => {
    return apiRequest<Shipment>(`/shipments/${id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { status, location },
    });
  },

  // Add checkpoint
  addCheckpoint: async (token: string, id: string, checkpoint: {
    name: string;
    timestamp: string;
    location?: { lat: number; lng: number };
  }) => {
    return apiRequest<Shipment>(`/shipments/${id}/checkpoints`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: checkpoint,
    });
  },
};

// Notifications API
export const notificationsApi = {
  // Get all notifications
  getNotifications: async (token: string, filters?: {
    isRead?: boolean;
    type?: string;
    priority?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
    }
    
    const endpoint = `/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest<Notification[]>(endpoint, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Mark notification as read
  markAsRead: async (token: string, id: string) => {
    return apiRequest<void>(`/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Mark all notifications as read
  markAllAsRead: async (token: string) => {
    return apiRequest<void>('/notifications/read-all', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Create notification
  createNotification: async (token: string, notification: Omit<Notification, 'id'>) => {
    return apiRequest<Notification>('/notifications', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: notification,
    });
  },
};

// Reports API
export const reportsApi = {
  // Get delivery performance data
  getDeliveryPerformance: async (token: string, period: string = '6months') => {
    return apiRequest<any[]>(`/reports/delivery-performance?period=${period}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get revenue analytics
  getRevenueAnalytics: async (token: string, period: string = '6months') => {
    return apiRequest<any[]>(`/reports/revenue?period=${period}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get crop distribution
  getCropDistribution: async (token: string) => {
    return apiRequest<any[]>(`/reports/crop-distribution`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Generate custom report
  generateReport: async (token: string, reportConfig: {
    type: string;
    format: 'pdf' | 'excel';
    filters: Record<string, any>;
  }) => {
    return apiRequest<{ downloadUrl: string }>('/reports/generate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: reportConfig,
    });
  },
};

// Users API (Admin only)
export const usersApi = {
  // Get all users
  getUsers: async (token: string, filters?: {
    role?: string;
    status?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    
    const endpoint = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest<User[]>(endpoint, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get user by ID
  getUser: async (token: string, id: string) => {
    return apiRequest<User>(`/users/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Update user
  updateUser: async (token: string, id: string, updates: Partial<User>) => {
    return apiRequest<User>(`/users/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: updates,
    });
  },

  // Suspend user
  suspendUser: async (token: string, id: string, reason: string) => {
    return apiRequest<void>(`/users/${id}/suspend`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { reason },
    });
  },

  // Activate user
  activateUser: async (token: string, id: string) => {
    return apiRequest<void>(`/users/${id}/activate`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Real-time API (WebSocket)
export const realtimeApi = {
  // Connect to WebSocket for real-time updates
  connect: (token: string, onMessage: (data: any) => void) => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001/ws';
    const ws = new WebSocket(`${wsUrl}?token=${token}`);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return ws;
  },
};

// Export all APIs
export const api = {
  auth: authApi,
  shipments: shipmentsApi,
  notifications: notificationsApi,
  reports: reportsApi,
  users: usersApi,
  realtime: realtimeApi,
};

export default api;