# ExtensionJS

![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)

A lightweight and modular web development framework designed for simplicity and extensibility.

---

<p align="center">
  <strong><a href="#english">English</a></strong> | <strong><a href="#bahasa-indonesia">Bahasa Indonesia</a></strong>
</p>

---

<a name="english"></a>

## 🇬🇧 English

### Core Concept

ExtensionJS is built around the idea of "extensions". The core logic is minimal, and functionality is added through self-contained modules. This allows for a clean separation of concerns and makes it easy to add or remove features as needed.

### Installation

1.  **Create a new project directory:**
    ```bash
    mkdir my-project && cd my-project
    ```

2.  **Initialize a new Node.js project:**
    ```bash
    npm init -y
    ```

3.  **Install ExtensionJS:**
    Install the framework as a development dependency. The required project files (`server.js`, `src/`, `framework/`) will be copied to your project root automatically upon installation.
    ```bash
    npm install @winkyid/extensionjs --save-dev
    ```

### Usage

After the installation is complete, start the development server by running:
```bash
node server.js
```
The server will start and listen on `http://localhost:3000` by default.

### Project Structure

After installation, your project will have the following structure:
```
/
├── framework/         # Core framework files and extensions
├── src/               # Your application's source files (.xtn)
├── node_modules/
├── build.js           # Build script
├── server.js          # Core server logic
└── package.json
```

### Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/winkyid/ExtensionJS/issues).

### License
This project is licensed under the ISC License.

---

<a name="bahasa-indonesia"></a>

## 🇮🇩 Bahasa Indonesia

### Konsep Inti

ExtensionJS dibangun berdasarkan ide "ekstensi". Logika inti dibuat seminimal mungkin, dan fungsionalitas ditambahkan melalui modul-modul yang mandiri. Hal ini memungkinkan pemisahan tanggung jawab yang bersih dan memudahkan untuk menambah atau menghapus fitur sesuai kebutuhan.

### Instalasi

1.  **Buat direktori proyek baru:**
    ```bash
    mkdir proyek-baru && cd proyek-baru
    ```

2.  **Inisialisasi proyek Node.js baru:**
    ```bash
    npm init -y
    ```

3.  **Instal ExtensionJS:**
    Instal framework ini sebagai *development dependency*. File-file proyek yang dibutuhkan (`server.js`, `src/`, `framework/`) akan otomatis disalin ke root proyek Anda saat proses instalasi.
    ```bash
    npm install @winkyid/extensionjs --save-dev
    ```

### Penggunaan

Setelah instalasi selesai, jalankan server pengembangan dengan perintah:
```bash
node server.js
```
Server akan berjalan dan dapat diakses di `http://localhost:3000`.

### Struktur Proyek

Setelah instalasi, proyek Anda akan memiliki struktur sebagai berikut:
```
/
├── framework/         # File inti framework dan ekstensi
├── src/               # File source code aplikasi Anda (.xtn)
├── node_modules/
├── build.js           # Skrip build
├── server.js          # Logika server inti
└── package.json
```

### Kontribusi
Kontribusi, isu, dan permintaan fitur sangat diterima! Jangan ragu untuk memeriksa [halaman isu](https://github.com/winkyid/ExtensionJS/issues).

### Lisensi
Proyek ini dilisensikan di bawah Lisensi ISC.
