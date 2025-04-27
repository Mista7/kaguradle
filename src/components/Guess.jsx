import characterInfo from "../characterInfo.json";
import { useState, useEffect } from "react";
import "./guess.css";

const characters = Object.keys(characterInfo); // All character names
const correctChar = characters[Math.floor(Math.random() * characters.length)];
console.log(correctChar);
export default function Guess({ guessList }) {
    const guessContainer = document.querySelector("#guessContainer");
    const [guessElements, setGuessElements] = useState([]);
    console.log(guessList);

    useEffect(() => {
        if (guessList.length > 0) {
            const index = guessList.length - 1;
            const latestGuess = guessList[index];
            const guessInfo = characterInfo[latestGuess]; //Gets information of the latest guess

            const correctAns = characterInfo[correctChar]; //Gets object for correct character

            console.log("Guess", guessInfo);
            console.log("correct", correctChar);
            console.log(guessInfo.gender, correctAns.gender);

            const classToggle = {
                name: guessInfo.name == correctAns.name,
                gender: guessInfo.gender == correctAns.gender,
                age: guessInfo.age == correctAns.age,
                eyes: guessInfo.eyes === correctAns.eyes,
                hair: guessInfo.hair == correctAns.hair,
                alliance: guessInfo.alliance == correctAns.alliance,
                firstArc: guessInfo.firstArc == correctAns.firstArc,
            };

            console.log(classToggle);
            const latestElement = (
                <ul
                    key={latestGuess}
                    className="guess flex flex-row justify-between p-0 m-0 gap-5"
                >
                    <div className="img clues">
                        <img src={guessInfo.img} alt="nig" />
                    </div>
                    <div className={`name clues ${classToggle.name}`}>
                        {guessInfo.name}
                    </div>
                    <div className={`gender clues ${classToggle.gender}`}>
                        {guessInfo.gender}
                    </div>
                    <div className={`age clues ${classToggle.age}`}>
                        {guessInfo.age}
                    </div>
                    <div className={`eyes clues ${classToggle.eyes}`}>
                        {guessInfo.eyes}
                    </div>
                    <div className={`hair clues ${classToggle.hair}`}>
                        {guessInfo.hair}
                    </div>
                    <div className={`alliance clues ${classToggle.alliance}`}>
                        {Array.isArray(guessInfo.alliance)
                            ? guessInfo.alliance.join(", ")
                            : guessInfo.alliance}
                    </div>
                    <div className={`firstArc clues ${classToggle.firstArc}`}>
                        {guessInfo.firstArc}
                    </div>
                </ul>
            );

            setGuessElements((prevElements) => [
                latestElement,
                ...prevElements,
            ]);
        }
    }, [guessList]);

    return <>{guessElements}</>;
}
