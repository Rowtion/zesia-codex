// Development/CI proof only. Installation uses the already-verified native asset.
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,mkdir,cp,rm,realpath} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const lock=JSON.parse(await readFile('native.lock.json','utf8'));
const platform=process.platform+'-'+process.arch;
const asset=lock.assets.find(item=>item.platform===platform);assert.ok(asset,'No verified native asset for this platform.');
const temp=await mkdtemp(join(tmpdir(),'zesia-codex-native-'));
try{
 const response=await fetch(asset.url,{signal:AbortSignal.timeout(60000)});assert.ok(response.ok);
 const bytes=Buffer.from(await response.arrayBuffer());assert.equal(bytes.length,asset.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
 const archive=join(temp,'runtime.zip');await writeFile(archive,bytes);
 const source=join(temp,'source');await cp('dist/skill',source,{recursive:true});
 if(process.platform==='win32')execFileSync('powershell.exe',['-NoProfile','-Command',"Expand-Archive -LiteralPath '"+archive.replaceAll("'","''")+"' -DestinationPath '"+source.replaceAll("'","''")+"' -Force"]);
 else execFileSync('unzip',['-oq',archive,'-d',source]);
 const project=join(temp,'project'),emptyPath=join(temp,'empty-path');await mkdir(project);await mkdir(emptyPath);
 const executable=join(source,'scripts/zesia'+(process.platform==='win32'?'.exe':''));
 const env={...process.env,PATH:process.platform==='win32'?process.env.SystemRoot+'\\System32':emptyPath,ZESIA_CONFIG:join(temp,'private-config.json'),ZESIA_STATE_DIR:join(temp,'private-state')};
 const installed=JSON.parse(execFileSync(executable,['install',project],{env,encoding:'utf8'}));assert.equal(installed.ok,true);
 assert.equal(installed.destination,join(await realpath(project),'.agents/skills/zesia-consult'));
 const marker=JSON.parse(await readFile(join(installed.destination,'zesia-install.json'),'utf8'));assert.equal(marker.host,'codex');assert.equal(marker.runtimeVersion,lock.version);
 const skill=await readFile(join(installed.destination,'SKILL.md'),'utf8');assert.match(skill,/shared zesia.dev window/);assert.doesNotMatch(skill,/node <skill/);
 const installedExe=join(installed.destination,'scripts/zesia'+(process.platform==='win32'?'.exe':''));
 const help=JSON.parse(execFileSync(installedExe,['--help'],{env,encoding:'utf8'}));assert.ok(help.commands.includes('review <draftId> [--no-open]'));
 assert.equal(JSON.parse(execFileSync(executable,['install',project],{env,encoding:'utf8'})).reused,true);
 console.log(JSON.stringify({platform,adapterVersion:marker.adapterVersion,runtimeVersion:marker.runtimeVersion,nativeInstall:true,noNodePath:true,managedReuse:true}));
}finally{await rm(temp,{recursive:true,force:true,maxRetries:20,retryDelay:100});}
