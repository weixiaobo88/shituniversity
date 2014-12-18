function GradeRules() {
}

GradeRules.prototype.getMyGradesOfCourse = function (grades, allCourses) {
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
};

GradeRules.prototype.getMyGradesOfPractices = function (grades, allPractices) {
    var myPractices = [];

    grades.forEach(function (grade) {
        allPractices.forEach(function (practice) {
            if (practice.name === grade.course) {
                var newCourse = Object.create(practice);
                newCourse.score = grade.score;
                myPractices.push(newCourse);
            }
        })
    });

    return myPractices;
};

GradeRules.prototype.qualifiedGrades = function (grades) {
    var qualifiedGrades = [];
    grades.forEach(function (grade) {
        if (grade.score > 60) {
            qualifiedGrades.push(grade);
        }
    });

    return qualifiedGrades;
};

GradeRules.prototype.removeUnreplaceablePractices = function (gradesWithPracticeDetail) {
    var gradesWithPracticeDetailOfAllReplaceable = gradesWithPracticeDetail;

    gradesWithPracticeDetailOfAllReplaceable.forEach(function (grade, index) {
        if (!grade.replaceableCourses) {
            gradesWithPracticeDetailOfAllReplaceable.splice(index, 1);
        }
    });

    return gradesWithPracticeDetailOfAllReplaceable;
};

GradeRules.prototype.calculateCredits = function (courses) {
    var credits = {
        compulsory: 0,
        elective: 0
    };

    courses.forEach(function (course) {
        credits.compulsory += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        credits.elective += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return credits;
};

