import { getAdminDb } from '@/lib/firebase/firebaseAdmin';
import { StorageItem, StorageItemProps } from '../domain/item.entity';

// O input do caso de uso aceita as propriedades da Entidade (omitimos o ID porque será gerado pela DB)
type IndexItemInput = Omit<StorageItemProps, 'id'>;

/**
 * Caso de Uso: IndexItem
 * Transforma os dados numa Entidade de Domínio e persiste no Firestore centralizado.
 */
export async function indexItem(input: IndexItemInput) {
  const db = getAdminDb();
  
  // 1. Criamos uma referência de documento vazia para gerar o ID do Firestore antecipadamente
  const itemRef = db.collection('storage_items').doc();

  // 2. Instanciamos a nossa Entidade passando o ID gerado (aqui roda o motor de validação)
  const storageItem = new StorageItem({
    ...input,
    id: itemRef.id
  });

  // 3. Convertemos a Entidade para um Objeto JS Puro (DTO) pronto para a base de dados
  const dataToSave = storageItem.toDTO();

  // 4. Salvamos fisicamente no Firestore
  await itemRef.set(dataToSave);

  console.log(`[StorageIndexer] Item indexado com sucesso na DB: ${dataToSave.nome} (${dataToSave.provider})`);

  // Retornamos o DTO para o controlador poder enviar na resposta HTTP se necessário
  return dataToSave;
}