import './Game.css'

import { useState, useRef } from 'react'

function Game({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    chances,
    score
}) {

    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        verifyLetter(letter)
        setLetter('')
        letterInputRef.current.focus()
    }

    return (
        <div className='game'>
            <p className='points'>
                <span>Pontuação: {score}</span>
            </p>

            <h1 className='tip'>Adivinhe a palavra</h1>
            <h3>
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {chances} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
                {/* <span className="letter">A</span>
                <span className="blankSquare"></span> */}
            </div>
            <div className="letterContainer">
                <p>Tente adivinha uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        type="text"
                        name='letter'
                        maxLength="1"
                        required
                        ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas</p>
                {wrongLetters.map((letter, i) => {
                    return <span key={i}>{letter}, </span>
                })}
            </div>

        </div>
    )
}

export default Game
