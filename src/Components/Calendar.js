import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid';
import {connect, useSelector} from 'react-redux'

const Calendar = (props) => {
    const [events, setEvents] = useState([])
    const currentUser = useSelector(state => state.users.currentUser)

    useEffect(() => {fetch("http://localhost:3000/api/v1/calendar_events")
    .then(res => res.json())
    .then(data => setEvents(data))},[])

    return(
        <div className="calendar-container">
            <FullCalendar 
                plugins ={[interactionPlugin, dayGridPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                select={(selectInfo) => handleDateSelect(selectInfo, currentUser)}
                eventClick={handleEventClick}
                events ={events}
            />
        </div>
    )

}
const handleDateSelect = (selectInfo, currentUser) => {
    // debugger
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
        return fetch("http://localhost:3000/api/v1/calendar_events", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                date: selectInfo.startStr,
                end:selectInfo.endStr,
                user_id: currentUser.id,
                family_id: currentUser.family_id
            })
        })
        .then(res => res.json())
        .then(data => {
            calendarApi.addEvent(data)
        })
    }
    }

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }





export default connect()(Calendar)