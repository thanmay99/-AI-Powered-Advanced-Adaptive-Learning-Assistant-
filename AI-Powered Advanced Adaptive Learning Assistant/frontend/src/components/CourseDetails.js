import React from 'react';

function CourseDetails({ course, onBackClick }) {
    return (
        <div className="course-details">
            <button onClick={onBackClick}>Back to Courses</button>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <div className="course-video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ly36kn0ug4k" frameborder="0" allowfullscreen></iframe><br/><br/>
                <iframe width="560" height="315" src="https://youtu.be/HXIWcTjIM_I" frameborder="0" allowfullscreen></iframe><br/><br/>
                <iframe width="560" height="315" src="https://youtu.be/-mJFZp84TIY?si=JROLJSwZLUOX2Ol8" frameborder="0" allowfullscreen></iframe><br/><br/>
            </div>
        </div>
    );
}

export default CourseDetails;