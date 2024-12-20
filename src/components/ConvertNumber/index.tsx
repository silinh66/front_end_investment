/* eslint-disable @typescript-eslint/no-explicit-any */
export const ConvertNumber = (number: any) => {
  if (number === null) {
    return 'N/A';
  }

  const absNumber = Math.abs(number);

  if (absNumber >= 1_000_000_000_000) {
    // Trillion
    return `${(number / 1_000_000_000_000).toFixed(1)}T`;
  } else if (absNumber >= 1_000_000_000) {
    // Billion
    return `${(number / 1_000_000_000).toFixed(1)}B`;
  } else if (absNumber >= 1_000_000) {
    // Million
    return `${(number / 1_000_000).toFixed(1)}M`;
  } else if (absNumber >= 1_000) {
    // Thousand
    return `${(number / 1_000).toFixed(1)}K`;
  } else {
    return number?.toFixed(1);
  }
};
export const ConvertNumberTooltip = (number: any) => {
  if (number === null) {
    return 'N/A';
  }

  const absNumber = Math.abs(number);

  if (absNumber >= 1_000_000_000_000) {
    const numberCV = absNumber / 1_000_000_000;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} tỷ`;
  } else if (absNumber >= 1_000_000_000) {
    const numberCV = absNumber / 1_000_000;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} tỷ`;
  } else if (absNumber >= 1_000_000) {
    const numberCV = absNumber / 1_000;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} tỷ`;
  } else if (absNumber >= 1_000) {
    const numberCV = absNumber / 1;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} tỷ`;
  } else {
    return number?.toFixed(1);
  }
};
export const ConvertNumberTooltipMacro = (number: any) => {
  if (number === null) {
    return 'N/A';
  }

  const absNumber = Math.abs(number);

  if (absNumber >= 1_000_000_000_000) {
    const numberCV = absNumber / 1_000_000;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ`;
  } else if (absNumber >= 1_000_000_000) {
    const numberCV = absNumber / 1_000;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} triệu`;
  } else if (absNumber >= 1_000_000) {
    const numberCV = absNumber / 1;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} nghìn`;
  } else if (absNumber >= 1_000) {
    const numberCV = absNumber;
    // Trillion
    return `${numberCV.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    return number?.toFixed(1);
  }
};
export const ConvertStringToNumber = (str: any) => {
  if (typeof str !== 'string') {
    return str; // Trả về NaN nếu đầu vào không phải là chuỗi
  }

  const value = parseFloat(str);
  if (isNaN(value)) {
    return NaN; // Trả về NaN nếu không phải là số
  }

  if (str.includes('T')) {
    return value * 1_000_000_000_000;
  } else if (str.includes('B')) {
    return value * 1_000_000_000;
  } else if (str.includes('M')) {
    return value * 1_000_000;
  } else if (str.includes('K')) {
    return value * 1_000;
  } else {
    return value; // Trả về giá trị số nếu không có đơn vị
  }
};

export const formatNumber = (number: any) => {
  if (!number) return '';
  return (number / 1000)?.toFixed(2);
};
export function formatNumberWithCommas(number: any) {
  return number?.toLocaleString() || '';
}

export function formatNumberComma(num: any) {
  // Cố gắng chuyển đổi chuỗi thành số
  const parsed = Number(num);
  // Kiểm tra xem giá trị đã được chuyển đổi có phải là số hợp lệ không
  if (!isNaN(parsed)) {
    return parsed.toLocaleString();
  } else {
    // Trả về chuỗi ban đầu nếu không thể chuyển đổi
    return num;
  }
}

export function formatNumberToBillion(value: any) {
  // Chia cho 1 tỷ và làm tròn đến 2 chữ số thập phân
  const billionValue = (value / 1000000000).toFixed(2);

  // Thêm ký tự ' tỷ' vào giá trị và trả về
  return billionValue + ' tỷ';
}

export function formatToBillionVND(number: any) {
  // Chuyển đổi số thành dạng số thực
  const num = Number(number);

  // Chia cho 1 tỷ để chuyển đổi thành tỷ đồng
  const billionVND = num / 1e9;

  // Làm tròn số đến hai chữ số thập phân và định dạng theo chuẩn Việt Nam
  const formattedBillionVND = Math.abs(billionVND).toLocaleString('vi-VN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Ghép thêm chuỗi ' Tỷ đồng' vào cuối
  return `${formattedBillionVND} Tỷ đồng`;
}
export function convertNumberToFormattedString(number: any) {
  // Sử dụng hàm toLocaleString để định dạng số
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 0, // Số chữ số tối thiểu sau dấu thập phân
    maximumFractionDigits: 2, // Số chữ số tối đa sau dấu thập phân
  });
}
export function formatNumberTo1Billion(value: any) {
  // Chia cho 1 tỷ và làm tròn đến 2 chữ số thập phân
  const billionValue = (value / 1000000000).toFixed(1);

  // Thêm ký tự ' tỷ' vào giá trị và trả về
  return billionValue + ' tỷ';
}

//convert to million
export function formatToMillion(value: any) {
  // Chuyển đổi sang triệu
  const millionValue = value / 1e6;

  // Định dạng số với dấu phân cách hàng nghìn và làm tròn đến 2 chữ số thập phân
  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(millionValue) + `${value == 0 ? '' : ' tr'}`
  );
}

export function formatToBillion(value: any) {
  // Chuyển đổi sang tỷ
  const billionValue = value / 1e9;

  // Định dạng số với dấu phân cách hàng nghìn và làm tròn đến 2 chữ số thập phân
  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(billionValue) + `${value == 0 ? '' : ' Tỷ'}`
  );
}
export function formatToBillion1Decimal(value: any) {
  // Chuyển đổi sang tỷ
  const billionValue = value / 1e9;

  // Định dạng số với dấu phân cách hàng nghìn và làm tròn đến 2 chữ số thập phân
  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }).format(billionValue) + `${value == 0 ? '' : ' Tỷ'}`
  );
}

export function convertToTrillion(text: any) {
  // Chuyển đổi chuỗi sang số
  const number = parseFloat(text);

  // Chuyển đổi số sang nghìn tỷ
  const inTrillion = number / 1000000000000; // 1 tỷ = 1,000,000 nghìn

  // Làm tròn đến 3 chữ số thập phân và chuyển đổi trở lại thành chuỗi
  return inTrillion.toFixed(2);
}

export function convertDecimalStringToNumber(str: any) {
  // Remove the decimal point and convert to a number
  return parseInt(str?.replace('.', ''), 10);
}
