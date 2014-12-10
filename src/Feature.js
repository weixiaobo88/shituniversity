var Feature = {
    gradesOfCourse: function(grades, allCourses) {
        var gradesOfCourseCode = [];
        var gradesOfCourseDetail = [];

        grades.forEach(function (grade) {
            allCourses.forEach(function (course) {
                if (course.code === grade.course) {
                    gradesOfCourseCode.push(grade);
                    var newCourse = course;
                    newCourse.score = grade.score;
                    gradesOfCourseDetail.push(newCourse);
                }
            })
        });

        return {
            gradesOfCourseCode: gradesOfCourseCode,
            gradesOfCourseDetail: gradesOfCourseDetail
        }
    },
    gradesOfPractice: function(grades, allPractices) {
        var gradesOfPracticeName = [];
        var gradesOfPracticeDetail = [];

        grades.forEach(function (grade) {
            allPractices.forEach(function (practice) {
                if (practice.name === grade.course) {
                    gradesOfPracticeName.push(grade);
                    var newCourse = practice;
                    newCourse.score = grade.score;
                    gradesOfPracticeDetail.push(newCourse);
                }
            })
        });

        return {
            gradesOfPracticeName: gradesOfPracticeName,
            gradesOfPracticeDetail: gradesOfPracticeDetail
        }
    },
    removeUnreplaceablePractice: function(gradesWithPracticeDetail) {
        var gradesWithPracticeDetailOfAllReplaceable = gradesWithPracticeDetail;

        gradesWithPracticeDetailOfAllReplaceable.forEach(function(grade, index) {
            if(grade.replaceableCourses.length === 0) {
                gradesWithPracticeDetailOfAllReplaceable.splice(index, 1);
            }
        });
        return gradesWithPracticeDetailOfAllReplaceable;
    }
};

