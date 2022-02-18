import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import DiceFace from "./components/diceFace/DiceFace";
import FirstFace from "./components/diceFace/FirstFace";
import SecondFace from "./components/diceFace/SecondFace";
import ThirdFace from "./components/diceFace/ThirdFace";
import ForthFace from "./components/diceFace/ForthFace";
import FifthFace from "./components/diceFace/FifthFace";
import SixthFace from "./components/diceFace/SixthFace";


export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const diceElements = dice.map(die => (
        die.value === 1 ?
        <FirstFace
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />  :
            die.value === 2 ?
            <SecondFace
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            /> :
                die.value === 3 ?
                    <ThirdFace
                        key={die.id}
                        value={die.value}
                        isHeld={die.isHeld}
                        holdDice={() => holdDice(die.id)}
        /> :
                    die.value === 4 ?
                        <ForthFace
                            key={die.id}
                            value={die.value}
                            isHeld={die.isHeld}
                            holdDice={() => holdDice(die.id)}
                        /> :
                        die.value === 5 ?
                            <FifthFace
                                key={die.id}
                                value={die.value}
                                isHeld={die.isHeld}
                                holdDice={() => holdDice(die.id)}
                            /> :
                            <SixthFace
                                key={die.id}
                                value={die.value}
                                isHeld={die.isHeld}
                                holdDice={() => holdDice(die.id)}
                            />

    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}

            </div>

            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}