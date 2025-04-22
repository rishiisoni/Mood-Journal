import "../css/NotesSection.css";
import { useState } from "react";

export default function NotesSection({ entries }) {

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="notes-section">
            <div className="tittle">All Notes</div>
            <div className="all-notes">
                {
                    entries.map((entry, index) => (
                        <div className="note-box" key={index}>
                            <span>{entry.mood.icon}</span>
                            <div className="note">
                                <p>{entry.note}</p>
                                <p className="note-date">{formatDate(entry.date)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
