import React from "react";

export default function Card({ data }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className="text-3xl font-bold">{data.name}</h1>
                <p className="text-xl">{data.breed}</p>
                <p className="text-xl">{data.age}</p>
                // <p className="text-xl">{data.location}</p>
            </div>
        </div>
    );
}