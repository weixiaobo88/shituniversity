function Schedule(courseCredits, practiceCredits, achievedCredits, leftCredits, average) {
    this.courseCredits = courseCredits;
    this.practiceCredits = practiceCredits;
    this.achievedCredits = achievedCredits;
    this.leftCredits = leftCredits;
    this.average = average;
}

Schedule.prototype.concat = function () {
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

    var leftCredits =   '离顺利毕业还差学分：\n' +
                        '必修：' + this.leftCredits.compulsory + '\n' +
                        '选修：' + this.leftCredits.elective + '\n';
    var achievedCredits =   '已获得的总学分：\n' +
                            '必修：' + this.achievedCredits.compulsory + '\n' +
                            '选修：' + this.achievedCredits.elective + '\n';

    var average =  '顺利毕业的所有课程平均分基线：' + Baseline.AVERAGE + '\n' +
                    '当前所有课程平均分：' + this.average.currentCourseAverage + '\n';

    var detail =
        title +
        separator +
        courseCreditsDescription +
        separator +
        practiceCreditsDescription +
        separator +
        achievedCredits +
        leftCredits +
        separator +
        average +
        ending;

    return detail;
};

Schedule.prototype.render = function (printer) {
    printer.print(this.concat());
};