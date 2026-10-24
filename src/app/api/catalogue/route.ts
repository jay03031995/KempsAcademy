import {getCmsContent} from "@/lib/cms";
export async function GET(){const content=await getCmsContent();return Response.json(content,{headers:{"Cache-Control":"public, max-age=30"}});}
