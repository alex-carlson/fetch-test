"use client";
import React, { useEffect } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";

import { useDogDataContext } from "@/context/DogDataContext";
import { useUserDataContext } from "@/context/UserContext";
import { siteConfig } from "@/config/site";
import { HeartFilledIcon } from "@/components/icons";

export default function SearchList() {

    // get dogIds from context
    const { dogIds } = useDogDataContext();
    const { dogs, setDogs } = useDogDataContext();
    const { addFavorite, removeFavorite, isFavorite } = useUserDataContext();
    const { page } = useDogDataContext();
    const { name } = useUserDataContext();

    useEffect(() => {
        fetchDogData();
    }, [dogIds]);

    useEffect(() => {
        fetchDogData();
    }, []);

    // if page increases, fetch nest from data, if page decreases, get pre
    useEffect(() => {
        fetchDogData();
    }, [page]);

    //fetch data from api
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

            const d = await response.json();

            setDogs(d);

        } catch (err) {
            let errorMessage = "An error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
                console.log(errorMessage);
            }
        }
    }

    const handleFavorite = (dog: any) => {
        if (isFavorite(dog.id)) {
            removeFavorite(dog);
        } else {
            addFavorite(dog);
        }
    };

    const NumberWithArticle = (number) => {
        const getArticle = (num) => {
            const firstDigit = num.toString()[0]; // Get first digit as a string
            const vowels = ["8", "11", "18"]; // Numbers pronounced with a vowel sound

            return vowels.includes(num.toString()) || firstDigit === "8" ? "an" : "a";
        };

        return `${getArticle(number)} ${number}`;
    };

    const FavoritedColor = (dog: any) => {
        if (isFavorite(dog.id)) {
            return "#c52545";
        } else {
            return "#8d8d8d";
        }
    };

    const FavoritedText = (dog: any) => {
        if (isFavorite(dog.id)) {
            return "Unfavorite";
        } else {
            return "Favorite";
        }
    };

    const renderDogs = () => {
        // if no name, render no dogs found
        if (name === "") {
            return (
                <h1 className="text-center text-2xl font-bold py-4">No dogs found</h1>
            );
        } else {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {dogs.map((dog, index) => (
                        <Card key={index} radius="lg" className="flex flex-col gap-2 justify-center">
                            <Image
                                alt={dog.name}
                                className="object-cover w-full aspect-[1/1]"
                                src={dog.img}
                            />
                            <CardBody className="flex flex-col gap-2">
                                <p className="text-default-500 font-medium text-large py-0">{dog.name}</p>
                                <p>is {NumberWithArticle(dog.age)} year old {dog.breed}</p>
                                <p className="text-small text-default-500">zip: {dog.zip_code}</p>
                            </CardBody>
                            <CardFooter className="flex justify-center py-3">
                                <Button className="w-full font-bold text-center align-middle text-black" color="primary" onPress={() => handleFavorite(dog)}>
                                    <HeartFilledIcon color={FavoritedColor(dog)} size={16} /> {FavoritedText(dog)}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )
        }

    }
    return (
        <div className="w-full flex flex-col">
            {renderDogs()}
        </div>
    );
}