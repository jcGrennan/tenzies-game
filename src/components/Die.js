import React from "react"

export default function Die(props) {
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#EFEFEF"
    }
    
    const dieDot = <span className="die-dot"></span>
    
    function dieDots() {
        switch(props.value) {
            case 1: 
                return <div id="die-one">{dieDot}</div>
            case 2: 
                return <div id="die-two">{dieDot}{dieDot}</div>
            case 3:
                return <div id="die-three">{dieDot}{dieDot}{dieDot}</div>
            case 4: 
                return <div id="die-four">
                            <div className="die-column">{dieDot}{dieDot}</div>
                            <div className="die-column">{dieDot}{dieDot}</div>
                        </div>
            case 5: 
                return <div id="die-five">
                            <div className="die-column">{dieDot}{dieDot}</div>
                            <div className="die-column">{dieDot}</div>
                            <div className="die-column">{dieDot}{dieDot}</div>
                        </div>
            case 6: 
                return <div id="die-six">
                            <div className="die-column">{dieDot}{dieDot}{dieDot}</div>
                            <div className="die-column">{dieDot}{dieDot}{dieDot}</div>
                        </div>
        }
    }
    
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            {dieDots()}
        </div>
    )
}