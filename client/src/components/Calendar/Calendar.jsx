import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import s from '../Calendar/Calendar.module.css'
import interactionPlugin from "@fullcalendar/interaction"; 
import {useSelector} from 'react-redux'


export default function Calendar() {

    const events = []

    const {AllEvents} = useSelector(state => state);
    // console.log('eventos:',AllEvents)


function handleDateClick(arg){ 

    alert('Date: ' + arg.dateStr)
    alert('Coordinates: ' + arg.jsEvent.pageX + ',' + arg.jsEvent.pageY);
    alert('View: ' + arg.view.type);


}

      return (
        <div className={s.calendar}>
        {
            AllEvents?.map((e)=>{
                events.push({title:e.name, date:e.schedule.split('T')[0], })
            })
            
        }
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          selectable={true}
          selectHelper={true}
          events={events}
          
        />
        </div>
      )
}

