import React from 'react'

// css
import './checkBox.css'

export default function CheckBox(props) {
    // functions
    const setSelectedPrefectureHandler = () => {
        props.setSelectedPrefectureHandler(props.id)
    }

    return (
        <div className='checkBox'>
            <input type="radio" name='check' id={props.id} onClick={setSelectedPrefectureHandler} checked={props.id === props.selectedPrefecture} />
            <h6>{props.prefName}</h6>
        </div>
    )
}
