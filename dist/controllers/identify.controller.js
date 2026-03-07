"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyContact = void 0;
const identity_services_1 = require("../services/identity.services");
const identifyContact = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;
        const result = await (0, identity_services_1.identify)(email, phoneNumber);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.identifyContact = identifyContact;
