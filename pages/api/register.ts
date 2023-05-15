// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bycrypt from 'bcrypt'
import prisma from '@/libs/prismadb'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if(req.method !== "POST") res.status(405).end()

  try{

    const {name, username, email, password} = req.body
    
    const hashedPassword = await bycrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: {
            name, username, email, hashedPassword
        }
    })
    return res.status(200).json(user)
  }
  catch(error){
    console.log(error)
    res.status(404).end()
  }
}
