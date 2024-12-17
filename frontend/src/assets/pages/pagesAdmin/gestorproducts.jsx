import React, {useState } from "react";
import axios from "axios";
import { ToastContainer, toast , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderAdmin from "../../components/headerAdmin";
import '../../styles/gestorProducts.css'

function GestorProductos ({productos}){

    const [agregaropen, SetAgregaropen]= useState(false)
    const [productosopen,setProductosopen]=useState(true)
    const [productosData, SetProductosData]= useState({nombre:"",descripcion:"",precio:"",categoria:"",imagen:"",producto_id:""})


    const handleagregaropen=()=>{
        SetAgregaropen(true)
    }
    const handleagregarclose=()=>{
        SetAgregaropen(false)
        SetProductosData({ nombre: "", descripcion: "", precio: "", categoria: "", imagen: "",producto_id:"" }); 
    }

    const handleproductosopen=()=>{
        setProductosopen(true)
    }
    const handleproductosclose=()=>{
        setProductosopen(false)
    }

    const handleAlertCreado=()=>{
        toast.success('Producto Agregado Con Éxito', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });    
            setTimeout(() => {
                location.reload()
            }, 1700);    
    }

    const handleAlertActualizado=()=>{
        toast.success('Actualizacion Éxitosa', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });    
            setTimeout(() => {
                location.reload()
            }, 1700);    
    }

    const handleAlertEliminado=()=>{
        toast.error('Producto Eliminado', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });      
            setTimeout(() => {
                location.reload()
            }, 1700); 
    }



    const handleChange = (e) => {
        const {name,value} = e.target;
        SetProductosData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate=(producto)=>{
        handleagregaropen()
        SetProductosData(producto)
    }


    const handleEliminar= async (producto_id)=>{
        await axios.delete(`http://localhost:5000/productos/${producto_id}`);
        handleAlertEliminado()
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
            
            try{
                if(productosData.producto_id){
                    await axios.put(`http://localhost:5000/productos/${productosData.producto_id}`, productosData)
                    handleAlertActualizado()

                }else{
                    await axios.post("http://localhost:5000/productos", productosData)
                    handleAlertCreado()
                }
    
    
            }catch(error){
                console.log(error)
            }
    }

    return(

        <>
            <HeaderAdmin />
            <section className="content-dashboard">
                <nav className="barra-lateral container">
                    <button className="btn btn-navbar" onClick={handleagregaropen}> <i className="fa-solid fa-plus"></i> Agregar Producto</button>
                    <button className="btn btn-navbar" onClick={handleproductosopen}> <i className="fa-solid fa-store"></i> Visualizar Productos</button>
                    
                    
                </nav>


                {agregaropen && 
                    <div>
                        <form onSubmit={handleSubmit} className="formulario container">
                           
                            <i className=" fa-solid fa-circle-xmark " id="btn_close" onClick={handleagregarclose}></i>
                            
                            <h2> <i className="fa-regular fa-clipboard"></i>  Informacion Producto</h2>
                            <input type="text" placeholder="Nombre Producto" name="nombre" value={productosData.nombre} onChange={handleChange} autoComplete="off" required/>
                            <input type="text" placeholder="Descripcion" name="descripcion" onChange={handleChange} value={productosData.descripcion} autoComplete="off" required/>
                            <input type="text" placeholder="Precio" name="precio" onChange={handleChange} value={productosData.precio} autoComplete="off" required/>
                            <input type="text" placeholder="categoria" name="categoria" onChange={handleChange} value={productosData.categoria} autoComplete="off" required/>
                            <input type="text" placeholder="Url imagen" name="imagen" onChange={handleChange} value={productosData.imagen} autoComplete="off" required/>
                            
                            <button type="submit" className="btn btn-secondary" >
                                <i className="fa-solid fa-shop"></i>  {productosData.producto_id ? "Actualizar Producto" : "Crear Producto"}
                            </button>
                        </form>
                    </div>
                }

               {productosopen &&(

                    <div>

                        <header className="container header-products">
                            <i className=" fa-solid fa-circle-xmark " id="btn_close" onClick={handleproductosclose}></i>
                        </header>

                        <div className="container content-products">

                            {productos.map((producto)=>(
                                <div className="card" key={producto.producto_id}>
                                    <img src={producto.imagen} className="card-img-top" alt="..."/>
                                    <div className="card-body descripcion">
                                        <h5>{producto.nombre}</h5>
                                        <h6>{producto.descripcion}</h6>
                                        <h5>$ {producto.precio}</h5>
                                    </div>
                                    <footer>
                                        <button className="btn btn-elm" onClick={()=>handleEliminar(producto.producto_id) } > 
                                            <i className="fa-solid fa-trash"></i> Eliminar
                                        </button>
                                        <button className="btn btn-modf"  onClick={()=>handleUpdate(producto)}>
                                            <i className="fa-solid fa-pen-to-square"></i> Modificar
                                        </button>
                                    </footer>
                                </div>
                            ))}
                        </div>
                    </div>
               )} 


            </section>
            <ToastContainer/>
        </>
    )
}

export default GestorProductos
