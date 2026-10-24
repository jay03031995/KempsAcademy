import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {MeetTrainers} from '@/components/home/MeetTrainers';
import {buildMetadata} from '@/lib/seo';
export const metadata=buildMetadata({title:'Our faculty',description:'Meet the clinical experience behind Kemps Academy.',path:'/trainers'});
export default function Page(){return <><div className="content-container faculty-breadcrumb"><Breadcrumbs items={[{name:'Home',path:'/'},{name:'Our faculty',path:'/trainers'}]}/></div><MeetTrainers/></>}
