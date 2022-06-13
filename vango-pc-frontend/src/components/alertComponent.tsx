import React from 'react';
import CommonModal, { ModalProps } from './modal';

const CommonAlert = (props: Omit<ModalProps, 'visible'>) => {
  return <CommonModal {...props} visible size="small" />;
};

export default CommonAlert;
