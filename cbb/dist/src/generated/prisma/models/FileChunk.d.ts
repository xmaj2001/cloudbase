import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FileChunkModel = runtime.Types.Result.DefaultSelection<Prisma.$FileChunkPayload>;
export type AggregateFileChunk = {
    _count: FileChunkCountAggregateOutputType | null;
    _avg: FileChunkAvgAggregateOutputType | null;
    _sum: FileChunkSumAggregateOutputType | null;
    _min: FileChunkMinAggregateOutputType | null;
    _max: FileChunkMaxAggregateOutputType | null;
};
export type FileChunkAvgAggregateOutputType = {
    chunkIndex: number | null;
    size: number | null;
    startByte: number | null;
    endByte: number | null;
};
export type FileChunkSumAggregateOutputType = {
    chunkIndex: number | null;
    size: bigint | null;
    startByte: bigint | null;
    endByte: bigint | null;
};
export type FileChunkMinAggregateOutputType = {
    id: string | null;
    chunkIndex: number | null;
    size: bigint | null;
    startByte: bigint | null;
    endByte: bigint | null;
    chunkHash: string | null;
    nodeId: string | null;
    providerId: string | null;
    providerFileId: string | null;
    providerPath: string | null;
    providerCreatedAt: Date | null;
    providerUpdatedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FileChunkMaxAggregateOutputType = {
    id: string | null;
    chunkIndex: number | null;
    size: bigint | null;
    startByte: bigint | null;
    endByte: bigint | null;
    chunkHash: string | null;
    nodeId: string | null;
    providerId: string | null;
    providerFileId: string | null;
    providerPath: string | null;
    providerCreatedAt: Date | null;
    providerUpdatedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FileChunkCountAggregateOutputType = {
    id: number;
    chunkIndex: number;
    size: number;
    startByte: number;
    endByte: number;
    chunkHash: number;
    nodeId: number;
    providerId: number;
    providerFileId: number;
    providerPath: number;
    providerCreatedAt: number;
    providerUpdatedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FileChunkAvgAggregateInputType = {
    chunkIndex?: true;
    size?: true;
    startByte?: true;
    endByte?: true;
};
export type FileChunkSumAggregateInputType = {
    chunkIndex?: true;
    size?: true;
    startByte?: true;
    endByte?: true;
};
export type FileChunkMinAggregateInputType = {
    id?: true;
    chunkIndex?: true;
    size?: true;
    startByte?: true;
    endByte?: true;
    chunkHash?: true;
    nodeId?: true;
    providerId?: true;
    providerFileId?: true;
    providerPath?: true;
    providerCreatedAt?: true;
    providerUpdatedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FileChunkMaxAggregateInputType = {
    id?: true;
    chunkIndex?: true;
    size?: true;
    startByte?: true;
    endByte?: true;
    chunkHash?: true;
    nodeId?: true;
    providerId?: true;
    providerFileId?: true;
    providerPath?: true;
    providerCreatedAt?: true;
    providerUpdatedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FileChunkCountAggregateInputType = {
    id?: true;
    chunkIndex?: true;
    size?: true;
    startByte?: true;
    endByte?: true;
    chunkHash?: true;
    nodeId?: true;
    providerId?: true;
    providerFileId?: true;
    providerPath?: true;
    providerCreatedAt?: true;
    providerUpdatedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FileChunkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileChunkWhereInput;
    orderBy?: Prisma.FileChunkOrderByWithRelationInput | Prisma.FileChunkOrderByWithRelationInput[];
    cursor?: Prisma.FileChunkWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileChunkCountAggregateInputType;
    _avg?: FileChunkAvgAggregateInputType;
    _sum?: FileChunkSumAggregateInputType;
    _min?: FileChunkMinAggregateInputType;
    _max?: FileChunkMaxAggregateInputType;
};
export type GetFileChunkAggregateType<T extends FileChunkAggregateArgs> = {
    [P in keyof T & keyof AggregateFileChunk]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFileChunk[P]> : Prisma.GetScalarType<T[P], AggregateFileChunk[P]>;
};
export type FileChunkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileChunkWhereInput;
    orderBy?: Prisma.FileChunkOrderByWithAggregationInput | Prisma.FileChunkOrderByWithAggregationInput[];
    by: Prisma.FileChunkScalarFieldEnum[] | Prisma.FileChunkScalarFieldEnum;
    having?: Prisma.FileChunkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileChunkCountAggregateInputType | true;
    _avg?: FileChunkAvgAggregateInputType;
    _sum?: FileChunkSumAggregateInputType;
    _min?: FileChunkMinAggregateInputType;
    _max?: FileChunkMaxAggregateInputType;
};
export type FileChunkGroupByOutputType = {
    id: string;
    chunkIndex: number;
    size: bigint;
    startByte: bigint;
    endByte: bigint;
    chunkHash: string;
    nodeId: string;
    providerId: string;
    providerFileId: string | null;
    providerPath: string | null;
    providerCreatedAt: Date | null;
    providerUpdatedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FileChunkCountAggregateOutputType | null;
    _avg: FileChunkAvgAggregateOutputType | null;
    _sum: FileChunkSumAggregateOutputType | null;
    _min: FileChunkMinAggregateOutputType | null;
    _max: FileChunkMaxAggregateOutputType | null;
};
export type GetFileChunkGroupByPayload<T extends FileChunkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileChunkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileChunkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileChunkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileChunkGroupByOutputType[P]>;
}>>;
export type FileChunkWhereInput = {
    AND?: Prisma.FileChunkWhereInput | Prisma.FileChunkWhereInput[];
    OR?: Prisma.FileChunkWhereInput[];
    NOT?: Prisma.FileChunkWhereInput | Prisma.FileChunkWhereInput[];
    id?: Prisma.StringFilter<"FileChunk"> | string;
    chunkIndex?: Prisma.IntFilter<"FileChunk"> | number;
    size?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    startByte?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    endByte?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    chunkHash?: Prisma.StringFilter<"FileChunk"> | string;
    nodeId?: Prisma.StringFilter<"FileChunk"> | string;
    providerId?: Prisma.StringFilter<"FileChunk"> | string;
    providerFileId?: Prisma.StringNullableFilter<"FileChunk"> | string | null;
    providerPath?: Prisma.StringNullableFilter<"FileChunk"> | string | null;
    providerCreatedAt?: Prisma.DateTimeNullableFilter<"FileChunk"> | Date | string | null;
    providerUpdatedAt?: Prisma.DateTimeNullableFilter<"FileChunk"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FileChunk"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileChunk"> | Date | string;
    node?: Prisma.XOR<Prisma.NodeScalarRelationFilter, Prisma.NodeWhereInput>;
    Provider?: Prisma.XOR<Prisma.ProviderScalarRelationFilter, Prisma.ProviderWhereInput>;
};
export type FileChunkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
    chunkHash?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    providerFileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerCreatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    node?: Prisma.NodeOrderByWithRelationInput;
    Provider?: Prisma.ProviderOrderByWithRelationInput;
};
export type FileChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    nodeId_chunkIndex?: Prisma.FileChunkNodeIdChunkIndexCompoundUniqueInput;
    AND?: Prisma.FileChunkWhereInput | Prisma.FileChunkWhereInput[];
    OR?: Prisma.FileChunkWhereInput[];
    NOT?: Prisma.FileChunkWhereInput | Prisma.FileChunkWhereInput[];
    chunkIndex?: Prisma.IntFilter<"FileChunk"> | number;
    size?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    startByte?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    endByte?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    chunkHash?: Prisma.StringFilter<"FileChunk"> | string;
    nodeId?: Prisma.StringFilter<"FileChunk"> | string;
    providerId?: Prisma.StringFilter<"FileChunk"> | string;
    providerFileId?: Prisma.StringNullableFilter<"FileChunk"> | string | null;
    providerPath?: Prisma.StringNullableFilter<"FileChunk"> | string | null;
    providerCreatedAt?: Prisma.DateTimeNullableFilter<"FileChunk"> | Date | string | null;
    providerUpdatedAt?: Prisma.DateTimeNullableFilter<"FileChunk"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FileChunk"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileChunk"> | Date | string;
    node?: Prisma.XOR<Prisma.NodeScalarRelationFilter, Prisma.NodeWhereInput>;
    Provider?: Prisma.XOR<Prisma.ProviderScalarRelationFilter, Prisma.ProviderWhereInput>;
}, "id" | "nodeId_chunkIndex">;
export type FileChunkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
    chunkHash?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    providerFileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerCreatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FileChunkCountOrderByAggregateInput;
    _avg?: Prisma.FileChunkAvgOrderByAggregateInput;
    _max?: Prisma.FileChunkMaxOrderByAggregateInput;
    _min?: Prisma.FileChunkMinOrderByAggregateInput;
    _sum?: Prisma.FileChunkSumOrderByAggregateInput;
};
export type FileChunkScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileChunkScalarWhereWithAggregatesInput | Prisma.FileChunkScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileChunkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileChunkScalarWhereWithAggregatesInput | Prisma.FileChunkScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FileChunk"> | string;
    chunkIndex?: Prisma.IntWithAggregatesFilter<"FileChunk"> | number;
    size?: Prisma.BigIntWithAggregatesFilter<"FileChunk"> | bigint | number;
    startByte?: Prisma.BigIntWithAggregatesFilter<"FileChunk"> | bigint | number;
    endByte?: Prisma.BigIntWithAggregatesFilter<"FileChunk"> | bigint | number;
    chunkHash?: Prisma.StringWithAggregatesFilter<"FileChunk"> | string;
    nodeId?: Prisma.StringWithAggregatesFilter<"FileChunk"> | string;
    providerId?: Prisma.StringWithAggregatesFilter<"FileChunk"> | string;
    providerFileId?: Prisma.StringNullableWithAggregatesFilter<"FileChunk"> | string | null;
    providerPath?: Prisma.StringNullableWithAggregatesFilter<"FileChunk"> | string | null;
    providerCreatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FileChunk"> | Date | string | null;
    providerUpdatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FileChunk"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FileChunk"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FileChunk"> | Date | string;
};
export type FileChunkCreateInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    node: Prisma.NodeCreateNestedOneWithoutFileChunksInput;
    Provider: Prisma.ProviderCreateNestedOneWithoutFileChunksInput;
};
export type FileChunkUncheckedCreateInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    nodeId: string;
    providerId: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileChunkUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    node?: Prisma.NodeUpdateOneRequiredWithoutFileChunksNestedInput;
    Provider?: Prisma.ProviderUpdateOneRequiredWithoutFileChunksNestedInput;
};
export type FileChunkUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    nodeId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkCreateManyInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    nodeId: string;
    providerId: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileChunkUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    nodeId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkListRelationFilter = {
    every?: Prisma.FileChunkWhereInput;
    some?: Prisma.FileChunkWhereInput;
    none?: Prisma.FileChunkWhereInput;
};
export type FileChunkOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FileChunkNodeIdChunkIndexCompoundUniqueInput = {
    nodeId: string;
    chunkIndex: number;
};
export type FileChunkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
    chunkHash?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    providerFileId?: Prisma.SortOrder;
    providerPath?: Prisma.SortOrder;
    providerCreatedAt?: Prisma.SortOrder;
    providerUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileChunkAvgOrderByAggregateInput = {
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
};
export type FileChunkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
    chunkHash?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    providerFileId?: Prisma.SortOrder;
    providerPath?: Prisma.SortOrder;
    providerCreatedAt?: Prisma.SortOrder;
    providerUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileChunkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
    chunkHash?: Prisma.SortOrder;
    nodeId?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    providerFileId?: Prisma.SortOrder;
    providerPath?: Prisma.SortOrder;
    providerCreatedAt?: Prisma.SortOrder;
    providerUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileChunkSumOrderByAggregateInput = {
    chunkIndex?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    startByte?: Prisma.SortOrder;
    endByte?: Prisma.SortOrder;
};
export type FileChunkCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutProviderInput, Prisma.FileChunkUncheckedCreateWithoutProviderInput> | Prisma.FileChunkCreateWithoutProviderInput[] | Prisma.FileChunkUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutProviderInput | Prisma.FileChunkCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.FileChunkCreateManyProviderInputEnvelope;
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
};
export type FileChunkUncheckedCreateNestedManyWithoutProviderInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutProviderInput, Prisma.FileChunkUncheckedCreateWithoutProviderInput> | Prisma.FileChunkCreateWithoutProviderInput[] | Prisma.FileChunkUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutProviderInput | Prisma.FileChunkCreateOrConnectWithoutProviderInput[];
    createMany?: Prisma.FileChunkCreateManyProviderInputEnvelope;
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
};
export type FileChunkUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutProviderInput, Prisma.FileChunkUncheckedCreateWithoutProviderInput> | Prisma.FileChunkCreateWithoutProviderInput[] | Prisma.FileChunkUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutProviderInput | Prisma.FileChunkCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.FileChunkUpsertWithWhereUniqueWithoutProviderInput | Prisma.FileChunkUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.FileChunkCreateManyProviderInputEnvelope;
    set?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    disconnect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    delete?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    update?: Prisma.FileChunkUpdateWithWhereUniqueWithoutProviderInput | Prisma.FileChunkUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.FileChunkUpdateManyWithWhereWithoutProviderInput | Prisma.FileChunkUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.FileChunkScalarWhereInput | Prisma.FileChunkScalarWhereInput[];
};
export type FileChunkUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutProviderInput, Prisma.FileChunkUncheckedCreateWithoutProviderInput> | Prisma.FileChunkCreateWithoutProviderInput[] | Prisma.FileChunkUncheckedCreateWithoutProviderInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutProviderInput | Prisma.FileChunkCreateOrConnectWithoutProviderInput[];
    upsert?: Prisma.FileChunkUpsertWithWhereUniqueWithoutProviderInput | Prisma.FileChunkUpsertWithWhereUniqueWithoutProviderInput[];
    createMany?: Prisma.FileChunkCreateManyProviderInputEnvelope;
    set?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    disconnect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    delete?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    update?: Prisma.FileChunkUpdateWithWhereUniqueWithoutProviderInput | Prisma.FileChunkUpdateWithWhereUniqueWithoutProviderInput[];
    updateMany?: Prisma.FileChunkUpdateManyWithWhereWithoutProviderInput | Prisma.FileChunkUpdateManyWithWhereWithoutProviderInput[];
    deleteMany?: Prisma.FileChunkScalarWhereInput | Prisma.FileChunkScalarWhereInput[];
};
export type FileChunkCreateNestedManyWithoutNodeInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutNodeInput, Prisma.FileChunkUncheckedCreateWithoutNodeInput> | Prisma.FileChunkCreateWithoutNodeInput[] | Prisma.FileChunkUncheckedCreateWithoutNodeInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutNodeInput | Prisma.FileChunkCreateOrConnectWithoutNodeInput[];
    createMany?: Prisma.FileChunkCreateManyNodeInputEnvelope;
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
};
export type FileChunkUncheckedCreateNestedManyWithoutNodeInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutNodeInput, Prisma.FileChunkUncheckedCreateWithoutNodeInput> | Prisma.FileChunkCreateWithoutNodeInput[] | Prisma.FileChunkUncheckedCreateWithoutNodeInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutNodeInput | Prisma.FileChunkCreateOrConnectWithoutNodeInput[];
    createMany?: Prisma.FileChunkCreateManyNodeInputEnvelope;
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
};
export type FileChunkUpdateManyWithoutNodeNestedInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutNodeInput, Prisma.FileChunkUncheckedCreateWithoutNodeInput> | Prisma.FileChunkCreateWithoutNodeInput[] | Prisma.FileChunkUncheckedCreateWithoutNodeInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutNodeInput | Prisma.FileChunkCreateOrConnectWithoutNodeInput[];
    upsert?: Prisma.FileChunkUpsertWithWhereUniqueWithoutNodeInput | Prisma.FileChunkUpsertWithWhereUniqueWithoutNodeInput[];
    createMany?: Prisma.FileChunkCreateManyNodeInputEnvelope;
    set?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    disconnect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    delete?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    update?: Prisma.FileChunkUpdateWithWhereUniqueWithoutNodeInput | Prisma.FileChunkUpdateWithWhereUniqueWithoutNodeInput[];
    updateMany?: Prisma.FileChunkUpdateManyWithWhereWithoutNodeInput | Prisma.FileChunkUpdateManyWithWhereWithoutNodeInput[];
    deleteMany?: Prisma.FileChunkScalarWhereInput | Prisma.FileChunkScalarWhereInput[];
};
export type FileChunkUncheckedUpdateManyWithoutNodeNestedInput = {
    create?: Prisma.XOR<Prisma.FileChunkCreateWithoutNodeInput, Prisma.FileChunkUncheckedCreateWithoutNodeInput> | Prisma.FileChunkCreateWithoutNodeInput[] | Prisma.FileChunkUncheckedCreateWithoutNodeInput[];
    connectOrCreate?: Prisma.FileChunkCreateOrConnectWithoutNodeInput | Prisma.FileChunkCreateOrConnectWithoutNodeInput[];
    upsert?: Prisma.FileChunkUpsertWithWhereUniqueWithoutNodeInput | Prisma.FileChunkUpsertWithWhereUniqueWithoutNodeInput[];
    createMany?: Prisma.FileChunkCreateManyNodeInputEnvelope;
    set?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    disconnect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    delete?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    connect?: Prisma.FileChunkWhereUniqueInput | Prisma.FileChunkWhereUniqueInput[];
    update?: Prisma.FileChunkUpdateWithWhereUniqueWithoutNodeInput | Prisma.FileChunkUpdateWithWhereUniqueWithoutNodeInput[];
    updateMany?: Prisma.FileChunkUpdateManyWithWhereWithoutNodeInput | Prisma.FileChunkUpdateManyWithWhereWithoutNodeInput[];
    deleteMany?: Prisma.FileChunkScalarWhereInput | Prisma.FileChunkScalarWhereInput[];
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type FileChunkCreateWithoutProviderInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    node: Prisma.NodeCreateNestedOneWithoutFileChunksInput;
};
export type FileChunkUncheckedCreateWithoutProviderInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    nodeId: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileChunkCreateOrConnectWithoutProviderInput = {
    where: Prisma.FileChunkWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileChunkCreateWithoutProviderInput, Prisma.FileChunkUncheckedCreateWithoutProviderInput>;
};
export type FileChunkCreateManyProviderInputEnvelope = {
    data: Prisma.FileChunkCreateManyProviderInput | Prisma.FileChunkCreateManyProviderInput[];
    skipDuplicates?: boolean;
};
export type FileChunkUpsertWithWhereUniqueWithoutProviderInput = {
    where: Prisma.FileChunkWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileChunkUpdateWithoutProviderInput, Prisma.FileChunkUncheckedUpdateWithoutProviderInput>;
    create: Prisma.XOR<Prisma.FileChunkCreateWithoutProviderInput, Prisma.FileChunkUncheckedCreateWithoutProviderInput>;
};
export type FileChunkUpdateWithWhereUniqueWithoutProviderInput = {
    where: Prisma.FileChunkWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileChunkUpdateWithoutProviderInput, Prisma.FileChunkUncheckedUpdateWithoutProviderInput>;
};
export type FileChunkUpdateManyWithWhereWithoutProviderInput = {
    where: Prisma.FileChunkScalarWhereInput;
    data: Prisma.XOR<Prisma.FileChunkUpdateManyMutationInput, Prisma.FileChunkUncheckedUpdateManyWithoutProviderInput>;
};
export type FileChunkScalarWhereInput = {
    AND?: Prisma.FileChunkScalarWhereInput | Prisma.FileChunkScalarWhereInput[];
    OR?: Prisma.FileChunkScalarWhereInput[];
    NOT?: Prisma.FileChunkScalarWhereInput | Prisma.FileChunkScalarWhereInput[];
    id?: Prisma.StringFilter<"FileChunk"> | string;
    chunkIndex?: Prisma.IntFilter<"FileChunk"> | number;
    size?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    startByte?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    endByte?: Prisma.BigIntFilter<"FileChunk"> | bigint | number;
    chunkHash?: Prisma.StringFilter<"FileChunk"> | string;
    nodeId?: Prisma.StringFilter<"FileChunk"> | string;
    providerId?: Prisma.StringFilter<"FileChunk"> | string;
    providerFileId?: Prisma.StringNullableFilter<"FileChunk"> | string | null;
    providerPath?: Prisma.StringNullableFilter<"FileChunk"> | string | null;
    providerCreatedAt?: Prisma.DateTimeNullableFilter<"FileChunk"> | Date | string | null;
    providerUpdatedAt?: Prisma.DateTimeNullableFilter<"FileChunk"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FileChunk"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileChunk"> | Date | string;
};
export type FileChunkCreateWithoutNodeInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Provider: Prisma.ProviderCreateNestedOneWithoutFileChunksInput;
};
export type FileChunkUncheckedCreateWithoutNodeInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    providerId: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileChunkCreateOrConnectWithoutNodeInput = {
    where: Prisma.FileChunkWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileChunkCreateWithoutNodeInput, Prisma.FileChunkUncheckedCreateWithoutNodeInput>;
};
export type FileChunkCreateManyNodeInputEnvelope = {
    data: Prisma.FileChunkCreateManyNodeInput | Prisma.FileChunkCreateManyNodeInput[];
    skipDuplicates?: boolean;
};
export type FileChunkUpsertWithWhereUniqueWithoutNodeInput = {
    where: Prisma.FileChunkWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileChunkUpdateWithoutNodeInput, Prisma.FileChunkUncheckedUpdateWithoutNodeInput>;
    create: Prisma.XOR<Prisma.FileChunkCreateWithoutNodeInput, Prisma.FileChunkUncheckedCreateWithoutNodeInput>;
};
export type FileChunkUpdateWithWhereUniqueWithoutNodeInput = {
    where: Prisma.FileChunkWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileChunkUpdateWithoutNodeInput, Prisma.FileChunkUncheckedUpdateWithoutNodeInput>;
};
export type FileChunkUpdateManyWithWhereWithoutNodeInput = {
    where: Prisma.FileChunkScalarWhereInput;
    data: Prisma.XOR<Prisma.FileChunkUpdateManyMutationInput, Prisma.FileChunkUncheckedUpdateManyWithoutNodeInput>;
};
export type FileChunkCreateManyProviderInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    nodeId: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileChunkUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    node?: Prisma.NodeUpdateOneRequiredWithoutFileChunksNestedInput;
};
export type FileChunkUncheckedUpdateWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    nodeId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkUncheckedUpdateManyWithoutProviderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    nodeId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkCreateManyNodeInput = {
    id?: string;
    chunkIndex: number;
    size: bigint | number;
    startByte: bigint | number;
    endByte: bigint | number;
    chunkHash: string;
    providerId: string;
    providerFileId?: string | null;
    providerPath?: string | null;
    providerCreatedAt?: Date | string | null;
    providerUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileChunkUpdateWithoutNodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Provider?: Prisma.ProviderUpdateOneRequiredWithoutFileChunksNestedInput;
};
export type FileChunkUncheckedUpdateWithoutNodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkUncheckedUpdateManyWithoutNodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    size?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    startByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    endByte?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    chunkHash?: Prisma.StringFieldUpdateOperationsInput | string;
    providerId?: Prisma.StringFieldUpdateOperationsInput | string;
    providerFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    providerUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileChunkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    chunkIndex?: boolean;
    size?: boolean;
    startByte?: boolean;
    endByte?: boolean;
    chunkHash?: boolean;
    nodeId?: boolean;
    providerId?: boolean;
    providerFileId?: boolean;
    providerPath?: boolean;
    providerCreatedAt?: boolean;
    providerUpdatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    node?: boolean | Prisma.NodeDefaultArgs<ExtArgs>;
    Provider?: boolean | Prisma.ProviderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileChunk"]>;
