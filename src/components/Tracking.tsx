import React, { useState, useCallback } from 'react';
import { Search, MapPin, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

// --- MOCK API SERVICE IMPLEMENTATION ---

interface TrackingEvent {
  status: string;
  date: string;
  location: string;
  completed: boolean;
}

interface TrackingResult {
  trackingNumber: string;
  orderId: string;
  status: string;
  currentLocation: string;
  estimatedDelivery: string;
  timeline: TrackingEvent[];
}

// Mock database: Use these numbers to test the tracker
const mockData: { [key: string]: TrackingResult } = {
  'QD123456789': {
    trackingNumber: 'QD123456789',
    orderId: 'ORD-7890',
    status: 'Out for Delivery',
    currentLocation: 'Kampala Central Hub',
    estimatedDelivery: 'Today by 5:00 PM',
    timeline: [
      { status: 'Package Received', date: '2025-10-14 10:00 AM', location: 'Shipper Facility', completed: true },
      { status: 'In Transit', date: '2025-10-14 02:30 PM', location: 'Intermediate Sorting Center', completed: true },
      { status: 'Arrived at Destination Hub', date: '2025-10-15 08:00 AM', location: 'Kampala Central Hub', completed: true },
      { status: 'Out for Delivery', date: '2025-10-15 09:30 AM', location: 'Kampala Central Hub', completed: false },
      { status: 'Delivered', date: '2025-10-15 05:00 PM', location: 'Customer Address', completed: false },
    ],
  },
  'QD999000111': {
    trackingNumber: 'QD999000111',
    orderId: 'ORD-9999',
    status: 'Delivered',
    currentLocation: 'Customer Address',
    estimatedDelivery: 'Yesterday, 1:45 PM',
    timeline: [
      { status: 'Package Received', date: '2025-10-12 09:00 AM', location: 'Shipper Facility', completed: true },
      { status: 'In Transit', date: '2025-10-12 04:00 PM', location: 'Nairobi Airport', completed: true },
      { status: 'Arrived at Destination Hub', date: '2025-10-14 07:00 AM', location: 'Kampala Central Hub', completed: true },
      { status: 'Out for Delivery', date: '2025-10-14 10:00 AM', location: 'Local Depot', completed: true },
      { status: 'Delivered', date: '2025-10-14 01:45 PM', location: 'Customer Address', completed: true },
    ],
  }
};

const mockTrackPackage = (trackingNumber: string): Promise<TrackingResult> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
        const result = mockData[trackingNumber];
        if (result) {
            resolve(result);
        } else {
            // Simulate not found error
            reject(new Error('Tracking number not found. Try QD123456789 (In Transit) or QD999000111 (Delivered).'));
        }
    }, 1500); 
  });
};

// --- HELPER FUNCTION ---
const getStatusIcon = (status: string, size: number = 24) => {
    switch (status.toLowerCase()) {
      case 'package received':
        return <Package size={size} />;
      case 'out for delivery':
        return <Truck size={size} />;
      case 'delivered':
        return <CheckCircle size={size} />;
      default:
        return <MapPin size={size} />;
    }
};

