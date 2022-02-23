import React from "react"
import "./DieFace.css"

export default function FirstFace(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "tomato"
    }
    return (
        <div className="dice first-face"
             onClick={props.holdDice}
            style={styles}>

            <span className="dot"> </span>
        </div>
    )
}