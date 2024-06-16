# Maelstrom Web

This is a simple web server for maelstrom which uses the typescript maelstrom client to interact with the maelstrom node, depositing and withdrawing funds and most importantly submitting blobs.\

## Installation

To install the necessary dependencies for the web server, navigate to the root directory of the web package and run the following command:

```bash
npm install && npm run build
```

This will install dependencies and compile the javascript code together and output it in the `static` directory.

To serve the static files, run the following command:

```bash
go run .
```

## Webpack configuration

Some of the dependencies require the usage of Node.js modules that are not supported natively by the browser. To support these modules, we use webpack's polyfills for things like the `buffer` module. You can see more on the custom configuration in the `webpack.config.js` file.
