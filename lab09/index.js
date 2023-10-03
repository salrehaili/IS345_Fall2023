import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';


// import path from 'path';
// const __dirname = path.resolve();

const app = express()

app.use(session({ secret: "Your secret key" }));

// app.set('views', path.join(__dirname, 'views'));
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
const studentSchema = new Schema({
	sid: {
		type: String,
		required: true
	},
        fname: {
		type: String,
		required: true
	},
        lname: {
		type: String,
		required: true
	},
        age: {
		type: Number,
		required: true
	},
	GPA: {
		type: Number,
		required: true
	}
}, {timestamps: true});

//define a model based on the above schema
const Student = mongoose.model('Student', studentSchema);
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////







app.get('/students', (req, res) => {
        Student.find()
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

app.get('/student/:id',(req, res) => {
        Student.findOne({sid: req.params.id})
        .then((result)=>{
                const msg = `<pre>
                <b>sid</b> is ${result.sid}
                <b>fname</b> is ${result.fname} 
                <b>lname</b> is ${result.lname}
                <b>age</b> is ${result.age}
                <b>GPA</b> is ${result.GPA}
                </pre>`;
                res.send(msg);
        })
        .catch((err)=>{
                console.log(err);
        })
});

app.get('/userForm', (req, res)=>{
        res.render("student");
})



app.get('/users/:userId/books/:bookId', (req, res) => {
        res.send("userid is "+ req.params.userId+" <br> bookid is "+req.params.bookId)
})

app.post('/add', (req, res) => {
        // res.send("id is "+ req.body.id + "<br>  user name is "+ req.body.name);
        const student = new Student({
                sid: req.body.sid,
                fname: req.body.fname,
                lname: req.body.lname,
                age: req.body.age,
                GPA: req.body.GPA
            });

            student.save()
                .then((result) =>{
                    res.send(result)
                })
                .catch((err)=>{
                    console.log(err);
                });

                res.redirect('/students')
})

app.get('/delete/:id', (req, res)=>{
        Student.deleteOne({ sid: req.params.id })
        .then((result) => {
                res.redirect('/students')
            });
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


app.get('/students/:id', (req, res) => {
        res.send('details of student'+req.params.id)
      })
      
app.get('/control', checkLogin, (req, res) => {
        res.send('welcome to control')      
})




app.get('/login', (req, res) => {
        res.render('login')
      })

app.post('/login', (req, res) => {
        if(req.body.username == "sameer" && req.body.pass == "982")
        {
                req.session.user ="admin3";
                res.redirect("/control");

        }
        else
        {
                res.send("username or password is incorrect");
        }
      })





//       https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2