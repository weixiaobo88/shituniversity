var DataConverter = {
    transformData: function(grades) {
        var gradesObj = [];

        grades.forEach(function(grade) {
            var course = grade.split(':')[0];
            var score = parseInt(grade.split(':')[1]);
            gradesObj.push(new Grade(course, score))
        });

        return gradesObj;
    }
};
