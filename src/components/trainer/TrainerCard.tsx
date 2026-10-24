import Image from 'next/image';
import Link from 'next/link';
import type {Trainer} from '@/lib/types';
export function TrainerCard({trainer:t}:{trainer:Trainer;index?:number}){return <article className="instructor-card"><div className="instructor-photo"><Image src={t.portrait.url} alt={t.portrait.alt} fill sizes="(max-width:767px) 85vw, 350px" className="object-cover"/></div><div className="instructor-info"><h3>{t.name}</h3><p className="instructor-role">{t.credentials}</p><p className="instructor-affiliation">CLINICAL PRACTICE</p><p className="instructor-clinic">Kemps Clinic</p><p className="instructor-summary">{t.experienceSummary}</p><Link href={'/trainers/'+t.slug}>View profile </Link></div></article>}
