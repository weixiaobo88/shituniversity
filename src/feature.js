var FEATURE = {
    gradesWithCourseDetail: function(grades, allCourses) {
        var gradesWithCourseDetail = [];

        grades.forEach(function(grade) {
            allCourses.forEach(function(course) {
                if(course.code === grade.course) {
                    var newCourse = course;
                    newCourse.score = grade.score;
                    gradesWithCourseDetail.push(newCourse);
                }
            })
        });

        return gradesWithCourseDetail;
    },
    gradesWithPracticeDetail: function(grades, allPractices) {
        var gradesWithPracticeDetail = [];

        grades.forEach(function(grade) {
            allPractices.forEach(function(practice) {
                if(practice.code === grade.course) {
                    var newCourse = practice;
                    newCourse.score = grade.score;
                    gradesWithPracticeDetail.push(newCourse);
                }
            })
        });

        return gradesWithPracticeDetail;
    },
    calculateCoursesAverageScore: function (selectedCourses) {
        var sumOfScore = 0.0;
        var count = selectedCourses.length;
        selectedCourses.forEach(function(selectedCourse) {
            sumOfScore += parseFloat(selectedCourse.score);
        });

        return sumOfScore / count;
    }
};
