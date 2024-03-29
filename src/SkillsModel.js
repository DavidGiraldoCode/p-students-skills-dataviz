export default {
    name: "David",
    students: [],
    modelReady: false,
    chordMatrix: [[]],
    skillsRanking: [],
    chordScopeChange: false,
    skillScopeChange: false,
    currentChord: {},
    currentPerson: null,

    setDataSet(datSet) {
        this.students = datSet.students;
        this.modelReady = true;
    },

    getAllAbouts() {
        function collectAboutsCB(student) {
            return `${student.about.interest} ${student.about.expectation} ${student.about.relevant_exp} ${student.about.futureProjections}`;
        }
        const allAboutsArray = this.students.map(collectAboutsCB);
        const allAboutsString = "".concat(...allAboutsArray);
        return allAboutsString;
    },

    getAllExpectations() {
        function collectExpectationsCB(student) {
            return student.about.expectation;
        }
        const allExpectationsArray = this.students.map(collectExpectationsCB);
        const allExpectationsString = "".concat(...allExpectationsArray);
        return allExpectationsString;
    },

    getAllFutureProjections() {
        function collectFutureProjectionsCB(student) {
            return student.about.futureProjections;
        }
        const allFutureProjectionsArray = this.students.map(collectFutureProjectionsCB);
        const allFutureProjectionsString = "".concat(...allFutureProjectionsArray);
        return allFutureProjectionsString;
    },

    getStudents() {
        return this.modelReady ? this.students : null;
    }
}