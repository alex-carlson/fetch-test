"use client";
import { title } from "@/components/primitives";
import SearchFilters from "@/components/search-filters";
import Search from "@/components/Search";
import { useState, useEffect, createContext } from "react";
import { siteConfig } from "@/config/site";

export default function Browse() {

    // createcontext for data
    const tempData = createContext([]);

    const [dogData, setDogData] = useState([
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1678489811694-86d3b24b6d6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            name: "Max",
            age: 3,
            zip_code: "12345",
            breed: "Labrador",
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1678489811694-86d3b24b6d6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            name: "Max",
            age: 3,
            zip_code: "12345",
            breed: "Labrador",
        },
    ]);

    useEffect(() => {
        fetchDogs();
    }, []);

    const fetchDogs = async () => {
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/dogs/search`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();

            setDogData(data);
        } catch (err) {
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Let's find your </h1>
                <h1 className={title({ color: "yellow" })}>Next Best Friend</h1>
                <div className="h-4" />
                <div className="flex flex-col gap-4 ">
                    <SearchFilters />
                    <Search details={dogData} />
                </div>
            </div>
        </div>
    );
};