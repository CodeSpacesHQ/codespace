export const metadata = {
    title: 'Past Event | Code Space',
    description: 'View details about this past Code Space event.',
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-transparent">
                <main className="min-h-screen py-20">
                    {children}
                </main>
            </body>
        </html>
    );
} 