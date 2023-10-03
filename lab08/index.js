import express from 'express';

//Routing


const app = express()

// parse incoming POST request data with middleware
app.use(express.urlencoded({extended: true}));
// app.use(express.json());

const mid1 =(req, res, next)=>{
        console.log("middleware1");
        next();
}

const mid2 =(req, res, next)=>{
        console.log("middleware2");
        next();
}






app.get('/', (req, res) => {
        res.send('Hello World!')
})

app.get('/IS345',mid1, mid2, (req, res) => {
    res.send('Welcome to Web Application Development 2')
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


app.listen(3000 , () => {
console.log('Server listening on port 3000');
});

