import { title } from "@/components/primitives";
import Login from "@/components/login";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Please&nbsp;</span>
        <span className={title({ color: "violet" })}>log in</span>
        <span className={title()}>&nbsp;to continue</span>
        <br />
        <div className="h-4" />
        <div className="flex flex-col gap-4 ">
          <Login />
        </div>
      </div>
    </section >
  );
}
