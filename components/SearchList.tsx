import React from "react";
import Card from "./card";

export default function SearchList({ data }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                {data.map((item) => (
                    <Card data={item} />
                ))}
            </div>
        </div>
    );
}