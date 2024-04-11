import { PrismaClient } from '@prisma/client/edge'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const prisma = new PrismaClient()

export async function getUserData() {
    const session = await getServerSession(authOptions)
    const userid = parseInt(session?.user.id)
    const data = await prisma.user.findUnique(
        {
            where: { id: userid },
        }
    );
    return data;
}

