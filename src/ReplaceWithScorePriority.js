function ReplaceWithScorePriority() {
    ReplaceStrategy.call(this);
}

ReplaceWithScorePriority.prototype = Object.create(ReplaceStrategy.prototype);
ReplaceWithScorePriority.prototype.constructor = ReplaceStrategy;
ReplaceWithScorePriority.prototype.parent = ReplaceStrategy.prototype;

ReplaceWithScorePriority.prototype.replace = function (replaceablePractices, myCoursesBeforeReplace) {
    var myCoursesAfterReplace = Object.create(myCoursesBeforeReplace);
    var myReplacedCourses = [];
    var myPracticesCantReplace = Object.create(replaceablePractices);
    var myIncreasedCoursesByReplaceablePractices = [];

    replaceablePractices.forEach(function (practice, practiceIndex) {
        var practiceScore = practice.score;

        myCoursesAfterReplace.forEach(function (course) {
            if (course.code === practice.replaceableCourses.code) {
                if(practiceScore > course.score) {
                    Object.create(practice.replaceableCourses);
                    var newCourse = Object.create(course);
                    newCourse.score = practiceScore;
                    myReplacedCourses.push(newCourse);
                    course.score = practiceScore;
                    myPracticesCantReplace.splice(practiceIndex, 1);
                }
            }
        });
    });

    var myCoursesAfterReplaceAndIncrease = Object.create(myCoursesAfterReplace);
    myPracticesCantReplace.forEach(function (practice) {
        var newCourse = Object.create(practice.replaceableCourses);
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


