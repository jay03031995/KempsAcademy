import Image from 'next/image';
import Link from 'next/link';
import type {Programme} from '@/lib/types';
export function ProgrammeCard({programme:p}: {programme:Programme}) {
 return <article className="programme-card"><Link href={`/${p.type==='course'?'courses':'workshops'}/${p.slug}`} className="programme-image" aria-label={p.title}><Image src={p.image.url} alt={p.image.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover"/><span className="programme-kind">{p.format==='Online'?'Online course':p.type==='workshop'?'Workshop':'Professional course'}</span>{p.image.credit&&<span className="programme-photo-credit">{p.image.credit}</span>}</Link><div className="programme-body"><p className="programme-school">KEMPS ACADEMY</p><h3><Link href={`/${p.type==='course'?'courses':'workshops'}/${p.slug}`}>{p.title}</Link></h3><p className="programme-summary">{p.summary}</p><div className="programme-meta"><span>{p.duration}</span><span>{p.format}</span></div><Link href={`/${p.type==='course'?'courses':'workshops'}/${p.slug}`} className="programme-footer">View programme </Link></div></article>;
}
