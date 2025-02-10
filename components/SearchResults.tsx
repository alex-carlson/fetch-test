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
        setPage(page - pageSize);
    };

    const setNextPage = () => {
        setPage(page + pageSize);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
            <SearchList />
            <Pagination className="flex gap-2" showControls boundaries={1} color="primary" initialPage={1} total={10} onChange={(e) => setPage(e)} />
        </section>
    );
}

export default SearchResults