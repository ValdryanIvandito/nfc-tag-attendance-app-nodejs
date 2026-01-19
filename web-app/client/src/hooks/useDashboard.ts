/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useDashboard.ts
import { useCallback, useEffect, useState } from "react";
import { dashboardAPI } from "@/api/dashboard.api";
import type { Dashboard } from "@/types/dashboard.type";

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await dashboardAPI.getAll();
      setDashboardData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refresh = useCallback(() => {
    fetch();
  }, [fetch]);

  return {
    dashboardData,
    loading,
    error,
    refresh,
  };
}
