/* eslint-disable @typescript-eslint/no-explicit-any */
import icons from '@/constants/icons';
import { FC } from 'react';

type Props = {
  label: string;
  columns: any;
  data: any;
};

const SecondCommonTable: FC<Props> = ({ label, columns, data }) => {
  return (
    <div className="common-table">
      <div className="table-name">{label}</div>
      <div className="common-table-children">
        <table>
          <thead>
            <tr>
              <th></th>
              {columns.map((item: any, i: number) => (
                <th key={i}>
                  <span>{item.year}</span>
                  <div>
                    <span>{item.value}</span>
                    <span>{item.cycle}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? '#2A2E39' : '',
                }}
              >
                <td>
                  <span>{item.quarter}</span>
                  {i % 2 === 0 ? (
                    <img src={icons.RED_LINE_ICON} alt="RED_LINE_ICON" />
                  ) : (
                    <img src={icons.GREEN_LINE_ICON} alt="GREEN_LINE_ICON" />
                  )}
                </td>
                <td>
                  <div>
                    <span>{item.fifthValue}</span>
                    <span
                      style={{
                        color: i % 2 === 0 ? '#42A732' : '#E43637',
                      }}
                    >
                      {item.secondValue}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span>{item.thirdValue}</span>
                    <span
                      style={{
                        color: i % 2 === 0 ? '#42A732' : '#E43637',
                      }}
                    >
                      {item.fourthValue}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span>{item.fifthValue}</span>
                    <span
                      style={{
                        color: i % 2 === 0 ? '#42A732' : '#E43637',
                      }}
                    >
                      {item.sixthValue}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span>{item.seventhValue}</span>
                    <span
                      style={{
                        color: i % 2 === 0 ? '#42A732' : '#E43637',
                      }}
                    >
                      {item.eigthValue}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span>{item.ninthValue}</span>
                    <span
                      style={{
                        color: i % 2 === 0 ? '#42A732' : '#E43637',
                      }}
                    >
                      {item.tenthValue}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecondCommonTable;
