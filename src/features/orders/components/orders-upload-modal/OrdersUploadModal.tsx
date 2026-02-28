import { FileUploader } from '@/common/ui/file-uploader';
import { Box, Modal } from '@mui/material';
import { useOrdersUpload } from '../../hooks/useOrdersUpload';
import { useEffect } from 'react';
import { styles } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccessUpload?: () => void;
}

export function OrdersUploadModal({
  isOpen,
  onClose,
  onSuccessUpload = () => {},
}: Props) {
  const { handleOrdersUpload, progress, status, reset } = useOrdersUpload();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'success') {
        onClose();
        reset();
        onSuccessUpload();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, onClose, reset]);

  const isUploaderDisabled = status === 'uploading' || status === 'success';

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={styles.content}>
        <FileUploader
          progress={progress}
          status={status}
          onUpload={handleOrdersUpload}
          isDisabled={isUploaderDisabled}
          fileSize="3"
          fileFormat={{ label: '.csv', value: '.csv, text/csv' }}
        />
      </Box>
    </Modal>
  );
}
