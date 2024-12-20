/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

type Props = {
  columns: any;
  data: any;
};

const FirstCommonTable: FC<Props> = ({ columns, data }) => {
  return (
    <div className="common-table">
      <table>
        <thead>
          <tr>
            {columns.map((item: any, i: any) => (
              <th key={i}>{item.column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, i: any) => (
            <tr key={i}>
              <td>{item.label}</td>
              <td></td>
              <td>{item.quater}</td>
              <td>{item.fourQuater}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirstCommonTable;
