# Modal Module

This module provides a flexible system for creating dynamic modals, dialogs, alerts, and confirmations, all with a modern macOS-inspired design.

## JavaScript API Usage

The JavaScript API is still available for programmatic control.

### `alert(options)` & `confirm(options)`

These functions remain the same and are useful for simple dialogs where you need to handle the result with a JavaScript callback (`onConfirm`, `onCancel`, `onOK`).

### `show(options)`

Shows a highly configurable modal. You can specify custom HTML content and a set of buttons for the footer.

**Options:**
- `title` (string): The text for the modal header.
- `html` (string): The HTML content for the modal body.
- `buttons` (array): An array of button objects to build the footer. If omitted, no footer is created and a close (×) button appears in the header.

**Button Object (JavaScript):**
When using the JS API, you can still use `onClick` for immediate callbacks.
- `text` (string): The text on the button.
- `type` (string): `'primary'` or `'secondary'`.
- `onClick` (function): A callback function.

```javascript
ExtensionJS.modules.modal.show({
    title: 'JS Example',
    html: '<p>This uses an onClick callback.</p>',
    buttons: [{ text: 'OK', type: 'primary', onClick: () => alert('Clicked!') }]
});
```

## Declarative HTML Usage

This is the recommended approach for building UIs. You can define complex modal interactions directly in your HTML.

**Button Object (HTML):**
When defining buttons in a `data-extensionjs-options` attribute, you use the declarative action system.
- `text` (string): The text on the button.
- `type` (string): `'primary'` or `'secondary'`.
- `action` (string): The action to perform, in the format `'moduleName.functionName'`.
- `actionOptions` (object): The options object to pass to the specified action.

**Example:**

```html
<!-- A modal that triggers a notification when a button is clicked -->
<button 
    data-extensionjs-module="modal" 
    data-extensionjs-action="show" 
    data-extensionjs-options='{
        "title": "Confirm Action",
        "html": "<p>This will show a notification upon completion.</p>",
        "buttons": [
            {
                "text": "Proceed",
                "type": "primary",
                "action": "notification.show",
                "actionOptions": {
                    "message": "Action Completed Successfully!",
                    "type": "success"
                }
            },
            {
                "text": "Cancel",
                "type": "secondary"
            }
        ]
    }'>
    Show Advanced Declarative Modal
</button>

<!-- A simple modal with no buttons -->
<button 
    data-extensionjs-module="modal" 
    data-extensionjs-action="show" 
    data-extensionjs-options='{"title": "Release Notes", "html": "<p>Version 1.2 is now available.</p>"}'>
    Show Simple Modal
</button>
```
