import React, { useEffect, useState } from 'react'
import './Feedback.css'

function Feedback() {
    const [question, setQuestion] = useState('');
    const [type, setType] = useState('');

    var questions = [
        {
            question: "What is your name?",
            type: 'text'
        },
        {
            question: "How are you?",
            type: 'password'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        questions.push({ question, type});

        console.log(question, type);
    };

    const loadQuestions = () => {
        return (
            <div className="questions">
                {questions.map(question => (
                    <div className="question" key={question.question}>
                        <p>{question.question}</p>
                        <input type={question.type} />
                    </div>
                ))}
            </div>
        )
    };

    return (
        <div className='feedback'>
            { loadQuestions() }
            <div className="create-question">
                <form onSubmit={handleSubmit}>
                    Question : <input type='text' value={question} onChange={(e) => setQuestion(e.target.value)} /> <br />
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="text">text</option>
                        <option value="password">password</option>
                    </select>
                    <input type='submit'/>
                </form>
            </div>
        </div>
    )
}

export default Feedback;
