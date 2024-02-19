import prisma from "../db/dbconfig.js";

export let fetchComment=async(req,res)=>{
    let comment=await prisma.comment.findMany({
        include:{
            post:{
                include:{
                    user:true
                }
            },
            user:{
                select:{
                    name:true
                }
            }
        }
    });
    return res.json({status:200,comment});
}

export let createComment=async(req,res)=>{
   
    const {user_id,post_id,comment}=req.body;

    await prisma.post.update({
        where:{
            id:+post_id
        },
        data:{
            comment_count:{
                increment:1
            }
        }
    })
   

    let newComment= await prisma.comment.create({
        data:{
            user_id:+user_id,
            post_id:+post_id,
            comment
        }
    })
    return res.json({status:200, message:newComment})
}

export let updateComment=async(req,res)=>{
    let commentId=req.params.id;
    let {user_id,post_id,comment}=req.body;
    let newPost=await prisma.comment.update({
        where:{
            id:+commentId
        },
        data:{
            user_id:+user_id,
            post_id:+post_id,
            comment
        }
    })
    return res.json({status:200,message:"Comment updated!"});

}

export let showComment=async(req,res)=>{
    let {id}=req.params;
    let comment=await prisma.comment.findUnique({
        where:{
            id:id
        },
        include:{
            post:{
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })
    return res.json({status:200, comment})
}

export let deleteComment= async(req,res)=>{
    let {id}=req.params;

    await prisma.post.update({
        where:{
            id:+id
        },
        data:{
            comment_count:{
                decrement:1
            }
        }
    })

    let delComment=await prisma.comment.deleteMany({
        where:{
            id:+id
        }
    });
    return(res.json({status:200, message:"Comment deleted!"}));
}