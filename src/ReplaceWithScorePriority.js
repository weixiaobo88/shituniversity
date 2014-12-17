function ReplaceWithScorePriority() {
    ReplaceStrategy.call(this);
}

ReplaceWithScorePriority.prototype = Object.create(ReplaceStrategy.prototype);
ReplaceWithScorePriority.prototype.constructor = ReplaceStrategy;
ReplaceWithScorePriority.prototype.parent = ReplaceStrategy.prototype;

ReplaceWithScorePriority.prototype.replace = function (replaceablePractices, myCoursesBeforeReplace) {
    var myCoursesAfterReplace = Object.create(myCoursesBeforeReplace);
    var myReplacedCourses = [];
    var myPracticesCantReplace = replaceablePractices;
    var myIncreasedCoursesByReplaceablePractices = [];

    replaceablePractices.forEach(function (practice, practiceIndex) {
        var practiceScore = practice.score;
        if (typeof(practice.replaceableCourses.score)) {
            var courseScore = practice.replaceableCourses.score;
            //    highScorePriority
            if (practiceScore > courseScore) {
                var newCourse = practice.replaceableCourses;
                newCourse.score = practiceScore;
                myReplacedCourses.push(newCourse);

                myCoursesAfterReplace.forEach(function (course) {
                    if (course.code === practice.replaceableCourses.code) {
                        course.score = practiceScore;
                    }
                });

                myPracticesCantReplace.splice(practiceIndex, 1);
            }
        }
    });

    var myCoursesAfterReplaceAndIncrease = myCoursesAfterReplace;
    myPracticesCantReplace.forEach(function (practice) {
        var newCourse = practice.replaceableCourses;
        newCourse.score = practice.score;
        myIncreasedCoursesByReplaceablePractices.push(newCourse);
        myCoursesAfterReplaceAndIncrease.push(newCourse);
    });

    return {
        myCoursesAfterReplace: myCoursesAfterReplace,
        myCoursesAfterReplaceAndIncrease: myCoursesAfterReplaceAndIncrease,
        myReplacedCoursesByReplaceablePractices: myReplacedCourses,
        practicesCantReplace: myPracticesCantReplace,
        myIncreasedCoursesByReplaceablePractices: myIncreasedCoursesByReplaceablePractices
    }
};


