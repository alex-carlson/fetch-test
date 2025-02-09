"use client";

import React from "react";
import { Pagination } from "@heroui/pagination";

import SearchList from "./SearchList";

import { useDogDataContext } from "@/context/DogDataContext";


function SearchResults() {

    const { page, setPage, pageSize, setPageSize, dogs } = useDogDataContext();

    const setPrevPage = () => {
        // prevent page from going below 0
        if (page - pageSize < 0) {
            return;
        }
        console.log("Setting prev page to: " + (page - pageSize));
        setPage(page - pageSize);
    };

    const setNextPage = () => {
        console.log("Setting next page to: " + (page + pageSize));
        setPage(page + pageSize);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <SearchList />
            <div className="flex flex-col gap-5 py-3">
                <div className="flex gap-2">
                    <Pagination showControls boundaries={3} color="primary" initialPage={1} total={10} onChange={(e) => setPage(e)} />
                </div>
            </div>
        </section>
    );
}

export default SearchResults