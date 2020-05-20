# QLB React App

Frontend application for the Quick Loan Bank demo,
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and beautified with [Patternfly](https://www.patternfly.org/v4/)

## Quick start

In the project directory, you can run:

```bash
npm install && npm run start
```

## Development Scripts

Runs the app in the development mode.<br />

```bash
# Install development/build dependencies
npm install

# Start the development server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Production Scripts

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />

```bash
npm run build
```

Your app is now ready to be deployed!

For environments using `Node`, the easiest way to handle deployment would be to install `serve` and let it handle the rest:

```bash
npm install -g serve
```

The following command will serve your static site on the port `5000` (default).

```bash
serve -s build
```

The port can be adjusted using the `-l` or `--listen` flags "

```bash
serve -s build -l 4000
```
