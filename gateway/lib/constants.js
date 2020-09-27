const constants = {
    TIMEOUT_FLAG: 'fiber_timeout',
    // 只用于内部状态判断，表明需要重试
    RETRY_FLAG: 'fiber_retry',
    UNKNOWN_ERR: 'fiber_unknown_error',
    EXCEEDED: 'fiber_exceeded_maximum_task_number',
    INVALID: 'fiber_invalid',
    // 按频率调度模式
    SCHEDULE_MODE_FREQUENCY: 'frequency',
    // 立即调度模式
    SCHEDULE_MODE_IMMEDIATELY: 'immediately',
    // 饱和策略：终止
    SATURATION_POLICY_ABORT: 'abort',
    // 饱和策略：丢弃最早任务
    SATURATION_POLICY_DISCARD_OLDEST: 'discardOldest',
    // 任务模型，表明put进来的数据
    TASK_MODE_DATA: 'data',
    // 任务模型，表明put进来的是函数
    TASK_MODE_FUNCTION: 'function',
    TASK_ERROR: 'fiber_unsupported_task_type',
    // 任务被移除
    DISCARD: 'fiber_discard',
    EMPTY_ELEMENTS: 'fiber_empty_elements'
};


module.exports = constants;