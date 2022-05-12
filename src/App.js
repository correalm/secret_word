// CSS
import './App.css';

// React
import { useCallback, useState, useEffect } from 'react';

import { wordsList } from './data/words.js'

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words, setWords] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [chances, setChances] = useState(3)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = () => {
    // pick random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category };
  }

  // start
  const startGame = () => {

    // pick word and pick category
    const { word, category } = pickWordAndCategory()
    console.log(word, category)

    // create an array of letters
    const letters = [...word.toLowerCase()]

    // fill states
    setPickedCategory(category)
    setLetters(letters)
    setGameStage(stages[1].name)
  }

  // process letter
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((atual) => [...atual, normalizedLetter])
    } else {
      setWrongLetters((atual) => [...atual, normalizedLetter])
      setChances(chances - 1)
      console.log(chances)
    }
  }

  function teste() {
    guessedLetters([])
    setGameStage(stages[1].name)
    setWrongLetters([])
  }

  // WINN
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((atual) => atual += 100)
      setGuessedLetters([])
      setWrongLetters([])
      setChances(3)

      startGame()
    }
  }, [guessedLetters])

  useEffect(() => {
    if (chances === 0) {
      setWrongLetters([])
      setGuessedLetters([])
      setGameStage(stages[2].name)
    }
  }, [chances])

  const retry = () => {
    setScore(0)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} stage={stages[1].name} />}
      {gameStage === 'game' && <Game

        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        chances={chances}
        score={score}

      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
