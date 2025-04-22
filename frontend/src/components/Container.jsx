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

    return (
        <div className="container">
            <CalenderSection moodOptions={moodOptions} setEntries={setEntries} />
            <NotesSection entries={entries}/>
        </div>
    );
}