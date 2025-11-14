import { X, User, Mail, Phone, MapPin, Calendar, Package } from 'lucide-react';
import './ProfileModal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string | null;
}

const ProfileModal = ({ isOpen, onClose, profileImage }: ProfileModalProps) => {
  if (!isOpen) return null;

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    memberSince: 'January 2024',
    totalOrders: 24,
    activeOrders: 3,
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="profile-modal-header">
          <div className="profile-modal-image-wrapper">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-modal-image" />
            ) : (
              <div className="profile-modal-placeholder">
                <User size={48} />
              </div>
            )}
          </div>
          <h2>{userProfile.name}</h2>
          <p className="profile-member-since">
            <Calendar size={16} />
            Member since {userProfile.memberSince}
          </p>
        </div>

        <div className="profile-modal-stats">
          <div className="profile-stat">
            <h3>{userProfile.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
          <div className="profile-stat">
            <h3>{userProfile.activeOrders}</h3>
            <p>Active Orders</p>
          </div>
        </div>

        <div className="profile-modal-details">
          <div className="profile-detail-item">
            <div className="profile-detail-icon">
              <Mail size={20} />
            </div>
            <div className="profile-detail-content">
              <label>Email Address</label>
              <p>{userProfile.email}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <div className="profile-detail-icon">
              <Phone size={20} />
            </div>
            <div className="profile-detail-content">
              <label>Phone Number</label>
              <p>{userProfile.phone}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <div className="profile-detail-icon">
              <MapPin size={20} />
            </div>
            <div className="profile-detail-content">
              <label>Default Address</label>
              <p>{userProfile.address}</p>
            </div>
          </div>
        </div>

        <div className="profile-modal-actions">
          <button className="profile-edit-btn">Edit Profile</button>
          <button className="profile-orders-btn">
            <Package size={18} />
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
