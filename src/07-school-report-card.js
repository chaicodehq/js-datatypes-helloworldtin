/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  if (student === null || typeof student !== "object") return null;
  if (typeof student.name !== "string") return null;

  const name = student.name.trim();
  if (!name) return null;

  const marks = student.marks;
  if (
    marks === null ||
    typeof marks !== "object" ||
    Object.keys(marks).length == 0
  )
    return null;

  const marks_array = Object.values(marks);
  const subject_array = Object.keys(marks);

  for (const mark of marks_array) {
    const condtion = mark >= 0 && mark <= 100;
    if (!condtion) return null;
  }

  const totalMarks = marks_array.reduce((prev, curr) => prev + curr, 0);

  const temp_precentage = (totalMarks / (subject_array.length * 100)) * 100;
  const percentage = parseFloat(temp_precentage.toFixed(2));

  let grade = "";

  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 40) {
    grade = "D";
  } else {
    grade = "F";
  }

  const marks_entries = Object.entries(marks);

  let highestSubject = marks_entries[0][0];
  let highestSubjectMarks = marks_entries[0][1];

  for (let i = 0; i < marks_entries.length; i++) {
    if (marks_entries[i][1] > highestSubjectMarks) {
      highestSubject = marks_entries[i][0];
      highestSubjectMarks = marks_entries[i][1];
    }
  }
  let lowestSubject = marks_entries[0][0];
  let lowestSubjectMarks = marks_entries[0][1];

  for (let i = 0; i < marks_entries.length; i++) {
    if (marks_entries[i][1] < lowestSubjectMarks) {
      lowestSubject = marks_entries[i][0];
      lowestSubjectMarks = marks_entries[i][1];
    }
  }

  const passedSubjectsentrie = marks_entries.filter((item) => item[1] >= 40);
  const failedSubjectsentries = marks_entries.filter((item) => item[1] < 40);

  const passedSubjects = passedSubjectsentrie.map((el) => el[0]);
  const failedSubjects = failedSubjectsentries.map((el) => el[0]);
  const subjectCount = marks_entries.length;

  const res = {
    name: name,
    totalMarks: totalMarks,
    percentage: percentage,
    grade: grade,
    highestSubject: highestSubject,
    lowestSubject: lowestSubject,
    passedSubjects: passedSubjects,
    failedSubjects: failedSubjects,
    subjectCount: subjectCount,
  };

  return res;
}
