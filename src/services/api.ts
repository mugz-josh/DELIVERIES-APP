import { LoginCredentials, AuthResponse, User } from '../context/types';

// Use local backend during development - connects to localhost:5000
const API_BASE_URL = "http://localhost:5000";

// -------------------------
// Auth API
// -------------------------
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error('Invalid email or password');
    return response.json();
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
  },

  getProfile: async (token: string): Promise<User> => {
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
  const response = await fetch(`${API_BASE_URL}/api/deliveries`);
  if (!response.ok) throw new Error('Failed to fetch deliveries');
  return response.json();
};

export const updateDeliveryStatus = async (id: string | number, status: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/deliveries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update delivery status');
};

export const deleteDelivery = async (id: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/deliveries/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete delivery');
};

// -------------------------
// Assign Driver API
// -------------------------
export const assignDriver = async (deliveryId: string | number, driverId: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/deliveries/${deliveryId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ driverId }),
  });
  if (!response.ok) throw new Error('Failed to assign driver');
};
