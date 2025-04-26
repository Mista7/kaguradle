import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div
                id="container"
                className="kagurabachi flex flex-col gap-3 items-center "
            >
                <nav className="flex flex-row w-auto h-auto " id="nav">
                    Kaguradle
                </nav>
                <Search />

                <div
                    id="clues"
                    className="flex flex-row justify-between gap-10"
                >
                    <div id="img" className="clues">
                        Image
                    </div>
                    <div id="gender" className="clues">
                        Gender
                    </div>
                    <div id="age" className="clues">
                        Age
                    </div>
                    <div if="eye" className="clues">
                        Eye Color
                    </div>
                    <div id="hair" className="clues">
                        Hair Color
                    </div>
                    <div id="firstArc" className="clues">
                        First Arc
                    </div>
                </div>
                <div id="guesses"></div>
            </div>
        </>
    );
}
