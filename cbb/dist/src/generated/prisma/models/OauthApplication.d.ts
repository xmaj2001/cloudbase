import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OauthApplicationModel = runtime.Types.Result.DefaultSelection<Prisma.$OauthApplicationPayload>;
export type AggregateOauthApplication = {
    _count: OauthApplicationCountAggregateOutputType | null;
    _min: OauthApplicationMinAggregateOutputType | null;
    _max: OauthApplicationMaxAggregateOutputType | null;
};
export type OauthApplicationMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    icon: string | null;
    metadata: string | null;
    clientId: string | null;
    clientSecret: string | null;
    redirectUrls: string | null;
    type: string | null;
    disabled: boolean | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OauthApplicationMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    icon: string | null;
    metadata: string | null;
    clientId: string | null;
    clientSecret: string | null;
    redirectUrls: string | null;
    type: string | null;
    disabled: boolean | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OauthApplicationCountAggregateOutputType = {
    id: number;
    name: number;
    icon: number;
    metadata: number;
    clientId: number;
    clientSecret: number;
    redirectUrls: number;
    type: number;
    disabled: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OauthApplicationMinAggregateInputType = {
    id?: true;
    name?: true;
    icon?: true;
    metadata?: true;
    clientId?: true;
    clientSecret?: true;
    redirectUrls?: true;
    type?: true;
    disabled?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OauthApplicationMaxAggregateInputType = {
    id?: true;
    name?: true;
    icon?: true;
    metadata?: true;
    clientId?: true;
    clientSecret?: true;
    redirectUrls?: true;
    type?: true;
    disabled?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OauthApplicationCountAggregateInputType = {
    id?: true;
    name?: true;
    icon?: true;
    metadata?: true;
    clientId?: true;
    clientSecret?: true;
    redirectUrls?: true;
    type?: true;
    disabled?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OauthApplicationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthApplicationWhereInput;
    orderBy?: Prisma.OauthApplicationOrderByWithRelationInput | Prisma.OauthApplicationOrderByWithRelationInput[];
    cursor?: Prisma.OauthApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OauthApplicationCountAggregateInputType;
    _min?: OauthApplicationMinAggregateInputType;
    _max?: OauthApplicationMaxAggregateInputType;
};
export type GetOauthApplicationAggregateType<T extends OauthApplicationAggregateArgs> = {
    [P in keyof T & keyof AggregateOauthApplication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOauthApplication[P]> : Prisma.GetScalarType<T[P], AggregateOauthApplication[P]>;
};
export type OauthApplicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthApplicationWhereInput;
    orderBy?: Prisma.OauthApplicationOrderByWithAggregationInput | Prisma.OauthApplicationOrderByWithAggregationInput[];
    by: Prisma.OauthApplicationScalarFieldEnum[] | Prisma.OauthApplicationScalarFieldEnum;
    having?: Prisma.OauthApplicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OauthApplicationCountAggregateInputType | true;
    _min?: OauthApplicationMinAggregateInputType;
    _max?: OauthApplicationMaxAggregateInputType;
};
export type OauthApplicationGroupByOutputType = {
    id: string;
    name: string;
    icon: string | null;
    metadata: string | null;
    clientId: string;
    clientSecret: string | null;
    redirectUrls: string;
    type: string;
    disabled: boolean | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OauthApplicationCountAggregateOutputType | null;
    _min: OauthApplicationMinAggregateOutputType | null;
    _max: OauthApplicationMaxAggregateOutputType | null;
};
export type GetOauthApplicationGroupByPayload<T extends OauthApplicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OauthApplicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OauthApplicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OauthApplicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OauthApplicationGroupByOutputType[P]>;
}>>;
export type OauthApplicationWhereInput = {
    AND?: Prisma.OauthApplicationWhereInput | Prisma.OauthApplicationWhereInput[];
    OR?: Prisma.OauthApplicationWhereInput[];
    NOT?: Prisma.OauthApplicationWhereInput | Prisma.OauthApplicationWhereInput[];
    id?: Prisma.StringFilter<"OauthApplication"> | string;
    name?: Prisma.StringFilter<"OauthApplication"> | string;
    icon?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    metadata?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    clientId?: Prisma.StringFilter<"OauthApplication"> | string;
    clientSecret?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    redirectUrls?: Prisma.StringFilter<"OauthApplication"> | string;
    type?: Prisma.StringFilter<"OauthApplication"> | string;
    disabled?: Prisma.BoolNullableFilter<"OauthApplication"> | boolean | null;
    userId?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OauthApplication"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthApplication"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    oauthaccesstokens?: Prisma.OauthAccessTokenListRelationFilter;
    oauthconsents?: Prisma.OauthConsentListRelationFilter;
};
export type OauthApplicationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    clientSecret?: Prisma.SortOrderInput | Prisma.SortOrder;
    redirectUrls?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    disabled?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    oauthaccesstokens?: Prisma.OauthAccessTokenOrderByRelationAggregateInput;
    oauthconsents?: Prisma.OauthConsentOrderByRelationAggregateInput;
};
export type OauthApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    clientId?: string;
    AND?: Prisma.OauthApplicationWhereInput | Prisma.OauthApplicationWhereInput[];
    OR?: Prisma.OauthApplicationWhereInput[];
    NOT?: Prisma.OauthApplicationWhereInput | Prisma.OauthApplicationWhereInput[];
    name?: Prisma.StringFilter<"OauthApplication"> | string;
    icon?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    metadata?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    clientSecret?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    redirectUrls?: Prisma.StringFilter<"OauthApplication"> | string;
    type?: Prisma.StringFilter<"OauthApplication"> | string;
    disabled?: Prisma.BoolNullableFilter<"OauthApplication"> | boolean | null;
    userId?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OauthApplication"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthApplication"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    oauthaccesstokens?: Prisma.OauthAccessTokenListRelationFilter;
    oauthconsents?: Prisma.OauthConsentListRelationFilter;
}, "id" | "clientId">;
export type OauthApplicationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    clientSecret?: Prisma.SortOrderInput | Prisma.SortOrder;
    redirectUrls?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    disabled?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OauthApplicationCountOrderByAggregateInput;
    _max?: Prisma.OauthApplicationMaxOrderByAggregateInput;
    _min?: Prisma.OauthApplicationMinOrderByAggregateInput;
};
export type OauthApplicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.OauthApplicationScalarWhereWithAggregatesInput | Prisma.OauthApplicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.OauthApplicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OauthApplicationScalarWhereWithAggregatesInput | Prisma.OauthApplicationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OauthApplication"> | string;
    name?: Prisma.StringWithAggregatesFilter<"OauthApplication"> | string;
    icon?: Prisma.StringNullableWithAggregatesFilter<"OauthApplication"> | string | null;
    metadata?: Prisma.StringNullableWithAggregatesFilter<"OauthApplication"> | string | null;
    clientId?: Prisma.StringWithAggregatesFilter<"OauthApplication"> | string;
    clientSecret?: Prisma.StringNullableWithAggregatesFilter<"OauthApplication"> | string | null;
    redirectUrls?: Prisma.StringWithAggregatesFilter<"OauthApplication"> | string;
    type?: Prisma.StringWithAggregatesFilter<"OauthApplication"> | string;
    disabled?: Prisma.BoolNullableWithAggregatesFilter<"OauthApplication"> | boolean | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"OauthApplication"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OauthApplication"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OauthApplication"> | Date | string;
};
export type OauthApplicationCreateInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutOauthApplicationsInput;
    oauthaccesstokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutOauthapplicationInput;
    oauthconsents?: Prisma.OauthConsentCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationUncheckedCreateInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    userId?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutOauthapplicationInput;
    oauthconsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutOauthApplicationsNestedInput;
    oauthaccesstokens?: Prisma.OauthAccessTokenUpdateManyWithoutOauthapplicationNestedInput;
    oauthconsents?: Prisma.OauthConsentUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutOauthapplicationNestedInput;
    oauthconsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationCreateManyInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    userId?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthApplicationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthApplicationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthApplicationListRelationFilter = {
    every?: Prisma.OauthApplicationWhereInput;
    some?: Prisma.OauthApplicationWhereInput;
    none?: Prisma.OauthApplicationWhereInput;
};
export type OauthApplicationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OauthApplicationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    clientSecret?: Prisma.SortOrder;
    redirectUrls?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    disabled?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthApplicationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    clientSecret?: Prisma.SortOrder;
    redirectUrls?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    disabled?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthApplicationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    clientSecret?: Prisma.SortOrder;
    redirectUrls?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    disabled?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthApplicationScalarRelationFilter = {
    is?: Prisma.OauthApplicationWhereInput;
    isNot?: Prisma.OauthApplicationWhereInput;
};
export type OauthApplicationCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutUserInput, Prisma.OauthApplicationUncheckedCreateWithoutUserInput> | Prisma.OauthApplicationCreateWithoutUserInput[] | Prisma.OauthApplicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutUserInput | Prisma.OauthApplicationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OauthApplicationCreateManyUserInputEnvelope;
    connect?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
};
export type OauthApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutUserInput, Prisma.OauthApplicationUncheckedCreateWithoutUserInput> | Prisma.OauthApplicationCreateWithoutUserInput[] | Prisma.OauthApplicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutUserInput | Prisma.OauthApplicationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OauthApplicationCreateManyUserInputEnvelope;
    connect?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
};
export type OauthApplicationUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutUserInput, Prisma.OauthApplicationUncheckedCreateWithoutUserInput> | Prisma.OauthApplicationCreateWithoutUserInput[] | Prisma.OauthApplicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutUserInput | Prisma.OauthApplicationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OauthApplicationUpsertWithWhereUniqueWithoutUserInput | Prisma.OauthApplicationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OauthApplicationCreateManyUserInputEnvelope;
    set?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    disconnect?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    delete?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    connect?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    update?: Prisma.OauthApplicationUpdateWithWhereUniqueWithoutUserInput | Prisma.OauthApplicationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OauthApplicationUpdateManyWithWhereWithoutUserInput | Prisma.OauthApplicationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OauthApplicationScalarWhereInput | Prisma.OauthApplicationScalarWhereInput[];
};
export type OauthApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutUserInput, Prisma.OauthApplicationUncheckedCreateWithoutUserInput> | Prisma.OauthApplicationCreateWithoutUserInput[] | Prisma.OauthApplicationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutUserInput | Prisma.OauthApplicationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OauthApplicationUpsertWithWhereUniqueWithoutUserInput | Prisma.OauthApplicationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OauthApplicationCreateManyUserInputEnvelope;
    set?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    disconnect?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    delete?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    connect?: Prisma.OauthApplicationWhereUniqueInput | Prisma.OauthApplicationWhereUniqueInput[];
    update?: Prisma.OauthApplicationUpdateWithWhereUniqueWithoutUserInput | Prisma.OauthApplicationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OauthApplicationUpdateManyWithWhereWithoutUserInput | Prisma.OauthApplicationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OauthApplicationScalarWhereInput | Prisma.OauthApplicationScalarWhereInput[];
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type OauthApplicationCreateNestedOneWithoutOauthaccesstokensInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthaccesstokensInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthaccesstokensInput>;
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutOauthaccesstokensInput;
    connect?: Prisma.OauthApplicationWhereUniqueInput;
};
export type OauthApplicationUpdateOneRequiredWithoutOauthaccesstokensNestedInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthaccesstokensInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthaccesstokensInput>;
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutOauthaccesstokensInput;
    upsert?: Prisma.OauthApplicationUpsertWithoutOauthaccesstokensInput;
    connect?: Prisma.OauthApplicationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OauthApplicationUpdateToOneWithWhereWithoutOauthaccesstokensInput, Prisma.OauthApplicationUpdateWithoutOauthaccesstokensInput>, Prisma.OauthApplicationUncheckedUpdateWithoutOauthaccesstokensInput>;
};
export type OauthApplicationCreateNestedOneWithoutOauthconsentsInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthconsentsInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthconsentsInput>;
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutOauthconsentsInput;
    connect?: Prisma.OauthApplicationWhereUniqueInput;
};
export type OauthApplicationUpdateOneRequiredWithoutOauthconsentsNestedInput = {
    create?: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthconsentsInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthconsentsInput>;
    connectOrCreate?: Prisma.OauthApplicationCreateOrConnectWithoutOauthconsentsInput;
    upsert?: Prisma.OauthApplicationUpsertWithoutOauthconsentsInput;
    connect?: Prisma.OauthApplicationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OauthApplicationUpdateToOneWithWhereWithoutOauthconsentsInput, Prisma.OauthApplicationUpdateWithoutOauthconsentsInput>, Prisma.OauthApplicationUncheckedUpdateWithoutOauthconsentsInput>;
};
export type OauthApplicationCreateWithoutUserInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutOauthapplicationInput;
    oauthconsents?: Prisma.OauthConsentCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationUncheckedCreateWithoutUserInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutOauthapplicationInput;
    oauthconsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationCreateOrConnectWithoutUserInput = {
    where: Prisma.OauthApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthApplicationCreateWithoutUserInput, Prisma.OauthApplicationUncheckedCreateWithoutUserInput>;
};
export type OauthApplicationCreateManyUserInputEnvelope = {
    data: Prisma.OauthApplicationCreateManyUserInput | Prisma.OauthApplicationCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OauthApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OauthApplicationWhereUniqueInput;
    update: Prisma.XOR<Prisma.OauthApplicationUpdateWithoutUserInput, Prisma.OauthApplicationUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OauthApplicationCreateWithoutUserInput, Prisma.OauthApplicationUncheckedCreateWithoutUserInput>;
};
export type OauthApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OauthApplicationWhereUniqueInput;
    data: Prisma.XOR<Prisma.OauthApplicationUpdateWithoutUserInput, Prisma.OauthApplicationUncheckedUpdateWithoutUserInput>;
};
export type OauthApplicationUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OauthApplicationScalarWhereInput;
    data: Prisma.XOR<Prisma.OauthApplicationUpdateManyMutationInput, Prisma.OauthApplicationUncheckedUpdateManyWithoutUserInput>;
};
export type OauthApplicationScalarWhereInput = {
    AND?: Prisma.OauthApplicationScalarWhereInput | Prisma.OauthApplicationScalarWhereInput[];
    OR?: Prisma.OauthApplicationScalarWhereInput[];
    NOT?: Prisma.OauthApplicationScalarWhereInput | Prisma.OauthApplicationScalarWhereInput[];
    id?: Prisma.StringFilter<"OauthApplication"> | string;
    name?: Prisma.StringFilter<"OauthApplication"> | string;
    icon?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    metadata?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    clientId?: Prisma.StringFilter<"OauthApplication"> | string;
    clientSecret?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    redirectUrls?: Prisma.StringFilter<"OauthApplication"> | string;
    type?: Prisma.StringFilter<"OauthApplication"> | string;
    disabled?: Prisma.BoolNullableFilter<"OauthApplication"> | boolean | null;
    userId?: Prisma.StringNullableFilter<"OauthApplication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OauthApplication"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthApplication"> | Date | string;
};
export type OauthApplicationCreateWithoutOauthaccesstokensInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutOauthApplicationsInput;
    oauthconsents?: Prisma.OauthConsentCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationUncheckedCreateWithoutOauthaccesstokensInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    userId?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthconsents?: Prisma.OauthConsentUncheckedCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationCreateOrConnectWithoutOauthaccesstokensInput = {
    where: Prisma.OauthApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthaccesstokensInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthaccesstokensInput>;
};
export type OauthApplicationUpsertWithoutOauthaccesstokensInput = {
    update: Prisma.XOR<Prisma.OauthApplicationUpdateWithoutOauthaccesstokensInput, Prisma.OauthApplicationUncheckedUpdateWithoutOauthaccesstokensInput>;
    create: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthaccesstokensInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthaccesstokensInput>;
    where?: Prisma.OauthApplicationWhereInput;
};
export type OauthApplicationUpdateToOneWithWhereWithoutOauthaccesstokensInput = {
    where?: Prisma.OauthApplicationWhereInput;
    data: Prisma.XOR<Prisma.OauthApplicationUpdateWithoutOauthaccesstokensInput, Prisma.OauthApplicationUncheckedUpdateWithoutOauthaccesstokensInput>;
};
export type OauthApplicationUpdateWithoutOauthaccesstokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutOauthApplicationsNestedInput;
    oauthconsents?: Prisma.OauthConsentUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationUncheckedUpdateWithoutOauthaccesstokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthconsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationCreateWithoutOauthconsentsInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutOauthApplicationsInput;
    oauthaccesstokens?: Prisma.OauthAccessTokenCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationUncheckedCreateWithoutOauthconsentsInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    userId?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUncheckedCreateNestedManyWithoutOauthapplicationInput;
};
export type OauthApplicationCreateOrConnectWithoutOauthconsentsInput = {
    where: Prisma.OauthApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthconsentsInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthconsentsInput>;
};
export type OauthApplicationUpsertWithoutOauthconsentsInput = {
    update: Prisma.XOR<Prisma.OauthApplicationUpdateWithoutOauthconsentsInput, Prisma.OauthApplicationUncheckedUpdateWithoutOauthconsentsInput>;
    create: Prisma.XOR<Prisma.OauthApplicationCreateWithoutOauthconsentsInput, Prisma.OauthApplicationUncheckedCreateWithoutOauthconsentsInput>;
    where?: Prisma.OauthApplicationWhereInput;
};
export type OauthApplicationUpdateToOneWithWhereWithoutOauthconsentsInput = {
    where?: Prisma.OauthApplicationWhereInput;
    data: Prisma.XOR<Prisma.OauthApplicationUpdateWithoutOauthconsentsInput, Prisma.OauthApplicationUncheckedUpdateWithoutOauthconsentsInput>;
};
export type OauthApplicationUpdateWithoutOauthconsentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutOauthApplicationsNestedInput;
    oauthaccesstokens?: Prisma.OauthAccessTokenUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationUncheckedUpdateWithoutOauthconsentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationCreateManyUserInput = {
    id: string;
    name: string;
    icon?: string | null;
    metadata?: string | null;
    clientId: string;
    clientSecret?: string | null;
    redirectUrls: string;
    type: string;
    disabled?: boolean | null;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export type OauthApplicationUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUpdateManyWithoutOauthapplicationNestedInput;
    oauthconsents?: Prisma.OauthConsentUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    oauthaccesstokens?: Prisma.OauthAccessTokenUncheckedUpdateManyWithoutOauthapplicationNestedInput;
    oauthconsents?: Prisma.OauthConsentUncheckedUpdateManyWithoutOauthapplicationNestedInput;
};
export type OauthApplicationUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    redirectUrls?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    disabled?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthApplicationCountOutputType = {
    oauthaccesstokens: number;
    oauthconsents: number;
};
export type OauthApplicationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthaccesstokens?: boolean | OauthApplicationCountOutputTypeCountOauthaccesstokensArgs;
    oauthconsents?: boolean | OauthApplicationCountOutputTypeCountOauthconsentsArgs;
};
export type OauthApplicationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationCountOutputTypeSelect<ExtArgs> | null;
};
export type OauthApplicationCountOutputTypeCountOauthaccesstokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccessTokenWhereInput;
};
export type OauthApplicationCountOutputTypeCountOauthconsentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthConsentWhereInput;
};
export type OauthApplicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    metadata?: boolean;
    clientId?: boolean;
    clientSecret?: boolean;
    redirectUrls?: boolean;
    type?: boolean;
    disabled?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.OauthApplication$userArgs<ExtArgs>;
    oauthaccesstokens?: boolean | Prisma.OauthApplication$oauthaccesstokensArgs<ExtArgs>;
    oauthconsents?: boolean | Prisma.OauthApplication$oauthconsentsArgs<ExtArgs>;
    _count?: boolean | Prisma.OauthApplicationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthApplication"]>;
