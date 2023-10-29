import express from 'express';
import Sequelize from 'sequelize';
import helmet from 'helmet';

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
// enabling the Helmet middleware
app.use(helmet())
////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////

const dbconnection = new Sequelize({
    dialect: 'sqlite',
    storage: './lab09.db'
  });


  // const dbconnection = new Sequelize('./employees.db', '', '', {
  //   host: '',
  //   dialect: 'sqlite'
  // });
////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////


////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////
const userSchema ={
  // Model attributes are defined here
  name: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
    unique: true
    // validate: {
    //   is: /^[0-9a-f]{64}$/i
    // }

  },
  email: {
    type: Sequelize.DataTypes.TEXT
    // allowNull defaults to true
  },
  password: {
      type: Sequelize.DataTypes.TEXT
      // allowNull defaults to true
    }
 }

const User = dbconnection.define('User', userSchema, {timestamps: false, freezeTableName: true});
  
  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////


app.get('/users', (req, res) => {
    User.findAll()
    .then((result)=>{
        // res.send(result);
    res.render("list2", {
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
              res.send(result)
          })
          .catch((err)=>{
              console.log(err);
          });

          res.redirect('/users')
})

app.put('/update/:id', (req, res)=> {
  User.update(req.body,
    {where: {id: req.params.id}}
  )
  .then((result)=> {
    res.json(result)
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/register', (req, res)=>{
  res.render("register");
})


app.get('/delete/:id', (req, res)=>{
  User.destroy({ where: {id: req.params.id} })
  .then((result) => {
          res.redirect('/users')
      });
})


app.listen(3000 || PORT, () => {
    console.log(`Online compiler Server listening on port 3000`);
});