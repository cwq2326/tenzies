import React from "react"

export default function SixthFace(props) {const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "tomato"
}

    return (
        <div className="fourth-face dice"
             onClick={props.holdDice}
             style={styles}>
            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    )
}