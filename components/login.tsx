"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@heroui/form";

import { siteConfig } from "@/config/site";
import { useUserDataContext } from "@/context/UserContext";



export default function Login() {
    const [error, setError] = useState(null);
    const router = useRouter();

    const { name, setName } = useUserDataContext();
    const [email, setEmail] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <div className="flex flex-col items-center justify-center w-full">
            <Form className="p-6 rounded-lg w-80 max-w-xs" onSubmit={onSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Input
                    isRequired
                    className="mb-6 w-full max-w-xs"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    isRequired
                    className="mb-6 w-full max-w-xs"
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button className="w-full text-black font-bold" color="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
}
