import React, { useState } from "react";
import "../App.css";

const Calendar = () => {
    const [view, setView] = useState("month"); // Default view is month
    const [currentDate, setCurrentDate] = useState(new Date());

    // Function to change to a specific view
    const changeView = (newView) => {
        setView(newView);
    };

    // Function to generate a month view
    const generateMonthView = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const daysInMonth = [];
        for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
            daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return daysInMonth;
    };

    // Function to generate a week view
    const generateWeekView = () => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

        const daysInWeek = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + i);
            daysInWeek.push(currentDay);
        }

        return daysInWeek;
    };

    // Function to generate a 3-day view
    const generate3DayView = () => {
        const daysIn3Day = [];
        for (let i = 0; i < 3; i++) {
            const currentDay = new Date(currentDate);
            currentDay.setDate(currentDate.getDate() + i);
            daysIn3Day.push(currentDay);
        }

        return daysIn3Day;
    };

    // Function to generate a 2-week view
    const generate2WeekView = () => {
        const startOf2Weeks = new Date(currentDate);
        startOf2Weeks.setDate(currentDate.getDate() - currentDate.getDay());

        const daysIn2Weeks = [];
        for (let i = 0; i < 14; i++) {
            const currentDay = new Date(startOf2Weeks);
            currentDay.setDate(startOf2Weeks.getDate() + i);
            daysIn2Weeks.push(currentDay);
        }

        return daysIn2Weeks;
    };

    // Get days for the current view
    const getDaysForView = () => {
        switch (view) {
            case "week":
                return generateWeekView();
            case "3-day":
                return generate3DayView();
            case "2-week":
                return generate2WeekView();
            case "month":
            default:
                return generateMonthView();
        }
    };

    const days = getDaysForView();

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>Previous</button>
                <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>Next</button>
            </div>

            <div className="calendar-view-options">
                <button onClick={() => changeView("3-day")}>3-Day</button>
                <button onClick={() => changeView("week")}>1-Week</button>
                <button onClick={() => changeView("2-week")}>2-Week</button>
                <button onClick={() => changeView("month")}>Month</button>
            </div>

            <div className="calendar-grid">
                {days.map((day, index) => (
                    <div key={index} className="calendar-cell">
                        <span className="calendar-date">{day.getDate()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
