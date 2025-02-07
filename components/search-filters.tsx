"use client";
//template for search filters
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem
} from "@heroui/autocomplete";

export default function SearchFilters() {
    const [breed, setBreed] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [ageMin, setAgeMin] = useState("");
    const [ageMax, setAgeMax] = useState("");

    const animalList = siteConfig.animals;

    //convert animalList to Iterable<object>
    const iterableAnimalList = Object.entries(animalList).map(([key, value]) => ({ key, label: value }));

    const handleBreedChange = (e) => {
        setBreed(e);
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const handleAgeMinChange = (e) => {
        setAgeMin(e.target.value);
    };

    const handleAgeMaxChange = (e) => {
        setAgeMax(e.target.value);
    };

    const handleSearch = async () => {
        // POST api to search with the filters
        try {
            let params = {
                breeds: breed,
                zipCodes: zipCode,
                ageMin: ageMin,
                ageMax: ageMax,
            };

            // only use defined params
            params = Object.fromEntries(Object.entries(params).filter(([_, value]) => value));

            const response = await fetch(`${siteConfig.api.baseUrl}/dogs/search?` + new URLSearchParams(params),
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();

            console.log(data);

        } catch (err) {
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-6 rounded-lg shadow-md w-80">
                <Autocomplete
                    className="max-w-xs"
                    defaultItems={iterableAnimalList}
                    label="Favorite Animal"
                    placeholder="Search an animal"
                    onInputChange={(e) => handleBreedChange(e)}
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <Input
                    label="Zip Code"
                    className="max-w-xs"
                    variant="bordered"
                    onChange={(e) => handleZipCodeChange(e)}
                />
                <Input
                    label="Age Min"
                    className="max-w-xs"
                    variant="bordered"
                    onChange={(e) => handleAgeMinChange(e)}
                />
                <Input
                    label="Age Max"
                    className="max-w-xs"
                    variant="bordered"
                    onChange={(e) => handleAgeMaxChange(e)}
                />
                <Button onPress={() => handleSearch()} className="w-full">Search</Button>
            </div>
        </div>
    );
}