"use client";

import React from "react";
import SearchList from "./SearchList";
import { Pagination, PaginationItem, PaginationCursor } from "@heroui/pagination";
import { useContext } from "react";
import { DogDataProvider, useDogDataContext } from "@/context/DogDataContext";
import { Button } from "@heroui/button";

function SearchResults() {

    const { page, setPage } = useDogDataContext();
    const prev = page - 1;
    const next = page + 1;

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <SearchList />
            {/* <Pagination initialPage={1} total={10} onChange={setPage} /> */}
            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                        onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
                    >
                        Previous
                    </Button>
                    <p>Page {page}</p>
                    <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                        onPress={() => setPage((prev) => (prev < 10 ? prev + 1 : prev))}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default SearchResults