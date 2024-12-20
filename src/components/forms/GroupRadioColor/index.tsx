import { Radio, Space } from 'antd';
import { Styles } from './styles';
interface OptionType {
  value: string;
  label: string;
}
interface CustomRadioGroupProps {
  options: OptionType[];
  [props: string]: string | number | boolean | object;
}
const GroupRadioColor = ({ options, ...props }: CustomRadioGroupProps) => {
  return (
    <Styles>
      <Radio.Group {...props}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {options.map((option: OptionType) => (
            <Radio key={option.value} value={option.value} className={` `}>
              <p className="radio-custom-label">{option.label}</p>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Styles>
  );
};
export default GroupRadioColor;
