import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarBar = ({className="",onDateChange}) => {
    const [date, setDate] = useState(new Date())
    const handleChange = (newDate) => {
        setDate(newDate) 
        onDateChange(newDate)
    }
  return (
    <div className="px-4 bg-white shadow rounded">
      <h2 className="text-xl text-center font-bold mb-4">Select a Date</h2>
      <Calendar onChange={handleChange} value={date} />
      <p className="mt-4">You selected: {date.toDateString()}</p>
    </div>
  )
}

export default CalendarBar