import { Component } from 'react';
import {Button} from '@mui/material';

class InitQuiz extends Component {
 
    render = () => {
        const { quiz, nextStep } = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <span style={{ margin: '1em' }}>
                    Your Quiz title is: {quiz.title}.
                </span>
                <span style={{ margin: '1em', fontStyle: 'italic' }}>
                    It consists of {quiz.questions.length} questions.
                </span>
                <Button onClick={nextStep} variant="contained">
                    Start Quiz
                </Button>
            </div>
      )
    }
  }

export default InitQuiz;