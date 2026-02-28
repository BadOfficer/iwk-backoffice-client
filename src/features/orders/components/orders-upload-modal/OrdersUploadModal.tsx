import { FileUploader } from '@/common/ui/file-uploader';
import { Box, Modal } from '@mui/material';
import { useOrdersUpload } from '../../hooks/useOrdersUpload';
import { useEffect } from 'react';
import { styles } from './styles';
import { toast } from 'react-toastify';

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
  const { handleOrdersUpload, progress, status, reset, importResponse } =
    useOrdersUpload();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'success' && importResponse) {
        onClose();
        reset();
        onSuccessUpload();

        toast.success(
          `Saved ${importResponse.saved} out of ${importResponse.processed} orders`
        );
        {
          importResponse.rejected !== 0 &&
            toast.warn(
              `Rejected ${importResponse.rejected} out of ${importResponse.processed} orders`
            );
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, onClose, reset]);

  useEffect(() => {
    if (status === 'error') {
      toast.error('Uploading failed');
    }
  }, [status]);

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
