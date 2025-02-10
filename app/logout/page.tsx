"use client";
import { useUserDataContext } from "@/context/UserContext";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";


export default function Logout() {
    const { clearFavorites, setMatch } = useUserDataContext();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            } else {
                clearFavorites();
                setMatch({});
                router.push("/");
            }

        } catch (err) {
            let errorMessage = "An error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.log(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-center text-2xl font-bold py-4">Logout</h1>
            <Button className="p-2 rounded-lg w-full font-bold text-black" color="primary" onPress={() => handleLogout()}>Logout</Button>
        </div>
    );
}