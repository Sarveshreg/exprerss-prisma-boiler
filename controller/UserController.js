import prisma from "../db/dbconfig.js";

export let fetchUsers=async(req,res)=>{
    let users=await prisma.users.findMany({
        include:{
            post:{
                select:{
                title:true,
                comment_count:true
                }
            }
        }
        // select:{
            
        //     _count:{
        //         select:{
        //             post:true,
        //             comment:true
        //         }
        //     }
        // }
    });
    return res.json({status:200,users});
}

export let createUser=async(req,res)=>{
   
    const {name, email, password}=req.body;
    const findUser=await prisma.users.findUnique({
        where:{
            email
        }
    })

    if(findUser){
        return res.json({status:400, message:"username already exists!"})
    }

    let newUser= await prisma.users.create({
        data:{
            name,
            email,
            password
        }
    })
    return res.json({status:200, message:newUser})
}

export let updateuser=async(req,res)=>{
    let userId=req.params.id;
    let {name, email, password}=req.body;
    let newUser=await prisma.users.update({
        where:{
            id:+userId
        },
        data:{
            name,email,password
        }
    })
    return res.json({status:200,message:"user updated!"});

}

export let showUser=async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    let user=await prisma.users.findUnique({
        where:{
            id:+id
        }
    })
    return res.json({status:200, user})
}

export let deleteUser= async(req,res)=>{
    let {id}=req.params;
    let delUser=await prisma.users.deleteMany({
        where:{
            id:+id
        }
    });
    return(res.json({status:200, message:"user deleted"}));
}