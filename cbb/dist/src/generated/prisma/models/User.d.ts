import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    emailVerified: boolean | null;
    image: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    emailVerified: boolean | null;
    image: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    name: number;
    emailVerified: number;
    image: number;
    passwordHash: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    emailVerified?: true;
    image?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    emailVerified?: true;
    image?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    emailVerified?: true;
    image?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image: string | null;
    passwordHash: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    emailVerified?: Prisma.BoolFilter<"User"> | boolean;
    image?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    sessions?: Prisma.SessionListRelationFilter;
    accounts?: Prisma.AccountListRelationFilter;
    oauthApplications?: Prisma.OauthApplicationListRelationFilter;
    oauthAccessTokens?: Prisma.OauthAccessTokenListRelationFilter;
    oauthConsents?: Prisma.OauthConsentListRelationFilter;
    providers?: Prisma.ProviderListRelationFilter;
    nodes?: Prisma.NodeListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    sessions?: Prisma.SessionOrderByRelationAggregateInput;
    accounts?: Prisma.AccountOrderByRelationAggregateInput;
    oauthApplications?: Prisma.OauthApplicationOrderByRelationAggregateInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenOrderByRelationAggregateInput;
    oauthConsents?: Prisma.OauthConsentOrderByRelationAggregateInput;
    providers?: Prisma.ProviderOrderByRelationAggregateInput;
    nodes?: Prisma.NodeOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    emailVerified?: Prisma.BoolFilter<"User"> | boolean;
    image?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    sessions?: Prisma.SessionListRelationFilter;
    accounts?: Prisma.AccountListRelationFilter;
    oauthApplications?: Prisma.OauthApplicationListRelationFilter;
    oauthAccessTokens?: Prisma.OauthAccessTokenListRelationFilter;
    oauthConsents?: Prisma.OauthConsentListRelationFilter;
    providers?: Prisma.ProviderListRelationFilter;
    nodes?: Prisma.NodeListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    emailVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    image?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordHash?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type UserCreateNestedOneWithoutSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    upsert?: Prisma.UserUpsertWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput, Prisma.UserUpdateWithoutSessionsInput>, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserCreateNestedOneWithoutAccountsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAccountsInput, Prisma.UserUncheckedCreateWithoutAccountsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAccountsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAccountsInput, Prisma.UserUncheckedCreateWithoutAccountsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAccountsInput;
    upsert?: Prisma.UserUpsertWithoutAccountsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput, Prisma.UserUpdateWithoutAccountsInput>, Prisma.UserUncheckedUpdateWithoutAccountsInput>;
};
export type UserCreateNestedOneWithoutOauthApplicationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOauthApplicationsInput, Prisma.UserUncheckedCreateWithoutOauthApplicationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOauthApplicationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutOauthApplicationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOauthApplicationsInput, Prisma.UserUncheckedCreateWithoutOauthApplicationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOauthApplicationsInput;
    upsert?: Prisma.UserUpsertWithoutOauthApplicationsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOauthApplicationsInput, Prisma.UserUpdateWithoutOauthApplicationsInput>, Prisma.UserUncheckedUpdateWithoutOauthApplicationsInput>;
};
export type UserCreateNestedOneWithoutOauthAccessTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOauthAccessTokensInput, Prisma.UserUncheckedCreateWithoutOauthAccessTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOauthAccessTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutOauthAccessTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOauthAccessTokensInput, Prisma.UserUncheckedCreateWithoutOauthAccessTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOauthAccessTokensInput;
    upsert?: Prisma.UserUpsertWithoutOauthAccessTokensInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOauthAccessTokensInput, Prisma.UserUpdateWithoutOauthAccessTokensInput>, Prisma.UserUncheckedUpdateWithoutOauthAccessTokensInput>;
};
export type UserCreateNestedOneWithoutOauthConsentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOauthConsentsInput, Prisma.UserUncheckedCreateWithoutOauthConsentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOauthConsentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOauthConsentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOauthConsentsInput, Prisma.UserUncheckedCreateWithoutOauthConsentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOauthConsentsInput;
    upsert?: Prisma.UserUpsertWithoutOauthConsentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOauthConsentsInput, Prisma.UserUpdateWithoutOauthConsentsInput>, Prisma.UserUncheckedUpdateWithoutOauthConsentsInput>;
};
export type UserCreateNestedOneWithoutProvidersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProvidersInput, Prisma.UserUncheckedCreateWithoutProvidersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProvidersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProvidersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProvidersInput, Prisma.UserUncheckedCreateWithoutProvidersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProvidersInput;
    upsert?: Prisma.UserUpsertWithoutProvidersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProvidersInput, Prisma.UserUpdateWithoutProvidersInput>, Prisma.UserUncheckedUpdateWithoutProvidersInput>;
};
export type UserCreateNestedOneWithoutNodesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNodesInput, Prisma.UserUncheckedCreateWithoutNodesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNodesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNodesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNodesInput, Prisma.UserUncheckedCreateWithoutNodesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNodesInput;
    upsert?: Prisma.UserUpsertWithoutNodesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNodesInput, Prisma.UserUpdateWithoutNodesInput>, Prisma.UserUncheckedUpdateWithoutNodesInput>;
};
export type UserCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
};
export type UserUpsertWithoutSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutAccountsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutAccountsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAccountsInput, Prisma.UserUncheckedCreateWithoutAccountsInput>;
};
export type UserUpsertWithoutAccountsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAccountsInput, Prisma.UserUncheckedUpdateWithoutAccountsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAccountsInput, Prisma.UserUncheckedCreateWithoutAccountsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAccountsInput, Prisma.UserUncheckedUpdateWithoutAccountsInput>;
};
export type UserUpdateWithoutAccountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOauthApplicationsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOauthApplicationsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOauthApplicationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOauthApplicationsInput, Prisma.UserUncheckedCreateWithoutOauthApplicationsInput>;
};
export type UserUpsertWithoutOauthApplicationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOauthApplicationsInput, Prisma.UserUncheckedUpdateWithoutOauthApplicationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOauthApplicationsInput, Prisma.UserUncheckedCreateWithoutOauthApplicationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOauthApplicationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOauthApplicationsInput, Prisma.UserUncheckedUpdateWithoutOauthApplicationsInput>;
};
export type UserUpdateWithoutOauthApplicationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOauthApplicationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOauthAccessTokensInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOauthAccessTokensInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOauthAccessTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOauthAccessTokensInput, Prisma.UserUncheckedCreateWithoutOauthAccessTokensInput>;
};
export type UserUpsertWithoutOauthAccessTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOauthAccessTokensInput, Prisma.UserUncheckedUpdateWithoutOauthAccessTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOauthAccessTokensInput, Prisma.UserUncheckedCreateWithoutOauthAccessTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOauthAccessTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOauthAccessTokensInput, Prisma.UserUncheckedUpdateWithoutOauthAccessTokensInput>;
};
export type UserUpdateWithoutOauthAccessTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOauthAccessTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOauthConsentsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOauthConsentsInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOauthConsentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOauthConsentsInput, Prisma.UserUncheckedCreateWithoutOauthConsentsInput>;
};
export type UserUpsertWithoutOauthConsentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOauthConsentsInput, Prisma.UserUncheckedUpdateWithoutOauthConsentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOauthConsentsInput, Prisma.UserUncheckedCreateWithoutOauthConsentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOauthConsentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOauthConsentsInput, Prisma.UserUncheckedUpdateWithoutOauthConsentsInput>;
};
export type UserUpdateWithoutOauthConsentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOauthConsentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutProvidersInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutProvidersInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutProvidersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProvidersInput, Prisma.UserUncheckedCreateWithoutProvidersInput>;
};
export type UserUpsertWithoutProvidersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProvidersInput, Prisma.UserUncheckedUpdateWithoutProvidersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProvidersInput, Prisma.UserUncheckedCreateWithoutProvidersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProvidersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProvidersInput, Prisma.UserUncheckedUpdateWithoutProvidersInput>;
};
export type UserUpdateWithoutProvidersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutProvidersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutNodesInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutNodesInput = {
    id?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    image?: string | null;
    passwordHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: Prisma.AccountUncheckedCreateNestedManyWithoutUserInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedCreateNestedManyWithoutUserInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutUserInput;
    oauthConsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutUserInput;
    providers?: Prisma.ProviderUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutNodesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNodesInput, Prisma.UserUncheckedCreateWithoutNodesInput>;
};
export type UserUpsertWithoutNodesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNodesInput, Prisma.UserUncheckedUpdateWithoutNodesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNodesInput, Prisma.UserUncheckedCreateWithoutNodesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNodesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNodesInput, Prisma.UserUncheckedUpdateWithoutNodesInput>;
};
export type UserUpdateWithoutNodesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutNodesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput;
    oauthApplications?: Prisma.OauthApplicationUncheckedUpdateManyWithoutUserNestedInput;
    oauthAccessTokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput;
    oauthConsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutUserNestedInput;
    providers?: Prisma.ProviderUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    sessions: number;
    accounts: number;
    oauthApplications: number;
    oauthAccessTokens: number;
    oauthConsents: number;
    providers: number;
    nodes: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
    oauthApplications?: boolean | UserCountOutputTypeCountOauthApplicationsArgs;
    oauthAccessTokens?: boolean | UserCountOutputTypeCountOauthAccessTokensArgs;
    oauthConsents?: boolean | UserCountOutputTypeCountOauthConsentsArgs;
    providers?: boolean | UserCountOutputTypeCountProvidersArgs;
    nodes?: boolean | UserCountOutputTypeCountNodesArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
};
export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWhereInput;
};
export type UserCountOutputTypeCountOauthApplicationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthApplicationWhereInput;
};
export type UserCountOutputTypeCountOauthAccessTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccessTokenWhereInput;
};
export type UserCountOutputTypeCountOauthConsentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthConsentWhereInput;
};
export type UserCountOutputTypeCountProvidersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderWhereInput;
};
export type UserCountOutputTypeCountNodesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NodeWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    accounts?: boolean | Prisma.User$accountsArgs<ExtArgs>;
    oauthApplications?: boolean | Prisma.User$oauthApplicationsArgs<ExtArgs>;
    oauthAccessTokens?: boolean | Prisma.User$oauthAccessTokensArgs<ExtArgs>;
    oauthConsents?: boolean | Prisma.User$oauthConsentsArgs<ExtArgs>;
    providers?: boolean | Prisma.User$providersArgs<ExtArgs>;
    nodes?: boolean | Prisma.User$nodesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "name" | "emailVerified" | "image" | "passwordHash" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    accounts?: boolean | Prisma.User$accountsArgs<ExtArgs>;
    oauthApplications?: boolean | Prisma.User$oauthApplicationsArgs<ExtArgs>;
    oauthAccessTokens?: boolean | Prisma.User$oauthAccessTokensArgs<ExtArgs>;
    oauthConsents?: boolean | Prisma.User$oauthConsentsArgs<ExtArgs>;
    providers?: boolean | Prisma.User$providersArgs<ExtArgs>;
    nodes?: boolean | Prisma.User$nodesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        sessions: Prisma.$SessionPayload<ExtArgs>[];
        accounts: Prisma.$AccountPayload<ExtArgs>[];
        oauthApplications: Prisma.$OauthApplicationPayload<ExtArgs>[];
        oauthAccessTokens: Prisma.$OauthAccessTokenPayload<ExtArgs>[];
        oauthConsents: Prisma.$OauthConsentPayload<ExtArgs>[];
        providers: Prisma.$ProviderPayload<ExtArgs>[];
        nodes: Prisma.$NodePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        image: string | null;
        passwordHash: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sessions<T extends Prisma.User$sessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    accounts<T extends Prisma.User$accountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    oauthApplications<T extends Prisma.User$oauthApplicationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$oauthApplicationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    oauthAccessTokens<T extends Prisma.User$oauthAccessTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$oauthAccessTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    oauthConsents<T extends Prisma.User$oauthConsentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$oauthConsentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    providers<T extends Prisma.User$providersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$providersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    nodes<T extends Prisma.User$nodesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly emailVerified: Prisma.FieldRef<"User", 'Boolean'>;
    readonly image: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionSelect<ExtArgs> | null;
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
export type User$accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountSelect<ExtArgs> | null;
    omit?: Prisma.AccountOmit<ExtArgs> | null;
    include?: Prisma.AccountInclude<ExtArgs> | null;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput | Prisma.AccountOrderByWithRelationInput[];
    cursor?: Prisma.AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountScalarFieldEnum | Prisma.AccountScalarFieldEnum[];
};
export type User$oauthApplicationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    where?: Prisma.OauthApplicationWhereInput;
    orderBy?: Prisma.OauthApplicationOrderByWithRelationInput | Prisma.OauthApplicationOrderByWithRelationInput[];
    cursor?: Prisma.OauthApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthApplicationScalarFieldEnum | Prisma.OauthApplicationScalarFieldEnum[];
};
export type User$oauthAccessTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$oauthConsentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    where?: Prisma.OauthConsentWhereInput;
    orderBy?: Prisma.OauthConsentOrderByWithRelationInput | Prisma.OauthConsentOrderByWithRelationInput[];
    cursor?: Prisma.OauthConsentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthConsentScalarFieldEnum | Prisma.OauthConsentScalarFieldEnum[];
};
export type User$providersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    where?: Prisma.ProviderWhereInput;
    orderBy?: Prisma.ProviderOrderByWithRelationInput | Prisma.ProviderOrderByWithRelationInput[];
    cursor?: Prisma.ProviderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProviderScalarFieldEnum | Prisma.ProviderScalarFieldEnum[];
};
export type User$nodesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NodeSelect<ExtArgs> | null;
    omit?: Prisma.NodeOmit<ExtArgs> | null;
    include?: Prisma.NodeInclude<ExtArgs> | null;
    where?: Prisma.NodeWhereInput;
    orderBy?: Prisma.NodeOrderByWithRelationInput | Prisma.NodeOrderByWithRelationInput[];
    cursor?: Prisma.NodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NodeScalarFieldEnum | Prisma.NodeScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
