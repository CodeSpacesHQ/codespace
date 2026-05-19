import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Clinton's Vision for Code Space in 2025 - A Letter to the African Tech Community",
    description: "Discover Clinton Imaro's inspiring vision for Code Space in 2025. Read about our journey, impact on African tech talent, and ambitious plans to revolutionize the Gen Z tech community landscape in Africa.",
    keywords: [
        "Clinton Imaro",
        "Code Space Vision",
        "African Tech Community",
        "Tech Community Letter",
        "Gen Z Tech Future",
        "African Tech Vision",
        "Tech Community Growth",
        "Tech Leadership Africa",
        "Tech Community Impact",
        "African Tech Ecosystem"
    ],
    openGraph: {
        title: "Clinton's Vision for Code Space in 2025 - A Letter to the African Tech Community",
        description: "Discover Clinton Imaro's inspiring vision for Code Space in 2025. Read about our journey, impact on African tech talent, and ambitious plans to revolutionize the Gen Z tech community landscape in Africa.",
        type: "article",
        authors: ["Clinton Imaro"],
        publishedTime: "2024-01-01T00:00:00.000Z",
        modifiedTime: "2024-01-01T00:00:00.000Z",
    },
    twitter: {
        card: "summary_large_image",
        title: "Clinton's Vision for Code Space in 2025 - A Letter to the African Tech Community",
        description: "Discover Clinton Imaro's inspiring vision for Code Space in 2025. Read about our journey, impact on African tech talent, and ambitious plans to revolutionize the Gen Z tech community landscape in Africa.",
        creator: "@CodeSpaceHQ",
    },
    authors: [{ name: "Clinton Imaro", url: "https://www.linkedin.com/in/clintonimaro/" }],
};

export default function LetterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <article className="article-content">
            {children}
        </article>
    );
} 