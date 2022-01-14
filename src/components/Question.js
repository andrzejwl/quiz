import { Component } from 'react';
import { Button, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


function ValidIcon(props) {
    const isCorrect = props.isCorrect;
    
    if (isCorrect) 
        return <CheckIcon className={"correct"} />
    else 
        return <CloseIcon className={"incorrect"} />
}


class Question extends Component {
    state = {
        checked: Array(10).fill(false),
        verify: false,
    }
    
    constructor(props) {
        super(props);
        const { questionNumber, quiz } = this.props;
        const question = quiz.questions[questionNumber];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQ = this.handleNextQ.bind(this);
        this.setState({
            checked: Array(question.answers.length).fill(false),
        });
    }

    handleCheckChange(idx) {
        const {checked} = this.state;
        checked[idx] = !checked[idx];
        this.setState({checked: checked});
    }

    handleSubmit() {
        const { questionNumber, quiz, updateQuiz } = this.props;
        const { checked } = this.state;
        let userAnswers = [];
        
        const question = quiz.questions[questionNumber];

        question.answers.forEach((ans, idx) => {
            if (checked[idx])
                userAnswers.push(ans);
        });

        const score = question.evaluate(userAnswers);
        quiz.currentScore += score;
        updateQuiz(quiz);
        this.setState({
            verify: true,
        });
    }

    handleNextQ() {
        const { questionNumber, quiz, nextQuestion } = this.props;
        const question = quiz.questions[questionNumber];

        this.setState({
            checked: Array(question.answers.length).fill(false),
            verify: false,
        });

        nextQuestion();
    }

    render = () => {
        const { questionNumber, quiz } = this.props;
        const question = quiz.questions[questionNumber];
        const {checked, verify } = this.state;

        if (verify) {
            return (
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '2em' }}>
                   {question.text}
                </div>
                    {question.answers.map((ans, idx) => {
                        const cname = ans.isCorrect ? 'correct' : 'incorrect';
                        const userCorrect = checked[idx] === ans.isCorrect;

                        return (
                            <div key={idx} className={cname} style={{ width: '100%', display: 'flex', justifyContent: 'space-between',  marginBottom: '1em' }}>
                                {ans.text} {<ValidIcon isCorrect={userCorrect} />}
                            </div>
                        )
                    })}
                    <Button onClick={this.handleNextQ} variant='contained'>
                        Next Question
                    </Button>
                </div>
            )
        }

        return (
            <div>
                <div style={{ fontWeight: 'bold', marginBottom: '2em' }}>
                   {question.text}
                </div>
                {question.answers.map((ans, idx) => {
                    return (
                        <div key={idx} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                            {ans.text}
                            <Checkbox checked={checked[idx]} onChange={() => this.handleCheckChange(idx)} />
                        </div>
                    )
                })}
                <Button onClick={this.handleSubmit} variant='contained'>
                    Verify
                </Button>
            </div>
      )
    }
  }

export default Question;