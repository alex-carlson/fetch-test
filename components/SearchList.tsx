"use client";
import React, { useEffect, useContext } from "react";
import Card from "./card";
import { siteConfig } from "@/config/site";

export default function SearchList({ data }) {
    const dogIds = data;
    const [result, setResult] = React.useState([]);
    // fetch dog data from list of dog ids
    const fetchDogData = async () => {
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/dogs`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dogIds),
                    credentials: "include",
                });

            if (!response.ok) {
                throw new Error("Search failed");
            }
            
            // use context to set data
            const context = useContext(data);
            console.log(context);

            const d = await response.json();


            setResult(d);


        } catch (err) {
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
                console.log(errorMessage);
            }
        }
    }

    useEffect(() => {
        fetchDogData();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {result.map((result, index) => (
                <Card data={result} key={index} />
            ))}
        </div>
    );
}