import React from "react";
import '../styles/header.css'

function headerAdmin (){

    return(
        <header className="header-navbar navbar bg-dark">
            <div className="tittle-super">
                <h1>Dashboard Restaurante 
                    <i className="fa-solid fa-utensils"></i>
                </h1>
                
            </div>
            <div className="dropdown dropstart nav-item"> 
                <h3 className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-bars"></i>
                </h3>
                    <ul className="dropdown-menu ">
                        <li className="dropdown-item">Salir</li>
                    </ul> 
            </div>
        </header>
    )
}

export default headerAdmin