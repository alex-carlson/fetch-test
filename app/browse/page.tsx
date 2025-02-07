import { title } from "@/components/primitives";
//import search
import SearchFilters from "@/components/search-filters";
import Search from "@/components/Search";

export default function Browse() {

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Let's find your </h1>
                <h1 className={title({ color: "yellow" })}>Next Best Friend</h1>
                <div className="h-4" />
                <div className="flex flex-col gap-4 ">
                    <SearchFilters />
                    {/* <Search {...details} /> */}
                </div>
            </div>
        </div>
    );
};