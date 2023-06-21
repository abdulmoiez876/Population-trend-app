import React from 'react'

// css
import './home.css'

// components
import CheckBox from '../../components/checkBox/CheckBox'

export default function Home() {
    return (
        <div className='home'>
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
        </div>
    )
}
