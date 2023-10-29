import express from 'express';

//req.params
// req.body
// req.query
// res.type('text/html')
// res.type('text/plain')
// res.setHeader('content-type', 'application/json');
// res.setHeader('content-length', '500');
// res.set({
//         'content-type': 'application/json',
//         'content-length': '500',
//         'warning': "show warning in this header"
// });

// res.redirect('/')
// res.write();
// res.end();

// app.set('view engine', 'ejs');
// res.render();

const app = express()

// Setting EJS as the view engine
// tells express that you are going to use EJS templating engine
app.set('view engine', 'ejs');


// parse incoming POST request data with middleware
// app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
        // res.send('Hi');
        // res.send('Hello World!');
        // res.send(req.session);
        let data=["3","4","5"];
        res.render('index', {name:"Sameer", data: data});
        // res.links({
        //         next: 'http://demo.com?page=2',
        //         middle: 'http://demo.com?page=4',
        //         last: 'http://demo.com?page=6'
        //     });
         
        //     console.log(res.get('link'));
})

app.get('/IS345', (req, res) => {
        res.render('index', {id:345432, name:"Ahmad", data: [2, 4, 8]});
})

app.post('/', (req, res)=>{
        console.log(req.headers)

        res.type('text/plain')
        res.send('Got a POST request '+ req.body.id );
})

app.get('/student/:id/:name', (req, res) => {
        console.log(req.route)
        res.send('details of student '+req.params.id)
})
      
app.get('/user/:userId/book/:bookId', (req, res) => {
        res.send("userid is "+ req.params.userId+" <br> bookid is "+req.params.bookId)
})

app.post('/add', (req, res) => {
        console.log(req.headers)
        res.send("id is "+ req.body.id + "<br>  user name is "+ req.body.name);
})

app.get('/add', (req, res) => {
        res.type('txt');
        // res.set('content-type', 'text/plain');
        res.send("id is "+ req.query.id + "<br>  user name is "+ req.query.name);
})


app.get('/home', (req, res) => {
        res.redirect('/');
        res.send('sdfsd')
        // res.type('txt');
        // res.set('content-type', 'text/html');
        // res.set('content-type', 'text/plain');
        res.set('content-type', 'application/json');


//         text/css
// text/csv
// text/html
// text/javascript (obsolete)
// text/plain
// text/xml
        res.json({ name: 'Legend' });
        // res.send("<h1>Home</h1><p> This is the homepage</p>");
})



app.listen(3000 , () => {
console.log('Server listening on port 3000');
});


