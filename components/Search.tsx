"use client";

import React from "react";
import Scroll from "./Scroll";
import SearchList from "./SearchList";

function Search({ details }) {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
    };

    function searchList() {
        return (
            <Scroll>
                <SearchList data={details} />
            </Scroll>
        )
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                {searchList()}
            </div>
        </section>
    );
}

export default Search