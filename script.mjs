import { execSync } from 'child_process';
import fs from 'fs';

execSync('npm init -y', { stdio: 'inherit' });
execSync('npm install react react-dom', { stdio: 'inherit' });
execSync('npm install sass', { stdio: 'inherit' });
execSync('npm install parcel @parcel/transformer-sass --save-dev', { stdio: 'inherit' });

fs.mkdirSync('src');
fs.mkdirSync('src/components');
fs.mkdirSync('src/components/App');
fs.mkdirSync('src/assets');
fs.mkdirSync('src/assets/style');
fs.mkdirSync('src/assets/img');

fs.writeFileSync('src/index.html',
    `<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>titre</title>
</head>

<body>
    <div id="root">
    </div>
    <script type="module" src="./index.js"></script>
</body>

</html>
`);
fs.writeFileSync('src/index.js',
    `import { createRoot } from "react-dom/client";
import "./assets/style/reset.scss"
import "./assets/style/style.scss"
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
`);
fs.writeFileSync('src/components/App/index.js',
    `import React from 'react';

const App = () => {

    return (
        <>
            <h1>Hello World!</h1>
        </>
    );
};

export default App;`);

fs.writeFileSync('src/assets/style/reset.scss',
    `html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}`);
fs.writeFileSync('src/assets/style/style.scss',
    `body {
        font-family: 'Poppins', sans-serif;
        background-color: #333;
        color: antiquewhite;
    }
    
    h1 {
        font-size: 50px;
        font-weight: 600;
        text-align: center;
        margin-top: 2rem;
    }`);

fs.writeFileSync('.gitignore',
    `.parcel-cache
dist
node_modules`)


// ? Update package.json
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.scripts = {
    ...packageJson.scripts,
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html"
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
// ?
