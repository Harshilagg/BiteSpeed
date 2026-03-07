"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identify = void 0;
const contact_repository_1 = require("../repositories/contact.repository");
const responseBuilder_1 = require("../utils/responseBuilder");
const identify = async (email, phone) => {
    const matches = await (0, contact_repository_1.findMatchingContacts)(email, phone);
    if (matches.length === 0) {
        const primary = await (0, contact_repository_1.createPrimary)(email, phone);
        return (0, responseBuilder_1.buildResponse)([primary]);
    }
    const primaries = matches.filter(c => c.linkPrecedence === "primary");
    let primary = primaries[0];
    if (primaries.length > 1) {
        primary = primaries.reduce((oldest, current) => current.createdAt < oldest.createdAt ? current : oldest);
        for (const p of primaries) {
            if (p.id !== primary.id) {
                await (0, contact_repository_1.updateToSecondary)(p.id, primary.id);
            }
        }
    }
    const existingEmail = matches.some(c => c.email === email);
    const existingPhone = matches.some(c => c.phoneNumber === phone);
    if (!existingEmail || !existingPhone) {
        await (0, contact_repository_1.createSecondary)(primary.id, email, phone);
    }
    const linkedContacts = await (0, contact_repository_1.findAllLinked)(primary.id);
    return (0, responseBuilder_1.buildResponse)(linkedContacts);
};
exports.identify = identify;
