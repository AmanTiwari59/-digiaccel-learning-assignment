import { useState, useEffect, useCallback } from 'react';
import { IWeeklySummary } from '../types/IWeeklySummary';
import { tasksApi } from '../apis/tasksApi';

/**
 * Custom hook to retrieve aggregated weekly metrics.
 * Supports manual refresh when tasks are added, modified, or completed.
 *
 * @param weekNumber - ISO week number (1-53)
 * @param year - Target year
 */
export function useWeeklyMetrics(weekNumber?: number, year?: number) {
  const [metrics, setMetrics] = useState<IWeeklySummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.getWeeklyMetrics(weekNumber, year);
      setMetrics(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch weekly metrics');
    } finally {
      setLoading(false);
    }
  }, [weekNumber, year]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, loading, error, refreshMetrics: fetchMetrics };
}

export default useWeeklyMetrics;
