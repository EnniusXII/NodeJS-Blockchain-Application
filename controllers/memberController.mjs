import { blockchain } from "../startup.mjs";
import ResponseModel from "../utilities/ResponseModel.mjs";

export const listMembers = (req, res, next) => {
    res.status(200).json(new ResponseModel({statusCode: 200, data: blockchain.memberNodes}))
};

export const registerMember = (req, res, next) => {
    const member = req.body;

    if (blockchain.memberNodes.indexOf(member.nodeUrl) === -1 && blockchain.nodeUrl !== member.nodeUrl) {
        blockchain.memberNodes.push(member.nodeUrl);
        syncMembers(member.nodeUrl);

        res.status(201).json(new ResponseModel({statusCode: 201, data: {message: `Member ${req.body.nodeUrl} is registered`}}));
    } else {
        res.status(400).json(new ResponseModel({statusCode: 400, data: {message: `Member ${member.nodeUrl} is already registered`}}));
    }
};

const syncMembers = (url) => {
    const members = [...blockchain.memberNodes, blockchain.nodeUrl];

    try {
        members.forEach(async(member) => {
            await fetch(`${url}/api/v1/members/register`, {
                method: "POST",
                body: JSON.stringify({nodeUrl: member}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        });
    } catch (error) {
        console.log(error);
    }

}