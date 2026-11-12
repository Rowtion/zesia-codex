import test from 'node:test';
import assert from 'node:assert/strict';
import{mkdtemp,mkdir,readFile,writeFile,rm}from'node:fs/promises';
import{tmpdir}from'node:os';import{join}from'node:path';import{fileURLToPath}from'node:url';
import{createServer}from'node:http';import{fork,execFile}from'node:child_process';import{promisify}from'node:util';
import{install}from'../scripts/install.mjs';
const execute=promisify(execFile);
test('installed Codex bundle reviews in a local browser and returns an actual A2A result to the original CLI',async()=>{
 const root=await mkdtemp(join(tmpdir(),'zesia-codex-review-'));const project=join(root,'project');await mkdir(project);let child,remote,calls=0;
 try{
 const host=JSON.parse(await readFile(new URL('../host.json',import.meta.url)));
 const installed=await install({project,source:fileURLToPath(new URL('../dist/skill',import.meta.url)),host,cliSeedDirectory:fileURLToPath(new URL('../bin',import.meta.url))});
 const cli=join(installed.destination,'scripts/zesia.mjs'),stateDir=join(root,'state'),config=join(root,'config.json');
 remote=createServer(async(req,res)=>{let raw='';for await(const chunk of req)raw+=chunk;const rpc=JSON.parse(raw);res.setHeader('content-type','application/json');
 if(req.url==='/v1/consult/preflight')return res.end(JSON.stringify({format:'zesia.consult.preflight.v1',ok:true,modelCalls:0}));calls++;assert.equal(req.headers.authorization,'Bearer synthetic-codex-test-token');res.end(JSON.stringify({jsonrpc:'2.0',id:rpc.id,result:{message:{messageId:'codex-test-reply',contextId:'codex-test-context',role:'ROLE_AGENT',parts:[{mediaType:'application/vnd.zesia.consult+json',data:{format:'zesia.consult.v0',consultId:'codex-consult-1',advice:'Publish an immutable artifact before updating its pointer.',qualityStatus:'partial',followUp:{requests:[]}}}]}}}));});
 await new Promise(r=>remote.listen(0,'127.0.0.1',r));
 await writeFile(config,JSON.stringify({url:'http://127.0.0.1:'+remote.address().port,token:'synthetic-codex-test-token'}),{mode:0o600});
 const packetFile=join(root,'packet.json');await writeFile(packetFile,JSON.stringify({requester:'Codex',project:'synthetic-codex-review',brief:'Review the publication order.',context:{goal:'Prevent lost updates.'}}),{mode:0o600});const env={...process.env,ZESIA_CONFIG:config,ZESIA_STATE_DIR:stateDir};
 const prepared=JSON.parse((await execute(process.execPath,[cli,'prepare',packetFile],{env})).stdout);assert.equal(calls,0);
 child=fork(cli,['serve-review',prepared.draftId,'--no-open'],{env,stdio:['ignore','ignore','ignore','ipc']});const session=await new Promise((resolve,reject)=>{child.once('message',resolve);child.once('error',reject);child.once('exit',()=>reject(Error('Review failed to start.')));});assert.equal(session.ok,true);assert.equal(calls,0);
 const origin=new URL(session.url).origin;const headers={Origin:origin,Authorization:'Bearer '+new URL(session.url).hash.slice(5),'Content-Type':'application/json'};const view=await(await fetch(origin+'/api/view',{headers})).json();assert.equal(view.packet.requester,'Codex');assert.equal(JSON.stringify(view).includes('synthetic-codex-test-token'),false);
 const sent=await(await fetch(origin+'/api/send',{method:'POST',headers,body:JSON.stringify({approvedHash:prepared.approvedHash})})).json();assert.equal(sent.ok,true);assert.equal(sent.a2a.contextId,'codex-test-context');assert.equal(calls,1);
 const result=JSON.parse((await execute(process.execPath,[cli,'wait',prepared.draftId,'1'],{env})).stdout);assert.equal(result.consultId,'codex-consult-1');assert.equal(result.cached,true);assert.equal(calls,1);
 }finally{if(child){child.kill();await new Promise(r=>child.exitCode!==null?r():child.once('exit',r));}if(remote){remote.closeAllConnections();await new Promise(r=>remote.close(r));}await rm(root,{recursive:true,force:true});}
});
