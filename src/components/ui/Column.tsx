import { FC, PropsWithChildren } from 'react';

const Column: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col my-[42px] h-[162px]">{children}</div>
  );
};

export default Column;
