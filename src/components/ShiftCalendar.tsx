import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useDrop } from 'react-dnd';
import ShiftCalendarCell from './ShiftCalendarCell';

interface ShiftCalendarProps {
  editable?: boolean;
  onEventDrop?: (info: any) => void;
  onEventClick?: (info: any) => void;
  events: any[];
  textLabels: Array<{ text: string; position: { x: number; y: number } }>;
}

export default function ShiftCalendar({
  editable = false,
  onEventDrop,
  onEventClick,
  events,
  textLabels,
}: ShiftCalendarProps) {
  const [, drop] = useDrop(() => ({
    accept: 'text-label',
    drop: (item: { text: string }, monitor) => {
      const offset = monitor.getClientOffset();
      return {
        x: offset?.x || 0,
        y: offset?.y || 0,
      };
    },
  }));

  return (
    <div ref={drop} className="relative">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: editable ? '' : 'dayGridMonth,timeGridWeek'
        }}
        height="auto"
        weekends={true}
        editable={editable}
        eventDrop={onEventDrop}
        eventClick={onEventClick}
        events={events}
        dayCellContent={(arg) => (
          <ShiftCalendarCell
            dayNumber={arg.dayNumberText}
            isWeekend={arg.date.getDay() === 0 || arg.date.getDay() === 6}
          />
        )}
      />
      {textLabels.map((label, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: label.position.x,
            top: label.position.y,
            zIndex: 1000,
          }}
          className="bg-white px-2 py-1 rounded shadow text-sm"
        >
          {label.text}
        </div>
      ))}
    </div>
  );
}