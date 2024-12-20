import { Divider, Flex } from 'antd';
import React from 'react';
import { StyledMessageItem } from './styled';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';

const MessageProfile = () => {
  const screenMode = useSelector(screenModeSelector);

  const MessageItem = () => {
    return (
      <StyledMessageItem screen_mode={screenMode}>
        <div className="message-head">
          <img
            src="https://img.freepik.com/premium-photo/building-with-large-square-shape-that-says-building-is-square-shape_900958-25079.jpg"
            className="avatar"
          />
          <div>
            <p className="message-name">elwworf123</p>
            <p className="message-role">Thành viên</p>
            <p className="message-sendDate">03/07/2023</p>
          </div>
        </div>
        <div className="message-body">
          Phần 1 này giới thiệu khái niệm cơ bản về đầu tư giá trị, đồng thời
          giúp cho bạn khắc phục được điểm yếu lớn nhất của mình: tâm lý chỉ
          nghĩ đến thị giá chứ không cần xét đến giá trị. Để học về đầu tư (đầu
          tư bất kỳ thứ gì, không chỉ chứng khoán) thì không gì tốt hơn bằng hãy
          đọc cuốn sách Nhà đầu tư thông minh (The Intelligent Investor) của
          Benjamin Graham. Có thể phần lớn người ở Việt Nam chưa nghe về cuốn
          sách này, nhưng có thể so sánh như sau: cuốn sách này có thể xem như
          là Kinh Thánh trong lĩnh vực đầu tư chứng khoán. Nó dựng lên nền tảng
          để từ đó bao nhiêu thế hệ nhà đầu tư và học giả phát triển thành các
          lý thuyết và phương pháp đầu tư hiện đại mà thế giới hiện đang áp
          dụng.Cuốn sách xuất bản năm 1949. Có rất nhiều câu chuyện lý thú xung
          quanh cuốn sách và tác giả của nó. Chẳng hạn, rất nhiều bạn trẻ thời
          đó sau khi đọc cuốn sách đã tìm đến lớp học về đầu tư của tác giả
          Benjamin Graham. Nhờ lớp học đó, hầu hết những học trò của Graham sau
          này đều trở thành triệu phú và tỉ phú nhờ kinh doanh và đầu tư, trong
          đó nổi bất nhất chính là Warren Buffett (người giàu thứ hai thế giới
          hiện nay, chỉ sau Bill Gates). Buffett là học trò duy nhất nhận được
          điểm A+ trong suốt sự nghiệp dạy học của Graham; và cũng giống như một
          số học trò khác, Buffet xem Graham là người cha thứ hai của mình. Sau
          này họ thậm chí còn lấy tên của thầy Graham để đặt tên cho con trai
          của mình để ghi nhận sự ảnh hưởng lớn lao của Graham đối với họ.
        </div>
        <div className="message-bottom">
          <p className="text">
            <span>elwworf123,</span>
            <span>abc123,</span>
            <span>ngv200,</span>
            <span>và 20 người</span>
            &nbsp;đã thích bài này
          </p>
        </div>
        <Divider style={{ borderColor: '#3A3F42', margin: '16px 0 0 0 ' }} />
      </StyledMessageItem>
    );
  };
  return (
    <div>
      <Flex vertical gap={12}>
        <MessageItem />
        <MessageItem />
        <MessageItem />
      </Flex>
    </div>
  );
};

export default MessageProfile;
