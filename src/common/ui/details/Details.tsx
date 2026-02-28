import { Box, Collapse, Typography } from '@mui/material';
import { useState, type FC, type ReactNode } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { styles } from './style';

interface Props {
  children: ReactNode;
}

interface DetailRowProps {
  title: string | number;
  value: string | number;
}

interface DetailsAccordionProps {
  headerTitle: string | number;
  headerValue?: string | number;
  children: ReactNode;
}

interface DetailsComponent extends FC<Props> {
  Title: FC<Props>;
  Group: FC<Props>;
  Row: FC<DetailRowProps>;
  Accordion: FC<DetailsAccordionProps>;
}

export const Details: DetailsComponent = ({ children }) => {
  return <Box sx={styles.wrapper}>{children}</Box>;
};

Details.Title = function DetailsTitle({ children }) {
  return (
    <Box sx={styles.titleWrapper}>
      <Typography variant="h2" sx={styles.title}>
        {children}
      </Typography>
    </Box>
  );
};

Details.Group = function DetailsGroup({ children }) {
  return <Box sx={styles.group}>{children}</Box>;
};

Details.Row = function DetailRow({ title, value }) {
  return (
    <Box component="dl" sx={styles.row}>
      <Box component="dt" sx={styles.rowTitle}>
        {title}
      </Box>
      <Box component="dd">{value}</Box>
    </Box>
  );
};

Details.Accordion = function DetailsAccordion({
  headerTitle,
  headerValue,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <Box>
      <Box sx={styles.accordionHeader} onClick={handleToggle} role="button">
        <Details.Row title={headerTitle} value={headerValue ?? ''} />

        <KeyboardArrowDownIcon
          sx={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box sx={styles.accordionContent}>{children}</Box>
      </Collapse>
    </Box>
  );
};
