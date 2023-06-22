import React from 'react'

// css
import './checkBox.css'

// props explicit type annotation
interface CheckBoxProps {
    id: Number,
    prefName: String,
    setSelectedPrefectureHandler: (id: Number) => void,
    selectedPrefecture: Number | null
}

export default function CheckBox(props: CheckBoxProps) {
    // functions
    const setSelectedPrefectureHandler = () => {
        props.setSelectedPrefectureHandler(props.id)
    }

    return (
        <div className='checkBox'>
            <input type="checkbox" name={props.id.toString()} onClick={setSelectedPrefectureHandler} checked={props.id === props.selectedPrefecture} />
            <h6>{props.prefName}</h6>
        </div>
    )
}
