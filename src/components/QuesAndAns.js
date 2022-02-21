import React, { useState } from 'react';
import questions from '../questions.json'
import Button from '@mui/material/Button';
import { FormControl, } from '@mui/material';
import Stack from '@mui/material/Stack';
import ProgreesBar from "./progreesBar/QuesProgreesBar"
import ScoreProgreesBar from "./progreesBar/ScoreProgressBar"

function QuesAndAns() {

  const [currQueIndex, setCurrQueIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0)
  const [submitBtn, setSubmitBtn] = useState(false)
  const [disable, setDisable] = React.useState(false);
  const [sucessBarResult, setSucessBarResult] = useState(0)
  function checkAnswer(userSelectedOpt) {
    setSubmitBtn(true)
    setDisable(true)
    //check userSelected Ans And Right Ans
    if (userSelectedOpt === questions[currQueIndex].correct_answer) {
      // if ans is correct add 5 in score
      setScore(score + 5)
      setMessage("Correct")
    } else {
      setMessage("Incorrect")
    }
  }

  function nextQuestion(e) {
    // //sucess bar result score / current Ques 
    setSucessBarResult(score / (currQueIndex + 1))
    e.preventDefault()
    setDisable(false)
    setSubmitBtn(false)
    //check total ques length is > than currQueIndex
    if (currQueIndex < questions.length - 1) {
      setCurrQueIndex(currQueIndex + 1);
      //remove message after click on next ques
      setMessage('')

    } else {
      alert("test end");
    }

  }

  let currentQuestion = questions[currQueIndex]
  return (
    <>
      <ProgreesBar val={currQueIndex * 5} />
      <FormControl>
        <p>{`Question: ${currQueIndex + 1} of ${questions.length}`}</p>
        <p>{` ${currentQuestion.question}`}</p>
        {
          currentQuestion.incorrect_answers.map((option, index) => {
            return (
              <Stack key={index} sx={{ mt: 1 }} spacing={2} direction="row"> <Button disabled={disable} onClick={() => checkAnswer(option)} variant="contained" >{option} </Button>
              </Stack>
            )
          })
        }

        <Stack sx={{ mt: 1 }} spacing={8} direction="row">
          <Button variant="contained" disabled={disable} onClick={() => checkAnswer(currentQuestion.correct_answer)}>{currentQuestion.correct_answer}</Button>
        </Stack>
        <p>{message}</p>
        {submitBtn ? <Button sx={{ mt: 1 }} variant="outlined" onClick={nextQuestion}>Next Question</Button> : ""}
      </FormControl>
      <ScoreProgreesBar val={sucessBarResult} />
    </>

  )
}
export default QuesAndAns;