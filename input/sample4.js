function calculateGrade(scores) {
    let total = 0;
    let count = 0;

    for (let score of scores) {
        if (score >= 0 && score <= 100) {
            total += score;
            count++;
        }
    }

    if (count === 0) {
        return "No valid scores";
    }

    const average = total / count;

    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
}