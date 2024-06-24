import { themeColors } from "./colors";
import { themeFonts, themeFontWeights, themeFontSizes } from "./fonts";
import { sizes } from "./sizes";
import { space, lineHeights } from "./spacings";

interface Theme {
    themeColors: typeof themeColors;
    themeFonts: typeof themeFonts;
    themeFontWeights: typeof themeFontWeights;
    themeFontSizes: typeof themeFontSizes;
    sizes: typeof sizes;
    space: typeof space;
    lineHeights: typeof lineHeights;
}

export const theme: Theme = {
    themeColors,
    themeFonts,
    themeFontWeights, 
    themeFontSizes,
    sizes,
    space,
    lineHeights
}