import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<BrowserRouter>
    <App />
  </BrowserRouter>);
}
