import characterInfo from "../characterInfo.json";
import { useState, useEffect } from "react";
import "./guess.css";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";

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
            console.log(guessInfo.alliance, correctAns.alliance);

            // const checkAlliance = () => {
            //     if (correctAns.alliance.length === guessInfo.alliance.length) {
            //         for (i = 0; i < correctAns.alliance.length; i++) {
            //             let check = 0;
            //             if (correctAns.alliance[i] === guessInfo.alliance[i]) {
            //                 check++;
            //             }
            //         }
            //         // console.log(check==correctAns.lenght)
            //         return check === correctAns.alliance.length;
            //     } else{return false}
            // };

            const checkAlliance = () => {
                const correctAlliance =
                    correctAns.alliance != "None"
                        ? correctAns.alliance.join(", ")
                        : correctAns.alliance;
                const guessAlliance =
                    guessInfo.alliance != "None"
                        ? guessInfo.alliance.join(", ")
                        : guessInfo.alliance;

                return correctAlliance === guessAlliance;
            };

            const classToggle = {
                name: guessInfo.name == correctAns.name,
                gender: guessInfo.gender == correctAns.gender,
                age: guessInfo.age == correctAns.age,
                eyes: guessInfo.eyes === correctAns.eyes,
                hair: guessInfo.hair == correctAns.hair,
                alliance: checkAlliance(),
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
                        {/* Icon */}
                        {guessInfo.age < correctAns.age &&
                        guessInfo.age !== "Unknown" &&
                        correctAns.age !== "Unknown" ? (
                            <PiArrowFatUpFill />
                        ) : guessInfo.age > correctAns.age &&
                          guessInfo.age !== "Unknown" &&
                          correctAns.age !== "Unknown" ? (
                            <PiArrowFatDownFill />
                        ) : null}
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
