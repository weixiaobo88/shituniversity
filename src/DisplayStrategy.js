var DisplayStrategy = {
/*
Given 成绩单
课程A：2学分
实践A：可置换课程A
实践B：可置换课程B

备注：
  - 课程A为2学分
  - 课程B为2学分

Then 显示
    |----|第1种|第2种|第3种|第4种|

    已修 |  0  |  2  |  4  |  2  |

    实践 |  4  |  4  |  2  |  4  |

    1.
    2.
    3. practiceTransformedToCourse
    4. practiceNotAddedInCompletedCourse
*/

//  courseCredits, practiceCredits, achievedCredits, leftCredits, average

    /* display3
     已修：实践转化成已修的
     实践：减去替换了的，不减抵课的
     */
    practiceTransformedToCourse: function(myCourses, myGradesAfterReplace) {
        var courseCredits = calculateCourseCredits(myCourses);
        var practiceCredits = calculatePracticeCredits(myGradesAfterReplace);
        var achievedCredits =  calculateAchievedCredits(myGradesAfterReplace);
        var leftCredits = calculateLeftCredits(achievedCredits);
        var average = calculateAverage(myGradesAfterReplace);

        return {
            courseCredits: courseCredits,
            practiceCredits: practiceCredits,
            achievedCredits: achievedCredits,
            leftCredits: leftCredits,
            average: average
        };
    },

    /* display4
     第四种（实践的不加到已修里面去）
     已修：学习了的课程
     实践：实践本身
     */
    practiceNotAddedInCompletedCourse: function(myCourses, myGradesAfterReplace) {
        var courseCredits = calculateCourseCredits(myCourses);
        var practiceCredits = calculatePracticeCredits(myGradesAfterReplace);

        var achievedCredits =  calculateAchievedCredits(myGradesAfterReplace);
        var leftCredits = calculateLeftCredits(achievedCredits);
        var average = calculateAverage(myGradesAfterReplace);

        return {
            courseCredits: courseCredits,
            practiceCredits: practiceCredits,
            achievedCredits: achievedCredits,
            leftCredits: leftCredits,
            average: average
        };
    }

};
function calculateCourseCredits(myCourses) {
    var compulsoryCourseCredits = 0;
    var electiveCourseCredits = 0;

    myCourses.forEach(function(course) {
        compulsoryCourseCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCourseCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return {
        compulsory: compulsoryCourseCredits,
        elective: electiveCourseCredits
    };
};

function calculatePracticeCredits(myGradesAfterReplace) {
    var myReplacedCoursesByReplaceablePractices = myGradesAfterReplace.myReplacedCoursesByReplaceablePractices;
    var myIncreasedCoursesByReplaceablePractices = myGradesAfterReplace.myIncreasedCoursesByReplaceablePractices;

    var replacedCompulsoryCredits = 0;
    var electiveCredits = 0;

    myReplacedCoursesByReplaceablePractices.forEach(function(course) {
        replacedCompulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    myIncreasedCoursesByReplaceablePractices.forEach(function(course) {
        replacedCompulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return {
        compulsory: replacedCompulsoryCredits,
        elective: electiveCredits
    }
};

function calculateAchievedCredits(myGradesAfterReplace) {
    var myCoursesAfterReplace = myGradesAfterReplace.myCoursesAfterReplace;

    var compulsory = 0;
    var elective = 0;

    myCoursesAfterReplace.forEach(function(course) {
        compulsory += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        elective += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return {
        compulsory: compulsory,
        elective: elective
    };
}

function calculateLeftCredits(achievedCredits) {
    return {
        compulsory: Baseline.COMPULSORY - achievedCredits.compulsory,
        elective: Baseline.ELECTIVE - achievedCredits.elective
    };
};

function calculateAverage(myGradesAfterReplace) {
    var myCoursesAfterReplace = myGradesAfterReplace.myCoursesAfterReplace;
    var sum = 0;

    var length = myCoursesAfterReplace.length;
    myCoursesAfterReplace.forEach(function(grade) {
        sum += grade.score;
    });

    return {
        baseline: Baseline.AVERAGE,
        currentCourseAverage: (sum / length).toFixed(1)
    };
};


