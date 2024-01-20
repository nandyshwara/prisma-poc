import { prisma } from "../database/client";
import { publicProcedure, router } from "../trpc";
import { z } from 'zod'




const params = z.object({
    email: z.string().email(),
  });

export const userRouter = router({
    create: publicProcedure.input(z.object({
        name : z.string(),
        country:z.string(),
        email : z.string().email(),
    })).mutation(async({input})=>{
        const user = await prisma.userDetails.create({data : input})
        console.log(user)
        return "User created successfully"
    }),

    getAll : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany();
        return users
    }),
    getfew : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany({
            take : 2,
            skip : 1
        });
        return users
    }),
    getByOrder : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany({
            orderBy : {
                country : "asc"
            },
        });
        return users
    }),
    equalsCountry : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany({
            where : {
                country : { equals : "India"}
            }
        });
        return users
    }),
    incountryList : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany({
            where : {
                country : { in : ["India","America"]}
            }
        });
        return users
    }),
    notincountryList : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany({
            where : {
                country : { notIn : ["India","America"]}
            }
        });
        return users
    }),

    containsGmail : publicProcedure.query(async()=>{
        const users = await prisma.userDetails.findMany({
            where : {
                email : { contains : "@a.com"}
            }
        });
        return users
    }),

    getByEmail : publicProcedure.input(z.object({
        email : z.string().email(),
    })).mutation(async({input})=>{
        console.log(input)
        const users = await prisma.userDetails.findUnique({where : {email : input.email}});
        return users
    }),
})
