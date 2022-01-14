import {Quiz, Question, Answer} from './fileHandling';

export function readLocalQuizzes() {
    let quizArrayLocal = localStorage.getItem('quizzes');
    quizArrayLocal = JSON.parse(quizArrayLocal);
    if ((quizArrayLocal) === null)
        return null;
    let quizArray = [];

    quizArrayLocal.forEach(q => {
        let questions = [];
        q.questions.forEach(quest => {
            let ans = [];
            quest.answers.forEach(a => {
                let answerObj = new Answer(a.text, a.isCorrect);
                ans.push(answerObj);    
            });
            questions.push(new Question(quest.text, ans));
        });
        
        quizArray.push(new Quiz(questions, q.title));
    });
    return quizArray;
}

export function saveQuiz(quiz) {
    let quizArray = readLocalQuizzes();
    if (!quizArray)
        quizArray = [];
    quizArray.push(quiz);

    localStorage.setItem('quizzes', JSON.stringify(quizArray));
}
