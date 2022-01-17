# Quiz App

This simple application generates multiple choice quizzes from text files. The loaded quizzes are later stored in the browser's local storage.

The supported format is as follows:

```
Question number 1.
a) First answer.
b)v Second answer.
c)v Third answer.
d) Fourth answer.
Question number 2.
a)v First answer.
b) Second answer.
c) Third answer.
d) Fourth answer.
```

where the correct answers are marked with a `v`. As of right now, each question and the corresponding answers have to be contained in a single line and there may not be empty lines in betweeen. 
