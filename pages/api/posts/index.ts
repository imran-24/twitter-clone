// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bycrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'
import useCurrentUser from '@/hooks/useCurrentUser'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if(req.method !== "GET" && req.method !== 'POST') res.status(405).end()

  try{
    if(req.method == "GET"){
        const {userId} = req.query

        let posts;
        if(userId && typeof userId === 'string'){
            posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where:{
                    userId: userId
                },
                include:{
                    user: true,
                    comments: true
                }
            })
        }
        else{
            posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include:{
                    user: true,
                    comments: true
                }
            })
            
        }
            
        return res.status(200).json(posts)
    }

    if(req.method == "POST"){
        const {currentUser} = await serverAuth(req, res)
        const {body} = req.body
        const posts = await prisma.post.create({
            data:{
                body,
                userId: currentUser.id
            }
        })
        return res.status(200).json(posts)
    }
    
    
    
  }
  catch(error){
    console.log(error)
    res.status(404).end()
  }
}
