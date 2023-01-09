const express = require('express')
const mysql = require('mysql')
const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

const conectDB = mysql.createConnection({
    hots:'localhost',
    user: 'root',
    password: '0325',
    database: 'products'
})

app.get('/', (req,res) =>{
    res.send('welcome to the products')
})

// Api to get all products
app.get('/products', (req,res) => {
    const sql = 'SELECT *FROM product'
    
    conectDB.query(sql,(error, result) =>{
        if(error) throw error;
        
        if (result.length > 0){
            res.json(result)
        } else{
            res.send('Not found')
        }
    })
})

app.get('/product/:id',(req, res) =>{
    const id = req.params.id
    
    const sql = `SELECT *FROM product WHERE idproduct = ${id}`
    
    conectDB.query(sql, (error, result) =>{
        if(error) throw error;
        
        if(result.length > 0){
            res.json(result)
            
        } else {
            res.send('Not result')
        }
        
    })
})

app.post('/addProduct', (req,res)=> {
    const sql ='INSERT INTO product SET ?'
    
    const productObj = {
        idproduct : req.body.idproduct,
        productName :req.body.productName,
        count : req.body.count,
        value : req.body.value,
        age :req.body.age
    }
    conectDB.query(sql, productObj, error => {
        if(error) throw error;
        
        res.send('Product added')
    })
    console.log(productObj)
})


app.put('/update/:id', (req, res) => {
    const id = req.params.id

    const {productName, count, value} = req.body

    const sql = `UPDATE product SET productName = '${productName}', count ='${count}', value = '${value}' where idproduct = ${id}`
    conectDB.query(sql, error => {
        if(error) throw error;

        res.send('Product update')
    })    
})

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id
    const sql = `DELETE FROM product WHERE idproduct = ${id}`
    conectDB.query(sql, error =>{
        if(error) throw error;

        res.send('Product deleted')
    })
})



app.listen(3001,() => {
    console.log('Server running in port 3001')
})