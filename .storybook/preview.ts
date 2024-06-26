import type { Preview } from "@storybook/react";
import '../src/presentation/assets/styles/styles.scss';
 
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
 
export default preview;