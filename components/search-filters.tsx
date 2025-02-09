"use client";
//template for search filters
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider"
import { useState, useEffect, useContext } from "react";
import { siteConfig } from "@/config/site";
import { useDogDataContext } from "@/context/DogDataContext";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";

// create interface for sort mode, for breed, name, age, and location, ascending or descending.

enum SortType {
    Breed = "breed",
    Name = "name",
    Age = "age",
    Location = "location",
}

interface SortMode {
    ascending: boolean;
    type: SortType;
}

export default function SearchFilters() {
    const [zipCode, setZipCode] = useState("");
    const [ageRange, setAgeRange] = useState([1, 10]);
    const [breeds, setBreeds] = useState([{ key: "", value: "" }]);
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [sortType, setSortType] = useState(SortType.Breed);

    const { setDogIds } = useDogDataContext();

    const { page, pageSize } = useDogDataContext();

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

    const requestDogs = async () => {
        try {
            let sortDir = (sortAscending) ? "asc" : "desc";
            let params = {
                breeds: [...filteredBreeds].join(", "),
                zipCodes: zipCode,
                ageMin: ageRange[0],
                ageMax: ageRange[1],
                sort: `${sortType}:` + sortDir,
                from: page,
            };

            //remove param if undefined, or empty array
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
        requestDogs();
    }, []);

    useEffect(() => {
        requestDogs();
    }, [filteredBreeds, zipCode, ageRange, sortAscending, sortType, page]);

    return (
        <div className="flex flex-col w-full items-center justify-center gap-4 py-8">
            <div className="flex flex-col md:flex-row mx-auto w-full">
                <Select
                    isVirtualized
                    className=" p-2 rounded-lg"
                    maxListboxHeight={400}
                    showScrollIndicators={true}
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
                    variant="flat"
                    onChange={(e) => setZipCode(e)}
                />
                <Slider
                    className="max-w-md"
                    label="Age Range"
                    minValue={1}
                    maxValue={10}
                    step={1}
                    value={ageRange}
                    onChange={(e) => setAgeRange(e)}
                />
            </div>
            <div className="flex flex-col md:flex-row mx-auto w-full py-3 gap-4 text-center justify-center row-span-2">
                {/* add sort mode select */}
                <Select
                    isVirtualized
                    className=" p-2 rounded-lg max-w-96"
                    showScrollIndicators={true}
                    label="Sort"
                    placeholder="Sort by"
                    selectedKeys={[sortType]}
                    selectionMode="single"
                    onSelectionChange={(e) => setSortType(e.currentKey)}
                >
                    <SelectItem key={SortType.Breed}>Breed</SelectItem>
                    <SelectItem key={SortType.Name}>Name</SelectItem>
                    <SelectItem key={SortType.Age}>Age</SelectItem>
                    <SelectItem key={SortType.Location}>Location</SelectItem>
                </Select>
                <Switch isSelected={sortAscending} onValueChange={setSortAscending}>{sortAscending ? "Ascending" : "Descending"}</Switch>
                {/* <Button color="primary" onPress={() => requestDogs()} className="w-full p-2 rounded-lg">Search</Button> */}
            </div>
        </div>
    );
}