import { Cloud } from "lucide-react";
import { ApiDriver } from "../api/drivers/types";

// TODO: Adicionar os icones real de cada driver, e não apenas o Cloud genérico.
export const PROVIDER_ICONS: Record<string, React.ComponentType> = {
    GOOGLE_DRIVE: Cloud,
    ONEDRIVE: Cloud,
    TELEGRAM: Cloud,
    MEGA: Cloud,
    VPS: Cloud,
    LOCAL_MACHINE: Cloud,
    DROPBOX: Cloud,
    BOX: Cloud,
    PCLOUD: Cloud,
    YANDEX: Cloud,
}



export const driverIcon = (t: ApiDriver): React.ComponentType => {
  return PROVIDER_ICONS[t.type] || Cloud;
}
