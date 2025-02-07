import { createContext } from "react";

type DogDataType = [{
    id: number;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}];

const DogDataContext = createContext<DogDataType>([{
    id: 1,
    img: "https://images.unsplash.com/photo-1678489811694-86d3b24b6d6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Max",
    age: 3,
    zip_code: "12345",
    breed: "Labrador",
}]);

export default DogDataContext;