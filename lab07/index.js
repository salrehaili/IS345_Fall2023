import express from 'express';

//Routing


const app = express()

// parse incoming POST request data with middleware
app.use(express.urlencoded({extended: true}));
// app.use(express.json());


app.get('/', (req, res) => {
        // res.send('Hello World!');
        res.send(req.session);
})

app.get('/IS345', (req, res) => {
    res.type('text/plain')

        res.send('Welcome to Web Application Development 2<br> ss')
//     res.json({abc:3});
// res.type('text/plain')
// const headers = Object.entries(req.headers)
//     .map(([key, value]) => `${key}: ${value}`)
//   res.send(headers.join('\n'))
})

app.post('/', (req, res)=>{
        res.send('Got a POST request');
})

app.get('/student/:id', (req, res) => {
        res.send('details of student '+req.params.id)
})
      
app.get('/user/:userId/book/:bookId', (req, res) => {
        res.send("userid is "+ req.params.userId+" <br> bookid is "+req.params.bookId)
})

app.post('/add', (req, res) => {
        res.send("id is "+ req.body.id + "<br>  user name is "+ req.body.name);
})

app.get('/add', (req, res) => {
        res.send("id is "+ req.query.id + "<br>  user name is "+ req.query.name);
})

app.listen(3000 , () => {
console.log('Server listening on port 3000');
});

