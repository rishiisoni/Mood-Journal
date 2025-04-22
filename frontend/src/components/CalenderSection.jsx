import { useState } from "react";
import "../css/CalenderSection.css"

export default function CalenderSection({moodOptions, setEntries}) {


    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentDate = new Date();

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const daysInMonths = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentYear, day);
        const today = new Date();

        if (selectedDate >= today) {
            setSelectedDate(clickedDate);
        }
    }

    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState('');
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);


    return (
        <>
            <div className="calender-section">
                <div className="calender-part-1">
                    <h3>April 24, 2024</h3>
                    <p>How are you feeling today?</p>
                    <div className="mood-options">
                        {moodOptions.map((mood) => (
                            <div
                                key={mood.mood}
                                className={`mood-icon ${selectedMood?.mood === mood.mood ? 'selected' : ''}`}
                                style={{ backgroundColor: selectedMood?.mood === mood.mood ? mood.color : '#f1f1f1' }}
                                onClick={() => setSelectedMood(mood)}
                            >
                                <span>{mood.icon}</span>
                            </div>
                        ))}
                    </div>
                    <input type="text" placeholder="Add Something..." />
                    <button>Save</button>
                </div>
                <div className="calender-part-2">
                    <div className="calender">
                        <div className="navigate-date">
                            <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                            <div className="buttons">
                                <i className="bx bx-chevron-left" onClick={prevMonth}></i>
                                <i className="bx bx-chevron-right" onClick={nextMonth}></i>
                            </div>
                        </div>
                        <div className="weekdays">
                            {daysOfWeek.map((day) => (
                                <span key={day}>{day}</span>
                            ))}
                        </div>
                        <div className="days">
                            {
                                [...Array(firstDayOfMonth).keys()].map((_, index) => (
                                    <span key={`empty-${index}`} />
                                ))
                            }
                            {
                                [...Array(daysInMonths).keys()].map((day) => (
                                    <span key={day + 1} className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-day' : ""} onClick={() => handleDayClick(day + 1)}>{day + 1}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}