import express from 'express';
import cookieParser from'cookie-parser';
import session from 'express-session';

//Routing


const app = express()

// // parse incoming POST request data with middleware
// app.use(express.urlencoded({extended: true}));
// // app.use(express.json());


// app.get('/', (req, res) => {
//         res.send('Hello World!')
// })

// app.get('/IS345', (req, res) => {
//     res.send('Welcome to Web Application Development 2')
// })

// app.post('/', (req, res)=>{
//         res.send('Got a POST request');
// })

// app.get('/student/:id', (req, res) => {
//         res.send('details of student '+req.params.id)
// })
      
// app.get('/user/:userId/book/:bookId', (req, res) => {
//         res.send("userid is "+ req.params.userId+" <br> bookid is "+req.params.bookId)
// })

// app.post('/add', (req, res) => {
//         res.send("id is "+ req.body.id + "<br>  user name is "+ req.body.name);
// })

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


app.get('/', function(req, res){
        if(req.session.page_views){
           req.session.page_views++;
           res.send("You visited this page " + req.session.page_views + " times");
        } 
        else{
           req.session.page_views = 1;
           res.send("Welcome to this page for the first time!");
        }
});


app.listen(3000 , () => {
console.log('Server listening on port 3000');
});

