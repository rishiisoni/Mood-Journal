import "../css/Container.css"
import CalenderSection from "./CalenderSection";
import NotesSection from "./NotesSection";
import { useState } from "react";

export default function Container() {
    const moodOptions = [
        { mood: 'Happy', icon: '😊', color: '#FFE066' },
        { mood: 'Sad', icon: '😢', color: '#A0C4FF' },
        { mood: 'Angry', icon: '😡', color: '#FF6B6B' },
        { mood: 'Relaxed', icon: '😌', color: '#B2F7EF' },
        { mood: 'Anxious', icon: '😰', color: '#D3B5E5' }
    ];

    const [entries, setEntries] = useState([]);
    const [location, setLocation] = useState("");

    return (
        <div className="container">
            <div className="header">
                MoodMate
            </div>
            <CalenderSection moodOptions={moodOptions} entries={entries} setEntries={setEntries} setLocation={setLocation}/>
            <NotesSection entries={entries}/>
        </div>
    );
}