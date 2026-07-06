import { createNode } from "./features/create-node";
import { getNodes, getNodeById } from "./features/get-nodes";
import { renameNode, moveNodeToTrash, deleteNodePermanently } from "./features/mutations-node";


export const nodeService = {
    getNodes,
    getNodeById,
    createNode,
    renameNode,
    moveNodeToTrash,
    deleteNodePermanently
}