import express from 'express';
import shortid from 'shortid';
const app = express()

app.get('/', (req, res) => {
res.send('main')
})

app.get('/students', (req, res) => {
    res.send('5465465 ahmad')
    })

app.get('/shortid', (req, res)=>{
    res.send(shortid());
})
app.listen(3000 , () => {
console.log('Server listening on port 3000');
});

