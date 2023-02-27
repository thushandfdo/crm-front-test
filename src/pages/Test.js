import React from 'react';
import './test.css';
// "react-phone-number-input": "^3.2.19",
// import PhoneInput, { isPossiblePhoneNumber, formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

export default function Test() {
    // const [value, setValue] = useState('');

    return (
        <div className='container'>
            {/* <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                error={
                    value 
                    ? (isPossiblePhoneNumber(value) ? undefined : 'Invalid phone number') 
                    : 'Phone number required'} 
            />

            Is possible: {value && isPossiblePhoneNumber(value) ? 'true' : 'false'}
            National: {value && formatPhoneNumber(value)}
            International: {value && formatPhoneNumberIntl(value)} */}
        </div>
    )
}
