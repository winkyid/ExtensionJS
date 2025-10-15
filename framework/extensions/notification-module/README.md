# Notification Module

This module provides a simple way to display MacOS-style notifications on your web page.

## JavaScript API Usage

You can trigger notifications programmatically using the JavaScript API.

**Basic Usage:**

```javascript
// The API is exposed under the ExtensionJS.modules object
ExtensionJS.modules.notification.show({ 
    message: 'Your message here',
    type: 'info' // 'success', 'error', or 'info'
});
```

**Advanced Usage:**

You can also customize the title, icon, and duration.

```javascript
ExtensionJS.modules.notification.show({
    title: 'Custom Title',
    message: 'This is a custom notification.',
    type: 'success',
    icon: '🎉',
    duration: 5000 // in milliseconds
});
```

## Declarative HTML Usage

The easiest way to trigger notifications is by adding special `data-*` attributes to any HTML element (like a button). The engine will automatically wire them up.

**Attributes:**
- `data-extensionjs-module`: Should be `notification` for this module.
- `data-extensionjs-action`: The function to call from the API, e.g., `show`.
- `data-extensionjs-options`: A JSON string with the options for the action.

**Example:**

```html
<button 
    data-extensionjs-module="notification" 
    data-extensionjs-action="show" 
    data-extensionjs-options='{"message": "This is a success message!", "type": "success"}'>
    Show Success
</button>

<button 
    data-extensionjs-module="notification" 
    data-extensionjs-action="show" 
    data-extensionjs-options='{"title": "Build Complete", "message": "Your project has compiled.", "icon": "🚀"}'>
    Show Custom
</button>
```