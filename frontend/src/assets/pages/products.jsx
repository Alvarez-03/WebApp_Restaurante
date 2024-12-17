import React, { useEffect, useState } from "react";
import axios from 'axios'
import'../styles/products.css'


function Products({productos}){
    const [Count, setCount]=useState(1);


    const Carrito=(idproducto)=>{
        setCount(Count+1)
        alert('Compra realizada '+idproducto+' Cantidad= '+Count)
    }

    return(
        <section className="container container-products">
            

            {productos.map((producto)=>(
                <div className="card" key={producto.producto_id}>
                    <img src={producto.imagen} className="card-img-top" alt="..."/>
                    <div className="card-body descripcion">
                        <h5>{producto.nombre}</h5>
                        <p>{producto.descripcion}</p>
                        <h5>$ {producto.precio}</h5>
                    </div>
                    <footer>
                        <button className="btn btn-primary" onClick={()=>Carrito(producto.producto_id)}  >
                        <i className="fa-solid fa-basket-shopping"></i> Comprar
                        </button>
                    </footer>
                </div>
            ))}
        </section>
    )
}
export default Products