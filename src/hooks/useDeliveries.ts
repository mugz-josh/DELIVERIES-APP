import { useState, useEffect } from 'react';

export interface Delivery {
  id: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  date: string;
  address: string;
}

export interface DeliveryStats {
  pending: number;
  inTransit: number;
  delivered: number;
  total: number;
}

export const useDeliveries = () => {
  const [deliveryStats, setDeliveryStats] = useState<DeliveryStats | null>(null);
  const [recentDeliveries, setRecentDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // For now, use mock data - replace with real API later
        const mockStats: DeliveryStats = {
          pending: 3,
          inTransit: 2,
          delivered: 15,
          total: 20
        };
        
        const mockDeliveries: Delivery[] = [
          { id: 'D-1234', status: 'in_transit', date: '2023-10-15', address: '123 Main St, Nairobi' },
          { id: 'D-1233', status: 'pending', date: '2023-10-14', address: '456 Uhuru Highway, Nairobi' },
          { id: 'D-1232', status: 'delivered', date: '2023-10-13', address: '789 Mombasa Road, Nairobi' }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDeliveryStats(mockStats);
        setRecentDeliveries(mockDeliveries);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { deliveryStats, recentDeliveries, loading, error };
};