"use client";
import { createContext, useContext, useState, ReactNode } from "react";

import { DogData } from "./DogDataContext";


interface UserDataType {
    name: string;
    setName: (name: string) => void;
    favorites: DogData[];
    match: DogData;
    removeFavorite: (favorite: object) => void;
    addFavorite: (favorite: object) => void;
    clearFavorites: () => void;
    isFavorite: (id: number) => boolean;
    setMatch: (match: object) => void;
}

const UserDataContext = createContext<UserDataType | null>({
    name: "",
    setName: () => { },
    favorites: [],
    match: {},
    removeFavorite: () => { },
    addFavorite: () => { },
    clearFavorites: () => { },
    isFavorite: () => false,
    setMatch: () => { },
});

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState("");
    const [favorites, setFavorites] = useState<DogData[]>([]);
    const [match, setMatch] = useState<object>({});

    const addFavorite = (favorite: DogData) => {
        // add dog to favorites
        setFavorites([...favorites, favorite]);
    };

    const removeFavorite = (favorite: DogData) => {
        // remove dog from favorites
        setFavorites(favorites.filter((f) => f.id !== favorite.id));
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const isFavorite = (id: number) => favorites.some((favorite) => favorite.id === id);

    return (
        <UserDataContext.Provider value={{ name, setName, favorites, match, setMatch, addFavorite, removeFavorite, clearFavorites, isFavorite }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export function useUserDataContext() {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }

    return context;
}