import { Component } from 'react';
import { Button } from '@mui/material';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.handleTryAgain = this.handleTryAgain.bind(this);
        this.handleStartNew = this.handleStartNew.bind(this);
    }
    handleTryAgain() {
        const { tryAgain } = this.props;
        tryAgain();
    }

    handleStartNew() {
        const { startNew } = this.props;
        startNew();
    }

    render = () => {
        const { quiz } = this.props;
        
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ marginBottom: '1em' }}>
                    Your score is <b>{quiz.currentScore}/{quiz.maxScore}</b>.
                </span>
                <span>
                    <Button variant='contained' style={{ margin: '1em' }} onClick={this.handleTryAgain}>
                        Try Again
                    </Button>
                    or
                    <Button variant='contained' style={{ margin: '1em' }} onClick={this.handleStartNew}>
                        Start a new quiz
                    </Button>
                </span>
            </div>
      )
    }
  }

export default Summary;