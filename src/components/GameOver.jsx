import './GameOver.css'

function GameOver({ retry, score }) {
    return (
        <div>
            <h1>GameOver</h1>
            <p className='pGameOver'>Sua pontuação foi <strong>{score}</strong></p>
            <button onClick={retry}>Recomeçar</button>
        </div>
    )
}

export default GameOver