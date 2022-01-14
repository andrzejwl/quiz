class Answer {
    constructor(text) {
        this.isCorrect = isAnswerStringCorrect(text);
        this.text = this.isCorrect ? trimCorrectAnswer(text) : text;
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
        this.totalCorrect = 0;

        answers.forEach(ans => {
            if (ans.isCorrect)
                this.totalCorrect++;
        });
    }

    evaluate(userAnswers) {
        let correct = 0;
        userAnswers.forEach(ans => {
            correct = ans.isCorrect ? correct+1 : correct-1;
        });
        correct = correct > 0 ? correct : 0;
        return Math.round(correct / this.totalCorrect * 100) / 100; // round to 2 decimal places
    }
}

class Quiz {
    constructor(questions, title='My Quiz') {
        this.title = title;
        this.questions = questions;
        this.maxScore = questions.length;
        this.currentScore = 0;
    }

    submitQuestion(question, userAnswers) {
        this.currentScore += question.evaluate(userAnswers);
    }
}

function isAnswer(text) {
    let pref = text.substring(0, 3);
    return pref.length === 3 && pref[1] === ')';
}

function isAnswerStringCorrect(ans) {
    return ans[2] === 'v';
}

function trimCorrectAnswer(ans) {
    return ans.slice(0,2)+ans.slice(3);
}

export function loadQuizFromTextFile(text) {
    text = text.split(/\r?\n/);

    var questions = []; // store all questions
    var curAnswers = []; // store answers for the currently parsed question
    var curQuestionText = null;  // store the current question's text

    text.forEach(line => {
        if (isAnswer(line)) {
            let ans = new Answer(line); 
            curAnswers.push(ans);
        } else {
            if (curQuestionText) {
                let newQuestion = new Question(curQuestionText, curAnswers);
                questions.push(newQuestion);
                curAnswers = []; 
            }

            curQuestionText = line;
        }
    });

    return new Quiz(questions);
}
