// Dashboard JavaScript

// Sidebar navigation
const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to section
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate metrics on load
document.addEventListener('DOMContentLoaded', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate chart bars
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 50);
        });
    }, 600);
});

// Quick action buttons
const quickActionCards = document.querySelectorAll('.quick-action-card');
quickActionCards.forEach(card => {
    card.addEventListener('click', function() {
        const label = this.querySelector('.quick-action-label').textContent;
        console.log(`Quick action clicked: ${label}`);
        
        // Add animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Show notification (you can replace this with a proper notification system)
        showNotification(`Action: ${label}`, 'info');
    });
});

// Track buttons
const trackButtons = document.querySelectorAll('.btn-link');
trackButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const row = this.closest('tr');
        const trackingId = row.querySelector('code').textContent;
        console.log(`Tracking: ${trackingId}`);
        showNotification(`Tracking ${trackingId}`, 'info');
    });
});

// Simple notification system
function showNotification(message, type = 'info') {
    // Check if notification container exists, if not create it
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-left: 4px solid ${type === 'info' ? '#4A90E2' : '#28A745'};
        animation: slideIn 0.3s ease;
        min-width: 250px;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Dashboard header actions
const exportButton = document.querySelector('.dashboard-header-actions .btn-secondary');
const newCampaignButton = document.querySelector('.dashboard-header-actions .btn-primary');

if (exportButton) {
    exportButton.addEventListener('click', () => {
        showNotification('Preparing export...', 'info');
        setTimeout(() => {
            showNotification('Report exported successfully!', 'success');
        }, 1500);
    });
}

if (newCampaignButton) {
    newCampaignButton.addEventListener('click', () => {
        showNotification('Opening campaign creator...', 'info');
    });
}

// Chart filter functionality
const chartFilters = document.querySelectorAll('.chart-filter');
chartFilters.forEach(filter => {
    filter.addEventListener('change', function() {
        const selectedOption = this.value;
        console.log(`Chart filter changed to: ${selectedOption}`);
        showNotification(`Updated to: ${selectedOption}`, 'info');
        
        // Animate bars again with new data (simulated)
        const bars = this.closest('.chart-card').querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const currentWidth = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                // Simulate new data by slightly adjusting the width
                const widthNum = parseInt(currentWidth);
                const newWidth = Math.max(20, Math.min(100, widthNum + (Math.random() * 20 - 10)));
                bar.style.width = newWidth + '%';
            }, 300);
        });
    });
});

// Notification bell
const notificationBell = document.querySelector('.btn-icon[title="Notifications"]');
if (notificationBell) {
    notificationBell.addEventListener('click', () => {
        showNotification('You have 3 new notifications', 'info');
    });
}

// User profile button
const userProfile = document.querySelector('.btn-icon[title="User Profile"]');
if (userProfile) {
    userProfile.addEventListener('click', () => {
        showNotification('Opening user profile...', 'info');
    });
}

// Real-time updates simulation (optional - simulates live data)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update a random metric slightly
        const metrics = document.querySelectorAll('.metric-value');
        if (metrics.length > 0) {
            const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
            const currentValue = randomMetric.textContent;
            
            // Skip if not a number
            if (currentValue.includes('$') || !isNaN(currentValue.replace(/,/g, ''))) {
                console.log('Real-time data update simulated');
            }
        }
    }, 30000); // Every 30 seconds
}

// Uncomment to enable real-time updates
// simulateRealTimeUpdates();

console.log('🐰 BunnyEra Dashboard loaded successfully!');
