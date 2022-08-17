// importing the components, React for the state and effect hooks, and nanoid and confetti

import React from "react"
import Die from "./components/Die"
import Roll from "./components/Roll"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [rollCount, setRollCount] = React.useState(0)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [personalBest, setPersonalBest] = React.useState(
        JSON.parse(localStorage.getItem("personalBest") || 0)
    )
    
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
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    function rollDice() {
        setRollCount(prevCount => prevCount + 1)
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
            }))
        } 
        
    function newGame() {
        setTenzies(false)
        setDice(allNewDice())
        setRollCount(0)
    }
        
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setPersonalBest(prevBest => {
                if(prevBest === 0) {
                    return rollCount
                } else if (prevBest > rollCount) {
                    return rollCount
                } else {
                    return prevBest
            }
        })
        }
    }, [dice])
    
     React.useEffect(() => {
        localStorage.setItem("personalBest", JSON.stringify(personalBest))
    }, [personalBest])

    const diceElements = dice.map(die => (
        <Die 
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
            <Roll 
                tenzies={tenzies}
                rollCount={rollCount}
                personalBest={personalBest}
                newGame={newGame}
                rollDice={rollDice}
            />
        </main>
    )
}