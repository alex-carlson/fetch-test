"use client";

import React from "react";
import SearchList from "./SearchList";
import { Pagination, PaginationItem, PaginationCursor } from "@heroui/pagination";
import { useContext } from "react";
import { DogDataProvider, useDogDataContext } from "@/context/DogDataContext";

function SearchResults() {

    const { page, setPage } = useDogDataContext();

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <SearchList />
            <Pagination initialPage={1} total={10} onChange={setPage} />
        </section>
    );
}

export default SearchResults