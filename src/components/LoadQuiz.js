import { Component } from 'react';
import { loadQuizFromTextFile } from '../fileHandling';
import { Button, TextField } from '@mui/material';


function LoadedFileName(props) {
  const filename = props.filename;

  if (filename === '') {
    return (
      <span>No file has been loaded yet.</span>
    )
  } else {
    return (
      <span>{filename}</span>
    )
  }
}

class LoadQuiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'New Quiz',
      quiz: null,
      filename: '',
    };
  }

  showFile = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = async (e) => { 
      let text = (e.target.result);

      let quiz = loadQuizFromTextFile(text);
      this.setState({
        quiz: quiz,
      });
    };
  
    this.setState({
      filename: e.target.files[0].name,
    });
    
    reader.readAsText(e.target.files[0]);
  }

  handleNameChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleQuizStart() {
    const { updateQuiz, nextStep } = this.props;
    const {quiz, title} = this.state;
    
    if (quiz && title) {
      quiz.title = title;
      updateQuiz(quiz);
      nextStep();
    }
  }

  render = () => {
      const { title, filename } = this.state;

      return (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              variant="contained"
              component="label"
              style={{ margin: '2em', }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => this.showFile(e)}
              />
            </Button>
            {<LoadedFileName filename={filename} />}
            <TextField 
              label="Quiz Name" 
              variant="outlined" 
              defaultValue={title}
              onChange={(e) => this.handleNameChange(e)}
              inputProps={{ style: { color: 'white', fontFamily: 'fontFamily: `"Roboto", sans-serif'}}}
              style={{
                margin: '2em',
              }}
            />

            <Button onClick={this.handleQuizStart.bind(this)} variant="contained">
              Start Quiz
            </Button>
          </div>
    )
  }
}

export default LoadQuiz;