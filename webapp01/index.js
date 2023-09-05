import express from 'express';

const app = express()


// Define a route handler that handels the HTTP GET request to the site route /
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(3000 , () => {
    console.log('Server listening on port 3000');
});