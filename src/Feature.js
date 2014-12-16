var Feature = {
    transformData: function(grades) {
        var gradesObj = [];

        grades.forEach(function(grade) {
            var course = grade.split(':')[0];
            var score = parseInt(grade.split(':')[1]);
            gradesObj.push(new Grade(course, score))
        });

        return gradesObj;
    },
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
    extractMyPractices: function(grades, allPractices) {
        var myPracticesScore = [];
        var myPractices = [];

        grades.forEach(function (grade) {
            allPractices.forEach(function (practice) {
                if (practice.name === grade.course) {
                    myPracticesScore.push(grade);
                    var newCourse = practice;
                    newCourse.score = grade.score;
                    myPractices.push(newCourse);
                }
            })
        });

        return {
            myPracticesScore: myPracticesScore,
            myPractices: myPractices
        }
    },
    qualifiedGrades: function(grades) {
        var qualifiedGrades = [];
        grades.forEach(function(grade) {
            if(grade.score > 60) {
                qualifiedGrades.push(grade);
            }
        });

        return qualifiedGrades;
    },
    removeUnreplaceablePractices: function(gradesWithPracticeDetail) {
        var gradesWithPracticeDetailOfAllReplaceable = gradesWithPracticeDetail;

        gradesWithPracticeDetailOfAllReplaceable.forEach(function(grade, index) {
            if(!grade.replaceableCourses) {
                gradesWithPracticeDetailOfAllReplaceable.splice(index, 1);
            }
        });

        return gradesWithPracticeDetailOfAllReplaceable;
    }
};

