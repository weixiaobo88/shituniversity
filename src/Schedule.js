function Schedule(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices = allPractices;
}

Schedule.prototype.print = function () {

    var title = '\n***<南哈蒙理工大学>学分明细***\n';
    var ending = '**********************';
    var separator = '----------------------\n';

    var detail =
            title +
            separator +
            '已修课程学分（不）：\n' +
            '必修：14\n' +
            '选修：2\n' +
            separator +
            '社会实践：\n' +     //如果没参加，显示的是：需要参加社会实践
            '已折算成必修课的学分：4\n' +
            '已折算成选修课的学分：2\n' +
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
