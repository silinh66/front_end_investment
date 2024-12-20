/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Modal } from 'antd';
import React, { useState } from 'react';
import { StyledConfirmKickMember } from './styled';
interface ConfirmKickMemberProps {
  record: any;
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}
const ConfirmKickMember = ({
  record,
  isOpen,
  onOk,
  onCancel,
}: ConfirmKickMemberProps) => {
  return (
    <Modal
      centered
      className="confirm-kick-member-modal"
      open={isOpen}
      footer={false}
    >
      <h4>Thông báo</h4>
      <p>
        Bạn muốn thực hiện Kick người dùng <br /> {record.name} không?
      </p>
      <Flex vertical>
        <Button onClick={onOk} className="ok-btn">
          Đồng ý
        </Button>
        <Button onClick={onCancel} className="cancel-btn">
          Hủy bỏ
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConfirmKickMember;
