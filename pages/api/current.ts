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

    const {currentUser} = await serverAuth(req, res)
    
    return res.status(200).json(currentUser)
  }
  catch(error){
    console.log(error)
    res.status(404).end()
  }
}
