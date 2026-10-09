
const clockBarOffset=()=>0;
const multiBarCursorStop=()=>{};
const clearTimeout=()=>{};
const multiBarScore=[
 [1,'Trái',0,48,2],[1,'Trái',2,50,1],[1,'Trái',3,null,1],
 [1,'Phải',0,60,1],[1,'Phải',1,62,.5],[1,'Phải',1.5,64,.5],[1,'Phải',2,65,2],
 [2,'Trái',0,52,1],[2,'Trái',1,53,1],[2,'Trái',2,55,2],
 [2,'Phải',0,67,2],[2,'Phải',2,69,.5],[2,'Phải',2.5,67,.5],[2,'Phải',3,null,1]
].map((x,i)=>({id:i,bar:x[0],hand:x[1],beat:x[2],pitch:x[3],duration:x[4]}));
let multiBarActive=false,multiBarEvents=[],multiBarRows=[],multiBarTimers=[],multiBarStartAt=0,multiBarBpm=60;
function multiBarStop(){multiBarActive=false;multiBarTimers.forEach(clearTimeout);multiBarTimers=[];multiBarCursorStop();}
function captureMultiBar(pitch){if(multiBarActive)multiBarEvents.push({pitch,at:performance.now(),offAt:null})}
function captureMultiBarRelease(pitch,onset,offAt){
 const e=[...multiBarEvents].reverse().find(x=>x.pitch===pitch&&x.offAt===null&&Math.abs(x.at-onset)<50);
 if(e){e.offAt=offAt;if(multiBarRows.length)multiBarRender()}
}
function multiBarAssess(){
 const beatMs=60000/multiBarBpm,tolerance=Math.min(220,beatMs*.25),offset=clockBarOffset(),used=new Set();
 multiBarRows=multiBarScore.map(n=>{
  if(n.pitch===null)return {...n,targetMs:null,actualMs:null,deltaMs:null,holdMs:null,holdDeltaMs:null,status:'Dấu lặng'};
  const target=multiBarStartAt+((n.bar-1)*4+n.beat)*beatMs;
  const matches=multiBarEvents.filter(e=>!used.has(e)&&e.pitch===n.pitch&&Math.abs(e.at-offset-target)<=Math.min(beatMs*.48,600));
  matches.sort((a,b)=>Math.abs(a.at-offset-target)-Math.abs(b.at-offset-target));
  const e=matches[0];if(e)used.add(e);
  const delta=e?Math.round(e.at-offset-target):null;
  const held=e&&e.offAt!==null?Math.round(e.offAt-e.at):null;
  const duration=Math.round(n.duration*beatMs);
  const holdDelta=held===null?null:held-duration;
  const holdTolerance=Math.max(100,duration*.2);
  const status=!e?'Thiếu nốt':held===null?'Chưa nhả phím':Math.abs(delta)>Math.min(220,beatMs*.25)?'Sai nhịp':Math.abs(holdDelta)>holdTolerance?(holdDelta<0?'Nhả sớm':'Giữ lâu'):'Đạt';
  return {...n,event:e,targetMs:duration,actualMs:e?Math.round(e.at-multiBarStartAt):null,deltaMs:delta,holdMs:held,holdDeltaMs:holdDelta,status};
 });
 const extras=multiBarEvents.filter(e=>!used.has(e));
 extras.forEach(e=>{
  const beatMs=60000/multiBarBpm,correctedBeat=(e.at-clockBarOffset()-multiBarStartAt)/beatMs;
  const activeNotes=multiBarScore.filter(n=>n.pitch!==null&&correctedBeat>=((n.bar-1)*4+n.beat)&&correctedBeat<((n.bar-1)*4+n.beat+n.duration));
  const rests=multiBarScore.filter(n=>n.pitch===null&&correctedBeat>=((n.bar-1)*4+n.beat)&&correctedBeat<((n.bar-1)*4+n.beat+n.duration));
  const rest=rests.length&&!activeNotes.length?rests[0]:null;
  multiBarRows.push({bar:rest?rest.bar:'—',hand:rest?rest.hand:'—',beat:rest?rest.beat:'—',pitch:e.pitch,duration:'—',targetMs:null,actualMs:Math.round(e.at-multiBarStartAt),deltaMs:null,holdMs:e.offAt===null?null:Math.round(e.offAt-e.at),holdDeltaMs:null,status:rest?'Đánh trong dấu lặng':'Nốt ngoài bản nhạc'});
 });
 /* no UI */
}

const expected=multiBarScore.filter(n=>n.pitch!==null),start=100000;
const make=(n,delay=0,holdDelta=0)=>({pitch:n.pitch,at:start+((n.bar-1)*4+n.beat)*1000+delay,offAt:start+((n.bar-1)*4+n.beat+n.duration)*1000+delay+holdDelta});
const cases=[
 ['all correct',expected.map(n=>make(n)),r=>r.filter(x=>x.pitch!==null&&Number.isInteger(x.id)).every(x=>x.status==='Đạt')],
 ['late 300ms',expected.map((n,i)=>make(n,i===0?300:0)),r=>r.some(x=>x.id===expected[0].id&&x.status==='Sai nhịp')],
 ['early release',expected.map((n,i)=>make(n,0,i===0?-600:0)),r=>r.some(x=>x.id===expected[0].id&&x.status==='Nhả sớm')],
 ['missing note',expected.slice(1).map(n=>make(n)),r=>r.some(x=>x.id===expected[0].id&&x.status==='Thiếu nốt')],
 ['extra note',[...expected.map(n=>make(n)),{pitch:83,at:start+250,offAt:start+600}],r=>r.some(x=>x.status==='Nốt ngoài bản nhạc')],
 ['no note off',expected.map((n,i)=>i===0?{...make(n),offAt:null}:make(n)),r=>r.some(x=>x.id===expected[0].id&&x.status==='Chưa nhả phím')]
];
multiBarBpm=60;multiBarStartAt=start;
for(const [name,events,check] of cases){multiBarEvents=events;multiBarAssess();console.log(name+': '+(check(multiBarRows)?'PASS':'FAIL'))}
