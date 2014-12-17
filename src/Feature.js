var Feature = {

    getMyGradesOfCourse: function(grades, allCourses) {
        var gradesOfCourseCode = [];
        var myCourses = [];

        grades.forEach(function (grade) {
            allCourses.forEach(function (course) {
                if (course.code === grade.course) {
                    gradesOfCourseCode.push(grade);
                    var newCourse = course;
                    newCourse.score = grade.score;
                    myCourses.push(newCourse);
                }
            })
        });

        return {
            gradesOfCourseCode: gradesOfCourseCode,
            myCourses: myCourses
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
    },
    calculatorCredits: function (courses) {
        var credits = {
            compulsory: 0,
            elective: 0
        };

        courses.forEach(function (course) {
            credits.compulsory += (course.type === CourseType.COMPULSORY ? course.credit : 0);
            credits.elective += (course.type === CourseType.ELECTIVE ? course.credit : 0);
        });

        return credits;
    }
};

