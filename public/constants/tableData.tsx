const questionsTableHead = ['id', 'question', 'rightAnswer', 'trueFalseQuestion', 'possibleAnswers', 'createdAt'];


const questionsTableData = (data: Array<any>) => data.map((question) => [
    question.id || '',
    question.question || '',
    question.rightAnswer || '',
    question.trueFalseQuestion || '',
    question.possibleAnswers || '',
    question.createdAt || ''
]);