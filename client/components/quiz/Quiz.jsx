/* eslint-disable jsx-quotes */
// Top level container for the Quiz
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import StartGame from './startGame';
import PlayGame from './playGame';
import EndGame from './endGame';
// import { getAICart } from '../../../server/api/aic';

function Quiz() {
  // State Start
  // Old States
  const [wallet, setWallet] = useState(0); // Retrieve Users current bank total
  // Write all Axios res in this Parent then pass them down where needed
  // Should all States be done the same way?

  // New States
  const [startGame, setStartGame] = useState(true); // Start View:  defaults to true
  const [playGame, setPlayGame] = useState(false); // Game View: defaults to false
  const [endGame, setEndGame] = useState(false); // End View: defaults to false
  // State to store retrieved Art Data in
  const [aicArt, setAicArt] = useState([]);
  // State End

  // Axios Requests Start -
  // Re-Use: Function to Retrieve fund total of user's wallet and set wallet state
  function getWallet() {
    axios
      .get('/db/user/')
      .then(({ data }) => {
        setWallet(data.wallet);
      })
      .catch((err) => console.error('Could not GET wallet amount: ', err));
  }

  // Function to retrieve 10 images from AIC & their titles
  // (Make random after just successfully retrieving 10)
  // Will be invoked when User clicks "START?" & pass State data to PlayGame
  function getArt() {
    console.log('getArt invoked');
    // Invoke API req to AIC
    // const results = getAICart();
    // console.log('Client Side Check', results); // Logs Arr of Data from
    // Test Data TBD
    const artData = {
      id: 51116, // Example ID
      title: 'Example',
      imageId: 'ExampleImageId',
      imageUrl: 'https://example.com/image.jpg',
    };
    // Test Data TBD

    // console.log('Quiz gAIC Check: ', gAIC);
    axios
      .post('/db/quizart', artData)
      .then((data) => {
        console.log('AIC Retrieval: Success ', data.data);
        // Save retrieved data to state
        setAicArt(data.data);
        console.log('Quiz.jsx - Verify State', aicArt);
      })
      .catch((err) => console.error('Could not GET AIC Art: ', err));
  }
  // **********
  // Axios Requests End

  // Click Handlers Start
  // Has "START?" been Clicked - pass down to StartGame
  const handleStartClick = () => {
    console.log('Start Was Clicked');
    setStartGame(false);
    setPlayGame(true);
    getArt();
  };

  // TEMP handler to pass down to PlayGame for testing End Game View swapping
  // Once 5 rounds have passed, view will automatically swap to END GAME view
  const handlePlayClick = () => {
    setPlayGame(false);
    // Temp making EndGame visible on Start click for Testing
    setEndGame(true);
  };

  // Has "END GAME" been Clicked - pass down to EndGame
  const handleEndClick = () => {
    setEndGame(false);
    setStartGame(true);
  };
  // Click Handlers End

  // Initial render useEffect
  useEffect(() => {
    getWallet();
  }, []);

  // useEffect executed every time user finishes a game
  // and wallet funds reflect purchase
  useEffect(() => {
    console.log('Quiz.jsx Use Effect Placeholder');
  }, []);

  // Include ternary to control which view User is shown:
  // Start, Game, End
  return (
    <Container style={{ maxWidth: '1000px' }}>
      <Row className='d-flex align-items-center'>
        <Col>
          <div className='d-flex'>
            <h3>Wallet:</h3>
            <h3 className='ms-2'>{wallet ? `$${wallet}` : '$0.00'}</h3>
            <p style={{ marginLeft: '40px' }}>
              Placeholder to display Users Previous High Score
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        {startGame && (
          <StartGame onStartClick={handleStartClick} getArt={getArt} />
        )}
        {/* PG button is Temporary  */}
        {playGame && <PlayGame getArt={getArt} onPlayClick={handlePlayClick} />}
        {endGame && <EndGame onEndClick={handleEndClick} />}
      </Row>
    </Container>
  );
}

export default Quiz;
