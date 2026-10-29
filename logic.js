(function(root){
  'use strict';
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalized=value=>String(value??'').trim().toLocaleLowerCase('nb-NO');
  const importKey=row=>normalized(row.law)+'|'+normalized(row.reference);
  function mergeImport(existing,incoming){const keys=new Set(existing.map(importKey));const added=[];let skipped=0;for(const row of incoming){const key=importKey(row);if(keys.has(key)){skipped++;continue}keys.add(key);added.push({...row})}return{rows:existing.concat(added),added:added.length,skipped}}
  function grade(course,answers,read){const questions=course.chapters.flatMap(c=>c.questions);const correct=questions.filter(q=>answers[q.id]===q.correct).length;const percentage=questions.length?Math.round(correct/questions.length*100):100;const complete=course.chapters.every(c=>read[c.id]===true)&&questions.every(q=>answers[q.id]!==undefined);return{correct,total:questions.length,percentage,complete,passed:complete&&percentage>=course.passPercent}}
  function csv(rows){return '\ufeff'+rows.map(row=>row.map(value=>'"'+String(value??'').replace(/^[=+\-@\t\r]/,"'$&").replace(/"/g,'""')+'"').join(';')).join('\r\n')}
  const api={escapeHtml,normalized,mergeImport,grade,csv};root.DemoLogic=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
