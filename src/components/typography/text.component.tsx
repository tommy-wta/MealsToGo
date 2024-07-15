import styled from "styled-components/native";
import { Theme } from "../../infrastructure/theme";

interface TextProps {
  variant?: keyof typeof variants;
  theme: Theme;
}

const defaultTextStyles = (theme: Theme) => `
  font-family: ${theme.themeFonts.body};
  font-weight: ${theme.themeFontWeights.regular};
  color: ${theme.themeColors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: Theme) => `
    font-size: ${theme.themeFontSizes.body};
`;

const hint = (theme: Theme) => `
    font-size: ${theme.themeFontSizes.body};
`;

const error = (theme: Theme) => `
    color: ${theme.themeColors.text.error};
`;

const caption = (theme: Theme) => `
    font-size: ${theme.themeFontSizes.caption};
    font-weight: ${theme.themeFontWeights.bold};
`;

const label = (theme: Theme) => `
    font-family: ${theme.themeFonts.heading};
    font-size: ${theme.themeFontSizes.body};
    font-weight: ${theme.themeFontWeights.medium};
`;

const variants = {
    body,
    label,
    caption,
    error,
    hint,
};
  
export const Text = styled.Text<TextProps>`
    ${({ theme }) => defaultTextStyles(theme)}
    ${({ variant = 'body', theme }) => variants[variant](theme)}
`;