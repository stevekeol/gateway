const Scheduler = require('./lib/fiber');

// 立即执行模式
// function testImmediatelyMode() {

  //创建一个任务调度器
  let bl = new Scheduler({
    timeout: 2000, //超时上限
    retry: 0, //任务失败时的重试次数
    concurrency: 3, //并行数
    retryPrior: false, //是否优先处理重试任务
    catch: (err) => {
      console.log('catch err', err);
    }
  });


  //有依赖关系的一组任务（内部串行）
  let task1 = [
    delayReturn(1000, '1-1'),
    delayReturn(2000, '1-2'),
    delayReturn(1000, '1-3', true), //被Rejected的任务
    delayReturn(2000, '1-4'),
    delayReturn(6000, '1-5'),
    delayReturn(10, '1-6')
  ];

  //task1 和 task2 是并行任务
  let task2 = [
    delayReturn(1000, '2-1')
  ];

  bl.put(task1).then(res => {
    console.log('task1 return\n', res);
  });
  bl.put(task2).then(res => {
    console.log('task2 return\n', res);
  });

  bl.put(delayReturn(0, '5-5')).then(res => {
    console.log('single task return\n', res);
  });


  function delayReturn(ms, value, isReject) {
    return function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isReject) {
            reject(value);
          } else {
            resolve(value);
          }
        }, ms);
      });
    }
  }
// }

// testImmediatelyMode();