export type OauthApplicationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    metadata?: boolean;
    clientId?: boolean;
    clientSecret?: boolean;
    redirectUrls?: boolean;
    type?: boolean;
    disabled?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.OauthApplication$userArgs<ExtArgs>;
}, ExtArgs["result"]["oauthApplication"]>;
export type OauthApplicationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    metadata?: boolean;
    clientId?: boolean;
    clientSecret?: boolean;
    redirectUrls?: boolean;
    type?: boolean;
    disabled?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.OauthApplication$userArgs<ExtArgs>;
}, ExtArgs["result"]["oauthApplication"]>;
export type OauthApplicationSelectScalar = {
    id?: boolean;
    name?: boolean;
    icon?: boolean;
    metadata?: boolean;
    clientId?: boolean;
    clientSecret?: boolean;
    redirectUrls?: boolean;
    type?: boolean;
    disabled?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OauthApplicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "icon" | "metadata" | "clientId" | "clientSecret" | "redirectUrls" | "type" | "disabled" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["oauthApplication"]>;
export type OauthApplicationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.OauthApplication$userArgs<ExtArgs>;
    oauthaccesstokens?: boolean | Prisma.OauthApplication$oauthaccesstokensArgs<ExtArgs>;
    oauthconsents?: boolean | Prisma.OauthApplication$oauthconsentsArgs<ExtArgs>;
    _count?: boolean | Prisma.OauthApplicationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OauthApplicationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.OauthApplication$userArgs<ExtArgs>;
};
export type OauthApplicationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.OauthApplication$userArgs<ExtArgs>;
};
export type $OauthApplicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OauthApplication";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        oauthaccesstokens: Prisma.$OauthAccessTokenPayload<ExtArgs>[];
        oauthconsents: Prisma.$OauthConsentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        icon: string | null;
        metadata: string | null;
        clientId: string;
        clientSecret: string | null;
        redirectUrls: string;
        type: string;
        disabled: boolean | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["oauthApplication"]>;
    composites: {};
};
export type OauthApplicationGetPayload<S extends boolean | null | undefined | OauthApplicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload, S>;
export type OauthApplicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OauthApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OauthApplicationCountAggregateInputType | true;
};
export interface OauthApplicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OauthApplication'];
        meta: {
            name: 'OauthApplication';
        };
    };
    findUnique<T extends OauthApplicationFindUniqueArgs>(args: Prisma.SelectSubset<T, OauthApplicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OauthApplicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OauthApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OauthApplicationFindFirstArgs>(args?: Prisma.SelectSubset<T, OauthApplicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OauthApplicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OauthApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OauthApplicationFindManyArgs>(args?: Prisma.SelectSubset<T, OauthApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OauthApplicationCreateArgs>(args: Prisma.SelectSubset<T, OauthApplicationCreateArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OauthApplicationCreateManyArgs>(args?: Prisma.SelectSubset<T, OauthApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OauthApplicationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OauthApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OauthApplicationDeleteArgs>(args: Prisma.SelectSubset<T, OauthApplicationDeleteArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OauthApplicationUpdateArgs>(args: Prisma.SelectSubset<T, OauthApplicationUpdateArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OauthApplicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, OauthApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OauthApplicationUpdateManyArgs>(args: Prisma.SelectSubset<T, OauthApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OauthApplicationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OauthApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OauthApplicationUpsertArgs>(args: Prisma.SelectSubset<T, OauthApplicationUpsertArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OauthApplicationCountArgs>(args?: Prisma.Subset<T, OauthApplicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OauthApplicationCountAggregateOutputType> : number>;
    aggregate<T extends OauthApplicationAggregateArgs>(args: Prisma.Subset<T, OauthApplicationAggregateArgs>): Prisma.PrismaPromise<GetOauthApplicationAggregateType<T>>;
    groupBy<T extends OauthApplicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OauthApplicationGroupByArgs['orderBy'];
    } : {
        orderBy?: OauthApplicationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OauthApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OauthApplicationFieldRefs;
}
export interface Prisma__OauthApplicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.OauthApplication$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OauthApplication$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    oauthaccesstokens<T extends Prisma.OauthApplication$oauthaccesstokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OauthApplication$oauthaccesstokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    oauthconsents<T extends Prisma.OauthApplication$oauthconsentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OauthApplication$oauthconsentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OauthApplicationFieldRefs {
    readonly id: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly name: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly icon: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly metadata: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly clientId: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly clientSecret: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly redirectUrls: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly type: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly disabled: Prisma.FieldRef<"OauthApplication", 'Boolean'>;
    readonly userId: Prisma.FieldRef<"OauthApplication", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OauthApplication", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OauthApplication", 'DateTime'>;
}
export type OauthApplicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    where: Prisma.OauthApplicationWhereUniqueInput;
};
export type OauthApplicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    where: Prisma.OauthApplicationWhereUniqueInput;
};
export type OauthApplicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthApplicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthApplicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthApplicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthApplicationCreateInput, Prisma.OauthApplicationUncheckedCreateInput>;
};
export type OauthApplicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OauthApplicationCreateManyInput | Prisma.OauthApplicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OauthApplicationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    data: Prisma.OauthApplicationCreateManyInput | Prisma.OauthApplicationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OauthApplicationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OauthApplicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthApplicationUpdateInput, Prisma.OauthApplicationUncheckedUpdateInput>;
    where: Prisma.OauthApplicationWhereUniqueInput;
};
export type OauthApplicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OauthApplicationUpdateManyMutationInput, Prisma.OauthApplicationUncheckedUpdateManyInput>;
    where?: Prisma.OauthApplicationWhereInput;
    limit?: number;
};
export type OauthApplicationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthApplicationUpdateManyMutationInput, Prisma.OauthApplicationUncheckedUpdateManyInput>;
    where?: Prisma.OauthApplicationWhereInput;
    limit?: number;
    include?: Prisma.OauthApplicationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OauthApplicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    where: Prisma.OauthApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthApplicationCreateInput, Prisma.OauthApplicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OauthApplicationUpdateInput, Prisma.OauthApplicationUncheckedUpdateInput>;
};
export type OauthApplicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
    where: Prisma.OauthApplicationWhereUniqueInput;
};
export type OauthApplicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthApplicationWhereInput;
    limit?: number;
};
export type OauthApplication$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type OauthApplication$oauthaccesstokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthApplication$oauthconsentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthApplicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthApplicationSelect<ExtArgs> | null;
    omit?: Prisma.OauthApplicationOmit<ExtArgs> | null;
    include?: Prisma.OauthApplicationInclude<ExtArgs> | null;
};
