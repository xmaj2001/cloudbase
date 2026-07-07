import { connectDriver } from "./features/connect-driver";
import { getDrivers } from "./features/get-drivers";
import { syncDriver, updateDriver } from "./features/mutations";

export const driverService = {
    connectDriver,
    getDrivers,
    updateDriver,
    syncDriver
}