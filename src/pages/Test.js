import React from 'react';
import './test.css';

export default function Test() {
    return (
        <div className='container'>
            <div className="top-buttons">
                <button>
                    Sprint
                </button>
            </div>
            <div className='todo'>
                Todo
            </div>
            <div className='ongoing'>
                Ongoing
            </div>
            <div className='for-qa'>
                Ready for QA
            </div>
            <div className='qa-ongoing'>
                QA ongoing
            </div>
            <div className='done'>
                Done
            </div>
        </div>
    )
}