export type FileChunkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    chunkIndex?: boolean;
    size?: boolean;
    startByte?: boolean;
    endByte?: boolean;
    chunkHash?: boolean;
    nodeId?: boolean;
    providerId?: boolean;
    providerFileId?: boolean;
    providerPath?: boolean;
    providerCreatedAt?: boolean;
    providerUpdatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    node?: boolean | Prisma.NodeDefaultArgs<ExtArgs>;
    Provider?: boolean | Prisma.ProviderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileChunk"]>;
export type FileChunkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    chunkIndex?: boolean;
    size?: boolean;
    startByte?: boolean;
    endByte?: boolean;
    chunkHash?: boolean;
    nodeId?: boolean;
    providerId?: boolean;
    providerFileId?: boolean;
    providerPath?: boolean;
    providerCreatedAt?: boolean;
    providerUpdatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    node?: boolean | Prisma.NodeDefaultArgs<ExtArgs>;
    Provider?: boolean | Prisma.ProviderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileChunk"]>;
export type FileChunkSelectScalar = {
    id?: boolean;
    chunkIndex?: boolean;
    size?: boolean;
    startByte?: boolean;
    endByte?: boolean;
    chunkHash?: boolean;
    nodeId?: boolean;
    providerId?: boolean;
    providerFileId?: boolean;
    providerPath?: boolean;
    providerCreatedAt?: boolean;
    providerUpdatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FileChunkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "chunkIndex" | "size" | "startByte" | "endByte" | "chunkHash" | "nodeId" | "providerId" | "providerFileId" | "providerPath" | "providerCreatedAt" | "providerUpdatedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["fileChunk"]>;
export type FileChunkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    node?: boolean | Prisma.NodeDefaultArgs<ExtArgs>;
    Provider?: boolean | Prisma.ProviderDefaultArgs<ExtArgs>;
};
export type FileChunkIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    node?: boolean | Prisma.NodeDefaultArgs<ExtArgs>;
    Provider?: boolean | Prisma.ProviderDefaultArgs<ExtArgs>;
};
export type FileChunkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    node?: boolean | Prisma.NodeDefaultArgs<ExtArgs>;
    Provider?: boolean | Prisma.ProviderDefaultArgs<ExtArgs>;
};
export type $FileChunkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FileChunk";
    objects: {
        node: Prisma.$NodePayload<ExtArgs>;
        Provider: Prisma.$ProviderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        chunkIndex: number;
        size: bigint;
        startByte: bigint;
        endByte: bigint;
        chunkHash: string;
        nodeId: string;
        providerId: string;
        providerFileId: string | null;
        providerPath: string | null;
        providerCreatedAt: Date | null;
        providerUpdatedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["fileChunk"]>;
    composites: {};
};
export type FileChunkGetPayload<S extends boolean | null | undefined | FileChunkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FileChunkPayload, S>;
export type FileChunkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileChunkCountAggregateInputType | true;
};
export interface FileChunkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FileChunk'];
        meta: {
            name: 'FileChunk';
        };
    };
    findUnique<T extends FileChunkFindUniqueArgs>(args: Prisma.SelectSubset<T, FileChunkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileChunkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileChunkFindFirstArgs>(args?: Prisma.SelectSubset<T, FileChunkFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileChunkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileChunkFindManyArgs>(args?: Prisma.SelectSubset<T, FileChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileChunkCreateArgs>(args: Prisma.SelectSubset<T, FileChunkCreateArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileChunkCreateManyArgs>(args?: Prisma.SelectSubset<T, FileChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileChunkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileChunkDeleteArgs>(args: Prisma.SelectSubset<T, FileChunkDeleteArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileChunkUpdateArgs>(args: Prisma.SelectSubset<T, FileChunkUpdateArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileChunkDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileChunkUpdateManyArgs>(args: Prisma.SelectSubset<T, FileChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileChunkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileChunkUpsertArgs>(args: Prisma.SelectSubset<T, FileChunkUpsertArgs<ExtArgs>>): Prisma.Prisma__FileChunkClient<runtime.Types.Result.GetResult<Prisma.$FileChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileChunkCountArgs>(args?: Prisma.Subset<T, FileChunkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileChunkCountAggregateOutputType> : number>;
    aggregate<T extends FileChunkAggregateArgs>(args: Prisma.Subset<T, FileChunkAggregateArgs>): Prisma.PrismaPromise<GetFileChunkAggregateType<T>>;
    groupBy<T extends FileChunkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileChunkGroupByArgs['orderBy'];
    } : {
        orderBy?: FileChunkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileChunkFieldRefs;
}
export interface Prisma__FileChunkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    node<T extends Prisma.NodeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NodeDefaultArgs<ExtArgs>>): Prisma.Prisma__NodeClient<runtime.Types.Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    Provider<T extends Prisma.ProviderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProviderDefaultArgs<ExtArgs>>): Prisma.Prisma__ProviderClient<runtime.Types.Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileChunkFieldRefs {
    readonly id: Prisma.FieldRef<"FileChunk", 'String'>;
    readonly chunkIndex: Prisma.FieldRef<"FileChunk", 'Int'>;
    readonly size: Prisma.FieldRef<"FileChunk", 'BigInt'>;
    readonly startByte: Prisma.FieldRef<"FileChunk", 'BigInt'>;
    readonly endByte: Prisma.FieldRef<"FileChunk", 'BigInt'>;
    readonly chunkHash: Prisma.FieldRef<"FileChunk", 'String'>;
    readonly nodeId: Prisma.FieldRef<"FileChunk", 'String'>;
    readonly providerId: Prisma.FieldRef<"FileChunk", 'String'>;
    readonly providerFileId: Prisma.FieldRef<"FileChunk", 'String'>;
    readonly providerPath: Prisma.FieldRef<"FileChunk", 'String'>;
    readonly providerCreatedAt: Prisma.FieldRef<"FileChunk", 'DateTime'>;
    readonly providerUpdatedAt: Prisma.FieldRef<"FileChunk", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"FileChunk", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FileChunk", 'DateTime'>;
}
export type FileChunkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    where: Prisma.FileChunkWhereUniqueInput;
};
export type FileChunkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    where: Prisma.FileChunkWhereUniqueInput;
};
export type FileChunkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileChunkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileChunkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileChunkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileChunkCreateInput, Prisma.FileChunkUncheckedCreateInput>;
};
export type FileChunkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileChunkCreateManyInput | Prisma.FileChunkCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileChunkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    data: Prisma.FileChunkCreateManyInput | Prisma.FileChunkCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FileChunkIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FileChunkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileChunkUpdateInput, Prisma.FileChunkUncheckedUpdateInput>;
    where: Prisma.FileChunkWhereUniqueInput;
};
export type FileChunkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileChunkUpdateManyMutationInput, Prisma.FileChunkUncheckedUpdateManyInput>;
    where?: Prisma.FileChunkWhereInput;
    limit?: number;
};
export type FileChunkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileChunkUpdateManyMutationInput, Prisma.FileChunkUncheckedUpdateManyInput>;
    where?: Prisma.FileChunkWhereInput;
    limit?: number;
    include?: Prisma.FileChunkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FileChunkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    where: Prisma.FileChunkWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileChunkCreateInput, Prisma.FileChunkUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileChunkUpdateInput, Prisma.FileChunkUncheckedUpdateInput>;
};
export type FileChunkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
    where: Prisma.FileChunkWhereUniqueInput;
};
export type FileChunkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileChunkWhereInput;
    limit?: number;
};
export type FileChunkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileChunkSelect<ExtArgs> | null;
    omit?: Prisma.FileChunkOmit<ExtArgs> | null;
    include?: Prisma.FileChunkInclude<ExtArgs> | null;
};
