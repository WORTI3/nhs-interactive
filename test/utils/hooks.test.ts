import { renderHook } from '@testing-library/react';
import { useApiLog } from '../../app/utils/hooks';
import { LogData } from '@/types';

describe('useApiLog', () => {
  test('sends POST request when logData and done change', async () => {
    const logData: LogData = {
      searchQuery: { query: 'test query', sourceLinks: [], sourceHeadings: [] },
      answer: 'test answer',
    };
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;

    const { rerender } = renderHook(
      ({ logData, done }) => useApiLog(logData, done),
      { initialProps: { logData, done: false } }
    );

    expect(fetchMock).not.toHaveBeenCalled();

    rerender({ logData, done: true });

    expect(fetchMock).toHaveBeenCalledWith('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });
  });

  test('does not send POST request when done is false', async () => {
    const logData: LogData = {
      searchQuery: { query: 'test query', sourceLinks: [], sourceHeadings: [] },
      answer: 'test answer',
    };

    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;

    const { rerender } = renderHook(
      ({ logData, done }) => useApiLog(logData, done),
      { initialProps: { logData, done: false } }
    );

    expect(fetchMock).not.toHaveBeenCalled();

    rerender({ logData, done: false });

    expect(fetchMock).not.toHaveBeenCalledWith('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });
  });
});
