import express from 'express';
// import Sequelize from 'sequelize';
import { Sequelize, DataTypes } from 'sequelize';


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './lab10.db',
    logging: false
});


////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////


// check database connection
connection.authenticate().then(()=> {
  console.log("Successfully we are connected with the database");
}).catch(function (error) {
  console.log(error);
});

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

app.get('/', (req, res) => {
  res.render('main');
})

app.get('/users', (req, res) => {
    User.findAll()
    .then((result)=>{
    res.render("users", {data:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/users/:id', (req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/adduser', (req, res)=>{
  res.render("adduser", {success: true, data:{}});
})

app.post('/adduser', (req, res) => {
      User.build(req.body)
      .save()
          .then((result) =>{
              res.redirect('/users');
          })
          .catch((err)=>{
              res.render("adduser", {success: false, data: req.body, msg: err.message})
          });            
})

app.get('/updateuser/:id', (req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
      res.render('updateuser',{success: true, data:result});
    })
    .catch((err)=>{
        console.log(err.message);
    }) 
})

app.post('/updateuser/:id', (req, res)=> {
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

app.get('/deleteuser/:id', (req, res)=>{
  User.destroy({ where: {id: req.params.id} })
  .then((result) => {
          res.redirect('/users')
      });
})



app.listen(8080 || PORT, () => {
    console.log(`Online compiler Server listening on port 3000`);
});