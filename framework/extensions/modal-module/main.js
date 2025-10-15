/* extensions/modal-module/main.js */

// 1. Define the module's API
const api = {
    /**
     * Shows a confirmation dialog.
     * @param {object} options - { title: string, message: string, onConfirm: function, onCancel: function }
     */
    confirm: function(options = {}) {
        const { title = 'Confirmation', message, onConfirm, onCancel } = options;

        const modalContent = `
            <div class="modal-header">
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                <p>${message || ''}</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn-cancel">Cancel</button>
                <button class="modal-btn-confirm">OK</button>
            </div>
        `;
        
        const modalElement = createModal(modalContent, 'modal-type-dialog');

        modalElement.querySelector('.modal-btn-confirm').addEventListener('click', () => {
            if (typeof onConfirm === 'function') onConfirm();
            closeModal(modalElement);
        });

        modalElement.querySelector('.modal-btn-cancel').addEventListener('click', () => {
            if (typeof onCancel === 'function') onCancel();
            closeModal(modalElement);
        });
    },

    /**
     * Shows an alert dialog.
     * @param {object} options - { title: string, message: string, onOK: function }
     */
    alert: function(options = {}) {
        const { title = 'Alert', message, onOK } = options;

        const modalContent = `
            <div class="modal-header">
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                <p>${message || ''}</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn-ok">OK</button>
            </div>
        `;
        
        const modalElement = createModal(modalContent, 'modal-type-dialog');

        modalElement.querySelector('.modal-btn-ok').addEventListener('click', () => {
            if (typeof onOK === 'function') onOK();
            closeModal(modalElement);
        });
    },

    /**
     * Shows a powerful custom modal.
     * @param {object} options - { title: string, html: string, buttons: array }
     */
    show: function(options = {}) {
        const { title = 'Modal', html, buttons } = options;

        const headerHtml = `
            <h2>${title}</h2>
            ${!buttons || buttons.length === 0 ? '<button class="modal-btn-close">&times;</button>' : ''}
        `;

        const modalContent = `
            <div class="modal-header">${headerHtml}</div>
            <div class="modal-body">${html || ''}</div>
        `;
        
        const modalElement = createModal(modalContent, 'modal-type-custom');

        // Add footer if buttons are defined
        if (buttons && buttons.length > 0) {
            const footer = createModalFooter(buttons, modalElement);
            modalElement.querySelector('.modal-panel').appendChild(footer);
        }

        // Attach close button handler if it exists
        const closeButton = modalElement.querySelector('.modal-btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modalElement));
        }
    }
};

// --- Helper Functions ---

function createModalFooter(buttons, modalElement) {
    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    if (buttons.length === 1) {
        footer.style.gridTemplateColumns = '1fr';
    }

    buttons.forEach(buttonDef => {
        const button = document.createElement('button');
        
        if (buttonDef.type === 'primary') {
            button.className = 'modal-btn-confirm';
        } else {
            button.className = 'modal-btn-cancel';
        }
        
        button.textContent = buttonDef.text;
        
        button.addEventListener('click', () => {
            // Declarative action system
            if (buttonDef.action) {
                const [moduleName, actionName] = buttonDef.action.split('.');
                const moduleApi = window.ExtensionJS?.modules[moduleName];
                
                if (moduleApi && typeof moduleApi[actionName] === 'function') {
                    moduleApi[actionName](buttonDef.actionOptions || {});
                } else {
                    console.warn(`ExtensionJS: Action '${buttonDef.action}' not found.`);
                }
            }
            
            closeModal(modalElement);
        });
        
        if (buttonDef.type === 'secondary') {
            footer.prepend(button);
        } else {
            footer.appendChild(button);
        }
    });

    return footer;
}

function createModal(content, modalClass = '') {
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) closeModal(existingModal);

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalPanel = document.createElement('div');
    modalPanel.className = `modal-panel ${modalClass}`;
    modalPanel.innerHTML = content;

    modalOverlay.appendChild(modalPanel);
    document.body.appendChild(modalOverlay);

    const escapeHandler = (e) => {
        if (e.key === 'Escape') closeModal(modalOverlay);
    };
    modalOverlay._escapeHandler = escapeHandler;
    document.addEventListener('keydown', escapeHandler);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal(modalOverlay);
    });

    void modalOverlay.offsetWidth;
    modalOverlay.classList.add('visible');
    modalPanel.classList.add('visible');

    return modalOverlay;
}

function closeModal(modalOverlay) {
    if (!modalOverlay) return;
    
    const modalPanel = modalOverlay.querySelector('.modal-panel');

    if (modalOverlay._escapeHandler) {
        document.removeEventListener('keydown', modalOverlay._escapeHandler);
    }

    modalOverlay.classList.remove('visible');
    if(modalPanel) modalPanel.classList.remove('visible');

    setTimeout(() => modalOverlay.remove(), 300);
}

// 2. Define the module's initialization function
const initialize = function(options = {}) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/framework/extensions/modal-module/style.css';
    document.head.appendChild(link);

    console.log('Modal Module: Initialized.');
};

// 3. Export the API and initializer
exports.api = api;
exports.initialize = initialize;