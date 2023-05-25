
import React, { useState } from 'react'
import "./timezone.css"

import TimezoneSelect from 'react-timezone-select'

const TimeZone = (props) => {
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const handleSelectedTimezone = (timeZone) => {
        setSelectedTimezone(timeZone.offset)
        props.handleTimeZoneData(timeZone.offset)
        console.log("value++++++++++", timeZone.offset);
    }

    return (
        <>
            <div className="timezone-select" >
                <p className='timezone-title'>  Please Select TimeZone</p>

                <div className="select-wrapper">
                    <TimezoneSelect
                        value={selectedTimezone}
                        onChange={handleSelectedTimezone}
                    />
                </div>
                {/* <h3>Output:</h3>
                <div
                    style={{
                        backgroundColor: '#ccc',
                        padding: '20px',
                        margin: '20px auto',
                        borderRadius: '5px',
                        maxWidth: '200px',
                    }}
                >
                    <pre
                        style={{
                            margin: '0 20px',
                            fontWeight: 500,
                            fontFamily: 'monospace',
                        }}
                    >
                        {JSON.stringify(selectedTimezone, null, 2)}
                    </pre>
                </div> */}
            </div>

        </>
    )
}
export default TimeZone