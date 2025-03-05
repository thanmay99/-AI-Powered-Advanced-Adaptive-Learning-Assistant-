import React, { useState } from 'react';
import './common.css';
import CourseDetails from './CourseDetails';

function CourseModules() {
    const courses = [
        { id: 1, name: 'React Basics', description: 'Learn the basics of React.', imageUrl: 'path/to/react-basics.jpg' },
        { id: 2, name: 'Advanced React', description: 'Dive deeper into React.', imageUrl: 'path/to/advanced-react.jpg' },
        { id: 3, name: 'JavaScript Essentials', description: 'Master JavaScript fundamentals.', imageUrl: 'path/to/js-essentials.jpg' },
        { id: 4, name: 'CSS for Beginners', description: 'Learn how to style your web pages.', imageUrl: 'path/to/css-beginners.jpg' },
    ];

    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };

    const handleBackClick = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="course-modules">
            {selectedCourse ? (
                <CourseDetails course={selectedCourse} onBackClick={handleBackClick} />
            ) : (
                <>
                    <h1>Course Modules</h1>
                    <ul>
                        {courses.map(course => (
                            <li key={course.id} className="course-item" onClick={() => handleCourseClick(course)}>
                                <h2>{course.name}</h2>
                                <p>{course.description}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default CourseModules;