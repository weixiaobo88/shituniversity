var ReplacementStrategy = {
    sequencePriority: function(replaceablePractices, gradesOfCourseCode) {

    },
    scorePriority: function(replaceablePractices, gradesOfCourseCode) {
        var gradesAfterReplacement = gradesOfCourseCode;
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

                    gradesAfterReplacement.forEach(function(grade) {
                        if(grade.course === practice.replaceableCourses.code) {
                            grade.score = practiceScore;
                        }
                    });

                    practicesCantReplace.splice(practiceIndex, 1);
                }
            }
        });

        return {
            gradesAfterReplacement: gradesAfterReplacement,
            myReplacedCoursesByReplaceablePractices: myReplacedCourses,
            practicesCantReplace: practicesCantReplace
        }
    }
};

