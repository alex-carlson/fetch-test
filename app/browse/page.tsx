"use client";
import { useEffect } from "react";

import { title } from "@/components/primitives";
import SearchFilters from "@/components/search-filters";
import SearchResults from "@/components/SearchResults";
import { siteConfig } from "@/config/site";
import { useDogDataContext } from "@/context/DogDataContext";
import { useUserDataContext } from "@/context/UserContext";

export default function Browse() {
    // use context of dogIds in data
    const { dogIds, setDogIds } = useDogDataContext();
    const { name } = useUserDataContext();

    const fetchDogs = async () => {
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/dogs/search?sort=breed:asc`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();

            // set dog ids in context
            setDogIds(data.dogIds);

        } catch (err) {
            let errorMessage = "An error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };


    useEffect(() => {
        fetchDogs();
    }, []);

    return (
        <div>
            <div className="inline-block text-center justify-center w-full py-8">
                <h1 className={title({ color: "yellow" })}>{name}&apos;s </h1>
                <h1 className={title({ color: "yellow" })}>Next Best Friend</h1>
                <div className="h-4" />
                <div className="flex flex-col gap-4 " />
            </div>
            <SearchFilters />
            <SearchResults />
        </div >
    );
};