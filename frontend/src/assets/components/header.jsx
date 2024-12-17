import React, { useState } from "react";
import '../styles/header.css'

function Header (){



    return(
        <header className="header-navbar navbar bg-dark">
            <div className=" tittle-super ">
                <h1>Restaurante 
                    <i className="fa-solid fa-utensils"></i>
                </h1>
            </div>

            
            <div className="dropdown dropstart"> 
                <h3 className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bars"></i>
                </h3>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">Ingresar</li>
                        <li className="dropdown-item">Registrarse</li>
                        <li className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <button class="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <i class="fa-solid fa-cart-shopping"></i> 
                            </button>
                        </li>
                    </ul> 
            </div>

                {/*Carrito de compras */}
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel"> <i class="fa-solid fa-cart-shopping"></i> Carrito de Compras</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <h3> Mi Carrito </h3>
                            </li>
                            
                        </ul>
                        <h4>Total a pagar: $</h4>
                    </div>
                </div>

        </header>
    )
}

export default Header