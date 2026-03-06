import { prisma } from "../utils/prisma"

export const findMatchingContacts = async (email?: string, phone?: string) => {

 return prisma.contact.findMany({
  where: {
   OR: [
    { email: email ?? undefined },
    { phoneNumber: phone ?? undefined }
   ]
  },
  orderBy: {
   createdAt: "asc"
  }
 })

}

export const createPrimary = async (email?: string, phone?: string) => {

 return prisma.contact.create({
  data: {
   email,
   phoneNumber: phone,
   linkPrecedence: "primary"
  }
 })

}

export const createSecondary = async (
 primaryId: number,
 email?: string,
 phone?: string
) => {

 return prisma.contact.create({
  data: {
   email,
   phoneNumber: phone,
   linkedId: primaryId,
   linkPrecedence: "secondary"
  }
 })

}

export const updateToSecondary = async (
 id: number,
 primaryId: number
) => {

 return prisma.contact.update({
  where: { id },
  data: {
   linkedId: primaryId,
   linkPrecedence: "secondary"
  }
 })

}

export const findAllLinked = async (primaryId: number) => {

 return prisma.contact.findMany({
  where: {
   OR: [
    { id: primaryId },
    { linkedId: primaryId }
   ]
  }
 })

}