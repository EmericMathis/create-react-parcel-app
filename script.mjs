import fs from 'fs';
import { execSync } from 'child_process';

// Création du dossier du projet
fs.mkdirSync('my-react-app');
process.chdir('./my-react-app');

// Initialisation du projet Node.js
fs.writeFileSync('package.json', '{"name": "my-react-app", "version": "1.0.0", "main": "index.js"}');

// Installation des dépendances React
execSync('npm install react react-dom');

// Création des dossiers et fichiers
fs.mkdirSync('src');
fs.writeFileSync('./src/index.js', `
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
`);

fs.mkdirSync('public');
fs.writeFileSync('./public/index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My React App</title>
</head>
<body>
  <div id="root"></div>
  <script src="../dist/bundle.js"></script>
</body>
</html>
`);

// Installation de Webpack et Babel
execSync('npm install webpack webpack-cli babel-loader @babel/core @babel/preset-react --save-dev');

// Configuration de Webpack
fs.writeFileSync('webpack.config.js', `
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};
`);

// Scripts npm pour construire et exécuter l'application
const scripts = {
  "build": "webpack --mode=production",
  "start": "webpack serve --mode=development --open"
};
const packageJson = JSON.parse(fs.readFileSync('package.json'));
packageJson.scripts = scripts;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Construire l'application
execSync('npm run build');

console.log('Projet React créé avec succès!');