import React from "react";
import './navbar.css'

export default function NavBar(props) {
    return(
        <div className="icon_container">
            {props.icons.map((icon, i) => <div key={i} className="icon" onClick={() => props.addIcon(icon)}>{icon.icon}</div>)}
        </div>
    )
}