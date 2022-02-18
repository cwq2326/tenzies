import React from "react"

export default function ThirdFace(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "tomato"
    }
    return (
        <div className="dice third-face"
             onClick={props.holdDice}
             style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    )
}