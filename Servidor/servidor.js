const express = require("express")
const cors = require("cors")
const postgressPOOL= require('pg').Pool
const bodyparser= require('body-parser')

const app= express()
const port= 5000;


app.use(bodyparser.json())
app.use(cors())

const pool = new postgressPOOL({
    host: 'localhost',
    user: 'postgres',
    password: '1105366846',
    database: 'BDRestaurante', 
    port:5432,
})

pool.connect((error, connection)=>{
    if(error) throw error;
    console.log(`conexion a base de datos exitosa! ${port}`)
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//endpoints

app.get('/productos', async (req,res)=>{
    try{
        const result= await pool.query('SELECT * FROM productos')
        res.json(result.rows);
    }catch(error){
        console.error(error)
        res.status(500).send('error al obtener los productos')
    }
})

app.post('/productos', async (req, res) => {
    const { nombre, descripcion, precio, categoria, imagen } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, categoria, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, precio, categoria, imagen]  
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar el producto");
    }
});

app.put('/productos/:producto_id',(req,res)=>{
    const {producto_id}= req.params;
    const {nombre,descripcion,precio,categoria,imagen} = req.body
    const sql= 'UPDATE productos SET nombre=$1, descripcion=$2, precio=$3, categoria=$4, imagen=$5 WHERE "producto_id"=$6'
    pool.query(sql,[nombre,descripcion,precio,categoria,imagen,producto_id],(error,resultado)=>{
        if(error) return res.json(error)
        return res.status(200).send(`el producto se actualizo, con codigo ${producto_id}`)
    })
})

app.delete('/productos/:producto_id', async(req, res)=>{
    const {producto_id}= req.params
    try{
        const result = await pool.query('DELETE FROM productos WHERE producto_id = $1', [producto_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch(error){
        console.error(error);
        res.status(500).send("Error al eliminar el producto")
    }
})
