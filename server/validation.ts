const object = (v: any) => v && typeof v === 'object' && !Array.isArray(v);
const strings = (v: any) => Array.isArray(v) && v.every(x=>typeof x==='string');
function fail(message: string): never { throw Object.assign(new Error(message), {status:400}); }
export function validateContent(data: any) {
  if (!object(data)) fail('Content must be an object.');
  for (const key of ['projects','teamSpecialists','clientLogos','haloAvatars','stories']) if (!Array.isArray(data[key])) fail(`Missing ${key}.`);
  for (const key of ['settings','founderData','sections','copy']) if (!object(data[key])) fail(`Missing ${key}.`);
  if (data.projects.length > 1000) fail('Maximum 1,000 projects.');
  const ids = new Set();
  for (const p of data.projects) {
    if (!object(p)) fail('Invalid project.');
    for (const k of ['id','title','category','client','year','tag','impactMetric','description','coverImage','gradient']) if(typeof p[k]!=='string') fail(`Invalid project ${k}.`);
    if (!p.id.trim() || !p.title.trim() || !p.coverImage.trim()) fail('Each project needs a title and cover image.');
    if(ids.has(p.id)) fail('Project IDs must be unique.'); ids.add(p.id);
    if (!strings(p.images) || !object(p.caseStudy) || !strings(p.caseStudy.deliverables) || !strings(p.caseStudy.results)) fail('Invalid project gallery or case study.');
    for(const k of ['overview','challenge','solution']) if(typeof p.caseStudy[k]!=='string') fail('Invalid case study text.');
  }
  for(const k of ['heroHeadline','heroHighlight','heroSubtitle','phoneWhatsApp','studioEmail']) if(typeof data.settings[k]!=='string') fail(`Invalid ${k}.`);
  for(const row of data.teamSpecialists) {
    if(!object(row) || !['id','name','role','bio','image'].every(k=>typeof row[k]==='string') || !strings(row.tags) || typeof row.projectsCount!=='number') fail('Invalid team member.');
  }
  for(const row of data.clientLogos) if(!object(row)||!['id','name','category','region','accentColor','iconLetter'].every(k=>typeof row[k]==='string')) fail('Invalid client logo.');
  for(const row of data.stories) if(!object(row)||!['id','name','role','company','avatar','quote'].every(k=>typeof row[k]==='string')) fail('Invalid testimonial.');
  if(!strings(data.founderData.bio)||!Array.isArray(data.founderData.skills)||!object(data.founderData.socials)) fail('Invalid founder details.');
  function walk(value:any,key='',depth=0) {
    if(depth>18) fail('Content nesting is too deep.');
    if(typeof value==='string') {
      if(value.length>40000) fail('A text field is too long.');
      if(/^(data|blob|javascript|vbscript):/i.test(value.trim())) fail('Upload the media file before saving. Embedded data and executable links are not allowed.');
      if(/(url|image|photo|avatar|poster|cover|href|link|whatsapp|twitter|linkedin|behance|dribbble)$/i.test(key) && value && !['phoneWhatsApp'].includes(key)) {
        if(!/^(https?:\/\/|\/(?!\/)|\.\/|mailto:|tel:|#)/i.test(value)) fail(`Use a valid URL for ${key}.`);
      }
      if(/(primaryColor|accentColor|inkColor|surfaceColor)$/i.test(key) && !/^#[a-f\d]{6}$/i.test(value)) fail(`Choose a valid color for ${key}.`);
    } else if(Array.isArray(value)) { if(value.length>2000) fail('Too many items.'); value.forEach(v=>walk(v,key==='images'?'image':key,depth+1)); }
    else if(object(value)) for(const [k,v] of Object.entries(value)) {if(['__proto__','prototype','constructor'].includes(k)) fail('Invalid field.'); walk(v,k,depth+1);}
    else if(value!==null && !['number','boolean'].includes(typeof value)) fail('Unsupported content.');
  }

  for(const [key,value] of Object.entries(data.copy)) if(typeof value!=='string') fail('Page text must contain text values.');
  if(!Array.isArray(data.settings.homeSections)||data.settings.homeSections.some((s:any)=>!object(s)||typeof s.id!=='string'||typeof s.visible!=='boolean')) fail('Invalid home page layout.');
  if(!['services','metrics','valuePillars','faqs','principles','values','navigation'].every(key=>Array.isArray(data.sections[key]))) fail('Missing page sections.');
  const sectionFields:Record<string,string[]>={services:['id','number','title','icon','description'],metrics:['value','label','sub','icon'],valuePillars:['title','desc'],faqs:['question','answer'],principles:['num','title','desc'],values:['icon','title','description'],navigation:['id','label','num']};
  for(const [key,fields]of Object.entries(sectionFields))for(const row of data.sections[key]) {
    if(!object(row)||fields.some(f=>typeof row[f]!=='string'))fail(`Invalid ${key} item.`);
    if(key==='services'&&!strings(row.points))fail('Service points must be a list of text.');
  }
  for(const key of ['brandName','heroLine2','heroLine3','seoTitle','seoDescription'])if(typeof data.settings[key]!=='string')fail(`Invalid ${key}.`);
  if(data.settings.studioEmail && !/^\S+@\S+\.\S+$/.test(data.settings.studioEmail))fail('Enter a valid studio email.');
  for(const key of ['budgetOptions','timelineOptions'])if(!strings(data.settings[key])||!data.settings[key].length)fail(`Add at least one ${key} choice.`);
  walk(data);
  return data;
}
export function mediaType(header: Uint8Array): {ext:string;mime:string}|null {
  const starts=(bytes:number[])=>bytes.every((byte,i)=>header[i]===byte);
  const ascii=(start:number,end:number)=>String.fromCharCode(...header.subarray(start,end));
  if(starts([137,80,78,71,13,10,26,10]))return {ext:'png',mime:'image/png'};
  if(starts([255,216,255]))return {ext:'jpg',mime:'image/jpeg'};
  if(/^GIF8[79]a/.test(ascii(0,6)))return {ext:'gif',mime:'image/gif'};
  if(ascii(0,4)==='RIFF'&&ascii(8,12)==='WEBP')return {ext:'webp',mime:'image/webp'};
  if(ascii(4,8)==='ftyp'&&/^(isom|iso[2-9]|mp4[12]|avc1|M4V )$/.test(ascii(8,12)))return {ext:'mp4',mime:'video/mp4'};
  if(starts([26,69,223,163])&&ascii(0,header.length).includes('webm'))return {ext:'webm',mime:'video/webm'};
  if(ascii(0,5)==='%PDF-')return {ext:'pdf',mime:'application/pdf'};
  return null;
}
