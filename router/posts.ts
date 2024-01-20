// get the me the published posts between jan and march of authors "John" ,"Mary", and "Rosdy".

import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../database/client";


// model Post {
//     id            String      @id @default(uuid())
//     rating        Decimal
//     author        UserDetails @relation("writtenposts", fields: [authorId], references: [id])
//     createdAt     DateTime    @default(now())
//     updatedAt     DateTime    @updatedAt()
//     authorId      String
//     favoritedBy   UserDetails @relation("favoriteposts", fields: [favoritedById], references: [id])
//     favoritedById String
//     catgeories    Category[]
//   }

export const postsRouter = router({
    create: publicProcedure.input(z.object({
        rating: z.number().gt(0),
        authorId: z.string(),
        favoritedById: z.string(),
    })).mutation(async ({ input }) => {
        const post = await prisma.post.create({
            data: input, include: {
                author: true,
                favoritedBy: true
            }
        })
        return post
    }),

    getAll: publicProcedure.query(async () => {
        return await prisma.post.findMany({
            include: {
                author: true,
                favoritedBy: true,
            }
        })
    }),

    getByExpression: publicProcedure.query(async () => {
        return await prisma.post.findMany({
            where: {
                AND: [{
                    author: {
                        country: { in: ["India"] }
                    }
                }, {
                    favoritedBy: {
                        country: { in: ["China"] }
                    }
                }, {
                    rating: { equals: 5 }
                }]
            },
            include: {
                author: true,
                favoritedBy: true
            }
        })
    }),
})