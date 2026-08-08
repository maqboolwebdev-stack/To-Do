# Webpack Project Template

A reusable starter template for JavaScript projects using **Webpack**.

This template provides a ready-to-use Webpack setup with separate development and production configurations, so you can start a new project without setting up Webpack from scratch every time.

## Features

* Webpack configuration
* Development and production modes
* `webpack-merge` for shared configuration
* HTML generation with `HtmlWebpackPlugin`
* CSS support
* Asset handling
* Development server with live reload
* Separate configuration files for development and production

## Project Structure

```text
.
├── src/
│   ├── index.js
│   └── template.html
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation

After creating a new repository from this template, install the dependencies:

```bash
npm install
```

## Development

Start the Webpack development server:

```bash
npm run dev
```

This starts the development environment and watches for changes.

## Production Build

Create a production build:

```bash
npm run build
```

The optimized files will be generated inside the `dist/` directory.

## Using This Template

1. Create a new repository using this template.
2. Clone the new repository.
3. Open the project directory.
4. Install dependencies.

```bash
git clone <repository-url>
cd <project-name>
npm install
```

5. Start developing:

```bash
npm run start
```

## Git Ignore

The following directories are not committed to Git:

```text
node_modules/
dist/
```

`node_modules` contains installed dependencies and can be recreated with `npm install`.

`dist` contains generated production files and can be recreated with the Webpack build command.

## Purpose

This repository is intended to be used as a starting point for future JavaScript projects that require a Webpack build setup.
