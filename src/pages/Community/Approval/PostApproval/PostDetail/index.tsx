import CommunityLayout from '@/layouts/CommunityLayout/CommunityLayout';
import React, { useState } from 'react';
import { StyledPostDetail } from './styled';
import { Button, Col, Flex, Row } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ConfirmKickMember from '@/components/modals/ConfirmKickMember';
const PostDetail = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [tableRecord, setTableRecord] = useState({});

  const onCancel = () => {
    setShowModal(false);
  };
  const onOk = () => {
    setShowModal(false);
  };

  const ReadMore = ({ children }: { children: string }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 100) : text}
        <br />
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? 'Xem thêm' : ' Thu gọn'}
        </span>
      </p>
    );
  };
  return (
    <CommunityLayout hideSide={'both'}>
      <span onClick={() => setTableRecord({})}></span>
      <ConfirmKickMember
        record={tableRecord}
        isOpen={showModal}
        onCancel={onCancel}
        onOk={onOk}
      />
      <Row>
        <Col span={6} />
        <Col span={12}>
          <StyledPostDetail>
            <Flex justify="space-between" align="center">
              <div className="breadcrumb">
                <div className="back-link" onClick={() => navigate(-1)}>
                  XÉT DUYỆT
                </div>
                <div>
                  <RightOutlined />
                </div>
                <div>Cosmin Negoita</div>
              </div>
              <Flex gap={16}>
                <Button className="prev-btn">
                  <LeftOutlined />
                  <p>Quay lại</p>
                </Button>
                <Button className="next-btn">
                  <p> Tiếp tục</p>
                  <RightOutlined />
                </Button>
              </Flex>
            </Flex>
            <Row>
              <Col span={18}>
                <div className="info-post">
                  <div className="label">
                    <p>Tên người dùng:</p>
                    <p>Địa chỉ Email:</p>
                    <p>Tên bài viết:</p>
                    <p>Nội dung bài viết:</p>
                  </div>
                  <div className="value">
                    <p>Cosmin Negoita</p>
                    <p>fabcos94@gmail.com</p>
                    <p>SKG - Một case đáng tin cậy</p>
                    <ReadMore>
                      Phần 1 này giới thiệu khái niệm cơ bản về đầu tư giá trị,
                      đồng thời giúp cho bạn khắc phục được điểm yếu lớn nhất
                      của mình: tâm lý chỉ nghĩ đến thị giá chứ không cần xét
                      đến giá trị. Để học về đầu tư (đầu tư bất kỳ thứ gì, không
                      chỉ chứng khoán) thì không gì tốt hơn bằng hãy đọc cuốn
                      sách Nhà đầu tư thông minh (The Intelligent Investor) của
                      Benjamin Graham. Có thể phần lớn người ở Việt Nam chưa
                      nghe về cuốn sách này, nhưng có thể so sánh như sau: cuốn
                      sách này có thể xem như là Kinh Thánh trong lĩnh vực đầu
                      tư chứng khoán. Nó dựng lên nền tảng để từ đó bao nhiêu
                      thế hệ nhà đầu tư và học giả phát triển thành các lý
                      thuyết và phương pháp đầu tư hiện đại mà thế giới hiện
                      đang áp dụng.Cuốn sách xuất bản năm 1949. Có rất nhiều câu
                      chuyện lý thú xung quanh cuốn sách và tác giả của nó.
                      Chẳng hạn, rất nhiều bạn trẻ thời đó sau khi đọc cuốn sách
                      đã tìm đến lớp học về đầu tư của tác giả Benjamin Graham.
                      Nhờ lớp học đó, hầu hết những học trò của Graham sau này
                      đều trở thành triệu phú và tỉ phú nhờ kinh doanh và đầu
                      tư, trong đó nổi bất nhất chính là Warren Buffett (người
                      giàu thứ hai thế giới hiện nay, chỉ sau Bill Gates).
                      Buffett là học trò duy nhất nhận được điểm A+ trong suốt
                      sự nghiệp dạy học của Graham; và cũng giống như một số học
                      trò khác, Buffet xem Graham là người cha thứ hai của mình.
                      Sau này họ thậm chí còn lấy tên của thầy Graham để đặt tên
                      cho con trai của mình để ghi nhận sự ảnh hưởng lớn lao của
                      Graham đối với họ.
                    </ReadMore>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="actions">
                  <h4 className="title">Hoạt động</h4>
                  <div className="actions-list">
                    <div className="action">
                      <Button
                        type="primary"
                        className="block-btn"
                        icon={<MinusCircleOutlined />}
                        size={'small'}
                        style={{
                          borderRadius: 8,
                        }}
                      />
                      Chặn người dùng
                    </div>
                    <div className="action">
                      <Button
                        type="primary"
                        className="ban-btn"
                        icon={<StopOutlined />}
                        size={'small'}
                        style={{
                          borderRadius: 8,
                        }}
                      />
                      Cấm người dùng
                    </div>
                    <div className="action">
                      <Button
                        type="primary"
                        className="approve-btn"
                        icon={<CheckOutlined />}
                        size={'small'}
                        style={{
                          borderRadius: 8,
                        }}
                      />
                      Phê duyệt
                    </div>
                    <div className="action">
                      <Button
                        type="primary"
                        className="kick-btn"
                        onClick={() => setShowModal(true)}
                        icon={<CloseOutlined />}
                        size={'small'}
                        style={{
                          borderRadius: 8,
                        }}
                      />
                      Kích người dùng
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </StyledPostDetail>
        </Col>
        <Col span={6} />
      </Row>
    </CommunityLayout>
  );
};

export default PostDetail;
