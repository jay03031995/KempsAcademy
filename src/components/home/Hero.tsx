import Image from 'next/image';
import Link from 'next/link';
import {HeroSearchBar} from './HeroSearchBar';
import type {HomepageContent} from '@/lib/cms';
export function Hero({content,count}:{content:HomepageContent;count:number}){
 return <><section className="discovery-hero"><Image src={content.heroImage.url} alt={content.heroImage.alt} fill priority sizes="100vw" className="object-cover"/><div className="discovery-overlay"/><div className="discovery-title"><p>KEMPS ACADEMY</p><h1>{content.heroHeadline==='The art of aesthetics.'?<>For your next<br/><span>chapter in aesthetics.</span></>:content.heroHeadline}</h1><p className="discovery-subtitle">{content.heroSupportingCopy}</p></div><div className="discovery-tools"><HeroSearchBar/><div className="interest-chips"><Link href="/courses?category=skin-aesthetics">Skin & cosmetology </Link><Link href="/courses?category=injectables">Aesthetic medicine </Link><Link href="/workshops">Clinical workshops </Link><Link href="/courses?mode=Online">Online courses </Link></div></div>{content.heroImage.credit&&<span className="hero-photo-credit">{content.heroImage.credit}</span>}</section><section className="hero-intro content-container"><h2><span>Build practical skills</span> for your next step in aesthetics.</h2><p>{count} courses and workshops · Online, hybrid & in-person · Guidance from clinical experience</p></section></>;
}
