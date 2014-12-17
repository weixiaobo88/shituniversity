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
     已修：实践转化成已修的，指的是抵课的
     实践：减去抵课了的，不减替换的
     */
    practiceTransformedToCourse: function(myCourses, myGradesAfterReplace) {
        var courseCredits = Calculator.calculateCourseCredits(myCourses, myGradesAfterReplace).combinedCredits;
        var practiceCredits = Calculator.calculatePracticeCredits(myGradesAfterReplace).replacedCredits;

        var achievedCredits =  Calculator.calculateAchievedCredits(myGradesAfterReplace);
        var leftCredits = Calculator.calculateLeftCredits(achievedCredits);
        var average = Calculator.calculateAverage(myGradesAfterReplace);

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
        var courseCredits = Calculator.calculateCourseCredits(myCourses, myGradesAfterReplace).originalCourseCredits;
        var practiceCredits = Calculator.calculatePracticeCredits(myGradesAfterReplace).combinedCredits;

        var achievedCredits =  Calculator.calculateAchievedCredits(myGradesAfterReplace);
        var leftCredits = Calculator.calculateLeftCredits(achievedCredits);
        var average = Calculator.calculateAverage(myGradesAfterReplace);

        return {
            courseCredits: courseCredits,
            practiceCredits: practiceCredits,
            achievedCredits: achievedCredits,
            leftCredits: leftCredits,
            average: average
        };
    }
};






