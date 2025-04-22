import { useState, useEffect } from "react";
import "../css/CalenderSection.css"
import axios from 'axios';

export default function CalenderSection({ moodOptions, entries, setEntries, setLocation }) {


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

    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState("");
    const [weather, setWeather] = useState({});
    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
            );
            console.log(res);
            setLocation(res.data.name);
            setWeather({
                temp: res.data.main.temp,
                condition: res.data.weather[0].main,
            });
        });
    }, []);

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    }

    const saveNote = () => {
        if (selectedMood !== null && note.trim() !== "") {
            const newEntry = {
                mood: selectedMood,
                note: note,
                date: selectedDate,
                weather: weather
            };

            setEntries((prevEntries) => [...prevEntries, newEntry]);
            setNote("");
            setSelectedMood(null);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };


    useEffect(() => {
        console.log(entries);
    }, [entries]);

    return (
        <>
            <div className="calender-section">
                <div className="calender-part-1">
                    <h3>{formatDate(selectedDate)}</h3>
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
                    <input type="text" value={note} onChange={handleNoteChange} placeholder="Add Something..." />
                    <button onClick={saveNote}>Save</button>
                </div>
                <div className="calender-part-2">
                    <div className="calender">
                        <div className="navigate-date">
                            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
                            <h2 className="month">{monthsOfYear[currentMonth]} {currentYear}</h2>
                            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
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
                                    <span key={day + 1} className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-day' : ""}>{day + 1}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

