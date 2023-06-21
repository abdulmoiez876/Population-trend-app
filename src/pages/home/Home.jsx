import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

    const data = [
        { year: 2010, value: 2400 },
        { year: 2011, value: 1800 },
        { year: 2012, value: 3600 },
        { year: 2013, value: 2400 },
        { year: 2014, value: 3100 },
        { year: 2015, value: 4000 },
        { year: 2016, value: 5000 },
    ];

    return (
        <div className='home'>
            <div className='homePref'>
                {prefectures.map(prefecture => <CheckBox
                    key={prefecture.prefCode}
                    prefName={prefecture.prefName}
                    id={prefecture.prefCode}
                    setSelectedPrefectureHandler={setSelectedPrefectureHandler}
                    selectedPrefecture={selectedPrefecture}
                />)}
            </div>

            <select name="" id="">
                <option value="総人口">Total Population</option>
                <option value="年少人口">Population Under 15</option>
                <option value="生産年齢人口">Working-Age Population</option>
                <option value="老年人口">Elderly Population</option>
            </select>

            <LineChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>

        </div>
    )
}
