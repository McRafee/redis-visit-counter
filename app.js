const express = require('express');
const redis = require('redis');

// Create a Redis client
const client = redis.createClient({ host: 'redis' }); // 'redis' is the service name in docker-compose.yml

// Express.js setup
const app = express();
const port = 3000;

// Set a key-value pair in Redis if it doesn't exist
client.setnx('visits', 0);

// Route to increment the visit count only for HTTP requests
app.get('/', (req, res) => {
  client.incr('visits', (err, visits) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .counter-container {
              background-color: #ffeeaa;
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            }
            .counter {
              font-size: 3rem;
              text-align: center;
              margin-bottom: 10px;
            }
            .label {
              font-size: 1.5rem;
              text-align: center;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="counter-container">
            <div class="counter">${visits}</div>
            <div class="label">Visits</div>
          </div>
        </body>
      </html>
    `);
  });
});

// Listen to requests on port 3000
app.listen(port, () => {
  console.log('App running on port ' + port);
});
