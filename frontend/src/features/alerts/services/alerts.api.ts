import { http } from "../../../lib/http";
import type { AlertsResponse } from "../types";

export async function listAlerts(): Promise<AlertsResponse> {
  const { data } = await http.get("/alerts");
  return data as AlertsResponse;
}

export async function markAlertRead(id: number): Promise<void> {
  await http.post(`/alerts/${id}/read`);
}

export async function markAllAlertsRead(): Promise<void> {
  await http.post(`/alerts/read-all`);
}
