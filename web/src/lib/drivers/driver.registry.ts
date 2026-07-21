import { CloudinaryDriver } from "./cloudinary/cloudinary.driver";
import { IStorageDriver } from "./driver.interface";
import { DropboxDriver } from "./dropbox/dropbox.driver";
import { GoogleDriveDriver } from "./google/google-drive.driver";
// import { OneDriveDriver } from "./onedrive.driver";

export function getStorageDriver(driverType: string): IStorageDriver | null {
  const drivers: Record<string, IStorageDriver> = {
    CLOUDINARY: new CloudinaryDriver(),
    GOOGLE_DRIVE: new GoogleDriveDriver(),
    DROPBOX: new DropboxDriver(),
    // ONEDRIVE: new OneDriveDriver(),
  };

  return drivers[driverType] || null;
}
