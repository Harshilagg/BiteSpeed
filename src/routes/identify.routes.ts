import { Router } from "express"
import { identifyContact } from "../controllers/identify.controller"

const router = Router()

router.post("/", identifyContact)

export default router