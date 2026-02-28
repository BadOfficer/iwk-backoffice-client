import { instance } from '@/api/axios';
import type { UploadStatus } from '@/common/ui/file-uploader';
import { useState } from 'react';
import { MAX_FILE_SIZE } from '../constants';
import type { OrdersImportResponse } from '@/types/Order';

export function useOrdersUpload() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState<OrdersImportResponse | null>(null);

  const reset = () => {
    setStatus('idle');
    setProgress(0);
  };

  const handleOrdersUpload = async (file: File) => {
    setStatus('uploading');
    setProgress(0);

    const isCsv =
      file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');

    if (file.size > MAX_FILE_SIZE || !isCsv) {
      setStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await instance.post<OrdersImportResponse>(
        '/orders/import',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;

            setProgress(progress);
          },
        }
      );

      setResponse(response.data);
      setStatus('success');
      setProgress(100);
    } catch (e) {
      console.error(e);
      setStatus('error');
      setProgress(0);
    }
  };

  return {
    status,
    progress,
    handleOrdersUpload,
    reset,
    importResponse: response,
  };
}
