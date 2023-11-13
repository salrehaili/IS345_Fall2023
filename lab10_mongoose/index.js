import express from 'express';
import Sequelize from 'sequelize';
// import helmet from 'helmet';

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
// enabling the Helmet middleware
// app.use(helmet())
////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////
const db  = {};

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './lab10.db',
    logging: false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;




////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////


////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////
const userSchema ={
    // Model attributes are defined here
    id:{
      type: db.Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: { 
        args: false,
         msg: 'First Name is required' 
      }
    },
    lastName: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: db.Sequelize.DataTypes.TEXT,
      allowNull: false
    }
}

const User = db.sequelize.define('users', userSchema, {timestamps: true, freezeTableName: true});

sequelize.sync();

  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////


app.get('/users', (req, res) => {
    User.findAll()
    .then((result)=>{
    res.render("users", {
            data:result
    })
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

app.post('/add', (req, res) => {
      User.build(req.body
    //     {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    ).save()
          .then((result) =>{
              res.redirect('/users');
          })
          .catch((err)=>{
              res.render("register", {success: false, data: req.body, msg: err.message})
          });            
})

app.post('/update/:id', (req, res)=> {
  User.update(req.body,
    {where: {id: req.params.id}}
  )
  .then((result)=> {
    res.redirect('/users');
  })
  .catch((err)=>{
    req.body.id=req.params.id;
    res.render("update", {success: false, data: req.body, msg: err.message})
  })
})

app.get('/delete/:id', (req, res)=>{
  User.destroy({ where: {id: req.params.id} })
  .then((result) => {
          res.redirect('/users')
      });
})

app.get('/update/:id', (req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
      res.render('update',{success: true, data:result});
    })
    .catch((err)=>{
        console.log(err.message);
    })

 
})

app.get('/register', (req, res)=>{
  res.render("register", {success: true, data:{}});
})





app.listen(3000 || PORT, () => {
    console.log(`Online compiler Server listening on port 3000`);
});

