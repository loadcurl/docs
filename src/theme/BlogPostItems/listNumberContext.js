import {createContext, useContext} from 'react';

export const BlogListNumberContext = createContext(null);

export function useBlogListNumber() {
  return useContext(BlogListNumberContext);
}
