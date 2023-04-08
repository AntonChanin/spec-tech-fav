import { FC } from 'react';

import TitleModel from '../../model/TitleModel';
import { ModelProps } from '../../types/models';

const Title: FC<ModelProps<TitleModel>> = (props) => {
  const { model = new TitleModel() } = props;
  const { title, classList, createClass } = model;

  return (
    <div className={createClass([classList['title'], classList['title-exe']])}>{title}</div>
  );
};

export default Title;
