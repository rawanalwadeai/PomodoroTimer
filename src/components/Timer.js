import React, { useState, useEffect } from "react";

function Timer() {
    const WORK_TIME = 25 * 60; // 25 minutes in seconds
    const BREAK_TIME = 5 * 60; // 5 minutes in seconds

    const [timeLeft, setTimeLeft] = useState(WORK_TIME); // Initial time set to work time
    const [isWorkSession, setIsWorkSession] = useState(true); // Determines if it's a work or break session
    const [isActive, setIsActive] = useState(false); // Is the timer running?

    // Request notification permission
    const requestNotificationPermission = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    };

    // Show notification
    const showNotification = (title, body) => {
        if (Notification.permission === "granted") {
            new Notification(title, { body });
        }
    };

    // useEffect for handling the timer logic
    useEffect(() => {
        requestNotificationPermission(); // Request permission on component mount

        let timer = null;

        if (isActive && timeLeft > 0) {
            // Decrease the time left every second
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // When time hits 0, show notification
            clearInterval(timer);
            if (isWorkSession) {
                showNotification("Work Session Done", "Click 'Start Break Session' to take a break.");
            } else {
                showNotification("Break Session Done", "Click 'Start Work Session' to get back to work.");
            }
        }

        return () => clearInterval(timer); // Cleanup timer on unmount or state change
    }, [isActive, timeLeft, isWorkSession]);

    // Start or pause the timer
    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    // Reset the timer to work session
    const resetWorkSession = () => {
        setIsActive(false);
        setTimeLeft(WORK_TIME);
        setIsWorkSession(true); // Always start with work session
    };

    // Start the break session
    const startBreakSession = () => {
        setIsActive(false);
        setTimeLeft(BREAK_TIME);
        setIsWorkSession(false); // Set to break session
    };

    // Start the work session
    const startWorkSession = () => {
        setIsActive(false);
        setTimeLeft(WORK_TIME);
        setIsWorkSession(true); // Set to work session
    };

    // Format the time from seconds to MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    return (
        <div className="tc bg-light-gray br3 pa4 ma3 w-50 center shadow-5">



            <button
                className="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-blue ml3"
                onClick={startBreakSession}
            >
                Start Break Session
            </button>

            <button
                className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green ml3"
                onClick={startWorkSession}
            >
                Start Work Session
            </button>

            <h1 className="f3 mb3">
                {isWorkSession ? "Work Session" : "Break Session"}
            </h1>

            <h2 className="f1 mb4">{formatTime(timeLeft)}</h2>

            <button
                className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-red"
                onClick={toggleTimer}
            >
                {isActive ? "Pause" : "Start"}
            </button>




        </div>
    );
}

export default Timer;
