// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bycrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if(req.method !== "GET") res.status(405).end()

  try{
    const {userId} = req.query
    if(!userId || typeof userId !== 'string') return res.status(405).end()
    
    
    const existingUser = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    })
    
    console.log('hi')
    return res.status(200).json({...existingUser, followersCount})
  }
  catch(error){
    console.log(error)
    res.status(404).end()
  }
}
