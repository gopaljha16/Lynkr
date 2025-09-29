import { db } from "@/lib/db";


export async function  getAvailableUsernameSuggestions(base:string , count = 3 , maxTries = 10){
    const suggestions:string[] = []

    for(let i =1 ; suggestions.length < count && i< maxTries ; i++){

        const candidate = `${base}${i}` // potential user name creation for example like john (index ) john 10
        const exists = await db.user.findUnique({
            where:{
                username:candidate
            }
        })

        if(!exists){
            suggestions.push(candidate)
        }
    }

    return suggestions;
} 