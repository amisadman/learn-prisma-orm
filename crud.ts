import { toUSVString } from "node:util";
import { ROLE } from "./generated/prisma/enums";
import { prisma } from "./lib/prisma";

// const run = async(name:string, email:string, role?:ROLE)=>{

//     if(role === undefined) role = "USER"
//     const createUser = await prisma.users.create({
//         data:{
//             name: name,
//             email: email,
//             role: role
//         }
//     });
//     console.log("Created User: ", createUser);

// }
// const run = async()=>{

//     const createPost  = await prisma.post.create({
//         data:{
//             title: "Hello",
//             content: "This is my first Post too",
//             isPublished: true,
//             authorId: 2
//         }
//     });
//     console.log("Created Post: ",createPost);

// }

// const run = async () => {
//   const createProfie = await prisma.profile.create({
//     data: {
//       bio: "Learnig web dev",
//       dateOfBirth: "2003-11-01T18:00:00.000Z",
//       userId: 1,
//     },
//   });
//   console.log("created profile", createProfie);
// };


//retrive user data

const run = async()=>{
    const getAllUser = await prisma.users.findMany({
        select:{
            id: true,
            name: true,
            posts: true,
            profile:true
        }
    });
    console.log("Users: ",getAllUser);
    console.dir(getAllUser, {depth:Infinity})
}


// run("Sadman Islam", "sadman@email.com");
// run("Tahmid Rahman", "tahmid@email.com");
// run("Shaheenur Rashid", "rashid@email.com");
// run("Dhiraj Dhar", "vatija@email.com");



run();
