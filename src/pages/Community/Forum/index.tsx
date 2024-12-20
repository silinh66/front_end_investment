// import { Tabs } from 'antd';

const Forum = () => {
  return (
    <div className="child-tabs">
      {/* <Tabs
        tabBarStyle={{
          backgroundColor: '#1F232C',
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '8px',
        }}
        items={tab.map((childrenTab, i) => {
          const id = String(i + 1);
          return {
            label: <div className="tab-content">{childrenTab.text}</div>,
            key: id,
            children: childrenTab.view,
          };
        })}
      /> */}
    </div>
  );
};

export default Forum;

// const tab = [
//   {
//     id: SecondTab.FORUM,
//     text: 'Diễn đàn',
//     view: <Forum />,
//   },
//   {
//     id: SecondTab.SEARCH,
//     text: 'Tìm kiếm',
//     view: <Search />,
//   },
//   {
//     id: SecondTab.FOLLOWING_FORUM,
//     text: 'Diễn đàn đang theo dõi',
//     view: <FollowingForum />,
//   },
//   {
//     id: SecondTab.FOLLOWING_CONCEPT,
//     text: 'Chủ đề đang theo dõi',
//     view: <FollowingConcept />,
//   },
// ];
