import characterInfo from "../characterInfo.json";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import "./search.css";
import { useState, useRef } from "react";

export default function Search({ guess, setGuess }) {
    // Sets up a list with all character names and useStates
    const characters = Object.keys(characterInfo);
    const [searchItem, setSearchItem] = useState("");
    const [searchChars, setSearchChars] = useState(characters);
    const [charGuessed, setCharGuessed] = useState(false);
    const searchBar = document.querySelector("#searchBar");
    const searchBarEvent = { target: searchBar };
    const searchBarRef = useRef(null);

    // function that checks for all characters that match the current search
    const handleSearchChange = (e) => {
        const searchInput = e.target.value;
        setSearchItem(searchInput);

        const filteredChars = characters.filter(
            (character) =>
                character.toLowerCase().includes(searchInput.toLowerCase()) &&
                !guess.includes(character)
        );

        setSearchChars(filteredChars);
    };

    // Makes it so that the search bar updates when the user click a searched character
    const handleGuess = (e) => {
        const char = e.currentTarget.getAttribute("data-name");

        searchBar.value = char;
        handleSearchChange(searchBarEvent);

        // Prevents the click from being too quick and the focus not working
        searchBarRef.current.focus();
    };

    const handleSubmitGuess = (e) => {
        e.preventDefault();

        const charList = document.querySelector("#searchCharContainer");

        if (searchChars) {
            try {
                const name =
                    charList.firstElementChild.getAttribute("data-name");

                setGuess((prevGuesses) => [...prevGuesses, name]);
            } catch (error) {}
        }

        searchBar.value = "";
        handleSearchChange(searchBarEvent);
        searchBar.focus();

        // if (searchBar.value in characters) {
        //     setGuess(prevGuesses => [...prevGuesses, searchBar.value]);
        // } else if (searchBar.value != "") {
        //     setGuess(prevGuesses => [...prevGuesses, charList.firstElementChild.getAttribute("data-name")]);
        // }
    };

    // Main content, checks if searchbar is empty and returns based on that
    {
        return searchItem != "" ? (
            <>
                <form
                    id="searchContainer"
                    className=""
                    onSubmit={handleSubmitGuess}
                    autoComplete="off"
                >
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder="Enter Character Name (ex.Chihiro Rokuhira)"
                        className=""
                        onChange={handleSearchChange}
                        value={searchItem}
                        autoComplete="off"
                        ref={searchBarRef}
                        autoFocus
                    />

                    <button type="button">
                        <BsFillArrowRightSquareFill size={60} />
                    </button>
                </form>

                <ul className="flex flex-col" id="searchCharsList">
                    <div id="searchCharContainer" className="">
                        {searchChars.map((character) => (
                            <li
                                key={character}
                                data-name={character}
                                className="flex flex-row searchChar"
                                onClick={handleGuess}
                            >
                                <img
                                    src={characterInfo[character].img}
                                    alt={character}
                                    className="charImg"
                                />

                                <div className="content-center pl-[20px]">
                                    {character}
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </>
        ) : (
            <>
                <div id="searchContainer" className="">
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder="Enter Character Name (ex.Chihiro Rokuhira)"
                        className=""
                        onChange={handleSearchChange}
                        value={searchItem}
                        autoFocus
                    />

                    <button type="button">
                        <BsFillArrowRightSquareFill size={60} />
                    </button>
                </div>
            </>
        );
    }
}
