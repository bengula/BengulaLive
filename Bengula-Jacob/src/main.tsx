import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// vite-react-ssg drives both the build-time prerender and the client-side
// hydration from this single exported entry.
export const createRoot = ViteReactSSG({ routes });
