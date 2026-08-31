import { CloudinaryConnector } from "./cloudinary/cloudinary.connector";
import { IStorageConnector } from "./connector.interface";
import { DropboxConnector } from "./dropbox/dropbox.connector";
// import { OneDriveConnector } from "./onedrive/onedrive.connector";

export function getStorageConnector(providerType: string): IStorageConnector | null {
  const connectors: Record<string, IStorageConnector> = {
    CLOUDINARY: new CloudinaryConnector(),
    DROPBOX: new DropboxConnector(),
    // ONEDRIVE: new OneDriveConnector(),
  };

  return connectors[providerType] || null;
}
