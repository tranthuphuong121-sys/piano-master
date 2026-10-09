// Chạy: node test-staff.js
const assert=require('node:assert/strict');
const pcStep=[0,0,1,1,2,3,3,4,4,5,5,6];
function y(pitch,hand){const step=(Math.floor(pitch/12)-1)*7+pcStep[pitch%12];return 100-(step-(hand==='left'?18:30))*6}
const cases=[
 [43,'left',100,'G2 bottom bass line'],
 [47,'left',88,'B2 bass second line'],
 [50,'left',76,'D3 bass third line'],
 [53,'left',64,'F3 bass fourth line'],
 [57,'left',52,'A3 bass top line'],
 [64,'right',100,'E4 treble bottom line'],
 [67,'right',88,'G4 treble second line'],
 [71,'right',76,'B4 treble third line'],
 [74,'right',64,'D5 treble fourth line'],
 [77,'right',52,'F5 treble top line'],
 [60,'right',112,'C4 treble ledger below'],
 [60,'left',40,'C4 bass ledger above']
];
for(const [pitch,hand,expected,label] of cases){assert.equal(y(pitch,hand),expected,label)}
console.log('PASS: '+cases.length+' staff position regression checks');
