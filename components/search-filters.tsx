"use client";
//template for search filters
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider"
import { useState, useEffect, useContext } from "react";
import { siteConfig } from "@/config/site";
import { useDogDataContext } from "@/context/DogDataContext";
import { Select, SelectItem } from "@heroui/select";

export default function SearchFilters() {
    const [zipCode, setZipCode] = useState("");
    const [ageRange, setAgeRange] = useState([1, 10]);
    const [breeds, setBreeds] = useState([{ key: "", value: "" }]);
    const [filteredBreeds, setFilteredBreeds] = useState([]);

    const { dogIds, setDogIds } = useDogDataContext();
    const { dogs, setDogs } = useDogDataContext();

    const { page, setPage } = useDogDataContext();

    //fetch dog breeds and return Iterable<object>
    const dogBreeds = async () => {
        // fetch breeds from api
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/dogs/breeds`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

            if (!response.ok) {
                throw new Error("Breeds failed");
            }

            const data = await response.json();

            // format data to key value pairs
            data.forEach((breed: string, index: string) => {
                data[index] = {
                    key: breed,
                    value: breed
                };
            });

            setBreeds(data);

        } catch (err) {
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    const handleSearch = async () => {
        try {
            let params = {
                breeds: [...filteredBreeds].join(", "),
                zipCodes: zipCode,
                ageMin: ageRange[0],
                ageMax: ageRange[1],
                page: page,
            };

            //remove param if undefined, or empty array
            params = Object.fromEntries(Object.entries(params).filter(([_, value]) => value));

            console.log(params);

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
            setDogIds(data.resultIds);

        } catch (err) {
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    const handleBreedChange = (e) => {

        let breedName = e.currentKey;

        // add breed to array of filtered breeds
        setFilteredBreeds([...filteredBreeds, breedName]);
    };

    // on load, fetch breeds
    useEffect(() => {
        dogBreeds();
    }, []);

    useEffect(() => {
        console.log(page);
        handleSearch();
    }, [page]);

    return (
        <div className="flex flex-col w-full items-center justify-center md:flex-row gap-4">
            <Select
                className=" p-2 rounded-lg"
                label="Breed"
                placeholder="Browse by Breed"
                selectedKeys={filteredBreeds}
                selectionMode="single"
                onSelectionChange={(e) => setFilteredBreeds(e)}
            >
                {breeds.map((breed, index) => (
                    <SelectItem key={breed.key}>
                        {breed.value}
                    </SelectItem>
                ))}
            </Select>
            <Input
                label="Zip Code"
                className=" p-2 rounded-lg"
                variant="bordered"
                onChange={(e) => setZipCode(e)}
            />
            <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                <Slider
                    className="max-w-md"
                    label="Age Range"
                    minValue={1}
                    maxValue={15}
                    step={1}
                    value={ageRange}
                    onChange={(e) => setAgeRange(e)}
                />
                <p className="text-default-500 font-medium text-small">
                    {/* Age Range: {Array.isArray(ageRange) && ageRange.map((b) => `${b}`).join(" – ")} */}
                </p>
            </div>
            <Button color="primary" onPress={() => handleSearch()} className="w-full p-2 rounded-lg">Search</Button>
        </div>
    );
}