'use client';

import Container from "@/components/container";
import SpaceBadge from "@/components/space-badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    registrationFields: Array<{
        fieldName: string;
        fieldType: string;
        required: boolean;
        placeholder: string;
    }>;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export default function EventRegistrationPage({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
                const response = await fetch(`${BASE_URL}/api/forms/${params.id}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to load event details');
            }
        };

        fetchEvent();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
            const response = await fetch(`${BASE_URL}/api/forms/${params.id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit registration');
            }

            setSuccess(true);
            setFormData({});
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Failed to submit registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto py-10 md:py-20 px-6 md:px-0">
                <div className="space-y-5 flex-col flex justify-center items-center text-center w-full md:w-1/2 mx-auto">
                    <SpaceBadge>Register for Event</SpaceBadge>
                    <div className="flex justify-center">
                        <h1 className="font-medium text-2xl md:text-3xl lg:text-5xl leading-snug">
                            {event.title}
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl subtitle font-normal">
                        {formatDate(event.date)} at {event.time}
                    </p>
                </div>
            </div>

            <Container className="py-10 md:py-20 space-y-10 md:space-y-20 px-6 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={event.featuredImage.url}
                                alt={event.featuredImage.alt}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-semibold mb-4">About the Event</h2>
                            <div className="text-gray-600">{event.description}</div>
                        </div>

                        {event.speakers && event.speakers.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Speakers</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {event.speakers.map((speaker, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                                <Image
                                                    src={speaker.image.url}
                                                    alt={speaker.image.alt}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-lg">{speaker.name}</div>
                                                <div className="text-gray-600">{speaker.title}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 h-fit">
                        <h2 className="text-2xl font-semibold mb-6">Register for the Event</h2>

                        {success ? (
                            <div className="text-center py-8">
                                <h3 className="text-xl font-medium text-green-600 mb-2">
                                    Registration Successful!
                                </h3>
                                <p className="text-gray-600">
                                    Thank you for registering. We&apos;ll send you an email with more details soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {event.registrationFields.map((field, idx) => (
                                    <div key={idx}>
                                        <label
                                            htmlFor={field.fieldName}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            {field.fieldName}
                                            {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type={field.fieldType}
                                            id={field.fieldName}
                                            name={field.fieldName}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            value={formData[field.fieldName] || ''}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    [field.fieldName]: e.target.value,
                                                }))
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                ))}

                                {error && (
                                    <div className="text-red-600 text-sm">{error}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        'Submitting...'
                                    ) : (
                                        <>
                                            Register Now
                                            <ArrowUpRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
} 