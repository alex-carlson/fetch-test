"use client";
import { title } from "@/components/primitives";
import { useUserDataContext } from "@/context/UserContext";
import { useDogDataContext } from "@/context/DogDataContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { siteConfig } from "@/config/site";
import { f } from "@heroui/slider/dist/use-slider-9ae8d8d3";

export default function Favorites() {
    const { favorites, removeFavorite } = useUserDataContext();
    const { match, setMatch } = useUserDataContext();

    const handleFavorite = (dog: any) => {
        //remove dog from favorites
        removeFavorite(dog);
    };

    const NumberWithArticle = (number) => {
        const getArticle = (num) => {
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

            console.log(match);

            // set match to dog with matching id in favorites
            setMatch(favorites.find((dog) => dog.id === data.match));

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
                <Card className="border-none justify-center items-center" radius="lg">
                    <p className="text-default-500 font-medium text-large py-0">{match.name} is your match!</p>
                    <Image
                        alt={match.name}
                        className="object-cover w-full aspect-[1/1]"
                        src={match.img}
                    />
                    <p className="text-med text-default-500">Congratulations!</p>
                </Card>
            );
        } else {
            return (
                <div id="match">
                    <div>
                        <h1>No match found</h1>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="inline-block text-center justify-center">
                <h1 className={title()}>Favorites</h1>
                <div className="h-4" />
                <div className="justify-center inline-block grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
                    {favorites.map((favorite, index) => (
                        <Card className="border-none" radius="lg" key={index}>
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
                                <Button className="w-full" color="warning" onPress={() => handleFavorite(favorite)}>
                                    Remove
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="justify-center inline-block grid grid-cols-1 gap-6">
                    <h1 className="text-center text-2xl font-bold">Find Match</h1>
                    <Button color="warning" onPress={() => findMatch()}>Search</Button>
                    <div className="justify-center inline-block grid grid-cols-1 gap-6 ">
                        {/* draw match results */}
                        <Match />
                    </div>
                </div>
            </div>
        </div >
    );
}