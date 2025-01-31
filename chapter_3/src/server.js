import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5050;

// Get the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(router);

// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets.
// any requests for the css files will be resolved to the directory.
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running');
});
