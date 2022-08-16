import { useState } from 'react'
import { api_key } from '../../constant/key'
import axios from 'axios'
import { GiPositionMarker } from 'react-icons/gi'
import { BsCalendarEvent } from 'react-icons/bs'
import { RiWindyLine } from 'react-icons/ri'
import { WiHumidity } from 'react-icons/wi'
import { FaTemperatureHigh } from 'react-icons/fa'
import './list.css'

export const List = () => {
  const date = new Date().toDateString()
  const [open, setOpen] = useState(false) 
  const [city, setCity] = useState('')
  const [list, setList] = useState([])

  const toCelcius = d => {
    const celcius = d - 273.15
    return Math.floor(celcius)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(city === '') return setCity('This field don\'t empty!')
  
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
    .then(res => {
      setList(prev => [...prev, res.data])
      setOpen(false)
    })
    .catch(e => {
      setOpen(true)
    })
  }

  return (
    <section className='list-wrapper'>
        <div className={ open ? 'active-form modal-form-wrapper' : 'modal-form-wrapper'}>
            <button  onClick={()=> setOpen(false)} className='btn-close-list'>&#x2715;</button>
            <form onSubmit={handleSubmit} className='form-modal-add'>
                <input value={city} onChange={e => setCity(e.target.value)} type="search" />
            </form>
        </div>
        <div className='add-btn-wrapper'>
            <button onClick={()=> setOpen(true)} className='btn-add'>+</button>
            <p>Add new city</p>
        </div>

        <div className='list-container'>
            {
                list?.map((res,i)=> (
                <section key={i} className='main-weather'>
                    <div className='title'>
                        <p><span><BsCalendarEvent /></span>{' '}{date}</p>
                        <h1>{toCelcius(res?.main?.temp)}<sup>&#176;C</sup></h1>
                        <h3><span><GiPositionMarker/></span> {res?.name}, <span>{res?.sys?.country}</span></h3>  
                    </div>  

                    <div className='clouds'>
                        <img className='icon' src={`http://openweathermap.org/img/wn/${res?.weather?.map(e => e.icon).join()}.png`} alt="icons" />
                        <p>{res?.weather?.map(e => e.description).join()}</p>
                    </div>

                    <div className='information'>
                        <div className='wind-speed'>
                            <RiWindyLine className='icon-wind' />
                            <p>{res?.wind?.speed} km/h</p>
                        </div>
                        <div className='humidity'>
                            <WiHumidity className='icon-hum' />
                            <p>{res?.main?.humidity} %</p>
                        </div>
                        <div className='max'>
                            <FaTemperatureHigh className='icon-max' />
                            <p>{toCelcius(res?.main?.temp_max)}<sup>&#176;C</sup></p>
                        </div>
                    </div>
                </section>
                ))
            }
        </div>
    </section>
  )
}