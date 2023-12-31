import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// css
import './home.css'

// components
import CheckBox from '../../components/checkBox/CheckBox.tsx'

export default function Home() {
    // locals
    const [prefectures, setPrefectures] = useState<{ prefCode: Number, prefName: String }[]>([])
    const [selectedPrefecture, setSelectedPrefecture] = useState<Number | null>(null)
    const [populationComposition, setPopulationComposition] = useState<{ boundaryYear: Number, data: { data: { value: Number, year: Number }[], label: String }[] }>()
    const [populationType, setPopulationType] = useState('総人口')
    const [dataToDisplay, setDataToDisplay] = useState<{ value: Number, year: Number }[]>();

    const [loading, setLoading] = useState({
        prefecturesLoaded: false,
        populationCompositionLoaded: false,
        dataToDisplayLoaded: false,
    })
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(500);

    // effects

    // for fetching all prefectures
    useEffect(() => {
        fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
            headers: {
                "X-API-KEY": "bdT7H7IYRnkjk4FOj7LtCuTXbU5M6svWat7BxmOl"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSelectedPrefecture(1)
                setPrefectures(data.result);
                setLoading({ ...loading, prefecturesLoaded: true })
                console.log(data.result);
            });
    }, [])

    // for fetching population composition
    useEffect(() => {
        if (selectedPrefecture) {
            fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${selectedPrefecture}`, {
                headers: {
                    "X-API-KEY": "bdT7H7IYRnkjk4FOj7LtCuTXbU5M6svWat7BxmOl"
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                setPopulationComposition(data.result);
                setLoading({ ...loading, populationCompositionLoaded: true })
            })
        }
    }, [selectedPrefecture])

    useEffect(() => {
        setDataToDisplay(populationComposition?.data.filter(data => data.label === populationType)[0].data)
        setLoading({ ...loading, dataToDisplayLoaded: true })
    }, [populationComposition, populationType])

    useEffect(() => {
        responsiveChart();
        window.addEventListener("resize", responsiveChart);
    }, []);

    // functions
    const setSelectedPrefectureHandler = (prefCode: Number) => {
        setSelectedPrefecture(prefCode)
    }

    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.name === 'populationType') {
            setPopulationType(event.target.value);
        }
    }

    const responsiveChart = () => {
        const maxWidth = 800;
        const maxHeight = 500;

        const widthRatio = window.innerWidth / maxWidth;
        const heightRatio = window.innerHeight / maxHeight;

        setWidth(widthRatio * 500);
        setHeight(heightRatio * 300);
    };

    return (
        <div className='home'>
            {loading.prefecturesLoaded && loading.populationCompositionLoaded ?
                <>
                    <div className='homePref'>
                        {prefectures.map(prefecture => <CheckBox
                            key={prefecture.prefCode.toString()}
                            prefName={prefecture.prefName}
                            id={prefecture.prefCode}
                            setSelectedPrefectureHandler={setSelectedPrefectureHandler}
                            selectedPrefecture={selectedPrefecture}
                        />)}
                    </div>

                    <select name="populationType" value={populationType} onChange={changeHandler}>
                        <option value="総人口">Total Population</option>
                        <option value="年少人口">Population Under 15</option>
                        <option value="生産年齢人口">Working-Age Population</option>
                        <option value="老年人口">Elderly Population</option>
                    </select>

                    <LineChart width={width} height={height} data={loading.dataToDisplayLoaded ? dataToDisplay : []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis dataKey="value" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </> :
                <>
                    <h1>Loading...</h1>
                </>
            }

        </div>
    )
}
