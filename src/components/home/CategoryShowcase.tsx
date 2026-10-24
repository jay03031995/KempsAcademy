'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {Programme} from '@/lib/types';
import {ProgrammeCard} from '@/components/programme/ProgrammeCard';
const filters=['Popular','Courses','Workshops','Online'] as const;
export function CategoryShowcase({programmes}: {programmes:Programme[]}) {
 const [active,setActive]=useState<typeof filters[number]>('Popular');
 const items=programmes.filter(p=>active==='Popular'?p.featured:active==='Courses'?p.type==='course'&&p.format!=='Online':active==='Workshops'?p.type==='workshop':p.format==='Online').slice(0,6);
 return <section id="programmes" className="content-container section-space scroll-mt-24"><div className="section-heading"><div><p className="eyebrow">FIND YOUR COURSE</p><h2>Programmes for your next step</h2><p>Choose a course that fits your qualification, interests and schedule.</p></div><Link href="/courses" className="simple-link">View all programmes</Link></div><div className="programme-tabs" role="tablist" aria-label="Programme types">{filters.map(f=><button key={f} role="tab" aria-selected={active===f} aria-controls="home-programmes" id={'tab-'+f.toLowerCase()} onClick={()=>setActive(f)}>{f}</button>)}</div><div id="home-programmes" role="tabpanel" aria-labelledby={'tab-'+active.toLowerCase()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{items.map(p=><ProgrammeCard key={p._id} programme={p}/>)}</div></section>;
}
