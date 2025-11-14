// src/context/types.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'driver' | 'admin' | 'dispatcher';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

// ✅ Added `item` to Delivery
export interface Delivery {
  id: string;
  userId: string;
  item: string;                  // required for Dashboard display
  pickupAddress: string;
  deliveryAddress: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
