import express from "express"
import cors from "cors"
import {createExpressMiddleware} from "@trpc/server/adapters/express"
import { appRouter } from "./router"
const app = express()

app.use(cors())
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
);

const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
});

export type AppRouter = typeof appRouter;
