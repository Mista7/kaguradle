import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Guess from "./components/Guess";

export default function App() {
    const [guessCount, setGuessCount] = useState(0);
    const [guess, setGuess] = useState([]);


    return (
        <>
            <div
                id="container"
                className="kagurabachi flex flex-col gap-3 items-center "
            >
                <nav className="flex flex-row w-auto h-auto " id="nav">
                    Kaguradle
                </nav>
                <Search guess={guess} setGuess={setGuess} />

                <div id="guessContainer" className="flex flex-col gap-[20px]">
                    <ul
                        id="clueContainer"
                        className="flex flex-row justify-between p-0 m-0 gap-5"
                    >
                        <li id="img" className="clue">
                            Image
                        </li>
                        <li id="name" className="clue">
                            Name
                        </li>
                        <li id="gender" className="clue">
                            Gender
                        </li>
                        <li id="age" className="clue">
                            Age
                        </li>
                        <li id="eye" className="clue">
                            Eye Color
                        </li>
                        <li id="hair" className="clue">
                            Hair Color
                        </li>
                        <li id="alliance" className="clue">
                            Alliance
                        </li>
                        <li id="firstArc" className="clue">
                            First Arc
                        </li>
                    </ul>
                    
                    <Guess guessList={guess} setGuess={setGuess}/>
                </div>
            </div>
        </>
    );
}
