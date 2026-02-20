import { LoginCredentials, AuthResponse, User } from '../context/types';

// ✅ FIXED: Add fallback in case environment variable is missing
// Use REACT_APP_API_URL env variable, fallback to Render backend
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://deliverieseasy.onrender.com";

// -------------------------
// Auth API
// -------------------------
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Fixed: Use /api/auth/login instead of /otp/login
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error('Invalid email or password');
    return response.json();
  },

  logout: async (): Promise<void> => {
    // Fixed: Use /api/auth/logout instead of /otp/logout
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
  },

  getProfile: async (token: string): Promise<User> => {
    // Fixed: Use /api/auth/profile instead of /otp/profile
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },
};

// -------------------------
// Deliveries API
// -------------------------
export const fetchDeliveries = async (): Promise<any[]> => {
  // Fixed: Use /api/deliveries instead of /deliveries
  const response = await fetch(`${API_BASE_URL}/api/deliveries`);
  if (!response.ok) throw new Error('Failed to fetch deliveries');
  return response.json();
};

export const updateDeliveryStatus = async (id: string | number, status: string): Promise<void> => {
  // Fixed: Use /api/deliveries instead of /deliveries
  const response = await fetch(`${API_BASE_URL}/api/deliveries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update delivery status');
};

export const deleteDelivery = async (id: string | number): Promise<void> => {
  // Fixed: Use /api/deliveries instead of /deliveries
  const response = await fetch(`${API_BASE_URL}/api/deliveries/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete delivery');
};

// -------------------------
// Assign Driver API
// -------------------------
export const assignDriver = async (deliveryId: string | number, driverId: string | number): Promise<void> => {
  // Fixed: Use /api/deliveries instead of /deliveries
  const response = await fetch(`${API_BASE_URL}/api/deliveries/${deliveryId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ driverId }),
  });
  if (!response.ok) throw new Error('Failed to assign driver');
};
