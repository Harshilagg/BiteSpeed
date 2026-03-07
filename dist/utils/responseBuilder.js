"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = void 0;
const buildResponse = (contacts) => {
    const primary = contacts.find(c => c.linkPrecedence === "primary");
    const emails = [...new Set(contacts.map(c => c.email).filter(Boolean))];
    const phones = [...new Set(contacts.map(c => c.phoneNumber).filter(Boolean))];
    const secondaryIds = contacts
        .filter(c => c.linkPrecedence === "secondary")
        .map(c => c.id);
    return {
        contact: {
            primaryContactId: primary.id,
            emails,
            phoneNumbers: phones,
            secondaryContactIds: secondaryIds
        }
    };
};
exports.buildResponse = buildResponse;
