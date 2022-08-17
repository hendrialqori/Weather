import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Modal } from '../../component/modal'
import { List } from '../../component/list'
import { BiSearch } from 'react-icons/bi'
import { GiPositionMarker } from 'react-icons/gi'
import { BsCalendarEvent, BsFillCloudSunFill, BsCloudMoonFill } from 'react-icons/bs'
import { RiWindyLine } from 'react-icons/ri'
import { WiHumidity } from 'react-icons/wi'
import { FaTemperatureHigh } from 'react-icons/fa'
import { api_key } from '../../constant/key'
import './home.css'

export const Home = () => {
  const date = new Date().toDateString()
  const [city1, setCity1] = useState('')
  const [result1, setResult1] = useState({})
  const [open, setOpen] = useState(false)
  const [night, setNight] = useState(false)
  const inputRef = useRef(null)

  const toCelcius = d => {
    const celcius = d - 273.15
    return Math.floor(celcius)
  }

  const handleSubmitCity = (e) => {
    e.preventDefault()
    if(city1 === '') return setCity1('This field don\'t empty!')
  
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${api_key}`)
    .then(res => {
      setResult1(res.data)
      setOpen(false)
    })
    .catch(e => {
      setOpen(true)
    })
  } 

  useEffect(()=> {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=pontianak&appid=${api_key}`)
    .then(res => {
      setResult1(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <div style={{
      background: night ? 'url(/night.jpg) no-repeat' : 'url(/light.jpg) no-repeat',
      backgroundSize: !night && 'cover'
    }} className='main'>
        <button onClick={()=> setNight(prev => !prev)} className='btn-theme'>
          {
            night ? <BsFillCloudSunFill className='theme-icon' /> :
            <BsCloudMoonFill className='theme-icon' />
          }
        </button>
        <main className='container'>
          {/* Modal */}
          <Modal open={open} setOpen={setOpen} city={city1}  />
          <section className='main-weather'>
            <form onSubmit={handleSubmitCity}>
              <input ref={inputRef} value={city1} onChange={e => setCity1(e.target.value)} type="search" placeholder='your city?' />
              <button type='submit' className='btn-search'>
                <BiSearch />
              </button>
            </form>

            <div className='title'>
              <p><span><BsCalendarEvent />{' '}</span>{date}</p>
              <h1>{toCelcius(result1?.main?.temp)}<sup>&#176;C</sup></h1>
              <h3><span><GiPositionMarker/></span> {result1?.name}, <span>{result1?.sys?.country}</span></h3>  
            </div>  
            
            {/* <div className='clouds'>
                <p>{result1?.weather?.map(e => e.main).join()}</p>
            </div> */}

            <div className='information'>
              <div className='wind-speed'>
                <RiWindyLine className='icon-wind' />
                <p>{result1?.wind?.speed} km/h</p>
              </div>
              <div className='humidity'>
                <WiHumidity className='icon-hum' />
                <p>{result1?.main?.humidity} %</p>
              </div>
              <div className='max'>
                <FaTemperatureHigh className='icon-max' />
                <p>{toCelcius(result1?.main?.temp_max)}<sup>&#176;C</sup></p>
              </div>
            </div>
          </section>

          {/* Additional city */}
          <List />
        </main>
    </div>
  )
}