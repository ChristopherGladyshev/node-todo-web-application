function a0_0x2299(_0x59adf0,_0x38275b){const _0x6873ba=a0_0x6873();return a0_0x2299=function(_0x2299ea,_0x137b21){_0x2299ea=_0x2299ea-0x6d;let _0x5ca32a=_0x6873ba[_0x2299ea];return _0x5ca32a;},a0_0x2299(_0x59adf0,_0x38275b);}const a0_0x41f524=a0_0x2299;(function(_0x11103e,_0x553bcf){const _0x2f7d5b=a0_0x2299,_0x2d354d=_0x11103e();while(!![]){try{const _0x45ad22=-parseInt(_0x2f7d5b(0x78))/0x1*(-parseInt(_0x2f7d5b(0x84))/0x2)+-parseInt(_0x2f7d5b(0x8a))/0x3+-parseInt(_0x2f7d5b(0x73))/0x4*(parseInt(_0x2f7d5b(0x70))/0x5)+parseInt(_0x2f7d5b(0x89))/0x6*(parseInt(_0x2f7d5b(0x71))/0x7)+-parseInt(_0x2f7d5b(0x83))/0x8*(-parseInt(_0x2f7d5b(0x7f))/0x9)+parseInt(_0x2f7d5b(0x87))/0xa+parseInt(_0x2f7d5b(0x6d))/0xb*(-parseInt(_0x2f7d5b(0x74))/0xc);if(_0x45ad22===_0x553bcf)break;else _0x2d354d['push'](_0x2d354d['shift']());}catch(_0x554ac1){_0x2d354d['push'](_0x2d354d['shift']());}}}(a0_0x6873,0x44a43));const fs=require('fs')[a0_0x41f524(0x88)],path=require(a0_0x41f524(0x6f)),{tmpdir}=require('os'),sinon=require(a0_0x41f524(0x7e)),uuid=require(a0_0x41f524(0x77))['v4'],ObjectID=require(a0_0x41f524(0x7b))[a0_0x41f524(0x75)],auth=require(a0_0x41f524(0x79)),db=require('../src/model/db'),{importTodoTxt}=require(a0_0x41f524(0x80)),TODO_COLLECTION='todos',testUser={'email':uuid()};function sum(){const _0x3a1b35=a0_0x41f524;return[][_0x3a1b35(0x72)][_0x3a1b35(0x86)](arguments,(_0x901de9,_0x2a050d)=>{return _0x901de9+_0x2a050d;});}async function createTodo(_0x184fcf){const _0x30ddd1=a0_0x41f524,_0x4b5766=await db[_0x30ddd1(0x7a)](TODO_COLLECTION),{insertedId:_0x5926af}=await _0x4b5766[_0x30ddd1(0x81)](_0x184fcf||{'foo':uuid()});return _0x4b5766[_0x30ddd1(0x7d)]({'_id':_0x5926af});}function a0_0x6873(){const _0xb19f7f=['../src/model/todotxt','insertOne','deleteMany','127392ZMUZAd','2VfwceZ','writeFile','call','2438300cDdUNs','promises','1607484drVfbW','558090LtgXwk','33RVaqzI','callsFake','path','613645aZyKqg','7suxfDo','reduce','4axrSqo','3511956pQmmiy','ObjectID','exports','uuid','446591UJDNta','../src/model/auth','getCollection','mongodb','join','findOne','sinon','288ZQTljy'];a0_0x6873=function(){return _0xb19f7f;};return a0_0x6873();}async function createTodoTxt(){const _0x3897d3=a0_0x41f524,_0x2a76c2=path[_0x3897d3(0x7c)](tmpdir(),uuid()),_0x1cbb9f='x\x202020-01-01\x20'+uuid()+'\x0a',[_0x975e28]=importTodoTxt(_0x1cbb9f);return await fs[_0x3897d3(0x85)](_0x2a76c2,_0x1cbb9f),{'filePath':_0x2a76c2,'todo':_0x975e28};}async function getTodo(_0x151d06){const _0x2018b0=await db['getCollection'](TODO_COLLECTION);return _0x2018b0['findOne']({'_id':ObjectID(_0x151d06)});}async function dropDb(){const _0x105d9d=a0_0x41f524,_0x2043ab=await db[_0x105d9d(0x7a)](TODO_COLLECTION);await _0x2043ab[_0x105d9d(0x82)]();}function stubTestUser(){const _0x2068be=a0_0x41f524;return sinon['stub'](auth,'assertAuthenticated')[_0x2068be(0x6e)](_0x3d9fca=>{_0x3d9fca['state']['user']=testUser;}),testUser;}module[a0_0x41f524(0x76)]={'TODO_COLLECTION':TODO_COLLECTION,'createTodo':createTodo,'createTodoTxt':createTodoTxt,'getTodo':getTodo,'dropDb':dropDb,'stubTestUser':stubTestUser,'sum':sum};