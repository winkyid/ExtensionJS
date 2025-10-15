/**
 * ExtensionJS - Core Engine
 *
 * This file discovers, loads, and manages all modules.
 */
(function() {
    // 1. Initialize the global namespace
    window.ExtensionJS = {
        modules: {},
        core: {
            version: '0.1.0'
        }
    };

    const MODULE_API_URL = '/api/modules';

    // 2. Main initialization function
    async function initialize() {
        console.log(`%cExtensionJS v${ExtensionJS.core.version} Initializing...`, 'color: #3498db; font-weight: bold;');

        try {
            const response = await fetch(MODULE_API_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('ExtensionJS: Module list loaded.', data);
            await loadModules(data.modules);
        } catch (error) {
            console.error('ExtensionJS: Failed to load module list.', error);
            alert('Error: Could not initialize ExtensionJS. See console for details.');
        }
    }

    // 3. Load and initialize modules
    async function loadModules(modules) {
        if (!modules || !Array.isArray(modules)) {
            console.error('ExtensionJS: Invalid modules format. "modules" should be an array.');
            return;
        }

        console.log(`ExtensionJS: Found ${modules.length} module(s) to load.`);

        for (const modulePath of modules) {
            const moduleName = modulePath.replace(/\\/g, '/').split('/')[0].replace(/-module$/, '');
            const fullPath = `/framework/extensions/${modulePath}`;
            try {
                const response = await fetch(fullPath);
                if (!response.ok) throw new Error(`Could not fetch module from ${fullPath}`);
                const scriptContent = await response.text();

                const moduleWrapper = new Function('exports', scriptContent);
                const moduleExports = {};
                moduleWrapper(moduleExports);

                if (moduleExports.initialize) {
                    moduleExports.initialize();
                    console.log(`ExtensionJS: Module '${moduleName}' initialized.`);
                }

                if (moduleExports.api) {
                    ExtensionJS.modules[moduleName] = moduleExports.api;
                    console.log(`ExtensionJS: API for module '${moduleName}' registered.`);
                } else {
                     console.warn(`ExtensionJS: Module '${moduleName}' loaded but did not provide an API.`);
                }

            } catch (error) {
                console.error(`ExtensionJS: Failed to load module '${moduleName}' at '${fullPath}'.`, error);
            }
        }
        console.log('%cExtensionJS: All modules loaded.', 'color: #2ecc71; font-weight: bold;');
        
        // 4. Bind declarative elements after all modules are ready
        bindDeclarativeElements();
    }

    // 5. Bind declarative elements
    function bindDeclarativeElements() {
        const elements = document.querySelectorAll('[data-extensionjs-action]');

        elements.forEach(element => {
            const moduleName = element.dataset.extensionjsModule;
            const action = element.dataset.extensionjsAction;
            const eventType = element.dataset.extensionjsEvent || 'click';

            if (!moduleName || !action) {
                console.warn('ExtensionJS: Declarative element is missing `data-extensionjs-module` or `data-extensionjs-action`.', element);
                return;
            }

            const moduleApi = ExtensionJS.modules[moduleName];
            if (!moduleApi || typeof moduleApi[action] !== 'function') {
                console.warn(`ExtensionJS: Could not find action '${action}' on module '${moduleName}'.`, element);
                return;
            }

            element.addEventListener(eventType, (event) => {
                try {
                    const optionsString = element.dataset.extensionjsOptions;
                    const options = optionsString ? JSON.parse(optionsString) : {};
                    
                    if (eventType !== 'click') {
                        event.preventDefault();
                    }

                    moduleApi[action](options);
                } catch (e) {
                    console.error(`ExtensionJS: Error executing action for module '${moduleName}'. Invalid options JSON?`, e, element);
                }
            });
        });
    }

    // Run the initialization when the DOM is ready.
    document.addEventListener('DOMContentLoaded', initialize);

})();