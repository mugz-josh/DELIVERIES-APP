export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'driver' | 'admin';
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

export interface Delivery {
  id: string;
  userId: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}