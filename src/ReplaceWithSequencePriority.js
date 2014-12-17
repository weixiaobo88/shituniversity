function ReplaceWithSequencePriority() {
    ReplaceStrategy.call(this);
}

ReplaceWithSequencePriority.prototype = Object.create(ReplaceStrategy.prototype);
ReplaceWithSequencePriority.prototype.constructor = ReplaceStrategy;
ReplaceWithSequencePriority.prototype.parent = ReplaceStrategy.prototype;

ReplaceWithSequencePriority.prototype.replace = function (replaceablePractices, myCoursesBeforeReplace) {

};
