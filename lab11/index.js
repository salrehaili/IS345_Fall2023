import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './lab11.db',
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


const deptSchema ={
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}
const Dept = connection.define('dept', deptSchema, {timestamps: false, freezeTableName: true});


const empSchema ={
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dept_id: {
    type: DataTypes.INTEGER,
  },
  manager: {
    type: DataTypes.INTEGER,
  },
}

const Emp = connection.define('emp', empSchema, {timestamps: false, freezeTableName: true});
Emp.belongsTo(Emp, { foreignKey: 'manager'}); 
Emp.belongsTo(Dept, { foreignKey: 'dept_id'}); 


connection.sync();

  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('welcome');
})
app.get('/emp', (req, res) => {
  Emp.findAll()
    .then((result)=>{
    res.render('emp', {data:result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/add_emp', (req, res)=>{
  res.render('add_emp');
})

app.post('/add_emp', (req, res)=>{
  Emp.build(req.body)
      .save()
          .then((result) =>{
              res.send('Done');
          })
          .catch((err)=>{
              res.send(err);
          });  
})



app.get('/add_dept', (req, res)=>{
  Dept.build({id:1, name: 'Marketing'})
      .save()
          .then((result) =>{
              res.send('Done');
          })
          .catch((err)=>{
              res.send(err);
          });  
})


app.get('/dept', (req, res) => {
  Dept.findAll()
    .then((result)=>{
    res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/employees/:id', (req, res)=>{
  Emp.findOne({where: {id: req.params.id}})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get('/update_emp/:id', (req, res)=> {
  Emp.findOne({where: {id: req.params.id}})
    .then((result)=>{
      let data={
        id:req.params.id
      }
      res.render('update_emp', {success: false, data: result, msg: '' });
    })
    .catch((err)=>{
        console.log(err);
    })
  
}
);

app.post('/update_emp/:id', (req, res)=> {
  Emp.update(req.body,
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

app.get('/delete_emp/:id', (req, res)=>{
  Emp.destroy({ where: {id: req.params.id} })
  .then((result) => {
          res.send('Delete Done');
      });
})



app.listen(3000 || PORT, () => {
    console.log(`Online compiler Server listening on port 3000`);
});