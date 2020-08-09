import React from 'react';
import { Card, Typography } from 'antd';
import styled, { DefaultTheme } from 'styled-components';

const CardStyledBasic = styled(Card)`
  height: ${(props) => props.theme.card.height};
  width: ${(props) => props.theme.card.width};
  margin: ${(props) => props.theme.card.margin};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface TitleStyledprops {
  color: string;
  theme: DefaultTheme;
}

const Title = styled(Typography.Title)<TitleStyledprops>`
  ${(props) => props.color && 'color: ' + props.color + '!important'};
`;

// interface CardBasicProps {
//   children?: React.ReactNode;
// }

const CardBasic: React.FC<any> = ({ children, title, textColor, ...props }) => {
  return (
    <CardStyledBasic bordered={false} {...props}>
      <Title level={2} color={textColor}>
        {title}
      </Title>
      {children}
    </CardStyledBasic>
  );
};

export default CardBasic;
