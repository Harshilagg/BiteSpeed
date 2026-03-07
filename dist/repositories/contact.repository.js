"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllLinked = exports.updateToSecondary = exports.createSecondary = exports.createPrimary = exports.findMatchingContacts = void 0;
const prisma_1 = require("../utils/prisma");
const findMatchingContacts = async (email, phone) => {
    return prisma_1.prisma.contact.findMany({
        where: {
            OR: [
                { email: email ?? undefined },
                { phoneNumber: phone ?? undefined }
            ]
        },
        orderBy: {
            createdAt: "asc"
        }
    });
};
exports.findMatchingContacts = findMatchingContacts;
const createPrimary = async (email, phone) => {
    return prisma_1.prisma.contact.create({
        data: {
            email,
            phoneNumber: phone,
            linkPrecedence: "primary"
        }
    });
};
exports.createPrimary = createPrimary;
const createSecondary = async (primaryId, email, phone) => {
    return prisma_1.prisma.contact.create({
        data: {
            email,
            phoneNumber: phone,
            linkedId: primaryId,
            linkPrecedence: "secondary"
        }
    });
};
exports.createSecondary = createSecondary;
const updateToSecondary = async (id, primaryId) => {
    return prisma_1.prisma.contact.update({
        where: { id },
        data: {
            linkedId: primaryId,
            linkPrecedence: "secondary"
        }
    });
};
exports.updateToSecondary = updateToSecondary;
const findAllLinked = async (primaryId) => {
    return prisma_1.prisma.contact.findMany({
        where: {
            OR: [
                { id: primaryId },
                { linkedId: primaryId }
            ]
        }
    });
};
exports.findAllLinked = findAllLinked;
