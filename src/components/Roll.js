import React from "react"

export default function Roll(props) {
    return (
        <div className="roll">
            <button className="roll-dice" onClick={props.tenzies ? props.newGame : props.rollDice}>
                {props.tenzies ? "New Game" : "Roll"}
            </button>
            <div className="roll-scores">
                <p>Rolls: {props.rollCount}</p>
                <p>Best: {props.personalBest}</p>
            </div>
        </div>
    )
}