/* extensions/notification-module/main.js */

// This script is loaded by the ExtensionJS engine.
// It must attach its functionality to the 'exports' object.

// 1. Define the module's API
const api = {
    show: function(options = {}) {
        const container = document.getElementById('notification-container');
        if (!container) {
            console.error('Notification module container not found. Was the module initialized?');
            return;
        }

        const {
            title,
            message,
            type = 'info',
            icon,
            duration = 4000
        } = options;

        if (!message) {
            console.error("Notification Error: A 'message' is required.");
            return;
        }

        const notif = document.createElement('div');
        notif.className = `notification ${type}`;

        if (duration > 0) {
            const fadeDurationSec = 0.5;
            const fadeDelaySec = Math.max(0, (duration / 1000) - fadeDurationSec);
            notif.style.animation = `slideIn 0.3s ease-out forwards, fadeOut ${fadeDurationSec}s ease-in ${fadeDelaySec}s forwards`;
        } else {
            notif.style.animation = `slideIn 0.3s ease-out forwards`;
        }

        const defaultIcons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };

        const finalIcon = icon || defaultIcons[type] || defaultIcons.info;
        const finalTitle = title || (type.charAt(0).toUpperCase() + type.slice(1));

        notif.innerHTML = `
            <div class="notification-header">
                <span class="notification-icon">${finalIcon}</span>
                <span>${finalTitle}</span>
            </div>
            <div class="notification-body">
                ${message}
            </div>
        `;

        container.appendChild(notif);

        if (duration > 0) {
            setTimeout(() => {
                notif.remove();
            }, duration);
        }
    }
};

// 2. Define the module's initialization function
const initialize = function(options = {}) {
    // Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/framework/extensions/notification-module/style.css';
    document.head.appendChild(link);

    // Create notification container
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    console.log('Notification Module: Initialized.');
};


// 3. Export the API and initializer
exports.api = api;
exports.initialize = initialize;