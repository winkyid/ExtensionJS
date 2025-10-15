# ExtensionJS

![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)

A lightweight and modular web development framework designed for simplicity and extensibility.

---

## Core Concept

ExtensionJS is built around the idea of "extensions". The core logic is minimal, and functionality is added through self-contained modules. This allows for a clean separation of concerns and makes it easy to add or remove features as needed.

- **`.xtn` Files**: The primary file type for defining application structure and content within the `src` directory.
- **Modular Extensions**: New features can be added by creating modules in the `framework/extensions` directory. Each module can contain its own logic (`main.js`) and styles (`style.css`).

## Installation

To use the framework, install it globally via npm:

```bash
npm install -g @winkyid/extensionjs
```

## Usage

Once installed, you can start the development server from your project directory by running:

```bash
extensionjs
```

This will launch the server, which listens on `http://localhost:3000` by default, and watch for any file changes in your project.

## Project Structure

A typical ExtensionJS project follows this structure:

```
/
├── framework/         # Core framework files and extensions
│   ├── core/
│   └── extensions/
├── src/               # Your application's source files (.xtn)
│   └── index.xtn
├── build.js           # Build script
├── server.js          # Core server logic
└── package.json
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/winkyid/ExtensionJS/issues).

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
