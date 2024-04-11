import { PrismaClient } from '@prisma/client/edge'
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";



const prisma = new PrismaClient()


export async function POST(request: Request) {
    const body = await request.json();
    const { firstName, lastName, emailAddress, password } = body;

    // Validate the input (e.g., check if email is already in use)
    const existingUser = await prisma.user.findUnique({
        where: { email: emailAddress },
    });

    if (existingUser) {
        return new NextResponse(JSON.stringify({ error: 'Email already in use' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email: emailAddress,
            password: hashedPassword,
        },
    });

    return new NextResponse(JSON.stringify({ message: 'User created successfully', user }), { status: 200 });
}


export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'No session found' }), { status: 400 });
    }

    const data = await prisma.user.findMany(
    );
    console.log(data)
    return NextResponse.json(data);

}
