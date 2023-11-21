import { useReportDownloadMutation } from '@/store/file/api';
import { useState } from 'react';

const useExcelDownloader = (dataDownload: any) => {
  const [error, setError] = useState<null | unknown>(null);
  const [exportData] = useReportDownloadMutation();
  
  const handleDownload = async () => {
    try {
      const {data}: any = await exportData(dataDownload);

      if (data) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'generated_file.xlsx');
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);
      }
    } catch (error) {
      setError(error);
    }
  };

  return { handleDownload, error };
};

export default useExcelDownloader;
