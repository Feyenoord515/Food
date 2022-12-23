import React from "react";
import { Link } from 'react-router-dom'; 
import Searchbar from "../Searchbar/index";
import sarten from "../../assets/sarten.png"




import './index.css'

export default function NavBarCompoment(params) { 
    return(
        <>
        {/* <div className="navbar">
            <div className="logopng">
                <img src={sarten} />
            </div>
            <div className="nombre">
                <h1>What am I cooking today?</h1>
            </div>
        </div> */}
        <div className="searchBar">
                <Searchbar />
            </div></>
       
    )
};



 