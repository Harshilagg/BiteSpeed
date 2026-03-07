"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const identify_controller_1 = require("../controllers/identify.controller");
const router = (0, express_1.Router)();
router.post("/", identify_controller_1.identifyContact);
exports.default = router;
