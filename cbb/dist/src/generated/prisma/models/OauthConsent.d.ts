import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OauthConsentModel = runtime.Types.Result.DefaultSelection<Prisma.$OauthConsentPayload>;
export type AggregateOauthConsent = {
    _count: OauthConsentCountAggregateOutputType | null;
    _min: OauthConsentMinAggregateOutputType | null;
    _max: OauthConsentMaxAggregateOutputType | null;
};
export type OauthConsentMinAggregateOutputType = {
    id: string | null;
    clientId: string | null;
    userId: string | null;
    scopes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    consentGiven: boolean | null;
};
export type OauthConsentMaxAggregateOutputType = {
    id: string | null;
    clientId: string | null;
    userId: string | null;
    scopes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    consentGiven: boolean | null;
};
export type OauthConsentCountAggregateOutputType = {
    id: number;
    clientId: number;
    userId: number;
    scopes: number;
    createdAt: number;
    updatedAt: number;
    consentGiven: number;
    _all: number;
};
export type OauthConsentMinAggregateInputType = {
    id?: true;
    clientId?: true;
    userId?: true;
    scopes?: true;
    createdAt?: true;
    updatedAt?: true;
    consentGiven?: true;
};
export type OauthConsentMaxAggregateInputType = {
    id?: true;
    clientId?: true;
    userId?: true;
    scopes?: true;
    createdAt?: true;
    updatedAt?: true;
    consentGiven?: true;
};
export type OauthConsentCountAggregateInputType = {
    id?: true;
    clientId?: true;
    userId?: true;
    scopes?: true;
    createdAt?: true;
    updatedAt?: true;
    consentGiven?: true;
    _all?: true;
};
export type OauthConsentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthConsentWhereInput;
    orderBy?: Prisma.OauthConsentOrderByWithRelationInput | Prisma.OauthConsentOrderByWithRelationInput[];
    cursor?: Prisma.OauthConsentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OauthConsentCountAggregateInputType;
    _min?: OauthConsentMinAggregateInputType;
    _max?: OauthConsentMaxAggregateInputType;
};
export type GetOauthConsentAggregateType<T extends OauthConsentAggregateArgs> = {
    [P in keyof T & keyof AggregateOauthConsent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOauthConsent[P]> : Prisma.GetScalarType<T[P], AggregateOauthConsent[P]>;
};
export type OauthConsentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthConsentWhereInput;
    orderBy?: Prisma.OauthConsentOrderByWithAggregationInput | Prisma.OauthConsentOrderByWithAggregationInput[];
    by: Prisma.OauthConsentScalarFieldEnum[] | Prisma.OauthConsentScalarFieldEnum;
    having?: Prisma.OauthConsentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OauthConsentCountAggregateInputType | true;
    _min?: OauthConsentMinAggregateInputType;
    _max?: OauthConsentMaxAggregateInputType;
};
export type OauthConsentGroupByOutputType = {
    id: string;
    clientId: string;
    userId: string;
    scopes: string;
    createdAt: Date;
    updatedAt: Date;
    consentGiven: boolean;
    _count: OauthConsentCountAggregateOutputType | null;
    _min: OauthConsentMinAggregateOutputType | null;
    _max: OauthConsentMaxAggregateOutputType | null;
};
export type GetOauthConsentGroupByPayload<T extends OauthConsentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OauthConsentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OauthConsentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OauthConsentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OauthConsentGroupByOutputType[P]>;
}>>;
export type OauthConsentWhereInput = {
    AND?: Prisma.OauthConsentWhereInput | Prisma.OauthConsentWhereInput[];
    OR?: Prisma.OauthConsentWhereInput[];
    NOT?: Prisma.OauthConsentWhereInput | Prisma.OauthConsentWhereInput[];
    id?: Prisma.StringFilter<"OauthConsent"> | string;
    clientId?: Prisma.StringFilter<"OauthConsent"> | string;
    userId?: Prisma.StringFilter<"OauthConsent"> | string;
    scopes?: Prisma.StringFilter<"OauthConsent"> | string;
    createdAt?: Prisma.DateTimeFilter<"OauthConsent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthConsent"> | Date | string;
    consentGiven?: Prisma.BoolFilter<"OauthConsent"> | boolean;
    oauthapplication?: Prisma.XOR<Prisma.OauthApplicationScalarRelationFilter, Prisma.OauthApplicationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type OauthConsentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    consentGiven?: Prisma.SortOrder;
    oauthapplication?: Prisma.OauthApplicationOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type OauthConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OauthConsentWhereInput | Prisma.OauthConsentWhereInput[];
    OR?: Prisma.OauthConsentWhereInput[];
    NOT?: Prisma.OauthConsentWhereInput | Prisma.OauthConsentWhereInput[];
    clientId?: Prisma.StringFilter<"OauthConsent"> | string;
    userId?: Prisma.StringFilter<"OauthConsent"> | string;
    scopes?: Prisma.StringFilter<"OauthConsent"> | string;
    createdAt?: Prisma.DateTimeFilter<"OauthConsent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthConsent"> | Date | string;
    consentGiven?: Prisma.BoolFilter<"OauthConsent"> | boolean;
    oauthapplication?: Prisma.XOR<Prisma.OauthApplicationScalarRelationFilter, Prisma.OauthApplicationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type OauthConsentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    consentGiven?: Prisma.SortOrder;
    _count?: Prisma.OauthConsentCountOrderByAggregateInput;
    _max?: Prisma.OauthConsentMaxOrderByAggregateInput;
    _min?: Prisma.OauthConsentMinOrderByAggregateInput;
};
export type OauthConsentScalarWhereWithAggregatesInput = {
    AND?: Prisma.OauthConsentScalarWhereWithAggregatesInput | Prisma.OauthConsentScalarWhereWithAggregatesInput[];
    OR?: Prisma.OauthConsentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OauthConsentScalarWhereWithAggregatesInput | Prisma.OauthConsentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OauthConsent"> | string;
    clientId?: Prisma.StringWithAggregatesFilter<"OauthConsent"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"OauthConsent"> | string;
    scopes?: Prisma.StringWithAggregatesFilter<"OauthConsent"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OauthConsent"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OauthConsent"> | Date | string;
    consentGiven?: Prisma.BoolWithAggregatesFilter<"OauthConsent"> | boolean;
};
export type OauthConsentCreateInput = {
    id: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
    oauthapplication: Prisma.OauthApplicationCreateNestedOneWithoutOauthconsentsInput;
    user: Prisma.UserCreateNestedOneWithoutOauthConsentsInput;
};
export type OauthConsentUncheckedCreateInput = {
    id: string;
    clientId: string;
    userId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
};
export type OauthConsentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    oauthapplication?: Prisma.OauthApplicationUpdateOneRequiredWithoutOauthconsentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutOauthConsentsNestedInput;
};
export type OauthConsentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentCreateManyInput = {
    id: string;
    clientId: string;
    userId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
};
export type OauthConsentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentListRelationFilter = {
    every?: Prisma.OauthConsentWhereInput;
    some?: Prisma.OauthConsentWhereInput;
    none?: Prisma.OauthConsentWhereInput;
};
export type OauthConsentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OauthConsentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    consentGiven?: Prisma.SortOrder;
};
export type OauthConsentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    consentGiven?: Prisma.SortOrder;
};
export type OauthConsentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    scopes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    consentGiven?: Prisma.SortOrder;
};
export type OauthConsentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutUserInput, Prisma.OauthConsentUncheckedCreateWithoutUserInput> | Prisma.OauthConsentCreateWithoutUserInput[] | Prisma.OauthConsentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutUserInput | Prisma.OauthConsentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OauthConsentCreateManyUserInputEnvelope;
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
};
export type OauthConsentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutUserInput, Prisma.OauthConsentUncheckedCreateWithoutUserInput> | Prisma.OauthConsentCreateWithoutUserInput[] | Prisma.OauthConsentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutUserInput | Prisma.OauthConsentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OauthConsentCreateManyUserInputEnvelope;
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
};
export type OauthConsentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutUserInput, Prisma.OauthConsentUncheckedCreateWithoutUserInput> | Prisma.OauthConsentCreateWithoutUserInput[] | Prisma.OauthConsentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutUserInput | Prisma.OauthConsentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OauthConsentUpsertWithWhereUniqueWithoutUserInput | Prisma.OauthConsentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OauthConsentCreateManyUserInputEnvelope;
    set?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    disconnect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    delete?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    update?: Prisma.OauthConsentUpdateWithWhereUniqueWithoutUserInput | Prisma.OauthConsentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OauthConsentUpdateManyWithWhereWithoutUserInput | Prisma.OauthConsentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OauthConsentScalarWhereInput | Prisma.OauthConsentScalarWhereInput[];
};
export type OauthConsentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutUserInput, Prisma.OauthConsentUncheckedCreateWithoutUserInput> | Prisma.OauthConsentCreateWithoutUserInput[] | Prisma.OauthConsentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutUserInput | Prisma.OauthConsentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OauthConsentUpsertWithWhereUniqueWithoutUserInput | Prisma.OauthConsentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OauthConsentCreateManyUserInputEnvelope;
    set?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    disconnect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    delete?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    update?: Prisma.OauthConsentUpdateWithWhereUniqueWithoutUserInput | Prisma.OauthConsentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OauthConsentUpdateManyWithWhereWithoutUserInput | Prisma.OauthConsentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OauthConsentScalarWhereInput | Prisma.OauthConsentScalarWhereInput[];
};
export type OauthConsentCreateNestedManyWithoutOauthapplicationInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthConsentCreateWithoutOauthapplicationInput[] | Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthConsentCreateManyOauthapplicationInputEnvelope;
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
};
export type OauthConsentUncheckedCreateNestedManyWithoutOauthapplicationInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthConsentCreateWithoutOauthapplicationInput[] | Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthConsentCreateManyOauthapplicationInputEnvelope;
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
};
export type OauthConsentUpdateManyWithoutOauthapplicationNestedInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthConsentCreateWithoutOauthapplicationInput[] | Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput[];
    upsert?: Prisma.OauthConsentUpsertWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthConsentUpsertWithWhereUniqueWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthConsentCreateManyOauthapplicationInputEnvelope;
    set?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    disconnect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    delete?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    update?: Prisma.OauthConsentUpdateWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthConsentUpdateWithWhereUniqueWithoutOauthapplicationInput[];
    updateMany?: Prisma.OauthConsentUpdateManyWithWhereWithoutOauthapplicationInput | Prisma.OauthConsentUpdateManyWithWhereWithoutOauthapplicationInput[];
    deleteMany?: Prisma.OauthConsentScalarWhereInput | Prisma.OauthConsentScalarWhereInput[];
};
export type OauthConsentUncheckedUpdateManyWithoutOauthapplicationNestedInput = {
    create?: Prisma.XOR<Prisma.OauthConsentCreateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput> | Prisma.OauthConsentCreateWithoutOauthapplicationInput[] | Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput[];
    connectOrCreate?: Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput | Prisma.OauthConsentCreateOrConnectWithoutOauthapplicationInput[];
    upsert?: Prisma.OauthConsentUpsertWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthConsentUpsertWithWhereUniqueWithoutOauthapplicationInput[];
    createMany?: Prisma.OauthConsentCreateManyOauthapplicationInputEnvelope;
    set?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    disconnect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    delete?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    connect?: Prisma.OauthConsentWhereUniqueInput | Prisma.OauthConsentWhereUniqueInput[];
    update?: Prisma.OauthConsentUpdateWithWhereUniqueWithoutOauthapplicationInput | Prisma.OauthConsentUpdateWithWhereUniqueWithoutOauthapplicationInput[];
    updateMany?: Prisma.OauthConsentUpdateManyWithWhereWithoutOauthapplicationInput | Prisma.OauthConsentUpdateManyWithWhereWithoutOauthapplicationInput[];
    deleteMany?: Prisma.OauthConsentScalarWhereInput | Prisma.OauthConsentScalarWhereInput[];
};
export type OauthConsentCreateWithoutUserInput = {
    id: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
    oauthapplication: Prisma.OauthApplicationCreateNestedOneWithoutOauthconsentsInput;
};
export type OauthConsentUncheckedCreateWithoutUserInput = {
    id: string;
    clientId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
};
export type OauthConsentCreateOrConnectWithoutUserInput = {
    where: Prisma.OauthConsentWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthConsentCreateWithoutUserInput, Prisma.OauthConsentUncheckedCreateWithoutUserInput>;
};
export type OauthConsentCreateManyUserInputEnvelope = {
    data: Prisma.OauthConsentCreateManyUserInput | Prisma.OauthConsentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OauthConsentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OauthConsentWhereUniqueInput;
    update: Prisma.XOR<Prisma.OauthConsentUpdateWithoutUserInput, Prisma.OauthConsentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OauthConsentCreateWithoutUserInput, Prisma.OauthConsentUncheckedCreateWithoutUserInput>;
};
export type OauthConsentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OauthConsentWhereUniqueInput;
    data: Prisma.XOR<Prisma.OauthConsentUpdateWithoutUserInput, Prisma.OauthConsentUncheckedUpdateWithoutUserInput>;
};
export type OauthConsentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OauthConsentScalarWhereInput;
    data: Prisma.XOR<Prisma.OauthConsentUpdateManyMutationInput, Prisma.OauthConsentUncheckedUpdateManyWithoutUserInput>;
};
export type OauthConsentScalarWhereInput = {
    AND?: Prisma.OauthConsentScalarWhereInput | Prisma.OauthConsentScalarWhereInput[];
    OR?: Prisma.OauthConsentScalarWhereInput[];
    NOT?: Prisma.OauthConsentScalarWhereInput | Prisma.OauthConsentScalarWhereInput[];
    id?: Prisma.StringFilter<"OauthConsent"> | string;
    clientId?: Prisma.StringFilter<"OauthConsent"> | string;
    userId?: Prisma.StringFilter<"OauthConsent"> | string;
    scopes?: Prisma.StringFilter<"OauthConsent"> | string;
    createdAt?: Prisma.DateTimeFilter<"OauthConsent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthConsent"> | Date | string;
    consentGiven?: Prisma.BoolFilter<"OauthConsent"> | boolean;
};
export type OauthConsentCreateWithoutOauthapplicationInput = {
    id: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
    user: Prisma.UserCreateNestedOneWithoutOauthConsentsInput;
};
export type OauthConsentUncheckedCreateWithoutOauthapplicationInput = {
    id: string;
    userId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
};
export type OauthConsentCreateOrConnectWithoutOauthapplicationInput = {
    where: Prisma.OauthConsentWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthConsentCreateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput>;
};
export type OauthConsentCreateManyOauthapplicationInputEnvelope = {
    data: Prisma.OauthConsentCreateManyOauthapplicationInput | Prisma.OauthConsentCreateManyOauthapplicationInput[];
    skipDuplicates?: boolean;
};
export type OauthConsentUpsertWithWhereUniqueWithoutOauthapplicationInput = {
    where: Prisma.OauthConsentWhereUniqueInput;
    update: Prisma.XOR<Prisma.OauthConsentUpdateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedUpdateWithoutOauthapplicationInput>;
    create: Prisma.XOR<Prisma.OauthConsentCreateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedCreateWithoutOauthapplicationInput>;
};
export type OauthConsentUpdateWithWhereUniqueWithoutOauthapplicationInput = {
    where: Prisma.OauthConsentWhereUniqueInput;
    data: Prisma.XOR<Prisma.OauthConsentUpdateWithoutOauthapplicationInput, Prisma.OauthConsentUncheckedUpdateWithoutOauthapplicationInput>;
};
export type OauthConsentUpdateManyWithWhereWithoutOauthapplicationInput = {
    where: Prisma.OauthConsentScalarWhereInput;
    data: Prisma.XOR<Prisma.OauthConsentUpdateManyMutationInput, Prisma.OauthConsentUncheckedUpdateManyWithoutOauthapplicationInput>;
};
export type OauthConsentCreateManyUserInput = {
    id: string;
    clientId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
};
export type OauthConsentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    oauthapplication?: Prisma.OauthApplicationUpdateOneRequiredWithoutOauthconsentsNestedInput;
};
export type OauthConsentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentCreateManyOauthapplicationInput = {
    id: string;
    userId: string;
    scopes: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    consentGiven: boolean;
};
export type OauthConsentUpdateWithoutOauthapplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutOauthConsentsNestedInput;
};
export type OauthConsentUncheckedUpdateWithoutOauthapplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentUncheckedUpdateManyWithoutOauthapplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    scopes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consentGiven?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OauthConsentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    consentGiven?: boolean;
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthConsent"]>;
export type OauthConsentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    consentGiven?: boolean;
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthConsent"]>;
export type OauthConsentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    consentGiven?: boolean;
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthConsent"]>;
export type OauthConsentSelectScalar = {
    id?: boolean;
    clientId?: boolean;
    userId?: boolean;
    scopes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    consentGiven?: boolean;
};
export type OauthConsentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "clientId" | "userId" | "scopes" | "createdAt" | "updatedAt" | "consentGiven", ExtArgs["result"]["oauthConsent"]>;
export type OauthConsentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OauthConsentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OauthConsentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    oauthapplication?: boolean | Prisma.OauthApplicationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OauthConsentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OauthConsent";
    objects: {
        oauthapplication: Prisma.$OauthApplicationPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        clientId: string;
        userId: string;
        scopes: string;
        createdAt: Date;
        updatedAt: Date;
        consentGiven: boolean;
    }, ExtArgs["result"]["oauthConsent"]>;
    composites: {};
};
export type OauthConsentGetPayload<S extends boolean | null | undefined | OauthConsentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload, S>;
export type OauthConsentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OauthConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OauthConsentCountAggregateInputType | true;
};
export interface OauthConsentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OauthConsent'];
        meta: {
            name: 'OauthConsent';
        };
    };
    findUnique<T extends OauthConsentFindUniqueArgs>(args: Prisma.SelectSubset<T, OauthConsentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OauthConsentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OauthConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OauthConsentFindFirstArgs>(args?: Prisma.SelectSubset<T, OauthConsentFindFirstArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OauthConsentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OauthConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OauthConsentFindManyArgs>(args?: Prisma.SelectSubset<T, OauthConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OauthConsentCreateArgs>(args: Prisma.SelectSubset<T, OauthConsentCreateArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OauthConsentCreateManyArgs>(args?: Prisma.SelectSubset<T, OauthConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OauthConsentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OauthConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OauthConsentDeleteArgs>(args: Prisma.SelectSubset<T, OauthConsentDeleteArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OauthConsentUpdateArgs>(args: Prisma.SelectSubset<T, OauthConsentUpdateArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OauthConsentDeleteManyArgs>(args?: Prisma.SelectSubset<T, OauthConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OauthConsentUpdateManyArgs>(args: Prisma.SelectSubset<T, OauthConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OauthConsentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OauthConsentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OauthConsentUpsertArgs>(args: Prisma.SelectSubset<T, OauthConsentUpsertArgs<ExtArgs>>): Prisma.Prisma__OauthConsentClient<runtime.Types.Result.GetResult<Prisma.$OauthConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OauthConsentCountArgs>(args?: Prisma.Subset<T, OauthConsentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OauthConsentCountAggregateOutputType> : number>;
    aggregate<T extends OauthConsentAggregateArgs>(args: Prisma.Subset<T, OauthConsentAggregateArgs>): Prisma.PrismaPromise<GetOauthConsentAggregateType<T>>;
    groupBy<T extends OauthConsentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OauthConsentGroupByArgs['orderBy'];
    } : {
        orderBy?: OauthConsentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OauthConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OauthConsentFieldRefs;
}
export interface Prisma__OauthConsentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    oauthapplication<T extends Prisma.OauthApplicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OauthApplicationDefaultArgs<ExtArgs>>): Prisma.Prisma__OauthApplicationClient<runtime.Types.Result.GetResult<Prisma.$OauthApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OauthConsentFieldRefs {
    readonly id: Prisma.FieldRef<"OauthConsent", 'String'>;
    readonly clientId: Prisma.FieldRef<"OauthConsent", 'String'>;
    readonly userId: Prisma.FieldRef<"OauthConsent", 'String'>;
    readonly scopes: Prisma.FieldRef<"OauthConsent", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OauthConsent", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OauthConsent", 'DateTime'>;
    readonly consentGiven: Prisma.FieldRef<"OauthConsent", 'Boolean'>;
}
export type OauthConsentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    where: Prisma.OauthConsentWhereUniqueInput;
};
export type OauthConsentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    where: Prisma.OauthConsentWhereUniqueInput;
};
export type OauthConsentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthConsentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthConsentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OauthConsentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthConsentCreateInput, Prisma.OauthConsentUncheckedCreateInput>;
};
export type OauthConsentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OauthConsentCreateManyInput | Prisma.OauthConsentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OauthConsentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    data: Prisma.OauthConsentCreateManyInput | Prisma.OauthConsentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OauthConsentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OauthConsentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthConsentUpdateInput, Prisma.OauthConsentUncheckedUpdateInput>;
    where: Prisma.OauthConsentWhereUniqueInput;
};
export type OauthConsentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OauthConsentUpdateManyMutationInput, Prisma.OauthConsentUncheckedUpdateManyInput>;
    where?: Prisma.OauthConsentWhereInput;
    limit?: number;
};
export type OauthConsentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthConsentUpdateManyMutationInput, Prisma.OauthConsentUncheckedUpdateManyInput>;
    where?: Prisma.OauthConsentWhereInput;
    limit?: number;
    include?: Prisma.OauthConsentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OauthConsentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    where: Prisma.OauthConsentWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthConsentCreateInput, Prisma.OauthConsentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OauthConsentUpdateInput, Prisma.OauthConsentUncheckedUpdateInput>;
};
export type OauthConsentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
    where: Prisma.OauthConsentWhereUniqueInput;
};
export type OauthConsentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthConsentWhereInput;
    limit?: number;
};
export type OauthConsentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthConsentSelect<ExtArgs> | null;
    omit?: Prisma.OauthConsentOmit<ExtArgs> | null;
    include?: Prisma.OauthConsentInclude<ExtArgs> | null;
};
