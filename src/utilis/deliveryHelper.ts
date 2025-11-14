export interface StatusConfig {
  class: string;
  text: string;
}

export const getStatusConfig = (status: string): StatusConfig => {
  const statusConfig: Record<string, StatusConfig> = {
    pending: { class: 'status-badge pending', text: 'Pending' },
    in_transit: { class: 'status-badge in-transit', text: 'In Transit' },
    delivered: { class: 'status-badge delivered', text: 'Delivered' },
    cancelled: { class: 'status-badge cancelled', text: 'Cancelled' }
  };
  
  return statusConfig[status] || statusConfig.pending;
};