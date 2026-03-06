import {
 findMatchingContacts,
 createPrimary,
 createSecondary,
 updateToSecondary,
 findAllLinked
} from "../repositories/contact.repository"

import { buildResponse } from "../utils/responseBuilder"

interface Contact {
 id: number
 email?: string | null
 phoneNumber?: string | null
 linkPrecedence: string
 createdAt: Date
}

export const identify = async (email?: string, phone?: string) => {

 const matches: Contact[] = await findMatchingContacts(email, phone)

 if (matches.length === 0) {

  const primary = await createPrimary(email, phone)

  return buildResponse([primary])

 }

 const primaries = matches.filter(c => c.linkPrecedence === "primary")

 let primary = primaries[0]

 if (primaries.length > 1) {

  primary = primaries.reduce((oldest, current) =>
   current.createdAt < oldest.createdAt ? current : oldest
  )

  for (const p of primaries) {
   if (p.id !== primary.id) {
    await updateToSecondary(p.id, primary.id)
   }
  }

 }

 const existingEmail = matches.some(c => c.email === email)
 const existingPhone = matches.some(c => c.phoneNumber === phone)

 if (!existingEmail || !existingPhone) {
  await createSecondary(primary.id, email, phone)
 }

 const linkedContacts = await findAllLinked(primary.id)

 return buildResponse(linkedContacts)

}