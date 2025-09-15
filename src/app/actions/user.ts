import User from "@/models/User.model";
import {connectToDatabase} from "@/lib/db";

export async function getUser(id:string) {
    // console.log("Fetching user with ID:", id);
    try{
     connectToDatabase();
     type UserType = {
        _id: string;
        username: string;
        email: string;
        password?: string;
        createdAt?: Date;
        updatedAt?: Date;
     }
     const user = await User.findOne({_id:id}).lean().select('-password');  
     return user as UserType | null; 

    }catch(error){
        console.error("Error fetching user:", error);
        return null;
    }
}
