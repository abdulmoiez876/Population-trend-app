import React, { useEffect, useState } from 'react'
import axios from 'axios'

// css
import './home.css'

// components
import CheckBox from '../../components/checkBox/CheckBox'

export default function Home() {
    // locals
    const [prefectures, setPrefectures] = useState([])
    const [selectedPrefecture, setSelectedPrefecture] = useState(1)
    const [populationComposition, setPopulationComposition] = useState()

    // effects

    // for fetching all prefectures
    useEffect(() => {
        axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
            headers: {
                "X-API-KEY": "bdT7H7IYRnkjk4FOj7LtCuTXbU5M6svWat7BxmOl"
            }
        }).then(response => {
            setPrefectures(response.data.result);
        })
    }, [])
    
    // for fetching population composition
    useEffect(() => {
        axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${selectedPrefecture}`, {
            headers: {
                "X-API-KEY": "bdT7H7IYRnkjk4FOj7LtCuTXbU5M6svWat7BxmOl"
            }
        }).then(response => {
            setPopulationComposition(response.data.result);
        })
    }, [selectedPrefecture])

    // functions
    const setSelectedPrefectureHandler = (prefCode) => {
        setSelectedPrefecture(prefCode)
    }

    return (
        <div className='home'>
            {prefectures.map(prefecture => <CheckBox
                key={prefecture.prefCode}
                prefName={prefecture.prefName}
                id={prefecture.prefCode}
                setSelectedPrefectureHandler={setSelectedPrefectureHandler}
                selectedPrefecture={selectedPrefecture}
            />)}
        </div>
    )
}
