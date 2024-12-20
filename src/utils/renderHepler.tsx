export const RenderModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="react-modal-provider"
      // onClick={(e) => {
      //   dispatch(updateModalState(null));
      // }}
    >
      {children}
    </div>
  );
};
