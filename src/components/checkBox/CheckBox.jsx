import React from 'react'

// css
import './checkBox.css'

export default function CheckBox(props) {
    return (
        <div className='checkBox'>
            <input type="radio" name='check' />
            <h6>{props.prefName}</h6>
        </div>
    )
}