// --- MAIN REACT COMPONENT ---
const App = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;

        setLoading(true);
        setError('');
        setTrackingResult(null);

        // API call simulation with error handling
        try {
            const data = await mockTrackPackage(trackingNumber.toUpperCase().trim());
            setTrackingResult(data);
        } catch (err: any) {
            console.error('Tracking failed:', err);
            setError(err.message || 'Something went wrong. Please check the number and try again.');
        } finally {
            setLoading(false);
        }
    }, [trackingNumber]);

    return (
        <div className="tracking-wrapper">
            {/* INLINED CSS FROM Tracking.css for guaranteed compilation */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                
                /* ==============================
                   CONTAINER & LAYOUT
                   ============================== */
                .tracking-wrapper {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 4rem 2rem;
                    /* Matches your dark gradient background */
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                    font-family: 'Poppins', sans-serif;
                    color: #e0e0e0;
                    box-sizing: border-box;
                    width: 100%;
                }

                .tracking-container {
                    width: 100%;
                    max-width: 800px;
                    /* Dark card background with slight transparency */
                    background: rgba(22,33,62,0.95);
                    border-radius: 15px;
                    padding: 40px;
                    /* Gold/Orange border accent */
                    border: 1px solid rgba(243,156,18,0.4);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.6);
                    backdrop-filter: blur(5px);
                }
                
                .tracking-header {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .tracking-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #f39c12; /* Accent Color */
                    margin-bottom: 10px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                .tracking-subtitle {
                    font-size: 1.1rem;
                    color: #b0c4de;
                    margin: 0;
                }

                /* ==============================
                   FORM AND INPUT
                   ============================== */
                .tracking-form {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                
                .tracking-input-wrapper {
                    flex-grow: 1;
                    position: relative;
                    min-width: 250px;
                }

                .tracking-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #f39c12;
                }

                .tracking-input {
                    width: 100%;
                    padding: 15px 15px 15px 50px;
                    border-radius: 10px;
                    border: 2px solid rgba(243,156,18,0.3);
                    background: rgba(0,0,0,0.1);
                    color: #fff;
                    font-size: 1rem;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    outline: none;
                }

                .tracking-input::placeholder {
                    color: #94a3b8;
                }

                .tracking-input:focus {
                    border-color: #f39c12;
                    box-shadow: 0 0 0 3px rgba(243,156,18,0.4);
                }

                .tracking-button {
                    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 10px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    flex-shrink: 0;
                }

                .tracking-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(243,156,18,0.4);
                }

                .tracking-button:disabled {
                    background: #555;
                    cursor: not-allowed;
                    opacity: 0.7;
                }
                
                /* ==============================
                   RESULT DISPLAY
                   ============================== */
                .tracking-result {
                    background: rgba(26, 26, 46, 0.9);
                    padding: 30px;
                    border-radius: 15px;
                    border: 1px solid rgba(52, 152, 219, 0.3);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.4);
                }
                
                .result-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px dashed #3e4c6c;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                
                .result-status {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .result-status > svg {
                    color: #3498db; /* Blue for the main truck icon */
                }

                .result-status h3 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: #fff;
                }
                
                .result-eta {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-align: right;
                }
                
                .result-eta > svg {
                    color: #2ecc71; /* Green for clock */
                }

                .eta-label {
                    color: #b0c4de;
                    font-size: 0.9rem;
                    margin: 0;
                }
                
                .eta-time {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #fff;
                    margin: 0;
                }

                .status-badge {
                    display: inline-block;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }

                /* Status Color Mapping */
                .status-badge.Package-Received {
                    background: #3498db; 
                    color: white;
                }
                .status-badge.In-Transit, .status-badge.Out-for-Delivery {
                    background: #f39c12;
                    color: #1a1a2e;
                }
                .status-badge.Delivered {
                    background: #1abc9c;
                    color: #1a1a2e;
                }
                
                .result-location {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #b0c4de;
                    margin-bottom: 30px;
                    font-size: 1rem;
                    padding: 5px 10px;
                    background: rgba(0,0,0,0.1);
                    border-left: 4px solid #3498db;
                    border-radius: 4px;
                }
                
                .result-location > svg {
                    color: #3498db;
                }

                /* ==============================
                   TRACKING TIMELINE
                   ============================== */
                .tracking-timeline {
                    position: relative;
                    padding-left: 20px;
                }

                .tracking-timeline::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background-color: #3e4c6c; /* Timeline line color */
                    border-radius: 1px;
                }

                .timeline-item {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 25px;
                    position: relative;
                    padding-left: 30px;
                }

                .timeline-icon {
                    position: absolute;
                    left: -15px;
                    top: 0;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 0 0 4px #1a1a2e;
                    z-index: 10;
                }
                
                .timeline-item.completed .timeline-icon {
                    background: #2ecc71; 
                }
                
                .timeline-item.pending .timeline-icon {
                    background: #e67e22; 
                }
                
                .timeline-content h4 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #fff;
                }

                .timeline-content p {
                    margin: 5px 0 0;
                    font-size: 0.9rem;
                    color: #b0c4de;
                }

                /* Placeholder & Error */
                .tracking-placeholder {
                    text-align: center;
                    padding: 50px 20px;
                    border: 1px dashed #3e4c6c;
                    border-radius: 10px;
                    color: #b0c4de;
                }

                .tracking-placeholder > svg {
                    color: #3e4c6c;
                    margin-bottom: 15px;
                }
                
                .tracking-error {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #c0392b;
                    color: white;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-weight: 600;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                }

                /* Responsive Adjustments */
                @media (max-width: 640px) {
                    .tracking-container {
                        padding: 30px 20px;
                    }
                    .tracking-form {
                        flex-direction: column;
                        gap: 10px;
                    }
                    .tracking-button {
                        width: 100%;
                    }
                    .result-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .result-eta {
                        align-self: flex-end;
                        text-align: left;
                    }
                }
                /* Keyframe for loading spinner */
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .animate-spin {
                    animation: spin 1.5s linear infinite;
                }
                `}
            </style>


            <div className="tracking-container">
                <div className="tracking-header">
                    <h2 className="tracking-title">Track Your Shipment</h2>
                    <p className="tracking-subtitle">
                        Enter your tracking number below to view the real-time status of your delivery.
                    </p>
                </div>

                <form className="tracking-form" onSubmit={handleTrack}>
                    <div className="tracking-input-wrapper">
                        <Search className="tracking-icon" size={20} />
                        <input
                            type="text"
                            className="tracking-input"
                            placeholder="Enter tracking number (e.g., QD123456789)"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="tracking-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Track Package'}
                    </button>
                </form>

                {error && (
                    <div className="tracking-error">
                        <XCircle size={20} style={{ marginRight: '10px' }} />
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="tracking-placeholder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Clock size={40} style={{ color: '#f39c12' }} className="animate-spin" />
                        <p style={{ marginTop: '15px', color: '#f39c12' }}>Searching for shipment details...</p>
                    </div>
                )}

                {trackingResult && (
                    <div className="tracking-result">
                        <div className="result-header">
                            <div className="result-status">
                                {getStatusIcon(trackingResult.status, 32)}
                                <div>
                                    <h3>Order #{trackingResult.orderId}</h3>
                                    <span className={`status-badge ${trackingResult.status.replace(/\s+/g, '-')}`}>
                                        {trackingResult.status}
                                    </span>
                                </div>
                            </div>
                            <div className="result-eta">
                                <Clock size={24} />
                                <div>
                                    <p className="eta-label">Estimated Delivery</p>
                                    <p className="eta-time">{trackingResult.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        <div className="result-location">
                            <MapPin size={20} />
                            <span>Current Location: **{trackingResult.currentLocation}**</span>
                        </div>

                        <div className="tracking-timeline">
                            {trackingResult.timeline.map((event: TrackingEvent, index: number) => (
                                <div
                                    key={index}
                                    // Use 'completed' class if event.completed is true, otherwise use 'pending'
                                    className={`timeline-item ${event.completed ? 'completed' : 'pending'}`}
                                >
                                    <div className="timeline-icon">
                                        {/* Use CheckCircle for all completed steps for consistency */}
                                        {event.completed ? <CheckCircle size={16} /> : getStatusIcon(event.status, 16)}
                                    </div>
                                    <div className="timeline-content">
                                        <h4>{event.status}</h4>
                                        <p>{event.location} - {event.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!trackingResult && !error && !loading && (
                    <div className="tracking-placeholder">
                        <Package size={64} />
                        <p>
                            Enter a tracking number to view your package status.
                            <br />
                            <small>
                                *Try **QD123456789** (In Transit) or **QD999000111** (Delivered) to test the tracker.*
                            </small>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App; // <-- THIS LINE WAS CHANGED TO EXPORT THE COMPONENT CORRECTLY
