"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";

import { useUserDataContext } from "@/context/UserContext";
import { siteConfig } from "@/config/site";
import { HeartFilledIcon } from "@/components/icons";
import { DogData } from "@/context/DogDataContext";

export default function Favorites() {
    const { favorites, removeFavorite } = useUserDataContext();
    const { match, setMatch } = useUserDataContext();

    const handleFavorite = (dog: any) => {
        //remove dog from favorites
        removeFavorite(dog);
    };

    const NumberWithArticle = (number: number) => {
        const getArticle = (num: number) => {
            const firstDigit = num.toString()[0]; // Get first digit as a string
            const vowels = ["8", "11", "18"]; // Numbers pronounced with a vowel sound

            return vowels.includes(num.toString()) || firstDigit === "8" ? "an" : "a";
        };

        return `${getArticle(number)} ${number}`;
    };

    const findMatch = async () => {
        let favoriteIds = favorites.map((favorite) => favorite.id);

        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/dogs/match?`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(favoriteIds),
                });

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();
            // find the dog data that matches the returned id
            const matchData: DogData = favorites.find((dog) => dog.id === data.match);

            setMatch(matchData);

        } catch (err) {
            let errorMessage = "An error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    const getDog = async (id: number) => {
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/dogs/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();

        } catch (err) {
            let errorMessage = "An error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };



    const Match = () => {
        // if match has an id, render match
        if (match.id) {
            return (
                <Card className="border-none justify-center items-center max-w-sm" radius="lg">
                    <p className="text-default-500 text-xl py-6 font-medium">{match.name} is your match!</p>
                    <Image alt={match.name} className="aspect-[1/1] w-full object-cover" src={match.img} width={270} />
                    <p className="text-xl text-default-500 py-6">Congratulations!</p>
                </Card>
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center gap-4 w-full" id="match">
                    <h1 className="text-center text-2xl font-bold py-4">No match found</h1>
                </div>
            );
        }
    };

    return (
        <div className="w-auto max-w-7xl">
            <h1 className="text-center text-2xl font-bold py-4">Favorites</h1>
            <div className="grid content-center grid-cols-md:grid-cols-2 lg:grid-cols-5 gap-6 py-6">
                {favorites.map((favorite, index) => (
                    <Card key={index} className="grid grid-row" radius="lg">
                        <Image
                            alt={favorite.name}
                            className="object-cover rounded-xl w-64 h-64 mx-auto"
                            src={favorite.img}
                            width={270}
                        />
                        <CardBody className="flex flex-col gap-2">
                            <p className="text-default-500 font-medium text-large py-0">{favorite.name}</p>
                            <p>is {NumberWithArticle(favorite.age)} year old {favorite.breed}</p>
                            <p className="text-small text-default-500">zip: {favorite.zip_code}</p>
                        </CardBody>
                        <CardFooter className="flex justify-between py-3">
                            <Button className="w-full font-bold text-center align-middle text-black" color="primary" onPress={() => handleFavorite(favorite)}>
                                <HeartFilledIcon color={"#c52545"} size={16} /> Remove
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="grid grid-row gap-6 content-center max-w-sm">
                <h1 className="text-center text-2xl font-bold">Find Match</h1>
                <Button className="p-2 rounded-lg font-bold text-black" color="primary" onPress={() => findMatch()}>Search</Button>
                <Match />
            </div>
        </div >
    );
}