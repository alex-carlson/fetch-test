import { createContext, useContext, useState, ReactNode } from "react";

export interface DogDataType {
    dogs: DogData[];
    dogIds: number[];
    setDogs: (dogs: any) => void;
    setDogIds: (dogIds: number[]) => void;
    page: number;
    setPage: (page: number) => void;
    nextPage: string;
    prevPage: string;
    setNextPage: (nextPage: string) => void;
    setPrevPage: (prevPage: string) => void;
}

export interface DogData {
    id: number;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const DogDataContext = createContext<DogDataType | null>(null);

export const DogDataProvider = ({ children }: { children: ReactNode }) => {
    const [dogs, setDogs] = useState([]);
    const [dogIds, setDogIds] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");

    return (
        <DogDataContext.Provider value={{ dogs, dogIds, setDogs, setDogIds, page, setPage, nextPage, prevPage, setNextPage, setPrevPage }}
        >
            {children}
        </DogDataContext.Provider>
    );
};

export function useDogDataContext() {
    const context = useContext(DogDataContext);
    if (!context) {
        throw new Error("useDogData must be used within a DogDataProvider");
    }
    return context;
}