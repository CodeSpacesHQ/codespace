import Container from "@/components/container";
import SpaceBadge from "@/components/space-badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    description: string;
    featuredImage: {
        url: string;
        alt: string;
    };
    speakers: Array<{
        name: string;
        title: string;
        image: {
            url: string;
            alt: string;
        };
    }>;
}

async function getForms(): Promise<Event[]> {
    const BASE_URL = process.env.BASE_URL;
    try {
        console.log('Fetching forms from:', `${BASE_URL}/api/forms`);
        const response = await fetch(`${BASE_URL}/api/forms`, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Forms data received:', data);

        if (!Array.isArray(data)) {
            console.error('Received non-array data:', data);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error fetching forms:', error);
        return [];
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export default async function FormsPage() {
    const forms = await getForms();

    return (
        <>
            <div className="container mx-auto py-10 md:py-20 px-6 md:px-0">
                <div className="space-y-5 flex-col flex justify-center items-center text-center w-full md:w-1/2 mx-auto">
                    <SpaceBadge>Events & Registration</SpaceBadge>
                    <div className="flex justify-center">
                        <h1 className="font-medium text-2xl md:text-3xl lg:text-5xl leading-snug">
                            Join Our Upcoming Events
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl subtitle font-normal">
                        Register for our upcoming events and be part of the Code Space community.
                    </p>
                </div>
            </div>

            <Container className="py-10 md:py-20 space-y-10 md:space-y-20 px-6 md:px-0">
                <div className="grid grid-cols-1 gap-8">
                    {forms.map((form) => (
                        <div
                            key={form.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-2/5">
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={form.featuredImage.url}
                                            alt={form.featuredImage.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-gray-600">
                                            {formatDate(form.date)} at {form.time}
                                        </div>
                                        <h2 className="text-2xl font-semibold">{form.title}</h2>
                                        <p className="text-gray-600 line-clamp-3">{form.description}</p>
                                    </div>

                                    {form.speakers && form.speakers.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="font-medium">Speakers</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {form.speakers.map((speaker, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                            <Image
                                                                src={speaker.image.url}
                                                                alt={speaker.image.alt}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{speaker.name}</div>
                                                            <div className="text-sm text-gray-600">{speaker.title}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Link
                                        href={`/forms/${form.id}`}
                                        className="inline-flex items-center gap-2 text-primary hover:underline group"
                                    >
                                        Register Now
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
} 