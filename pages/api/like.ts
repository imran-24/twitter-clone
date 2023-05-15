// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import serverAuth from '@/libs/serverAuth';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if(req.method !== "POST" && req.method !== "DELETE"){
        return res.status(405).end()
    }

    try{
        const {postId} = req.body;
        if(!postId || typeof postId !== "string"){
            throw new Error("Invalid postId")
        }
        const {currentUser} = await serverAuth(req, res)

        const post = await prisma?.post.findUnique({
            where:{
                id: postId
            }
        })

        if(!post){
            throw new Error("Invalid postId")
        }
        
        let updatedLikedIds = [...(post.likedIds || [])]

        if(req.method === 'POST'){
            updatedLikedIds.push(currentUser.id)
        }
        if(req.method === "DELETE"){
            updatedLikedIds.filter( likedId => likedId !== currentUser.id )
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId 
            },
            data:{
                likedIds: updatedLikedIds
            }
        })
        return res.status(200).json(updatedPost)
    }
    catch(error){
        console.log(error)
        res.status(400).end()
    }
  res.status(200).json({ name: 'John Doe' })
}
