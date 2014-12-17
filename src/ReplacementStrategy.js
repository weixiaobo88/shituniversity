var ReplacementStrategy = {
    sequencePriority: function(replaceablePractices, myCoursesBeforeReplace) {

    },
    scorePriority: function(replaceablePractices, myCoursesBeforeReplace) {
        var myCoursesAfterReplace = myCoursesBeforeReplace;
        var myReplacedCourses = [];
        var myPracticesCantReplace = replaceablePractices;

        replaceablePractices.forEach(function(practice, practiceIndex) {
            var practiceScore = practice.score;
            if(typeof(practice.replaceableCourses.score)) {
                var courseScore = practice.replaceableCourses.score;
                //    highScorePriority
                if(practiceScore > courseScore) {
                    var newCourse = practice.replaceableCourses;
                    newCourse.score = practiceScore;
                    myReplacedCourses.push(newCourse);

                    myCoursesAfterReplace.forEach(function(course) {
                        if(course.code === practice.replaceableCourses.code) {
                            course.score = practiceScore;
                        }
                    });

                    myPracticesCantReplace.splice(practiceIndex, 1);
                }
            }
        });

        return {
            myCoursesAfterReplace: myCoursesAfterReplace,
            myReplacedCoursesByReplaceablePractices: myReplacedCourses,
            practicesCantReplace: myPracticesCantReplace
        }
    }
};

