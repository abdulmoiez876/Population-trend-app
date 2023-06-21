import React, { useEffect, useState } from 'react'
import axios from 'axios'

// css
import './home.css'

// components
import CheckBox from '../../components/checkBox/CheckBox'

export default function Home() {
    // locals
    const [prefectures, setPrefectures] = useState([])

    // effects
    useEffect(() => {
        axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
            headers: {
                "X-API-KEY": "bdT7H7IYRnkjk4FOj7LtCuTXbU5M6svWat7BxmOl"
            }
        }).then(response => {
            setPrefectures(response.data.result);
        })
    }, [])

    return (
        <div className='home'>
            {prefectures.map(prefecture => <CheckBox prefName={prefecture.prefName}/>)}
        </div>
    )
}
