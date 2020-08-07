import React from 'react';
import { Card, Typography } from 'antd';
import styled, { DefaultTheme } from 'styled-components';

const CardStyledBasic = styled(Card)`
  height: ${(props) => props.theme.card.height};
  width: ${(props) => props.theme.card.width};
  margin: ${(props) => props.theme.card.margin};
  border-radius: ${(props) => props.theme.card.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface TitleStyledprops {
  color: string;
  theme: DefaultTheme;
}

const Title = styled(Typography.Paragraph)<TitleStyledprops>`
  color: ${(props) => props.color || props.theme.colors.text}!important;
  font-size: 14pt;
`

// interface CardBasicProps {
//   children?: React.ReactNode;
// }

const CardBasic: React.FC<any> = ({ children, title, textColor, ...props }) => {
	return (
    <CardStyledBasic 
      bordered={false}
      {...props}
    >
      <Title color={textColor}>{title}</Title>
      {children}
    </CardStyledBasic>
  );
}

export default CardBasic;