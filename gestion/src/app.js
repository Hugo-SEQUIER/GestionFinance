import { render } from 'react-dom';
import Navigator from './containers/Navigator';
import MenuNav from './components/Menu';
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
				<MenuNav />
				<Navigator />
			</BrowserRouter>
		</ChakraProvider>
	</>,
	document.querySelector('.appContainer')
);