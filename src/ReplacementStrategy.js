var ReplacementStrategy = {
    sequencePriority: function(replaceablePractices, gradesOfCourseCode) {

    },
    scorePriority: function(replaceablePractices, myCourses) {
        var myCoursesAfterReplace = myCourses;
        var myReplacedCourses = [];
        var practicesCantReplace = replaceablePractices;

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

                    practicesCantReplace.splice(practiceIndex, 1);
                }
            }
        });

        return {
            myCoursesAfterReplace: myCoursesAfterReplace,
            myReplacedCoursesByReplaceablePractices: myReplacedCourses,
            practicesCantReplace: practicesCantReplace
        }
    }
};

