var Feature = {
    assignCourseDetailForGrades: function (grades, allCourses) {
        var gradesWithCourseDetail = [];

        grades.forEach(function (grade) {
            allCourses.forEach(function (course) {
                if (course.code === grade.course) {
                    var newCourse = course;
                    newCourse.score = grade.score;
                    gradesWithCourseDetail.push(newCourse);
                }
            })
        });

        return gradesWithCourseDetail;
    }
};

