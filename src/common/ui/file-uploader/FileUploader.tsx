import { useState, type ChangeEvent } from 'react';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import styles from './FileUploader.module.scss';
import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { blue, deepOrange, grey } from '@mui/material/colors';
import classNames from 'classnames';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface FileFormatType {
  label: string;
  value: string;
}

interface Props {
  fileFormat?: FileFormatType;
  fileSize?: string;
  progress?: number;
  status?: UploadStatus;
  onUpload?: (file: File) => void;
  isDisabled?: boolean;
}

const disabledColor = grey['400'];
const secondaryColor = blue['A700'];

export function FileUploader({
  fileFormat,
  progress,
  fileSize,
  status,
  onUpload = () => {},
  isDisabled = false,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const uploadFile = (file: File) => {
    setFile(file);
    onUpload(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    uploadFile(file);
  };

  const handleDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    setDragActive(true);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    setDragActive(false);

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      uploadFile(file);
    }
  };

  const isError = status === 'error';

  const textColor = isError ? deepOrange[800] : 'text.primary';
  const accentColor = isError ? deepOrange[800] : secondaryColor;
  const trackColor = isError ? deepOrange[50] : blue[50];

  return (
    <div>
      <label
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDragOver={handleDragStart}
        onDrop={handleDrop}
        className={classNames(styles.importZone, {
          [styles.disabled]: isDisabled,
          [styles.activeZone]: dragActive && !isDisabled,
        })}
      >
        <Box color={isDisabled ? disabledColor : secondaryColor}>
          <UploadFileIcon />
        </Box>
        <Typography sx={{ color: isDisabled ? disabledColor : '' }}>
          <span className={styles.linkText}>Link</span> or drag and drop
        </Typography>
        {fileSize && fileFormat && (
          <Typography color="textSecondary">
            {fileFormat.label} (max. {fileSize} KB)
          </Typography>
        )}

        <input
          type="file"
          onChange={handleFileChange}
          accept={fileFormat?.value}
          disabled={isDisabled}
          hidden
        />
      </label>

      {file && (
        <Box className={styles.files}>
          <Card className={styles.file}>
            <Box
              sx={{
                padding: '8px',
                color: accentColor,
              }}
            >
              <UploadFileIcon />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ color: textColor }}>
                {file.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: textColor,
                }}
              >
                <Typography variant="body2">
                  {(file.size / 1024).toFixed(2)} Kb
                </Typography>
                <Typography variant="body2">•</Typography>
                <Typography variant="body2">
                  {(progress === 100 && status) === 'success'
                    ? 'Completed'
                    : status === 'error'
                      ? 'Error'
                      : 'Loading'}
                </Typography>
              </Box>
              {status !== 'idle' && (
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    marginTop: '4px',
                    width: '200px',
                    backgroundColor: trackColor,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: accentColor,
                    },
                  }}
                />
              )}
            </Box>
          </Card>
        </Box>
      )}
    </div>
  );
}
