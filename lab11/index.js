import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';



const app = express()

app.use(session({ secret: "Your secret key" }));

app.set('view engine', 'ejs');

// parse incoming POST request data with middleware
app.use(express.urlencoded({extended: true}));
// app.use(express.json());


////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////

const dbURI = 'mongodb://sameer:mlid334430@localhost:27017/?retryWrites=true&w=majority';

// const start =async ()=>{
        await mongoose.connect(dbURI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((result)=> {
            console.log('Connected to db')
            app.listen(3000 || PORT, () => {
                console.log(`Online compiler Server listening on port 3000`);
            });
        })
        .catch((err)=> console.log("There is a problem with db"));
//     }
    
//     start();
////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////



////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////
const Schema = mongoose.Schema;
//make a schema which defines the structure
const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Provide an email"],
                unique: [true, "Email exists!"],
	},
        password: {
		type: String,
		required: true
	}
}, {timestamps: true});

//define a model based on the above schema
const User = mongoose.model('User', userSchema);
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////Routes//////////////////////////////////////////////////////////////////
// GET /
// GET /login
// POST /login
// GET /users
// GET /user/:email
// GET /delete/:email
// GET /register        render the registration template
// POST /register       Receives the registration form

app.get('/login', (req, res) => {
        res.render('login')
      })

app.post('/login', (req, res) => {
        if(req.body.email == "salrehaili@gmail.com" && req.body.pass == "982")
        {
                req.session.user ="admin3";
                res.redirect("/control");
                // res.redirect('back');
        }
        else
        {
                res.send("username or password is incorrect");
        }
      })

app.get('/users', checkLogin, (req, res) => {
        User.find()
        .then((result)=>{
        //     res.send(result);
        res.render("list", {
                data:result
        })
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/user/:email',(req, res) => {
        User.findOne({email: req.params.email})
        .then((result)=>{
                const msg = `<pre>
                <b>email</b> is ${result.email}
                </pre>`;
                res.send(msg);
        })
        .catch((err)=>{
                console.log(err);
        })
});

app.get('/delete/:email', (req, res)=>{
        User.deleteOne({ email: req.params.email })
        .then((result) => {
                res.redirect('/users')
            });
})

app.get('/register', (req, res)=>{
        res.render("register");
})



app.post('/register', (req, res) => {
        // res.send("id is "+ req.body.id + "<br>  user name is "+ req.body.name);
        const user = new User({
                email: req.body.email,
                password: req.body.pass
            });

            user.save()
                .then((result) =>{
                    res.send(result)
                })
                .catch((err)=>{
                    console.log(err);
                });

                res.redirect('/users')
})



// app.listen(3000 , () => {
// console.log('Server listening on port 3000');
// });


function checkLogin(req, res, next){
        if(req.session.user){
                next();
        }
        else{
                res.redirect('/login');
        }
}



      
app.get('/control', checkLogin, (req, res) => {
        res.send('welcome to control')      
})

const middlewareFunction = (req, res, next)=> {
        console.log('We are in middleware');
        next();
      };

app.use(middlewareFunction);




//////////////////////////////////////////////////Routes//////////////////////////////////////////////////////////////////




//       https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2