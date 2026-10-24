'use client';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {Logo} from './Logo';
import {CourseDropdown} from './CourseDropdown';
import {MobileNav} from './MobileNav';
import {SearchPanel} from './SearchPanel';
import {AskKemps} from '@/components/search/AskKemps';
import {useContent} from '@/components/ContentProvider';
export function Header(){
 const {navigation}=useContent();const pathname=usePathname();const [mobileOpen,setMobileOpen]=useState(false);const [searchOpen,setSearchOpen]=useState(false);const [askOpen,setAskOpen]=useState(false);const directLinks=navigation.primaryLinks.slice(0,3);const moreLinks=navigation.primaryLinks.slice(3);
 return <header className={'global-header '+(pathname==='/'?'header-home':'')}><div className="header-shell"><Link href="/" aria-label="Kemps Academy — home"><Logo/></Link><nav aria-label="Primary" className="desktop-nav"><CourseDropdown/>{directLinks.map(link=><Link key={link.path} href={link.path} aria-current={pathname===link.path||pathname.startsWith(link.path.split('?')[0]+'/')?'page':undefined}>{link.label}</Link>)}{moreLinks.length>0&&<details className="more-nav"><summary>More <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 9 6 6 6-6"/></svg></summary><div onClick={e=>{if((e.target as HTMLElement).closest("a"))e.currentTarget.closest("details")?.removeAttribute("open");}}>{moreLinks.map(link=><Link key={link.path} href={link.path}>{link.label}</Link>)}</div></details>}</nav><div className="header-actions"><button onClick={()=>setSearchOpen(true)} aria-label="Search the site" className="header-search"><svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.8" stroke="currentColor" strokeWidth="1.5"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5"/></svg></button><Link href="/admissions" className="header-apply">Enquire now </Link><button onClick={()=>setMobileOpen(true)} className="mobile-toggle" aria-label="Open menu"><svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button></div></div><MobileNav open={mobileOpen} onClose={()=>setMobileOpen(false)} onAskKemps={()=>setAskOpen(true)}/><SearchPanel open={searchOpen} onClose={()=>setSearchOpen(false)}/><AskKemps open={askOpen} onClose={()=>setAskOpen(false)}/></header>;
}
