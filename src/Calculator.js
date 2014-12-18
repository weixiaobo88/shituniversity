var Calculator = {
    calculateCourseCredits: function (myCourses, myGradesAfterReplace, gradeRules) {
        var myIncreasedCoursesByReplaceablePractices = myGradesAfterReplace.myIncreasedCoursesByReplaceablePractices;

        var originalCourseCredits = gradeRules.calculateCredits(myCourses);
        var increasedCredits = gradeRules.calculateCredits(myIncreasedCoursesByReplaceablePractices);

        var combinedCredits = {
            compulsory: originalCourseCredits.compulsory + increasedCredits.compulsory,
            elective: originalCourseCredits.elective + increasedCredits.elective
        };

        return {
            combinedCredits: combinedCredits,
            originalCourseCredits: originalCourseCredits
        };
    },
    calculatePracticeCredits: function (myGradesAfterReplace, gradeRules) {
        var myReplacedCoursesByReplaceablePractices = myGradesAfterReplace.myReplacedCoursesByReplaceablePractices;
        var myIncreasedCoursesByReplaceablePractices = myGradesAfterReplace.myIncreasedCoursesByReplaceablePractices;

        var replacedCredits = gradeRules.calculateCredits(myReplacedCoursesByReplaceablePractices);
        var increasedCredits = gradeRules.calculateCredits(myIncreasedCoursesByReplaceablePractices);

        var combinedCredits = {
            compulsory: replacedCredits.compulsory + increasedCredits.compulsory,
            elective: replacedCredits.elective + increasedCredits.elective
        };

        return {
            replacedCredits: replacedCredits,
            increasedCredits: increasedCredits,
            combinedCredits: combinedCredits
        }
    },
    calculateAchievedCredits: function (myGradesAfterReplace) {
        var myCoursesAfterReplaceAndIncrease = myGradesAfterReplace.myCoursesAfterReplaceAndIncrease;

        var compulsory = 0;
        var elective = 0;

        myCoursesAfterReplaceAndIncrease.forEach(function (course) {
            compulsory += (course.type === CourseType.COMPULSORY ? course.credit : 0);
            elective += (course.type === CourseType.ELECTIVE ? course.credit : 0);
        });

        return {
            compulsory: compulsory,
            elective: elective
        };
    },
    calculateLeftCredits: function (achievedCredits) {
        return {
            compulsory: Baseline.COMPULSORY - achievedCredits.compulsory,
            elective: Baseline.ELECTIVE - achievedCredits.elective
        };
    },
    calculateAverage: function (myGradesAfterReplace) {
        var myCoursesAfterReplace = myGradesAfterReplace.myCoursesAfterReplaceAndIncrease;
        var sum = 0;

        var length = myCoursesAfterReplace.length;
        myCoursesAfterReplace.forEach(function (grade) {
            sum += grade.score;
        });

        return {
            baseline: Baseline.AVERAGE,
            currentCourseAverage: (sum / length).toFixed(1)
        };
    }
};
