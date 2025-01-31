const express = require('express');

const app = express();
const PORT = 8383;
let data = ['james'];

// middleware
app.use(express.json());

// HTTP VERBS (method) && Routes (or paths)
// Method + Path = Endpoint

// The method infotms the nature of request andd the route is a further subdirectory
// (basically wee dierect the reques to the body of code to repond appropriately, and these locaations or routes are called endpoints)

// Website endpoints (these endpoint are for sending back html and they typically come when a user enters a url in a browser)

app.get('/', (req, res) => {
  console.log(req.method);
  // res.sendStatus(201);
  // res.json({ message: 'Conectado' });
  res.send(`<body>
    <h1>Data:</h1>
    <p>${JSON.stringify(data)}</p>
    <a href='/dashboard'>dashboard</a>
    </body>`);
});

app.get('/dashboard', (req, res) => {
  // console.log('Ohh now i hit the /dashboard endpoint');
  // res.send('Hello');
  res.send(`
    <body>
    <h1>Data:</h1>
    <p>${JSON.stringify(data)}</p>
    <a href='/'>Home</a>
    </body>`);
});

// API endpoints (non visual)
// CRUD - create - reat - post - update-put-patch delete

app.get('/api/data', (req, res) => {
  res.send(data);
});

app.post('/api/data', (req, res) => {
  console.log('req.body', req.body);
  const { body } = req;
  data.push(body.name);
  res.send(data).status(201);
});
app.delete('/api/delete', (_, res) => {
  data.pop();
  res.send(data).status(201);
});

app.listen(PORT, () => {
  console.log(`Server has stared on: ${PORT}`);
});
