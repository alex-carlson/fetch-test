import { title } from "@/components/primitives";
import Login from "@/components/login";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Please&nbsp;</span>
        <span className={title({ color: "yellow" })}>log in</span>
        <span className={title()}>&nbsp;to continue</span>
        <div className="flex flex-col gap-4 py-3">
          <Login />
        </div>
      </div>
    </section >
  );
}
