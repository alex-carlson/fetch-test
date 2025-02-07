"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";


export default function Login() {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setError(null);
        try {
            const response = await fetch(`${siteConfig.api.baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Login failed");
            } else {
                router.push("/browse");
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
        <div className="flex flex-col items-center justify-center">
            <div className="p-6 rounded-lg shadow-md w-80">
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <Input
                    isRequired
                    label="Name"
                    className="mb-3"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    isRequired
                    label="Email"
                    type="email"
                    className="mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onPress={handleLogin} className="w-full">Login</Button>
            </div>
        </div>
    );
}
