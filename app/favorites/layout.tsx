//default layout for favorites

export default function FavoritesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            {children}
        </section>
    );
}