import { LoginCredentials, AuthResponse, User } from '../context/types';

// ✅ FIXED: Add fallback in case environment variable is missing
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://backend-deliveries.onrender.com";

// -------------------------
// Auth API
// -------------------------
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/otp/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error('Invalid email or password');
    return response.json();
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_BASE_URL}/otp/logout`, { method: 'POST' });
  },

  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/otp/profile`, {
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
  const response = await fetch(`${API_BASE_URL}/deliveries`);
  if (!response.ok) throw new Error('Failed to fetch deliveries');
  return response.json();
};

export const updateDeliveryStatus = async (id: string | number, status: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/deliveries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update delivery status');
};

export const deleteDelivery = async (id: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/deliveries/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete delivery');
};

// -------------------------
// Assign Driver API
// -------------------------
export const assignDriver = async (deliveryId: string | number, driverId: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ driverId }),
  });
  if (!response.ok) throw new Error('Failed to assign driver');
};