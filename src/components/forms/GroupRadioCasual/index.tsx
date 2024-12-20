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
const GroupRadioCasual = ({ options, ...props }: CustomRadioGroupProps) => (
  <Styles>
    <Radio.Group {...props} className="radio-custom">
      <Space direction="vertical" style={{ display: 'flex' }}>
        {options.map((option: OptionType) => (
          <Radio.Button
            key={option.value}
            value={option.value}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              outline: 'none',
              border: 'none',
            }}
          >
            <span className="radio-custom-mark"></span>
            <p className="radio-custom-label">{option.label}</p>
          </Radio.Button>
        ))}
      </Space>
    </Radio.Group>
  </Styles>
);

export default GroupRadioCasual;
