import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProviderModel = runtime.Types.Result.DefaultSelection<Prisma.$ProviderPayload>;
export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null;
    _avg: ProviderAvgAggregateOutputType | null;
    _sum: ProviderSumAggregateOutputType | null;
    _min: ProviderMinAggregateOutputType | null;
    _max: ProviderMaxAggregateOutputType | null;
};
export type ProviderAvgAggregateOutputType = {
    priority: number | null;
    totalSpace: number | null;
    usedSpace: number | null;
    availableSpace: number | null;
};
export type ProviderSumAggregateOutputType = {
    priority: number | null;
    totalSpace: bigint | null;
    usedSpace: bigint | null;
    availableSpace: bigint | null;
};
export type ProviderMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.ProviderType | null;
    displayName: string | null;
    isActive: boolean | null;
    priority: number | null;
    folderPath: string | null;
    lastSyncAt: Date | null;
    syncError: string | null;
    totalSpace: bigint | null;
    usedSpace: bigint | null;
    availableSpace: bigint | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProviderMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.ProviderType | null;
    displayName: string | null;
    isActive: boolean | null;
    priority: number | null;
    folderPath: string | null;
    lastSyncAt: Date | null;
    syncError: string | null;
    totalSpace: bigint | null;
    usedSpace: bigint | null;
    availableSpace: bigint | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProviderCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    displayName: number;
    isActive: number;
    priority: number;
    credentials: number;
    folderPath: number;
    lastSyncAt: number;
    syncError: number;
    totalSpace: number;
    usedSpace: number;
    availableSpace: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProviderAvgAggregateInputType = {
    priority?: true;
    totalSpace?: true;
    usedSpace?: true;
    availableSpace?: true;
};
export type ProviderSumAggregateInputType = {
    priority?: true;
    totalSpace?: true;
    usedSpace?: true;
    availableSpace?: true;
};
export type ProviderMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    displayName?: true;
    isActive?: true;
    priority?: true;
    folderPath?: true;
    lastSyncAt?: true;
    syncError?: true;
    totalSpace?: true;
    usedSpace?: true;
    availableSpace?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProviderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    displayName?: true;
    isActive?: true;
    priority?: true;
    folderPath?: true;
    lastSyncAt?: true;
    syncError?: true;
    totalSpace?: true;
    usedSpace?: true;
    availableSpace?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProviderCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    displayName?: true;
    isActive?: true;
    priority?: true;
    credentials?: true;
    folderPath?: true;
    lastSyncAt?: true;
    syncError?: true;
    totalSpace?: true;
    usedSpace?: true;
    availableSpace?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProviderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderWhereInput;
    orderBy?: Prisma.ProviderOrderByWithRelationInput | Prisma.ProviderOrderByWithRelationInput[];
    cursor?: Prisma.ProviderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProviderCountAggregateInputType;
    _avg?: ProviderAvgAggregateInputType;
    _sum?: ProviderSumAggregateInputType;
    _min?: ProviderMinAggregateInputType;
    _max?: ProviderMaxAggregateInputType;
};
export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
    [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProvider[P]> : Prisma.GetScalarType<T[P], AggregateProvider[P]>;
};
export type ProviderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderWhereInput;
    orderBy?: Prisma.ProviderOrderByWithAggregationInput | Prisma.ProviderOrderByWithAggregationInput[];
    by: Prisma.ProviderScalarFieldEnum[] | Prisma.ProviderScalarFieldEnum;
    having?: Prisma.ProviderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProviderCountAggregateInputType | true;
    _avg?: ProviderAvgAggregateInputType;
    _sum?: ProviderSumAggregateInputType;
    _min?: ProviderMinAggregateInputType;
    _max?: ProviderMaxAggregateInputType;
};
export type ProviderGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive: boolean;
    priority: number;
    credentials: runtime.JsonValue;
    folderPath: string | null;
    lastSyncAt: Date | null;
    syncError: string | null;
    totalSpace: bigint | null;
    usedSpace: bigint | null;
    availableSpace: bigint | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ProviderCountAggregateOutputType | null;
    _avg: ProviderAvgAggregateOutputType | null;
    _sum: ProviderSumAggregateOutputType | null;
    _min: ProviderMinAggregateOutputType | null;
    _max: ProviderMaxAggregateOutputType | null;
};
export type GetProviderGroupByPayload<T extends ProviderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProviderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProviderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProviderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProviderGroupByOutputType[P]>;
}>>;
export type ProviderWhereInput = {
    AND?: Prisma.ProviderWhereInput | Prisma.ProviderWhereInput[];
    OR?: Prisma.ProviderWhereInput[];
    NOT?: Prisma.ProviderWhereInput | Prisma.ProviderWhereInput[];
    id?: Prisma.StringFilter<"Provider"> | string;
    userId?: Prisma.StringFilter<"Provider"> | string;
    type?: Prisma.EnumProviderTypeFilter<"Provider"> | $Enums.ProviderType;
    displayName?: Prisma.StringFilter<"Provider"> | string;
    isActive?: Prisma.BoolFilter<"Provider"> | boolean;
    priority?: Prisma.IntFilter<"Provider"> | number;
    credentials?: Prisma.JsonFilter<"Provider">;
    folderPath?: Prisma.StringNullableFilter<"Provider"> | string | null;
    lastSyncAt?: Prisma.DateTimeNullableFilter<"Provider"> | Date | string | null;
    syncError?: Prisma.StringNullableFilter<"Provider"> | string | null;
    totalSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    usedSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    availableSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    createdAt?: Prisma.DateTimeFilter<"Provider"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Provider"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    nodes?: Prisma.NodeListRelationFilter;
    fileChunks?: Prisma.FileChunkListRelationFilter;
};
export type ProviderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    credentials?: Prisma.SortOrder;
    folderPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    syncError?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalSpace?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedSpace?: Prisma.SortOrderInput | Prisma.SortOrder;
    availableSpace?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    nodes?: Prisma.NodeOrderByRelationAggregateInput;
    fileChunks?: Prisma.FileChunkOrderByRelationAggregateInput;
};
export type ProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_type_id?: Prisma.ProviderUserIdTypeIdCompoundUniqueInput;
    AND?: Prisma.ProviderWhereInput | Prisma.ProviderWhereInput[];
    OR?: Prisma.ProviderWhereInput[];
    NOT?: Prisma.ProviderWhereInput | Prisma.ProviderWhereInput[];
    userId?: Prisma.StringFilter<"Provider"> | string;
    type?: Prisma.EnumProviderTypeFilter<"Provider"> | $Enums.ProviderType;
    displayName?: Prisma.StringFilter<"Provider"> | string;
    isActive?: Prisma.BoolFilter<"Provider"> | boolean;
    priority?: Prisma.IntFilter<"Provider"> | number;
    credentials?: Prisma.JsonFilter<"Provider">;
    folderPath?: Prisma.StringNullableFilter<"Provider"> | string | null;
    lastSyncAt?: Prisma.DateTimeNullableFilter<"Provider"> | Date | string | null;
    syncError?: Prisma.StringNullableFilter<"Provider"> | string | null;
    totalSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    usedSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    availableSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    createdAt?: Prisma.DateTimeFilter<"Provider"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Provider"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    nodes?: Prisma.NodeListRelationFilter;
    fileChunks?: Prisma.FileChunkListRelationFilter;
}, "id" | "userId_type_id">;
export type ProviderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    credentials?: Prisma.SortOrder;
    folderPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    syncError?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalSpace?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedSpace?: Prisma.SortOrderInput | Prisma.SortOrder;
    availableSpace?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProviderCountOrderByAggregateInput;
    _avg?: Prisma.ProviderAvgOrderByAggregateInput;
    _max?: Prisma.ProviderMaxOrderByAggregateInput;
    _min?: Prisma.ProviderMinOrderByAggregateInput;
    _sum?: Prisma.ProviderSumOrderByAggregateInput;
};
export type ProviderScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProviderScalarWhereWithAggregatesInput | Prisma.ProviderScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProviderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProviderScalarWhereWithAggregatesInput | Prisma.ProviderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Provider"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Provider"> | string;
    type?: Prisma.EnumProviderTypeWithAggregatesFilter<"Provider"> | $Enums.ProviderType;
    displayName?: Prisma.StringWithAggregatesFilter<"Provider"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Provider"> | boolean;
    priority?: Prisma.IntWithAggregatesFilter<"Provider"> | number;
    credentials?: Prisma.JsonWithAggregatesFilter<"Provider">;
    folderPath?: Prisma.StringNullableWithAggregatesFilter<"Provider"> | string | null;
    lastSyncAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Provider"> | Date | string | null;
    syncError?: Prisma.StringNullableWithAggregatesFilter<"Provider"> | string | null;
    totalSpace?: Prisma.BigIntNullableWithAggregatesFilter<"Provider"> | bigint | number | null;
    usedSpace?: Prisma.BigIntNullableWithAggregatesFilter<"Provider"> | bigint | number | null;
    availableSpace?: Prisma.BigIntNullableWithAggregatesFilter<"Provider"> | bigint | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Provider"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Provider"> | Date | string;
};
export type ProviderCreateInput = {
    id?: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProvidersInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutProviderInput;
    fileChunks?: Prisma.FileChunkCreateNestedManyWithoutProviderInput;
};
export type ProviderUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutProviderInput;
    fileChunks?: Prisma.FileChunkUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProvidersNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutProviderNestedInput;
    fileChunks?: Prisma.FileChunkUpdateManyWithoutProviderNestedInput;
};
export type ProviderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutProviderNestedInput;
    fileChunks?: Prisma.FileChunkUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProviderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderListRelationFilter = {
    every?: Prisma.ProviderWhereInput;
    some?: Prisma.ProviderWhereInput;
    none?: Prisma.ProviderWhereInput;
};
export type ProviderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProviderUserIdTypeIdCompoundUniqueInput = {
    userId: string;
    type: $Enums.ProviderType;
    id: string;
};
export type ProviderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    credentials?: Prisma.SortOrder;
    folderPath?: Prisma.SortOrder;
    lastSyncAt?: Prisma.SortOrder;
    syncError?: Prisma.SortOrder;
    totalSpace?: Prisma.SortOrder;
    usedSpace?: Prisma.SortOrder;
    availableSpace?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderAvgOrderByAggregateInput = {
    priority?: Prisma.SortOrder;
    totalSpace?: Prisma.SortOrder;
    usedSpace?: Prisma.SortOrder;
    availableSpace?: Prisma.SortOrder;
};
export type ProviderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    folderPath?: Prisma.SortOrder;
    lastSyncAt?: Prisma.SortOrder;
    syncError?: Prisma.SortOrder;
    totalSpace?: Prisma.SortOrder;
    usedSpace?: Prisma.SortOrder;
    availableSpace?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    folderPath?: Prisma.SortOrder;
    lastSyncAt?: Prisma.SortOrder;
    syncError?: Prisma.SortOrder;
    totalSpace?: Prisma.SortOrder;
    usedSpace?: Prisma.SortOrder;
    availableSpace?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProviderSumOrderByAggregateInput = {
    priority?: Prisma.SortOrder;
    totalSpace?: Prisma.SortOrder;
    usedSpace?: Prisma.SortOrder;
    availableSpace?: Prisma.SortOrder;
};
export type ProviderScalarRelationFilter = {
    is?: Prisma.ProviderWhereInput;
    isNot?: Prisma.ProviderWhereInput;
};
export type ProviderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutUserInput, Prisma.ProviderUncheckedCreateWithoutUserInput> | Prisma.ProviderCreateWithoutUserInput[] | Prisma.ProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutUserInput | Prisma.ProviderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProviderCreateManyUserInputEnvelope;
    connect?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
};
export type ProviderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutUserInput, Prisma.ProviderUncheckedCreateWithoutUserInput> | Prisma.ProviderCreateWithoutUserInput[] | Prisma.ProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutUserInput | Prisma.ProviderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProviderCreateManyUserInputEnvelope;
    connect?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
};
export type ProviderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutUserInput, Prisma.ProviderUncheckedCreateWithoutUserInput> | Prisma.ProviderCreateWithoutUserInput[] | Prisma.ProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutUserInput | Prisma.ProviderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProviderUpsertWithWhereUniqueWithoutUserInput | Prisma.ProviderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProviderCreateManyUserInputEnvelope;
    set?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    disconnect?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    delete?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    connect?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    update?: Prisma.ProviderUpdateWithWhereUniqueWithoutUserInput | Prisma.ProviderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProviderUpdateManyWithWhereWithoutUserInput | Prisma.ProviderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProviderScalarWhereInput | Prisma.ProviderScalarWhereInput[];
};
export type ProviderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutUserInput, Prisma.ProviderUncheckedCreateWithoutUserInput> | Prisma.ProviderCreateWithoutUserInput[] | Prisma.ProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutUserInput | Prisma.ProviderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProviderUpsertWithWhereUniqueWithoutUserInput | Prisma.ProviderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProviderCreateManyUserInputEnvelope;
    set?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    disconnect?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    delete?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    connect?: Prisma.ProviderWhereUniqueInput | Prisma.ProviderWhereUniqueInput[];
    update?: Prisma.ProviderUpdateWithWhereUniqueWithoutUserInput | Prisma.ProviderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProviderUpdateManyWithWhereWithoutUserInput | Prisma.ProviderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProviderScalarWhereInput | Prisma.ProviderScalarWhereInput[];
};
export type EnumProviderTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProviderType;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type ProviderCreateNestedOneWithoutNodesInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutNodesInput, Prisma.ProviderUncheckedCreateWithoutNodesInput>;
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutNodesInput;
    connect?: Prisma.ProviderWhereUniqueInput;
};
export type ProviderUpdateOneRequiredWithoutNodesNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutNodesInput, Prisma.ProviderUncheckedCreateWithoutNodesInput>;
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutNodesInput;
    upsert?: Prisma.ProviderUpsertWithoutNodesInput;
    connect?: Prisma.ProviderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderUpdateToOneWithWhereWithoutNodesInput, Prisma.ProviderUpdateWithoutNodesInput>, Prisma.ProviderUncheckedUpdateWithoutNodesInput>;
};
export type ProviderCreateNestedOneWithoutFileChunksInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutFileChunksInput, Prisma.ProviderUncheckedCreateWithoutFileChunksInput>;
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutFileChunksInput;
    connect?: Prisma.ProviderWhereUniqueInput;
};
export type ProviderUpdateOneRequiredWithoutFileChunksNestedInput = {
    create?: Prisma.XOR<Prisma.ProviderCreateWithoutFileChunksInput, Prisma.ProviderUncheckedCreateWithoutFileChunksInput>;
    connectOrCreate?: Prisma.ProviderCreateOrConnectWithoutFileChunksInput;
    upsert?: Prisma.ProviderUpsertWithoutFileChunksInput;
    connect?: Prisma.ProviderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProviderUpdateToOneWithWhereWithoutFileChunksInput, Prisma.ProviderUpdateWithoutFileChunksInput>, Prisma.ProviderUncheckedUpdateWithoutFileChunksInput>;
};
export type ProviderCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    nodes?: Prisma.NodeCreateNestedManyWithoutProviderInput;
    fileChunks?: Prisma.FileChunkCreateNestedManyWithoutProviderInput;
};
export type ProviderUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutProviderInput;
    fileChunks?: Prisma.FileChunkUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderCreateOrConnectWithoutUserInput = {
    where: Prisma.ProviderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderCreateWithoutUserInput, Prisma.ProviderUncheckedCreateWithoutUserInput>;
};
export type ProviderCreateManyUserInputEnvelope = {
    data: Prisma.ProviderCreateManyUserInput | Prisma.ProviderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProviderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProviderWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProviderUpdateWithoutUserInput, Prisma.ProviderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProviderCreateWithoutUserInput, Prisma.ProviderUncheckedCreateWithoutUserInput>;
};
export type ProviderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProviderWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProviderUpdateWithoutUserInput, Prisma.ProviderUncheckedUpdateWithoutUserInput>;
};
export type ProviderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProviderScalarWhereInput;
    data: Prisma.XOR<Prisma.ProviderUpdateManyMutationInput, Prisma.ProviderUncheckedUpdateManyWithoutUserInput>;
};
export type ProviderScalarWhereInput = {
    AND?: Prisma.ProviderScalarWhereInput | Prisma.ProviderScalarWhereInput[];
    OR?: Prisma.ProviderScalarWhereInput[];
    NOT?: Prisma.ProviderScalarWhereInput | Prisma.ProviderScalarWhereInput[];
    id?: Prisma.StringFilter<"Provider"> | string;
    userId?: Prisma.StringFilter<"Provider"> | string;
    type?: Prisma.EnumProviderTypeFilter<"Provider"> | $Enums.ProviderType;
    displayName?: Prisma.StringFilter<"Provider"> | string;
    isActive?: Prisma.BoolFilter<"Provider"> | boolean;
    priority?: Prisma.IntFilter<"Provider"> | number;
    credentials?: Prisma.JsonFilter<"Provider">;
    folderPath?: Prisma.StringNullableFilter<"Provider"> | string | null;
    lastSyncAt?: Prisma.DateTimeNullableFilter<"Provider"> | Date | string | null;
    syncError?: Prisma.StringNullableFilter<"Provider"> | string | null;
    totalSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    usedSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    availableSpace?: Prisma.BigIntNullableFilter<"Provider"> | bigint | number | null;
    createdAt?: Prisma.DateTimeFilter<"Provider"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Provider"> | Date | string;
};
export type ProviderCreateWithoutNodesInput = {
    id?: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProvidersInput;
    fileChunks?: Prisma.FileChunkCreateNestedManyWithoutProviderInput;
};
export type ProviderUncheckedCreateWithoutNodesInput = {
    id?: string;
    userId: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fileChunks?: Prisma.FileChunkUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderCreateOrConnectWithoutNodesInput = {
    where: Prisma.ProviderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderCreateWithoutNodesInput, Prisma.ProviderUncheckedCreateWithoutNodesInput>;
};
export type ProviderUpsertWithoutNodesInput = {
    update: Prisma.XOR<Prisma.ProviderUpdateWithoutNodesInput, Prisma.ProviderUncheckedUpdateWithoutNodesInput>;
    create: Prisma.XOR<Prisma.ProviderCreateWithoutNodesInput, Prisma.ProviderUncheckedCreateWithoutNodesInput>;
    where?: Prisma.ProviderWhereInput;
};
export type ProviderUpdateToOneWithWhereWithoutNodesInput = {
    where?: Prisma.ProviderWhereInput;
    data: Prisma.XOR<Prisma.ProviderUpdateWithoutNodesInput, Prisma.ProviderUncheckedUpdateWithoutNodesInput>;
};
export type ProviderUpdateWithoutNodesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProvidersNestedInput;
    fileChunks?: Prisma.FileChunkUpdateManyWithoutProviderNestedInput;
};
export type ProviderUncheckedUpdateWithoutNodesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fileChunks?: Prisma.FileChunkUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderCreateWithoutFileChunksInput = {
    id?: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProvidersInput;
    nodes?: Prisma.NodeCreateNestedManyWithoutProviderInput;
};
export type ProviderUncheckedCreateWithoutFileChunksInput = {
    id?: string;
    userId: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    nodes?: Prisma.NodeUncheckedCreateNestedManyWithoutProviderInput;
};
export type ProviderCreateOrConnectWithoutFileChunksInput = {
    where: Prisma.ProviderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderCreateWithoutFileChunksInput, Prisma.ProviderUncheckedCreateWithoutFileChunksInput>;
};
export type ProviderUpsertWithoutFileChunksInput = {
    update: Prisma.XOR<Prisma.ProviderUpdateWithoutFileChunksInput, Prisma.ProviderUncheckedUpdateWithoutFileChunksInput>;
    create: Prisma.XOR<Prisma.ProviderCreateWithoutFileChunksInput, Prisma.ProviderUncheckedCreateWithoutFileChunksInput>;
    where?: Prisma.ProviderWhereInput;
};
export type ProviderUpdateToOneWithWhereWithoutFileChunksInput = {
    where?: Prisma.ProviderWhereInput;
    data: Prisma.XOR<Prisma.ProviderUpdateWithoutFileChunksInput, Prisma.ProviderUncheckedUpdateWithoutFileChunksInput>;
};
export type ProviderUpdateWithoutFileChunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProvidersNestedInput;
    nodes?: Prisma.NodeUpdateManyWithoutProviderNestedInput;
};
export type ProviderUncheckedUpdateWithoutFileChunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderCreateManyUserInput = {
    id?: string;
    type: $Enums.ProviderType;
    displayName: string;
    isActive?: boolean;
    priority?: number;
    credentials: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: string | null;
    lastSyncAt?: Date | string | null;
    syncError?: string | null;
    totalSpace?: bigint | number | null;
    usedSpace?: bigint | number | null;
    availableSpace?: bigint | number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProviderUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    nodes?: Prisma.NodeUpdateManyWithoutProviderNestedInput;
    fileChunks?: Prisma.FileChunkUpdateManyWithoutProviderNestedInput;
};
export type ProviderUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    nodes?: Prisma.NodeUncheckedUpdateManyWithoutProviderNestedInput;
    fileChunks?: Prisma.FileChunkUncheckedUpdateManyWithoutProviderNestedInput;
};
export type ProviderUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    credentials?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    folderPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSyncAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    syncError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    usedSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    availableSpace?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProviderCountOutputType = {
    nodes: number;
    fileChunks: number;
};
export type ProviderCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nodes?: boolean | ProviderCountOutputTypeCountNodesArgs;
    fileChunks?: boolean | ProviderCountOutputTypeCountFileChunksArgs;
};
export type ProviderCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderCountOutputTypeSelect<ExtArgs> | null;
};
export type ProviderCountOutputTypeCountNodesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NodeWhereInput;
};
export type ProviderCountOutputTypeCountFileChunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileChunkWhereInput;
};
export type ProviderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    displayName?: boolean;
    isActive?: boolean;
    priority?: boolean;
    credentials?: boolean;
    folderPath?: boolean;
    lastSyncAt?: boolean;
    syncError?: boolean;
    totalSpace?: boolean;
    usedSpace?: boolean;
    availableSpace?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    nodes?: boolean | Prisma.Provider$nodesArgs<ExtArgs>;
    fileChunks?: boolean | Prisma.Provider$fileChunksArgs<ExtArgs>;
    _count?: boolean | Prisma.ProviderCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["provider"]>;
