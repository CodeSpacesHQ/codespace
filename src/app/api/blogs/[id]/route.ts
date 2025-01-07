import { NextResponse } from 'next/server';
import payload from 'payload';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const blog = await payload.findByID({
            collection: 'blog',
            id: params.id,
        });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
} 