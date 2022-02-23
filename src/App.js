import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import {useElapsedTime} from "use-elapsed-time"
import FirstFace from "./components/diceFace/FirstFace";
import SecondFace from "./components/diceFace/SecondFace";
import ThirdFace from "./components/diceFace/ThirdFace";
import ForthFace from "./components/diceFace/ForthFace";
import FifthFace from "./components/diceFace/FifthFace";
import SixthFace from "./components/diceFace/SixthFace";
import "./App.css"


export default function App() {

    const [newGame, setNewGame] = React.useState(true)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const timer = useElapsedTime({isPlaying})

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setIsPlaying(false)
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
        if (newGame) {
            setIsPlaying(true)
            setNewGame(false)
        }
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setNewGame(true)
            setTenzies(false)
            setDice(allNewDice())
            timer.reset(0)
        }
    }

    function holdDice(id) {
        if (!newGame) {
            setDice(oldDice => oldDice.map(die => {
                return die.id === id ?
                    {...die, isHeld: !die.isHeld} :
                    die
            }))
        }
    }


    const diceElements = dice.map(die => (
        die.value === 1
            ? <FirstFace
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}/>
            : die.value === 2
                ? <SecondFace
                    key={die.id}
                    value={die.value}
                    isHeld={die.isHeld}
                    holdDice={() => holdDice(die.id)}/>
                : die.value === 3
                    ? <ThirdFace
                        key={die.id}
                        value={die.value}
                        isHeld={die.isHeld}
                        holdDice={() => holdDice(die.id)}/>
                    : die.value === 4
                        ? <ForthFace
                            key={die.id}
                            value={die.value}
                            isHeld={die.isHeld}
                            holdDice={() => holdDice(die.id)}/>
                        : die.value === 5
                            ? <FifthFace
                                key={die.id}
                                value={die.value}
                                isHeld={die.isHeld}
                                holdDice={() => holdDice(die.id)}/>
                            : <SixthFace
                                key={die.id}
                                value={die.value}
                                isHeld={die.isHeld}
                                holdDice={() => holdDice(die.id)}/>

    ))

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <h2>  {newGame ? "Click start when ready" : `Time: ${timer.elapsedTime.toFixed(2)}`} </h2>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}>
                {newGame ? "Start" : tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}