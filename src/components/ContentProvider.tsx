'use client';
import { createContext, useContext } from 'react';
import type { CmsContent } from '@/lib/cms';
const ContentContext = createContext<CmsContent | null>(null);
export function ContentProvider({content, children}: {content: CmsContent; children: React.ReactNode}) { return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>; }
export function useContent() { const content = useContext(ContentContext); if (!content) throw new Error('ContentProvider missing'); return content; }
