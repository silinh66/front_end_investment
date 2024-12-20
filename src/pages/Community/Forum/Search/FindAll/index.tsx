// import GroupRadioColor from '@/components/forms/GroupRadioColor';
import { screenModeSelector } from '@/redux/screen/selector';
import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { StyledFindAll } from './styled';
// import React from 'react';
// const findInForumOptions = [
//   { value: 'option1', label: 'Tất cả diễn đàn' },
//   { value: 'option2', label: 'Thị trường chứng khoán' },
//   { value: 'option3', label: 'Tin tức' },
//   { value: 'option4', label: 'Giao lưu' },
//   { value: 'option5', label: 'Hướng dẫn lấy mật khẩu mới' },
// ];
// const arrangeOptions = [
//   { value: 'arr1', label: 'Gần đây nhất' },
//   { value: 'arr2', label: 'Mức độ liên quan' },
// ];
interface CustomCheckboxProps {
  label: string;
  [props: string]: string | number | boolean | object;
}
const FindAll = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const CustomCheckbox = ({ label, ...props }: CustomCheckboxProps) => {
    return (
      <Checkbox.Group {...props}>
        <Checkbox value={true} className="label-checkbox">
          {label}
        </Checkbox>
      </Checkbox.Group>
    );
  };
  const CustomLabel = ({ label }: { label: string }) => {
    return <label className="custom-label">{label}</label>;
  };
  const handleSubmit = () => {};
  return (
    <StyledFindAll screen_mode={screenMode}>
      <Form
        layout="vertical"
        className="findAll-form"
        onFinish={handleSubmit}
        style={{
          padding: '0 16px',
          borderRadius: '8px',
        }}
      >
        <Form.Item
          style={{ width: '100%' }}
          label={<CustomLabel label="Từ khóa" />}
          name="keywordSearch"
        >
          <Input placeholder="Nhập từ khóa" />
        </Form.Item>
        <Form.Item style={{ width: '100%' }} name="inTitle">
          <CustomCheckbox label={'Tìm trong tiêu đề'} />
        </Form.Item>
        <Form.Item
          style={{ width: '100%' }}
          label={<CustomLabel label="Tên thành viên" />}
          name="memberName"
        >
          <Input placeholder="Nhập tên thành viên" />
        </Form.Item>
        <Form.Item
          style={{ width: '100%' }}
          label={<CustomLabel label="Ngày" />}
          name="day"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        {/* <Form.Item
          style={{ width: '100%' }}
          label={<CustomLabel label="Tìm trong diễn đàn" />}
          name="inForum"
        >
          <GroupRadioColor options={findInForumOptions} />
        </Form.Item> */}
        {/* <Form.Item style={{ width: '100%' }} name="inTitle">
          <CustomCheckbox label={'Tìm cả trong diễn đàn con'} />
        </Form.Item> */}
        {/* <Form.Item
          style={{ width: '100%' }}
          label={<CustomLabel label="Sắp xếp theo" />}
          name="arrange"
        >
          <GroupRadioColor options={arrangeOptions} />
        </Form.Item> */}
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: '100%',
            backgroundColor: '#42A732',
            borderRadius: '8px',
          }}
        >
          Tìm kiếm
        </Button>
      </Form>
    </StyledFindAll>
  );
};

export default FindAll;
