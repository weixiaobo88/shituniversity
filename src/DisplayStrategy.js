function DisplayStrategy() {
}

DisplayStrategy.prototype.calculate = function(myGradesAfterReplace) {
    this.achievedCredits =  Calculator.calculateAchievedCredits(myGradesAfterReplace);
    this.leftCredits = Calculator.calculateLeftCredits(this.achievedCredits);
    this.average = Calculator.calculateAverage(myGradesAfterReplace);

    return {
        achievedCredits: this.achievedCredits,
        leftCredits: this.leftCredits,
        average: this.average
    }
};

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

display3 DisplayPracticeTransformedToCourse
 已修：实践转化成已修的，指的是抵课的
 实践：减去抵课了的，不减替换的

display4 DisplayWithPracticeNotAddedInCompletedCourse
 第四种（实践的不加到已修里面去）
 已修：学习了的课程
 实践：实践本身
 */