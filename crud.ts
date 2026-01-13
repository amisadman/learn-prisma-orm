import { ROLE } from "./generated/prisma/enums";
import { prisma } from "./lib/prisma"

const run = async(name:string, email:string, role?:ROLE)=>{

    if(role === undefined) role = "USER"
    const createUser = await prisma.users.create({
        data:{
            name: name,
            email: email,
            role: role
        }
    });
    console.log("Created User: ", createUser);

}

run("Sadman Islam", "sadman@email.com");
run("Tahmid Rahman", "tahmid@email.com");
run("Shaheenur Rashid", "rashid@email.com");
run("Dhiraj Dhar", "vatija@email.com");