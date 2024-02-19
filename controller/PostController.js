import prisma from "../db/dbconfig.js";

export let fetchposts=async(req,res)=>{
    let posts=await prisma.post.findMany({
        include:{
            comment:{
                include:{
                    user:{
                        select:{ name:true}
                    }
                }
            }
        },
        orderBy:{
            id:"desc"
        },
        where:{
            comment_count:{
                gt:0
            }
        }
    });
    return res.json({status:200,posts});
}

export let createPost=async(req,res)=>{
   
    const {user_id, title, description}=req.body;
   

    let newPost= await prisma.post.create({
        data:{
            user_id:+user_id,
            title,
            description
        }
    })
    return res.json({status:200, message:newPost})
}

export let updatePost=async(req,res)=>{
    let postId=req.params.id;
    let {user_id, title, description}=req.body;
    let newPost=await prisma.post.update({
        where:{
            id:+postId
        },
        data:{
            user_id, title, description
        }
    })
    return res.json({status:200,message:"post updated!"});

}

export let showPost=async(req,res)=>{
    let {id}=req.params;
    let post=await prisma.post.findUnique({
        where:{
            id:+id
        }
    })
    return res.json({status:200, post})
}

export let deletePost= async(req,res)=>{
    let {id}=req.params;
    let delPost=await prisma.post.deleteMany({
        where:{
            id:+id
        }
    });
    return(res.json({status:200, message:"Post deleted!"}));
}