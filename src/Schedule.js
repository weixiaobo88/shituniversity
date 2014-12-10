function Schedule(courseCredits, practiceCredits, leftCredits, averageScore) {
    this.courseCredits = courseCredits;
    this.practiceCredits = practiceCredits;
    this.leftCredits = leftCredits;
    this.averageScore = averageScore;
}

Schedule.prototype.print = function () {
    var title = '\n***<南哈蒙理工大学>学分明细***\n';
    var ending = '**********************';
    var separator = '----------------------\n';
    var courseCreditsDescription =  '已修课程学分：\n' +
                                    '必修：' + this.courseCredits.compulsory + '\n' +
                                    '选修：' + this.courseCredits.elective + '\n';

    var practiceCreditsDescription = '需要参加社会实践\n';
    if(this.practiceCredits != undefined) {
        practiceCreditsDescription =    '社会实践：\n' +
                                        '已折算成必修课的学分：' + this.practiceCredits.compulsory + '\n' +
                                        '已折算成选修课的学分：' + this.practiceCredits.elective + '\n';
    }

    var detail =
        title +
        separator +
        courseCreditsDescription +
        separator +
        practiceCreditsDescription +
        separator +
        '已获得的总学分：2\n' +
        '离顺利毕业还差学分：\n' +
        '必修：26\n' +
        '选修：20\n' +
        separator +
        '顺利毕业的所有课程平均分基线：65\n' +
        '当前所有课程平均分：\n' +
        ending;

    console.log(detail);
};
