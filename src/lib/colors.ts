const themeDark = {
    primary: {
        light: '#4f5b62',
        regular: '#263238',
        dark: '#000a12',
        typo: {
            main: '#f2f2f2',
            sub: '#cccccc',
            text: '#bfbfbf'
        }
    },
    secondary: {
        light: '#7953d2',
        regular: '#4527a0',
        dark: '#000070',
        typo: {
            main: '#f2f2f2',
            sub: '#e6e6e6',
            text: '#d9d9d9'
        }
    }
};

export default {
    text_light: 'hsl(0, 0%, 45%)',
    text_title: 'hsl(0, 0%, 20%)',
    fontRegular: 'PT_Sans',
    ...themeDark
};
