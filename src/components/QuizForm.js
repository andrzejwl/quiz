import { Component } from 'react';
import Container from '@mui/material/Container';
import { makeStyles, withStyles } from '@mui/styles';

import LoadQuiz from './LoadQuiz';
import InitQuiz from './InitQuiz';
import Question from './Question';
import Summary from './Summary';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
});

class QuizForm extends Component {
    state = {
        step: 0,
        currentQuestion: 0,
        quiz: false,
    }

    updateQuiz(updQuiz) {
        this.setState({
            quiz: updQuiz,
        });
    }
    
    nextStep() {
        const { step } = this.state; 
        this.setState({
            step: step+1,
        });
    }

    tryAgain() {
        var { quiz } = this.state;
        quiz.currentScore = 0;
        this.setState({
            step: 1,
            quiz: quiz,
            currentQuestion: 0,
        });
    }

    startNew() {
        this.setState({
            step: 0,
            quiz: false,
            currentQuestion: 0,
        });
    }

    nextQuestion() {
        const { currentQuestion, quiz } = this.state;

        if (currentQuestion+1 === quiz.questions.length) {
            this.setState({
                currentQuestion: 0,
            });
            this.nextStep();
        } else {
            this.setState({
                currentQuestion: currentQuestion+1,
            });
        }
    }

    render() { 
        const { step, quiz, currentQuestion } = this.state;
        const { classes } = this.props;

        switch (step) {
            case 0:
                return (
                    <Container maxWidth="sm" className={classes.root}>   
                        <LoadQuiz updateQuiz={this.updateQuiz.bind(this)} nextStep={this.nextStep.bind(this)} />
                    </Container>
                )
            case 1:
                return (
                    <Container maxWidth="sm" className={classes.root}>
                        <InitQuiz quiz={quiz} nextStep={this.nextStep.bind(this)} />                        
                    </Container>
                )
            case 2:
                return (
                    <Container maxWidth="sm" className={classes.root}>
                        <Question 
                            questionNumber={currentQuestion} 
                            quiz={quiz} 
                            updateQuiz={this.updateQuiz.bind(this)} 
                            nextQuestion={this.nextQuestion.bind(this)}
                        />
                    </Container>
                )
            case 3:
                return (
                    <Container maxWidth="sm" className={classes.root}>
                        <Summary 
                            quiz={quiz} 
                            tryAgain={this.tryAgain.bind(this)}
                            startNew={this.startNew.bind(this)}
                        />
                    </Container>
                )
            default:
                return (
                    <h1>Looks like something went wrong...</h1>
                )
            
        }
    }
}

export default withStyles(useStyles)(QuizForm);
