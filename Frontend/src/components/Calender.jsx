import { useState, useCallback, useContext } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Context } from '../context/Context';

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map((k) => Views[k]);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 27));
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const {tasks} = useContext(Context)
  console.log(tasks,"2025-08-13T11:31:22.024Z")

  // Example tasks
  const tasks1 = [
    {
      id: 1,
      name: "Task 1",
      description: "Prepare report",
      defineDate: "2025-08-27",
      dueDate: "2025-08-29",
      status: "pending",
    },
    {
      id: 2,
      name: "Task 2",
      description: "Prepare report",
      defineDate: "2025-08-27",
      dueDate: "2025-08-29",
      status: "pending",
    },
    {
      id: 3,
      name: "Task 3",
      description: "Prepare report",
      defineDate: "2025-08-13T11:31:22.024Z",
      dueDate: "2025-08-13T11:31:22.024Z",
      status: "pending",
    },
    {
      id: 4,
      name: "Task 4",
      description: "Client meeting",
      defineDate: "2025-08-13T11:31:22.024Z",
      dueDate: "2025-08-13T11:31:22.024Z",
      status: "completed",
    },
    {
      id: 5,
      name: "Task 5",
      description: "Submit design",
      defineDate: "2025-08-13T11:31:22.024Z",
      dueDate: "2025-08-13T11:31:22.024Z",
      status: "pending",
    },
  ];


  // Convert tasks to events with proper date handling
  const events = tasks.map((task) => {
    const startDate = moment(task.updatedAt, "YYYY-MM-DD");
    const endDate = moment(task.dueDate, "YYYY-MM-DD");
    
    // For single-day events, show only on the dueDate
    const isSameDay = startDate.isSame(endDate, 'day');
    const end = isSameDay 
      ? endDate.clone().add(1, 'days').toDate() 
      : endDate.clone().add(1, 'days').toDate();

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      start: startDate.toDate(),
      end: end,
      status: task.status,
      allDay: true
    };
  });

  const EventComponent = useCallback(({ event }) => (
    <div className={`p-1 mb-1 rounded text-white truncate ${event.status === "completed" ? "bg-green-500" : "bg-blue-500"}`}>
      {event.title}
    </div>
  ), []);

  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleView = useCallback((newView) => {
    setCurrentView(newView);
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow" style={{ height: '80vh' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={allViews}
        step={60}
        showMultiDayTimes
        date={currentDate}
        view={currentView}
        onNavigate={handleNavigate}
        onView={handleView}
        components={{
          event: EventComponent,
          month: {
            dateHeader: ({ date, label }) => (
              <div className="rbc-date-cell flex justify-between items-center">
                <span>{label}</span>
                <div className="flex-1 overflow-y-auto max-h-24">
                  {/* Events will be rendered here automatically */}
                </div>
              </div>
            )
          }
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.status === "completed" ? "#4CAF50" : "#2196F3",
            color: 'white',
          }
        })}
      />
    </div>
  );
};

export default Calendar;