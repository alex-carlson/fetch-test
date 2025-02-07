"use client";
import { title } from "@/components/primitives";
import { useUserDataContext } from "@/context/UserContext";
import { useDogDataContext } from "@/context/DogDataContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { siteConfig } from "@/config/site";

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

            setMatch(data);
            console.log(match);

        } catch (err) {
            let errorMessage = "An error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    const hasMatch = () => {
        return match.id !== null;
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
                                <Button className="w-full" color="primary" onPress={() => handleFavorite(favorite)}>
                                    Remove
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col justify-center py-8 md:py-10 justify-center gap-4">
                    <h1 className="text-center text-2xl font-bold">Find Match</h1>
                    <Button className="h4" color="primary" onPress={() => findMatch()}>Search</Button>
                    <div className="h-4">
                        {/* draw match results */}
                        <Card className="border-none" radius="lg">
                            <Image
                                // alt={match.name}
                                className="object-cover w-64 h-64 mx-auto"
                                // src={match.img}
                                width={270}
                            />
                            <CardBody className="flex flex-col gap-2">
                                {/* <p className="text-default-500 font-medium text-large py-0">{match.name}</p> */}
                                {/* <p>is {NumberWithArticle(match.age)} year old {match.breed}</p> */}
                                {/* <p className="text-small text-default-500">zip: {match.zip_code}</p> */}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    );
}