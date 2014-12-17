function DisplayPracticeTransformedToCourse() {
    DisplayStrategy.call(this);
}

DisplayPracticeTransformedToCourse.prototype = Object.create(DisplayStrategy.prototype);

DisplayPracticeTransformedToCourse.prototype.constructor = DisplayStrategy;
DisplayPracticeTransformedToCourse.prototype.parent = DisplayStrategy.prototype;

DisplayPracticeTransformedToCourse.prototype.calculate = function(myCourses, myGradesAfterReplace) {
    var courseCredits = Calculator.calculateCourseCredits(myCourses, myGradesAfterReplace).combinedCredits;
    var practiceCredits = Calculator.calculatePracticeCredits(myGradesAfterReplace).replacedCredits;

    var combinedCredits = this.parent.calculate(myGradesAfterReplace);

    return {
        courseCredits: courseCredits,
        practiceCredits: practiceCredits,
        achievedCredits: combinedCredits.achievedCredits,
        leftCredits: combinedCredits.leftCredits,
        average: combinedCredits.average
    };
};
