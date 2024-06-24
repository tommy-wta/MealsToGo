import React, { ReactNode } from "react";
import styled, { useTheme } from "styled-components/native";
import { DefaultTheme } from 'styled-components';

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

interface VariantProps {
  variant: string;
}

const getVariant = (position: keyof typeof positionVariant, size: keyof typeof sizeVariant, theme: DefaultTheme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View<VariantProps>`
  ${({ variant }) => variant};
`;

interface SpacerProps {
  position?: keyof typeof positionVariant;
  size?: keyof typeof sizeVariant;
  children: ReactNode;
}

export const Spacer = ({ position = 'top', size = 'small', children }: SpacerProps) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};
