const themeDark = {
    primary: {
        light: '#626a7d',
        regular: '#373f51',
        dark: '#101929',
        typo: {
            main: '#f2f2f2',
            sub: '#cccccc',
            text: '#bfbfbf'
        }
    },
    error: {
        bg: '#FF4444',
        text: '#f2f2f2'
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
    fontRegular: 'RobotoCondensed',
    fontCursive: 'LobsterTwo',
    ...themeDark
};
