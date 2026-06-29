import { connectDriver } from "./features/connect-driver";
import { getDrivers } from "./features/get-drivers";
import { updateDriver } from "./features/mutations";

export const driverService = {
    connectDriver,
    getDrivers,
    updateDriver,
}