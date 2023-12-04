import express from 'express';
// import Sequelize from 'sequelize';
import { Sequelize, DataTypes } from 'sequelize';
import session from 'express-session';
import cookieParser from 'cookie-parser';


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser())



// app.use(session({ 
//   secret: 'Secret333',
//   name: 'lab11', // Customise the name to 'test'
//   resave: false,  // don't save session if unmodified
//   saveUninitialized: false,  // don't create session until something stored
//   cookie: { 
//     maxAge: 1000 * 60 * 1 * 1,  // 1 minute
//   }
// }));



app.use((req, res, next)=> {
  res.locals.loggedin = req.cookies.loggedin;
  res.locals.username = req.cookies.username;  
  next();
});



const checklogin = (req, res, next)=>{
    
  if(!req.cookies.loggedin){
      res.redirect('/login');
  } else {
      next();
  }
}

////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './lab11.db',
    logging: false
});


////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////


////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////
const userSchema ={
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: { 
        args: false,
         msg: 'First Name is required' 
      }
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
}

const User = connection.define('users', userSchema, {timestamps: true, freezeTableName: true});

connection.sync();

  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////

app.get('/',checklogin, (req, res) => {
  res.render('main');
})


app.get('/users',checklogin, (req, res) => {
    User.findAll()
    .then((result)=>{
    res.render("users", {data:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/users/:id',checklogin, (req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/adduser',checklogin, (req, res)=>{
  res.render("adduser", {success: true, data:{}});
})

app.post('/adduser', checklogin,(req, res) => {
      User.build(req.body)
      .save()
          .then((result) =>{
              res.redirect('/users');
          })
          .catch((err)=>{
              res.render("adduser", {success: false, data: req.body, msg: err.message})
          });            
})

app.get('/updateuser/:id', checklogin,(req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
      res.render('updateuser',{success: true, data:result});
    })
    .catch((err)=>{
        console.log(err.message);
    }) 
})

app.post('/updateuser/:id', checklogin,(req, res)=> {
  User.update(req.body,
    {where: {id: req.params.id}}
  )
  .then((result)=> {
    res.redirect('/users');
  })
  .catch((err)=>{
    req.body.id=req.params.id;
    res.render("updateuser", {success: false, data: req.body, msg: err.message})
  })
})

app.get('/deleteuser/:id',checklogin, (req, res)=>{
  User.destroy({ where: {id: req.params.id} })
  .then((result) => {
          res.redirect('/users')
      });
})

app.get('/login', (req, res)=>{
  res.render('login');
});

app.post('/login', (req, res)=>{
  User.findOne({where: {email: req.body.email, password: req.body.pass}})
  .then((result)=>{
    if(result)
    {
      res.cookie('loggedin', true);
      res.cookie('username', result.firstName, {maxAge: 2*60*1000});
    }
      res.redirect('/');
  })
  .catch((err)=>{
      res.render('login', {success: false, data: req.body, msg: err.message});
  })
})

app.get('/logout',checklogin ,(req, res)=>{
  res.clearCookie('loggedin');
  res.clearCookie('username');
  res.redirect('/');
  
})



app.listen(3000 || PORT, () => {
    console.log(`Online compiler Server listening on port 3000`);
});