import { createTheme } from '@fluentui/react';

const theme = createTheme({
  palette: {
    themePrimary: '#0078D4',
    themeLighterAlt: '#f3f9fd',
  },
  components: {
    // Dialog styles
    Dialog: {
      styles: {
        main: {
          backgroundColor: '#ffffff',
          // Add more Dialog styles as needed
        },
      },
    },

    // Input styles
    TextField: {
      styles: {
        fieldGroup: {
          borderColor: '#0078D4',
          // Add more TextField styles as needed
        },
      },
    },

    // Button styles
    Button: {
      styles: {
        root: {
          backgroundColor: '#0078D4',
          color: '#ffffff',
          // Add more Button styles as needed
        },
      },
    },

    // Field styles (Assuming you mean form fields)
    Field: {
      styles: {
        root: {
          margin: '8px 0',
          // Add more Field styles as needed
        },
      },
    },
  },
});

export default theme;
