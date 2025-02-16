'use client';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, Collapse } from '@mui/material';
import { motion } from 'framer-motion';

interface AlertProps extends Omit<MuiAlertProps, 'ref'> {
  show?: boolean;
}

const Alert = ({ show = true, children, ...props }: AlertProps) => {
  return (
    <Collapse in={show}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <MuiAlert {...props}>{children}</MuiAlert>
      </motion.div>
    </Collapse>
  );
};

export default Alert; 