import characterInfo from "../characterInfo.json";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import "./search.css";
import { useState } from "react";
export default function Search() {
    // Sets up a list with all character names and useStates
    const characters = Object.keys(characterInfo);
    const [searchItem, setSearchItem] = useState("");
    const [searchChars, setSearchChars] = useState(characters);

    // function that checks for all characters that match the current search
    const handleSeachChange = (e) => {
        const searchInput = e.target.value;
        setSearchItem(searchInput);

        const filteredChars = characters.filter((character) =>
            character.toLowerCase().includes(searchInput.toLowerCase())
        );

        setSearchChars(filteredChars);
    };

    {
        return searchItem != "" ? (
            <>
                <div
                    id="searchContainer"
                    className=""
                >
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder="Enter Character Name (ex.Chihiro Rokuhira)"
                        className="bg-[#808080] text-left pl-2.5 w-[542px] h-[60px] rounded"
                        onChange={handleSeachChange}
                        value={searchItem}
                        autoFocus
                    />

                    <button type="button" >
                        <BsFillArrowRightSquareFill size={60} />
                    </button>
                </div>

                <ul className="flex flex-col" id="searchChars">
                    <div id="charContainer" className="">
                        {searchChars.map((character) => (
                            <li key={character} className="flex flex-row">
                                <img
                                    src={characterInfo[character].img}
                                    alt={character}
                                    className="h-[96px] w-[96px] charImg"
                                />

                                <div className="content-center">
                                    {character}
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </>
        ) : (
            <>
                <div
                    id="searchContainer"
                    className=""
                >
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder="Enter Character Name (ex.Chihiro Rokuhira)"
                        className="bg-[#808080] text-left pl-2.5 w-[542px] h-[60px] rounded"
                        onChange={handleSeachChange}
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
