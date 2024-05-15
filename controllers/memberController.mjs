import { blockchain } from "../startup.mjs";

export const listMembers = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain.memberNodes})
};

export const registerMember = (req, res, next) => {
    const member = req.body;

    if (blockchain.memberNodes.indexOf(member.nodeUrl) === -1 && blockchain.nodeUrl !== member.nodeUrl) {
        blockchain.memberNodes.push(member.nodeUrl);

        res.status(201).json({success: true, data: {message: `Member ${req.body.nodeUrl} is registered`}});
    } else {
        res.status(400).json({success: false, data: {message: `Member ${member.nodeUrl} is already registered`}});
    }
};