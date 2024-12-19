import { database, ref, get, child, set } from "../firebase-config";
import { MENU_ITEMS } from "./constants";

export async function fetchTableData() {
  try {
    const t1Ref = ref(database, "tables/T1/order_items");
    const t2Ref = ref(database, "tables/T2/order_items");
    const t1Snapshot = await get(t1Ref);
    const t2Snapshot = await get(t2Ref);

    let mainData = {
      T1: [],
      T2: [],
    };

    if (t1Snapshot.exists() && t1Snapshot.val() !== "null") {
      mainData["T1"] = t1Snapshot.val()
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "")
      .map(item => MENU_ITEMS.find(menuItem => menuItem.name === item))
      .filter(menuItem => menuItem !== undefined);
    } else {
      console.log("No data available for T1");
    }

    if (t2Snapshot.exists() && t2Snapshot.val() !== "null") {
      mainData["T2"] = t2Snapshot.val()
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "")
      .map(item => MENU_ITEMS.find(menuItem => menuItem.name === item))
      .filter(menuItem => menuItem !== undefined);
    } else {
      console.log("No data available for T2");
    }
    console.log("mainData", mainData);
    return mainData;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return {};
  }
}

export async function clearTable(tableId: string) {
  try {
    const tableRef = ref(database, `tables/${tableId}/order_items`);
    await set(tableRef, "null");
    return { status: "success" };
  } catch (error) {
    console.error("Error clearing table:", error);
    return { status: "error" };
  }
}
