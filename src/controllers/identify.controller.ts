import { Request, Response } from "express"
import { identify } from "../services/identity.services"

export const identifyContact = async (req: Request, res: Response) => {

 try {

  const { email, phoneNumber } = req.body

  const result = await identify(email, phoneNumber)

  res.status(200).json(result)

 } catch (error) {

  console.error(error)
  res.status(500).json({ error: "Internal Server Error" })

 }
}