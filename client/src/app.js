import { render } from 'react-dom';
import App from './index';
import { BrowserRouter } from 'react-router-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
}

const theme = extendTheme({ colors });

render (
	<>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
	</>,
	document.querySelector('.appContainer')
);
