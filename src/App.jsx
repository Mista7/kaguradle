import { useState } from "react";
import "./App.css";
import { Button, HStack } from "@chakra-ui/react"


export default function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div id="container" className="kagurabachi">
                <nav className="flex flex-row text-left w-auto h-auto">
                    Kaguradle
                </nav>
                <input
                    type="search"
                    name="guess"
                    id="guess"
                    placeholder="Chihiro Rokuhira"
                    className="bg-gray-400"
                />
            </div>

            <HStack>
                <Button>Click me</Button>
                <Button>Click me</Button>
            </HStack>
        </>
    );
}
