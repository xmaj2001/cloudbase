"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.FileChunkScalarFieldEnum = exports.NodeScalarFieldEnum = exports.ProviderScalarFieldEnum = exports.OauthConsentScalarFieldEnum = exports.OauthAccessTokenScalarFieldEnum = exports.OauthApplicationScalarFieldEnum = exports.VerificationScalarFieldEnum = exports.AccountScalarFieldEnum = exports.SessionScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    OauthApplication: 'OauthApplication',
    OauthAccessToken: 'OauthAccessToken',
    OauthConsent: 'OauthConsent',
    Provider: 'Provider',
    Node: 'Node',
    FileChunk: 'FileChunk'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    emailVerified: 'emailVerified',
    image: 'image',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.SessionScalarFieldEnum = {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
};
exports.AccountScalarFieldEnum = {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VerificationScalarFieldEnum = {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OauthApplicationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    icon: 'icon',
    metadata: 'metadata',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUrls: 'redirectUrls',
    type: 'type',
    disabled: 'disabled',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OauthAccessTokenScalarFieldEnum = {
    id: 'id',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    clientId: 'clientId',
    userId: 'userId',
    scopes: 'scopes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OauthConsentScalarFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    userId: 'userId',
    scopes: 'scopes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    consentGiven: 'consentGiven'
};
exports.ProviderScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    displayName: 'displayName',
    isActive: 'isActive',
    priority: 'priority',
    credentials: 'credentials',
    folderPath: 'folderPath',
    lastSyncAt: 'lastSyncAt',
    syncError: 'syncError',
    totalSpace: 'totalSpace',
    usedSpace: 'usedSpace',
    availableSpace: 'availableSpace',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NodeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    name: 'name',
    mimeType: 'mimeType',
    extension: 'extension',
    size: 'size',
    isFragmented: 'isFragmented',
    totalChunks: 'totalChunks',
    originalHash: 'originalHash',
    providerId: 'providerId',
    providerFileId: 'providerFileId',
    providerPath: 'providerPath',
    providerCreatedAt: 'providerCreatedAt',
    providerUpdatedAt: 'providerUpdatedAt',
    parentId: 'parentId',
    trashedAt: 'trashedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FileChunkScalarFieldEnum = {
    id: 'id',
    chunkIndex: 'chunkIndex',
    size: 'size',
    startByte: 'startByte',
    endByte: 'endByte',
    chunkHash: 'chunkHash',
    nodeId: 'nodeId',
    providerId: 'providerId',
    providerFileId: 'providerFileId',
    providerPath: 'providerPath',
    providerCreatedAt: 'providerCreatedAt',
    providerUpdatedAt: 'providerUpdatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map