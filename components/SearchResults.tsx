"use client";

import React from "react";
import SearchList from "./SearchList";
import { Pagination, PaginationItem, PaginationCursor } from "@heroui/pagination";
import { useContext } from "react";
import { DogDataProvider, useDogDataContext } from "@/context/DogDataContext";
import { Button } from "@heroui/button";

function SearchResults() {

    const { page, setPrevPage, setNextPage, prevPage, nextPage } = useDogDataContext();

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <SearchList />
            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <Button
                        color="warning"
                        size="sm"
                        // variant="flat"
                        onPress={() => setPrevPage(prevPage)}
                    >
                        Previous
                    </Button>
                    <p>Page {page}</p>
                    <Button
                        color="warning"
                        size="sm"
                        // variant="flat"
                        onPress={() => setNextPage(nextPage)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default SearchResults