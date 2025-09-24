# Fynx — Local Dev Browser

**Fynx** is a lightweight, local-only developer browser built with **Electron** and **Vue 3**. It streamlines local development by providing a single-window interface for testing local ports, inspecting JSON, and integrating common web-based dev tools.

---

## Download

You can download a prebuilt Windows installer for Fynx:

[**Download Fynx (Windows|exe)**](https://github.com/fidesign/fynx/releases/latest)

> After downloading, run the `.exe` file to install Fynx on your system.

---

## Features

* Single-window dev browser for local ports.
* JSON auto-detection and formatted viewer.
* Port management: add, rename, remove, and remember last used port.
* Navigation: back, forward, reload, hard reload.
* Unreachable port detection with friendly UI.
* Developer tools integration (open DevTools, optional side panel).
* Frameless window with draggable nav, responsive layout.

---

## Planned Features

* Favorites & quick-access dev tools URLs.

---

## Installation from Source

1. **Clone the repo**

```bash
git clone https://github.com/fibdesign/fynx.git
cd fynx
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
npm run dev
```

> Requires Node.js >= 18 and npm.

---

## Usage

1. Enter a local port (e.g., `5173`) in the input field.
2. Switch between saved ports with the nav buttons.
3. Open dev tools with the DevTools button.
4. JSON responses are automatically detected in the viewer.
5. If a port is unreachable, a notification screen appears.

---

## Contributing

Fynx is **open-source**! Contributions welcome:

* Bug fixes or small features via Pull Requests.
* Suggest new dev tools integrations.
* Improve layout, UI, or performance.

---

## License

MIT License — see [LICENSE](LICENSE)

---

## Screenshots
(soon)
