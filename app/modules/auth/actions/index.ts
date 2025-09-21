"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const onBoardUser = async()=>{
    try{
        //   current logged in user
        const user = await currentUser()
        if(!user){
            return {
                success:false , error:"No authenticated user found"
            }
        }

        //  
        const {id , firstName , lastName , imageUrl ,emailAddresses } = user;
        const newUser = await db.user.upsert({
            where:{
                clerkId:id
            },
            update:{
                firstName:firstName || null,
                lastName:lastName || null,
                imageUrl:imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            },
            create:{
                clerkId:id,
                firstName:firstName || null,
                lastName:lastName || null,
                imageUrl:imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            }
        })

          return {
            success:true,
            user:newUser,
            message:"User Onboarded successfully"
          }
    }catch(err){
        return {
            success:false,
            message:" Failed to onbaord user"
        }
    }
}