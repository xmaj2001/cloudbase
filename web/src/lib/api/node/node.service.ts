import { getNodes, getNodeById } from "./features/get-nodes";
import { createFileNode, createFolderNode } from "./features/create-node";
import { renameNode, moveNodeToTrash, deleteNodePermanently } from "./features/mutations-node";


export const nodeService = {
    getNodes,
    getNodeById,
    createFileNode,
    createFolderNode,
    renameNode,
    moveNodeToTrash,
    deleteNodePermanently
}