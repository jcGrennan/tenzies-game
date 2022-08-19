// composing and exporting Roll component. Small (done for practice)

export default function Roll(props) {

    return (

        <div className="roll">
            
            {/* using ternaries to determine whether the button rolls the dice or restarts the game */}
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