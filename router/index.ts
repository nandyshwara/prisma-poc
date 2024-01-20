import {router , publicProcedure} from "../trpc"
import { postsRouter } from "./posts"
import { userRouter } from "./user"

const appRouter = router({
     greeting : publicProcedure.query(()=>{
        return "hello"
     }),
     user : userRouter,
     post : postsRouter
})

export {appRouter}