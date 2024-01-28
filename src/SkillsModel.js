import dataset from "./students-dataset.json"

export default {
    name: "David",
    students: dataset.students,

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
        return this.students;
    }
}