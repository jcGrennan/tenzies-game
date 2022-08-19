// importing the components, React for the state and effect hooks, and nanoid and confetti dependencies

import React from "react"
import Die from "./components/Die"
import Roll from "./components/Roll"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


// composing and exporting the App

export default function App() {


    // Setting up all states that will be needed on the top level

    const [rollCount, setRollCount] = React.useState(0) // tracks roll count

    const [dice, setDice] = React.useState(allNewDice()) // tracks die values and held die

    const [tenzies, setTenzies] = React.useState(false) // tracks endgame

    const [personalBest, setPersonalBest] = React.useState(

        // pulling personal best score from local storage OR setting it to 0 if nothing is stored.
        JSON.parse(localStorage.getItem("personalBest") || 0)

    )
    

    // declaring a function that returns an object representing a die's data. The value is randomised.

    function generateNewDie() {

        return {

            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()

        }
    }


    /* declaring a function that initialises an array, then loops and pushes 10 die using the function above.
        Used as the initial state for the dice state. */

    function allNewDice() {

        const newDice = []

        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice

    }
    

    // declaring a function to hold the chosen dice using setDice and the isHeld dice property with map.

    function holdDice(id) {

        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    

    // declaring a function that rolls any die not held and tracks the roll count.

    function rollDice() {

        setRollCount(prevCount => prevCount + 1)

        setDice(oldDice => oldDice.map(die => {
            
            // using a ternary to determine which die need to be rerolled
            
            return die.isHeld ? die : generateNewDie()

        }))
    } 
    

    // declaring a function that starts a new game by resetting all the necessary states.

    function newGame() {

        setTenzies(false)
        setDice(allNewDice())
        setRollCount(0)

    }
      
    
    // Using the effect hook to track when the win conditions have been met as states need to be in sync.

    React.useEffect(() => {

        const allHeld = dice.every(die => die.isHeld) // tests if all die are held
        const firstValue = dice[0].value // determines the value of the first die in the array
        const allSameValue = dice.every(die => die.value === firstValue) // tests if all other die match the first

        // using an if statement that ends the game if above tests are true

        if (allHeld && allSameValue) {

            setTenzies(true)

            // using an if statement to set the personal best 

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
    }, [dice]) // reruns every time the dice state changes
    

    // using Effect hook to store the personal best state every time it changes

    React.useEffect(() => {

        localStorage.setItem("personalBest", JSON.stringify(personalBest))

    }, [personalBest])


    // mapping dice to the reusable Die component and passing props

    const diceElements = dice.map(die => (

        <Die 

            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}

        />

    ))
    

    // composing the App with JSX and passing props  

    return (

        <main>
            
            {/* using conditional rendering to drop confetti when the game is won */}
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