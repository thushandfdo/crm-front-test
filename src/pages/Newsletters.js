import React, { useState } from 'react';
import ReactDOMServer from "react-dom/server";
import { sendEmail } from '../api';
import { NewCustomerTemplate } from '../components/MailTemplates';

export const newCustomerMail = (Name, Address, username, password) => {
    const to = [
        {
            Name, Address
        },
    ];

    const subject = 'Welcome to 99x..!';

    const content = ReactDOMServer.renderToString(
        <NewCustomerTemplate name={Name} username={username} password={password} />
    );

    sendEmail(to, subject, content, null);
};

export default function Newsletters() {

    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const to = [
            {
                Name: 'Thushan',
                Address: 'thushandfdo@gmail.com'
            },
            {
                Name: 'Dulani',
                Address: 'dulaniruwanthika99@gmail.com'
            }
        ];

        const subject = 'Test Subject';
        const content = '';

        sendEmail(to, subject, content, files);
    };

    return (
        <div className='newsletters'>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} multiple />
                <button type="submit">Upload</button>
            </form>

            
        </div>
    )
}