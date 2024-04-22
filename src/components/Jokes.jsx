import React, { useState } from 'react';
import '../styles.css';

function RandomNumber() {

}

function Jokes() {
    const [pun, setPun] = useState('');
    const [allPuns, setAllPuns] = useState([]);
    const [showAllPuns, setShowAllPuns] = useState(false);

    const generatePun = () => {
        fetch('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch pun');
                }
                return response.json();
            })
            .then(data => {
                setPun(data.joke);
            })
            .catch(error => {
                console.error('Error fetching pun:', error);
                setPun('Oops! Failed to fetch pun.');
            });
    };

    const displayAllPuns = () => {
        const randomNumber = Math.floor(Math.random() * 38) + 1;
        fetch('https://icanhazdadjoke.com/search', {
            headers: { Accept: 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch puns');
                }
                return response.json();
            })
            .then(data => {
                setAllPuns(data.results.map(result => result.joke));
                setShowAllPuns(true);
            })
            .catch(error => {
                console.error('Error fetching puns:', error);
                setAllPuns(['Oops! Failed to fetch puns.']);
            });
    };

    const toggleShowAllPuns = () => {
        setShowAllPuns(!showAllPuns);
    };

    return (
        <div className="container">
            <div className="box">
                <h1>Joke Box</h1>
                <button onClick={generatePun}>Generate Pun</button>
                {pun && <p>{pun}</p>}

                {showAllPuns ? (
                    <>
                        <button onClick={toggleShowAllPuns}>Hide More Puns</button>
                        <ol>
                            {allPuns.map((pun, index) => (
                                <li key={index}>{pun}</li>
                            ))}
                        </ol>
                    </>
                ) : <button onClick={displayAllPuns}>Show More Puns</button>}
            </div>
        </div>
    );
}

export default Jokes;
