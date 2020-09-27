/*************************************
 * 作用：使用池模块和工作者进程模块的示例
 ***********************************/
let http = require('http');
let makePool = require('./pooler.js');
let runjob = makePool('./worker.js');

http.createServer(function(req, res) {
  runjob('testJob', function(err, data) {
    if(err)
      return res.send(`got an error: ${err.message}`);
    res.end(data);
  });
}).listen(3000);


/*************************************
 * 作用：使用nodejs工作池而非创新新的子进程（池模块：'pooler.js'）
 ***********************************/
const cp = require('child_process');
const cpus = require('os').cpus().length;

module.exports = function(workModule) {
  let awaiting = []; //等待队列
  let readyPool = []; //可用的工作者线程池（工作池）
  let poolSize = 0; //池大小

  return function doWork(job, cb) { 
    if(!readyPool.length && poolSize > cpus)
      awaiting.push([doWork, job, cb]); //@1

    let child = readyPool.length
      ? readyPool.shift()
      : (poolSize++, cp.fork(workModule)); //@2
    let cbTriggered = false; //@3

    child
      .removeAllListeners() //@4
      .once('error', function(err) {
        if(!cbTriggered) {
          cb(err);
          cbTriggered = true;
        }
        child.kill();
      })
      .once('exit', function() {
        if(!cbTriggered)
          cb(new Error(`Child exited with code: ${code}`));

        poolSize--;
        let childIndex = readyPool.indexOf(child);
        if(childIndex > -1) readyPool.splice(childIndex, 1);//@4
      })
      .once('message', function(msg) {
        cb(null, msg);
        cbTriggered = true;
        readyPool.push(child);
        if(awaiting.length)
          setImmediate.apply(null, awaiting.shift());
      })
      .send(job);
  }
}

/*************************************
 * 作用：大数据量计算的样例(worker.js)
 ***********************************/
process.on('message', function(job) {
  for(let i = 0; i < 10000; i++) {
   console.log(`now: ${i}`);
  }
  process.send(`finished: ${job}`);
})