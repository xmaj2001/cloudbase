import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OauthAccessTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$OauthAccessTokenPayload>;
export type AggregateOauthAccessToken = {
    _count: OauthAccessTokenCountAggregateOutputType | null;
    _min: OauthAccessTokenMinAggregateOutputType | null;
    _max: OauthAccessTokenMaxAggregateOutputType | null;
};
export type OauthAccessTokenMinAggregateOutputType = {
    id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    clientId: string | null;
    userId: string | null;
    scopes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OauthAccessTokenMaxAggregateOutputType = {
    id: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    clientId: string | null;
    userId: string | null;
    scopes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OauthAccessTokenCountAggregateOutputType = {
    id: number;
    accessToken: number;
    refreshToken: number;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    clientId: number;
    userId: number;
    scopes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OauthAccessTokenMinAggregateInputType = {
    id?: true;
    accessToken?: true;
    refreshToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    clientId?: true;
    userId?: true;
    scopes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OauthAccessTokenMaxAggregateInputType = {
    id?: true;
    accessToken?: true;
    refreshToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    clientId?: true;
    userId?: true;
    scopes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OauthAccessTokenCountAggregateInputType = {
    id?: true;
    accessToken?: true;
    refreshToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    clientId?: true;
    userId?: true;
    scopes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OauthAccessTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccessTokenWhereInput;
    orderBy?: Prisma.OauthAccessTokenOrderByWithRelationInput | Prisma.OauthAccessTokenOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccessTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OauthAccessTokenCountAggregateInputType;
    _min?: OauthAccessTokenMinAggregateInputType;
    _max?: OauthAccessTokenMaxAggregateInputType;
};
export type GetOauthAccessTokenAggregateType<T extends OauthAccessTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateOauthAccessToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOauthAccessToken[P]> : Prisma.GetScalarType<T[P], AggregateOauthAccessToken[P]>;
};
export type OauthAccessTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccessTokenWhereInput;
    orderBy?: Prisma.OauthAccessTokenOrderByWithAggregationInput | Prisma.OauthAccessTokenOrderByWithAggregationInput[];
    by: Prisma.OauthAccessTokenScalarFieldEnum[] | Prisma.OauthAccessTokenScalarFieldEnum;
    having?: Prisma.OauthAccessTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OauthAccessTokenCountAggregateInputType | true;
    _min?: OauthAccessTokenMinAggregateInputType;
    _max?: OauthAccessTokenMaxAggregateInputType;
};
export type OauthAccessTokenGroupByOutputType = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    clientId: string;
    userId: string | null;
    scopes: string;
    createdAt: Date;
    updatedAt: Date;
    _count: OauthAccessTokenCountAggregateOutputType | null;
    _min: OauthAccessTokenMinAggregateOutputType | null;
    _max: OauthAccessTokenMaxAggregateOutputType | null;
};
export type GetOauthAccessTokenGroupByPayload<T extends OauthAccessTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OauthAccessTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OauthAccessTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OauthAccessTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OauthAccessTokenGroupByOutputType[P]>;
}>>;
export type OauthAccessTokenWhereInput = {
    AND?: Prisma.OauthAccessTokenWhereInput | Prisma.OauthAccessTokenWhereInput[];
    OR?: Prisma.OauthAccessTokenWhereInput[];
    NOT?: Prisma.OauthAccessTokenWhereInput | Prisma.OauthAccessTokenWhereInput[];
    id?: Prisma.StringFilter<"OauthAccessToken"> | string;
    accessToken?: Prisma.StringFilter<"OauthAccessToken"> | string;
    refreshToken?: Prisma.StringFilter<"OauthAccessToken"> | string;
    accessTokenExpiresAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    clientId?: Prisma.StringFilter<"OauthAccessToken"> | string;
    userId?: Prisma.StringNullableFilter<"OauthAccessToken"> | string | null;
    scopes?: Prisma.StringFilter<"OauthAccessToken"> | string;
    createdAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    oauthapplication?: Prisma.XOR<Prisma.OauthApplicationScalarRelationFilter, Prisma.OauthApplicationWhereInput>;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type OauthAccessTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    accessTokenExpiresAt?: Prisma.SortOrder;
    refreshTokenExpiresAt?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    oauthapplication?: Prisma.OauthApplicationOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type OauthAccessTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    AND?: Prisma.OauthAccessTokenWhereInput | Prisma.OauthAccessTokenWhereInput[];
    OR?: Prisma.OauthAccessTokenWhereInput[];
    NOT?: Prisma.OauthAccessTokenWhereInput | Prisma.OauthAccessTokenWhereInput[];
    accessTokenExpiresAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    clientId?: Prisma.StringFilter<"OauthAccessToken"> | string;
    userId?: Prisma.StringNullableFilter<"OauthAccessToken"> | string | null;
    scopes?: Prisma.StringFilter<"OauthAccessToken"> | string;
    createdAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    oauthapplication?: Prisma.XOR<Prisma.OauthApplicationScalarRelationFilter, Prisma.OauthApplicationWhereInput>;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "accessToken" | "refreshToken">;
export type OauthAccessTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    accessTokenExpiresAt?: Prisma.SortOrder;
    refreshTokenExpiresAt?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OauthAccessTokenCountOrderByAggregateInput;
    _max?: Prisma.OauthAccessTokenMaxOrderByAggregateInput;
    _min?: Prisma.OauthAccessTokenMinOrderByAggregateInput;
};
export type OauthAccessTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.OauthAccessTokenScalarWhereWithAggregatesInput | Prisma.OauthAccessTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.OauthAccessTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OauthAccessTokenScalarWhereWithAggregatesInput | Prisma.OauthAccessTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OauthAccessToken"> | string;
    accessToken?: Prisma.StringWithAggregatesFilter<"OauthAccessToken"> | string;
    refreshToken?: Prisma.StringWithAggregatesFilter<"OauthAccessToken"> | string;
    accessTokenExpiresAt?: Prisma.DateTimeWithAggregatesFilter<"OauthAccessToken"> | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeWithAggregatesFilter<"OauthAccessToken"> | Date | string;
    clientId?: Prisma.StringWithAggregatesFilter<"OauthAccessToken"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"OauthAccessToken"> | string | null;
    scopes?: Prisma.StringWithAggregatesFilter<"OauthAccessToken"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OauthAccessToken"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OauthAccessToken"> | Date | string;
};
export type OauthAccessTokenCreateInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthapplication: Prisma.OauthApplicationCreateNestedOneWithoutOauthaccesstokensInput;
    user?: Prisma.UserCreateNestedOneWithoutOauthAccessTokensInput;
};
export type OauthAccessTokenUncheckedCreateInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    clientId: string;
    userId?: string | null;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthAccessTokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthapplication?: Prisma.OauthApplicationUpdateOneRequiredWithoutOauthaccesstokensNestedInput;
    user?: Prisma.UserUpdateOneWithoutOauthAccessTokensNestedInput;
};
export type OauthAccessTokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenCreateManyInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    clientId: string;
    userId?: string | null;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthAccessTokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenListRelationFilter = {
    every?: Prisma.OauthAccessTokenWhereInput;
    some?: Prisma.OauthAccessTokenWhereInput;
    none?: Prisma.OauthAccessTokenWhereInput;
};
export type OauthAccessTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OauthAccessTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    accessTokenExpiresAt?: Prisma.SortOrder;
    refreshTokenExpiresAt?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthAccessTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    accessTokenExpiresAt?: Prisma.SortOrder;
    refreshTokenExpiresAt?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthAccessTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    accessTokenExpiresAt?: Prisma.SortOrder;
    refreshTokenExpiresAt?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthAccessTokenCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutUserInput, Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput> | Prisma.OauthAccessTokenCreateWithoutUserInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput | Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyUserInputEnvelope;
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
};
export type OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutUserInput, Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput> | Prisma.OauthAccessTokenCreateWithoutUserInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput | Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyUserInputEnvelope;
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
};
export type OauthAccessTokenUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutUserInput, Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput> | Prisma.OauthAccessTokenCreateWithoutUserInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput | Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyUserInputEnvelope;
    set?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    disconnect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    delete?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    update?: Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OauthAccessTokenUpdateManyWithWhereWithoutUserInput | Prisma.OauthAccessTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OauthAccessTokenScalarWhereInput | Prisma.OauthAccessTokenScalarWhereInput[];
};
export type OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutUserInput, Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput> | Prisma.OauthAccessTokenCreateWithoutUserInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput | Prisma.OauthAccessTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyUserInputEnvelope;
    set?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    disconnect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    delete?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    update?: Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OauthAccessTokenUpdateManyWithWhereWithoutUserInput | Prisma.OauthAccessTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OauthAccessTokenScalarWhereInput | Prisma.OauthAccessTokenScalarWhereInput[];
};
export type OauthAccessTokenCreateNestedManyWithoutOauthapplicationInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyOauthapplicationInputEnvelope;
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
};
export type OauthAccessTokenUncheckedCreateNestedManyWithoutOauthapplicationInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyOauthapplicationInputEnvelope;
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
};
export type OauthAccessTokenUpdateManyWithoutOauthapplicationNestedInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput[];
    upsert?: Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyOauthapplicationInputEnvelope;
    set?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    disconnect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    delete?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    update?: Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutOauthapplicationInput[];
    updateMany?: Prisma.OauthAccessTokenUpdateManyWithWhereWithoutOauthapplicationInput | Prisma.OauthAccessTokenUpdateManyWithWhereWithoutOauthapplicationInput[];
    deleteMany?: Prisma.OauthAccessTokenScalarWhereInput | Prisma.OauthAccessTokenScalarWhereInput[];
};
export type OauthAccessTokenUncheckedUpdateManyWithoutOauthapplicationNestedInput = {
    create?: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput[] | Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput[];
    upsert?: Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthAccessTokenUpsertWithWhereUniqueWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthAccessTokenCreateManyOauthapplicationInputEnvelope;
    set?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    disconnect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    delete?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    connect?: Prisma.OauthAccessTokenWhereUniqueInput | Prisma.OauthAccessTokenWhereUniqueInput[];
    update?: Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthAccessTokenUpdateWithWhereUniqueWithoutOauthapplicationInput[];
    updateMany?: Prisma.OauthAccessTokenUpdateManyWithWhereWithoutOauthapplicationInput | Prisma.OauthAccessTokenUpdateManyWithWhereWithoutOauthapplicationInput[];
    deleteMany?: Prisma.OauthAccessTokenScalarWhereInput | Prisma.OauthAccessTokenScalarWhereInput[];
};
export type OauthAccessTokenCreateWithoutUserInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthapplication: Prisma.OauthApplicationCreateNestedOneWithoutOauthaccesstokensInput;
};
export type OauthAccessTokenUncheckedCreateWithoutUserInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    clientId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthAccessTokenCreateOrConnectWithoutUserInput = {
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutUserInput, Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput>;
};
export type OauthAccessTokenCreateManyUserInputEnvelope = {
    data: Prisma.OauthAccessTokenCreateManyUserInput | Prisma.OauthAccessTokenCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OauthAccessTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.OauthAccessTokenUpdateWithoutUserInput, Prisma.OauthAccessTokenUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutUserInput, Prisma.OauthAccessTokenUncheckedCreateWithoutUserInput>;
};
export type OauthAccessTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateWithoutUserInput, Prisma.OauthAccessTokenUncheckedUpdateWithoutUserInput>;
};
export type OauthAccessTokenUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OauthAccessTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateManyMutationInput, Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserInput>;
};
export type OauthAccessTokenScalarWhereInput = {
    AND?: Prisma.OauthAccessTokenScalarWhereInput | Prisma.OauthAccessTokenScalarWhereInput[];
    OR?: Prisma.OauthAccessTokenScalarWhereInput[];
    NOT?: Prisma.OauthAccessTokenScalarWhereInput | Prisma.OauthAccessTokenScalarWhereInput[];
    id?: Prisma.StringFilter<"OauthAccessToken"> | string;
    accessToken?: Prisma.StringFilter<"OauthAccessToken"> | string;
    refreshToken?: Prisma.StringFilter<"OauthAccessToken"> | string;
    accessTokenExpiresAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    clientId?: Prisma.StringFilter<"OauthAccessToken"> | string;
    userId?: Prisma.StringNullableFilter<"OauthAccessToken"> | string | null;
    scopes?: Prisma.StringFilter<"OauthAccessToken"> | string;
    createdAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthAccessToken"> | Date | string;
};
export type OauthAccessTokenCreateWithoutOauthapplicationInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutOauthAccessTokensInput;
};
export type OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    userId?: string | null;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthAccessTokenCreateOrConnectWithoutOauthapplicationInput = {
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput>;
};
export type OauthAccessTokenCreateManyOauthapplicationInputEnvelope = {
    data: Prisma.OauthAccessTokenCreateManyOauthapplicationInput | Prisma.OauthAccessTokenCreateManyOauthapplicationInput[];
    skipDuplicates?: boolean;
};
export type OauthAccessTokenUpsertWithWhereUniqueWithoutOauthapplicationInput = {
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.OauthAccessTokenUpdateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedUpdateWithoutOauthapplicationInput>;
    create: Prisma.XOR<Prisma.OauthAccessTokenCreateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedCreateWithoutOauthapplicationInput>;
};
export type OauthAccessTokenUpdateWithWhereUniqueWithoutOauthapplicationInput = {
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateWithoutOauthapplicationInput, Prisma.OauthAccessTokenUncheckedUpdateWithoutOauthapplicationInput>;
};
export type OauthAccessTokenUpdateManyWithWhereWithoutOauthapplicationInput = {
    where: Prisma.OauthAccessTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateManyMutationInput, Prisma.OauthAccessTokenUncheckedUpdateManyWithoutOauthapplicationInput>;
};
export type OauthAccessTokenCreateManyUserInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    clientId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthAccessTokenUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthapplication?: Prisma.OauthApplicationUpdateOneRequiredWithoutOauthaccesstokensNestedInput;
};
export type OauthAccessTokenUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenCreateManyOauthapplicationInput = {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date | string;
    refreshTokenExpiresAt: Date | string;
    userId?: string | null;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthAccessTokenUpdateWithoutOauthapplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutOauthAccessTokensNestedInput;
};
export type OauthAccessTokenUncheckedUpdateWithoutOauthapplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenUncheckedUpdateManyWithoutOauthapplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.StringFieldUpdateOperationsInput | string;
    accessTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokenExpiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccessTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.OauthAccessToken$userArgs<ExtArgs>;
}, ExtArgs["result"]["oauthAccessToken"]>;
export type OauthAccessTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.OauthAccessToken$userArgs<ExtArgs>;
}, ExtArgs["result"]["oauthAccessToken"]>;
export type OauthAccessTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.OauthAccessToken$userArgs<ExtArgs>;
}, ExtArgs["result"]["oauthAccessToken"]>;
export type OauthAccessTokenSelectScalar = {
    id?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OauthAccessTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accessToken" | "refreshToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "clientId" | "userId" | "scopes" | "createdAt" | "updatedAt", ExtArgs["result"]["oauthAccessToken"]>;
export type OauthAccessTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.OauthAccessToken$userArgs<ExtArgs>;
};
export type OauthAccessTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.OauthAccessToken$userArgs<ExtArgs>;
};
export type OauthAccessTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.OauthAccessToken$userArgs<ExtArgs>;
};
export type $OauthAccessTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OauthAccessToken";
    objects: {
        oauthapplication: Prisma.$OauthApplicationPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresAt: Date;
        refreshTokenExpiresAt: Date;
        clientId: string;
        userId: string | null;
        scopes: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["oauthAccessToken"]>;
    composites: {};
};
export type OauthAccessTokenGetPayload<S extends boolean | null | undefined | OauthAccessTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload, S>;
export type OauthAccessTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OauthAccessTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OauthAccessTokenCountAggregateInputType | true;
};
export interface OauthAccessTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OauthAccessToken'];
        meta: {
            name: 'OauthAccessToken';
        };
    };
    findUnique<T extends OauthAccessTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OauthAccessTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OauthAccessTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, OauthAccessTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OauthAccessTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OauthAccessTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OauthAccessTokenFindManyArgs>(args?: Prisma.SelectSubset<T, OauthAccessTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OauthAccessTokenCreateArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenCreateArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OauthAccessTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, OauthAccessTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OauthAccessTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OauthAccessTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OauthAccessTokenDeleteArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OauthAccessTokenUpdateArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OauthAccessTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, OauthAccessTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OauthAccessTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OauthAccessTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OauthAccessTokenUpsertArgs>(args: Prisma.SelectSubset<T, OauthAccessTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__OauthAccessTokenClient<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OauthAccessTokenCountArgs>(args?: Prisma.Subset<T, OauthAccessTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OauthAccessTokenCountAggregateOutputType> : number>;
    aggregate<T extends OauthAccessTokenAggregateArgs>(args: Prisma.Subset<T, OauthAccessTokenAggregateArgs>): Prisma.PrismaPromise<GetOauthAccessTokenAggregateType<T>>;
    groupBy<T extends OauthAccessTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OauthAccessTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: OauthAccessTokenGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OauthAccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthAccessTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OauthAccessTokenFieldRefs;
}
export interface Prisma__OauthAccessTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    oauthapplication<T extends Prisma.OauthApplicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OauthApplicationDefaultArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.OauthAccessToken$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OauthAccessToken$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OauthAccessTokenFieldRefs {
    readonly id: Prisma.FieldRef<"OauthAccessToken", 'String'>;
    readonly accessToken: Prisma.FieldRef<"OauthAccessToken", 'String'>;
    readonly refreshToken: Prisma.FieldRef<"OauthAccessToken", 'String'>;
    readonly accessTokenExpiresAt: Prisma.FieldRef<"OauthAccessToken", 'DateTime'>;
    readonly refreshTokenExpiresAt: Prisma.FieldRef<"OauthAccessToken", 'DateTime'>;
    readonly clientId: Prisma.FieldRef<"OauthAccessToken", 'String'>;
    readonly userId: Prisma.FieldRef<"OauthAccessToken", 'String'>;
    readonly scopes: Prisma.FieldRef<"OauthAccessToken", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OauthAccessToken", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OauthAccessToken", 'DateTime'>;
}
export type OauthAccessTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where: Prisma.OauthAccessTokenWhereUniqueInput;
};
export type OauthAccessTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where: Prisma.OauthAccessTokenWhereUniqueInput;
};
export type OauthAccessTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where?: Prisma.OauthAccessTokenWhereInput;
    orderBy?: Prisma.OauthAccessTokenOrderByWithRelationInput | Prisma.OauthAccessTokenOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccessTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthAccessTokenScalarFieldEnum | Prisma.OauthAccessTokenScalarFieldEnum[];
};
export type OauthAccessTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where?: Prisma.OauthAccessTokenWhereInput;
    orderBy?: Prisma.OauthAccessTokenOrderByWithRelationInput | Prisma.OauthAccessTokenOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccessTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthAccessTokenScalarFieldEnum | Prisma.OauthAccessTokenScalarFieldEnum[];
};
export type OauthAccessTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where?: Prisma.OauthAccessTokenWhereInput;
    orderBy?: Prisma.OauthAccessTokenOrderByWithRelationInput | Prisma.OauthAccessTokenOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccessTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthAccessTokenScalarFieldEnum | Prisma.OauthAccessTokenScalarFieldEnum[];
};
export type OauthAccessTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthAccessTokenCreateInput, Prisma.OauthAccessTokenUncheckedCreateInput>;
};
export type OauthAccessTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OauthAccessTokenCreateManyInput | Prisma.OauthAccessTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OauthAccessTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    data: Prisma.OauthAccessTokenCreateManyInput | Prisma.OauthAccessTokenCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OauthAccessTokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OauthAccessTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateInput, Prisma.OauthAccessTokenUncheckedUpdateInput>;
    where: Prisma.OauthAccessTokenWhereUniqueInput;
};
export type OauthAccessTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateManyMutationInput, Prisma.OauthAccessTokenUncheckedUpdateManyInput>;
    where?: Prisma.OauthAccessTokenWhereInput;
    limit?: number;
};
export type OauthAccessTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthAccessTokenUpdateManyMutationInput, Prisma.OauthAccessTokenUncheckedUpdateManyInput>;
    where?: Prisma.OauthAccessTokenWhereInput;
    limit?: number;
    include?: Prisma.OauthAccessTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OauthAccessTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where: Prisma.OauthAccessTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthAccessTokenCreateInput, Prisma.OauthAccessTokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OauthAccessTokenUpdateInput, Prisma.OauthAccessTokenUncheckedUpdateInput>;
};
export type OauthAccessTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
    where: Prisma.OauthAccessTokenWhereUniqueInput;
};
export type OauthAccessTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccessTokenWhereInput;
    limit?: number;
};
export type OauthAccessToken$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type OauthAccessTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccessTokenSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccessTokenOmit<ExtArgs> | null;
    include?: Prisma.OauthAccessTokenInclude<ExtArgs> | null;
};
