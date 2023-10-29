import express from 'express';
import cookieParser from 'cookie-parser';

import fs from 'fs';


//Routing


const app = express()

// parse incoming POST request data with middleware
// app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())

const mid1 =(req, res, next)=>{
        console.log("middleware1");
        next();
}

const mid2 =(req, res, next)=>{
        console.log("middleware2");
        next();
}

const mid3 = (err, req, res, next) => {
        // Handle the error
        console.log('middleware3');
        // res.status(500).json({ error: 'Internal Server Error' });
      

        // res.cookie(`Cookie token name`,`encrypted cookie string Value`);
//       res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
//         maxAge: 5000,
//         // expires works the same as the maxAge
//         expires: new Date('01 12 2021'),
//         secure: true,
//         httpOnly: true,
//         sameSite: 'lax'
//     });
}

app.get('/', (req, res) => {
        // res.cookie('hello', 'this is the value')
        res.send(req.cookies);

        // if ( req.cookies.known === undefined ){
        //         res.cookie('known', '1')
        //         res.send('Welcome, new visitor!')
        //       }
        //       else
        //         res.send('Welcome back, visitor');

        // res.send('<h1>Hello World!</h1>')
})

app.use((err, req, res, next)=> {
        console.log('Welcome ... ')
});

app.use('/IS345', mid1);
app.use('/IS345', mid2);
app.use('/IS345', mid3);

app.get('/IS345', (req, res, next) => {
        // // try{
                var err =  new Error('Something broke!');
                next(err);
        // } catch(err){
        //         next();
        // }
        
        // res.send('gg')
        // try{
        //         throw new Error('BROKEN')
        //         // res.send('Welcome to Web Application Development 2'+ a[3])
        // }catch (err){
        //         next(err);
        // }
});



app.post('/', (req, res)=>{
        res.send('Got a POST request');
})

app.get('/student/:id', (req, res) => {
        res.send('details of student '+req.params.id)
})

app.get('/student', (req, res) => {
        res.send('details of student '+req.query.id)
})
      
app.get('/user/:userId/book/:bookId', (req, res) => {
        res.send("userid is "+ req.params.userId+" <br> bookid is "+req.params.bookId)
})

app.post('/add', (req, res) => {
        res.setHeader('content-type', 'text/plain');
        if(!req.body.msg){
                res.status(400).send('msg is required!')
        }
        res.send("id is "+ req.body.id + "<br>  user name is "+ req.body.name).status(201);
});

function middleware1(req, res, next){
        console.log('Running the middleware');
        next();
}
function hi_handler(req, res){
        console.log('Running the handler');
        console.log(req.method);
        // res.setHeader('Content-Type', 'text/plain');
        console.log(req.get('Content-Type'));
        res.setHeader('Content-Type', 'text/html');
        var i =1;
        for (; i <= 5; i++) {
                res.write('<h1>This is the response #: ' + i + '</h1>');
              }
            
              //end the response process
              res.end();
        // res.send("DDDD");
}

app.get('/hi', middleware1, hi_handler);

app.listen(3000 , () => {
console.log('Server listening on port 3000');
});

