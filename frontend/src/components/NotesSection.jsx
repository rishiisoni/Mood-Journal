import "../css/NotesSection.css"
import { useState } from "react";

export default function NotesSection(){
    return (
        <>
        <div className="notes-section">
            <div className="tittle">All Notes</div>
            <div className="all-notes">
                <div className="note">
                    <div className="mood">
                        mood icon
                    </div>
                    <div className="note">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ea suscipit distinctio, dolorum eius recusandae minima nulla</p>
                        <p>Date</p>
                    </div>
                </div>
                <div className="note">
                    <div className="mood">
                        mood icon
                    </div>
                    <div className="note">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ea suscipit distinctio, dolorum eius recusandae minima nulla</p>
                        <p>Date</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}