export type ProviderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    displayName?: boolean;
    isActive?: boolean;
    priority?: boolean;
    credentials?: boolean;
    folderPath?: boolean;
    lastSyncAt?: boolean;
    syncError?: boolean;
    totalSpace?: boolean;
    usedSpace?: boolean;
    availableSpace?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["provider"]>;
export type ProviderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    displayName?: boolean;
    isActive?: boolean;
    priority?: boolean;
    credentials?: boolean;
    folderPath?: boolean;
    lastSyncAt?: boolean;
    syncError?: boolean;
    totalSpace?: boolean;
    usedSpace?: boolean;
    availableSpace?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["provider"]>;
export type ProviderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    displayName?: boolean;
    isActive?: boolean;
    priority?: boolean;
    credentials?: boolean;
    folderPath?: boolean;
    lastSyncAt?: boolean;
    syncError?: boolean;
    totalSpace?: boolean;
    usedSpace?: boolean;
    availableSpace?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProviderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "displayName" | "isActive" | "priority" | "credentials" | "folderPath" | "lastSyncAt" | "syncError" | "totalSpace" | "usedSpace" | "availableSpace" | "createdAt" | "updatedAt", ExtArgs["result"]["provider"]>;
export type ProviderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    nodes?: boolean | Prisma.Provider$nodesArgs<ExtArgs>;
    fileChunks?: boolean | Prisma.Provider$fileChunksArgs<ExtArgs>;
    _count?: boolean | Prisma.ProviderCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProviderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProviderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProviderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Provider";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        nodes: Prisma.$NodePayload<ExtArgs>[];
        fileChunks: Prisma.$FileChunkPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.ProviderType;
        displayName: string;
        isActive: boolean;
        priority: number;
        credentials: runtime.JsonValue;
        folderPath: string | null;
        lastSyncAt: Date | null;
        syncError: string | null;
        totalSpace: bigint | null;
        usedSpace: bigint | null;
        availableSpace: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["provider"]>;
    composites: {};
};
export type ProviderGetPayload<S extends boolean | null | undefined | ProviderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProviderPayload, S>;
export type ProviderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProviderCountAggregateInputType | true;
};
export interface ProviderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Provider'];
        meta: {
            name: 'Provider';
        };
    };
    findUnique<T extends ProviderFindUniqueArgs>(args: Prisma.SelectSubset<T, ProviderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProviderFindFirstArgs>(args?: Prisma.SelectSubset<T, ProviderFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProviderFindManyArgs>(args?: Prisma.SelectSubset<T, ProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProviderCreateArgs>(args: Prisma.SelectSubset<T, ProviderCreateArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProviderCreateManyArgs>(args?: Prisma.SelectSubset<T, ProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProviderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProviderDeleteArgs>(args: Prisma.SelectSubset<T, ProviderDeleteArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProviderUpdateArgs>(args: Prisma.SelectSubset<T, ProviderUpdateArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProviderDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProviderUpdateManyArgs>(args: Prisma.SelectSubset<T, ProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProviderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProviderUpsertArgs>(args: Prisma.SelectSubset<T, ProviderUpsertArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProviderCountArgs>(args?: Prisma.Subset<T, ProviderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProviderCountAggregateOutputType> : number>;
    aggregate<T extends ProviderAggregateArgs>(args: Prisma.Subset<T, ProviderAggregateArgs>): Prisma.PrismaPromise<GetProviderAggregateType<T>>;
    groupBy<T extends ProviderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProviderGroupByArgs['orderBy'];
    } : {
        orderBy?: ProviderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProviderFieldRefs;
}
export interface Prisma__ProviderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    nodes<T extends Prisma.Provider$nodesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Provider$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    fileChunks<T extends Prisma.Provider$fileChunksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Provider$fileChunksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProviderFieldRefs {
    readonly id: Prisma.FieldRef<"Provider", 'String'>;
    readonly userId: Prisma.FieldRef<"Provider", 'String'>;
    readonly type: Prisma.FieldRef<"Provider", 'ProviderType'>;
    readonly displayName: Prisma.FieldRef<"Provider", 'String'>;
    readonly isActive: Prisma.FieldRef<"Provider", 'Boolean'>;
    readonly priority: Prisma.FieldRef<"Provider", 'Int'>;
    readonly credentials: Prisma.FieldRef<"Provider", 'Json'>;
    readonly folderPath: Prisma.FieldRef<"Provider", 'String'>;
    readonly lastSyncAt: Prisma.FieldRef<"Provider", 'DateTime'>;
    readonly syncError: Prisma.FieldRef<"Provider", 'String'>;
    readonly totalSpace: Prisma.FieldRef<"Provider", 'BigInt'>;
    readonly usedSpace: Prisma.FieldRef<"Provider", 'BigInt'>;
    readonly availableSpace: Prisma.FieldRef<"Provider", 'BigInt'>;
    readonly createdAt: Prisma.FieldRef<"Provider", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Provider", 'DateTime'>;
}
export type ProviderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    where: Prisma.ProviderWhereUniqueInput;
};
export type ProviderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    where: Prisma.ProviderWhereUniqueInput;
};
export type ProviderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProviderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderCreateInput, Prisma.ProviderUncheckedCreateInput>;
};
export type ProviderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProviderCreateManyInput | Prisma.ProviderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProviderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    data: Prisma.ProviderCreateManyInput | Prisma.ProviderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProviderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProviderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderUpdateInput, Prisma.ProviderUncheckedUpdateInput>;
    where: Prisma.ProviderWhereUniqueInput;
};
export type ProviderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProviderUpdateManyMutationInput, Prisma.ProviderUncheckedUpdateManyInput>;
    where?: Prisma.ProviderWhereInput;
    limit?: number;
};
export type ProviderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProviderUpdateManyMutationInput, Prisma.ProviderUncheckedUpdateManyInput>;
    where?: Prisma.ProviderWhereInput;
    limit?: number;
    include?: Prisma.ProviderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProviderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    where: Prisma.ProviderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProviderCreateInput, Prisma.ProviderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProviderUpdateInput, Prisma.ProviderUncheckedUpdateInput>;
};
export type ProviderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
    where: Prisma.ProviderWhereUniqueInput;
};
export type ProviderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProviderWhereInput;
    limit?: number;
};
export type Provider$nodesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Provider$fileChunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    where?: Prisma.FileChunkWhereInput;
    orderBy?: Prisma.FileChunkOrderByWithRelationInput | Prisma.FileChunkOrderByWithRelationInput[];
    cursor?: Prisma.FileChunkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileChunkScalarFieldEnum | Prisma.FileChunkScalarFieldEnum[];
};
export type ProviderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProviderSelect<ExtArgs> | null;
    omit?: Prisma.ProviderOmit<ExtArgs> | null;
    include?: Prisma.ProviderInclude<ExtArgs> | null;
};
