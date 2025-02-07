import { createContext, useContext, useState } from "react";

interface UserData {
    name: string;
}

interface UserContextProps {
    userData: UserData;
    setUserData: (userData: UserData) => void;
}

const UserContext = createContext<UserContextProps>({
    userData: { name: "" },
    setUserData: () => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userData, setUserData] = useState<UserData>({ name: "" });
};

export const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
};