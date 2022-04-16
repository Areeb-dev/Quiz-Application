import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import questions from '../questions.json'
import Button from '@mui/material/Button';
import ProgreesBar from "./progreesBar/QuesProgreesBar"
import ScoreProgreesBar from "./progreesBar/ScoreProgressBar"
import RemainingScoreBar from './progreesBar/RemainingScoreBar';
import WrongRemainingQuesBar from './progreesBar/WrongRemaningQuesBar';

//mui Style Function
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const QuesAndAns = () => {
  const [currQueIndex, setCurrQueIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0)
  const [nextBtn, setNextBtn] = useState(false)
  const [disable, setDisable] = useState(false);
  //Wo ques jis k answer user na Sahe dya hain
  const [sucessQuesResult, setSucessQuesResult] = useState(0)
  // Wo ques jis k answer user ho sakta ha Sahe dada
  const [remainingQuesResult, setRemainingQuesResult] = useState(0)
  //Wo ques jis k answer user ho sakta ha galat dada
  const [wrongRemainingQuesResult, setWrongRemainingQuesResult] = useState(0)

  function checkAnswer(userSelectedOpt) {
    setNextBtn(true)
    setDisable(true)
    //check userSelected Ans And Right Ans
    if (userSelectedOpt === questions[currQueIndex].correct_answer) {
      // if ans is correct add 1 in score ans show msg answer correct or Incorrect
      setScore(score + 1)
      setMessage("Correct!")
    } else {
      setMessage("Sorry!")
    }
  }

  function nextQuestion(e) {
    e.preventDefault()
    setDisable(false)
    //next ques btn disable after show next ques
    setNextBtn(false)
    //sucess Ques result percentage A/C to score / current ques  
    let sucessResult = Math.round((score / (currQueIndex + 1)) * 100)
    setSucessQuesResult(sucessResult)

    //REMAINING SUCCESS QUESTION RESULT PERCENTAGE

    //first get total Question
    let totalQuestion = questions.length
    // //second get remaning Ques
    let remainingQues = (totalQuestion - (currQueIndex + 1))
    console.log("remainingQues=>" + remainingQues)

    // then calculate percentage
    let remainingResult = Math.round(((remainingQues + score) / totalQuestion) * 100)
    setRemainingQuesResult(remainingResult)

    //REMAINING Wrong QUESTION RESULT PERCENTAGE
    let WrongRemQues = Math.round(((remainingQues - score) / totalQuestion) * 100)
    setWrongRemainingQuesResult(WrongRemQues)

    //check total ques length is < than currQueIndex
    if (currQueIndex < totalQuestion - 1) {
      setCurrQueIndex(currQueIndex + 1);
      //remove message after click on next ques
      setMessage('')
    } else {
      alert("test end");
    }

  }

  let currentQuestion = questions[currQueIndex];
  return (
    <>
      {/* ques Progress Bar */}
      <Box sx={{ width: '100%' }}>

        <ProgreesBar val={(currQueIndex + 1) * 5} />
        <h3>{`Question: ${currQueIndex + 1} of ${questions.length}`}</h3>
        {currentQuestion.category}
        <h4>{` ${currentQuestion.question}?`}</h4>
        {
          currentQuestion.incorrect_answers.map((option, index) => {
            return (
              <Grid key={index} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid key={index} item xs={15} sx={{ mt: 1, }}>
                  <Button sx={{ width: 200, textAlign: 'center' }} disabled={disable} onClick={() => checkAnswer(option)} variant="outlined" >{option} </Button>
                </Grid>
              </ Grid>
            )
          })
        }
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={15} sx={{ mt: 1, }}>
            <Button sx={{ width: 200, textAlign: 'center' }} variant="outlined" disabled={disable} onClick={() => checkAnswer(currentQuestion.correct_answer)}>{currentQuestion.correct_answer}</Button>
          </Grid>
        </ Grid>
        {/* Ques Correct or Incorrect Message*/}
        <p>{message}</p>
        {/* Next QUES BTN */}
        {nextBtn ? <Button sx={{ mt: 1 }} variant="outlined" onClick={nextQuestion}>Next Question</Button> : ""}

        {/* sucess Ques Result  Progress Bar */}
        <ScoreProgreesBar val={sucessQuesResult} />
        {/* Remaning Ques Result Progress Bar */}
        {/* <RemainingScoreBar val={remainingQuesResult} /> */}
        {/* If remaining Ques Wrong */}
        <WrongRemainingQuesBar val={wrongRemainingQuesResult} />
      </Box>

    </>

  )
}
export default QuesAndAns;