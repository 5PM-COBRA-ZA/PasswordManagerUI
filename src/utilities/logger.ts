const Logger = {
  debug: (...args: any[]) => {console.debug(`[CASHIERS DEBUG]: `, ...args)},
  log: (...args: any[]) => {console.log(`[CASHIERS LOG]: `, ...args)},
  info: (...args: any[]) => {console.info(`[CASHIERS INFO]: `, ...args)},
  warn: (...args: any[]) => {console.warn(`[CASHIERS WARN]: `, ...args)},
  error: (...args: any[]) => {console.error(`[CASHIERS ERROR]: `, ...args)},
};

// Capture resource loading failure errors js css img...
window.addEventListener('error', (e: any) => {
    const target = e.target
    if (!target) return

    if (target.src || target.href) {
        const url = target.src || target.href
        report_event({
            url,
            type: 'error',
            subType: 'resource',
            startTime: e.timeStamp,
            html: target.outerHTML,
            resourceType: target.tagName,
            paths: e.path.map((item: any) => item.tagName).filter(Boolean),
            pageURL: window.location,
        })
    }
}, true)

// Monitor JavaScript errors
window.onerror = (msg: any, url: any, line: any, column: any, error: any) => {
    report_event({
        msg,
        line,
        column,
        error: error.stack,
        subType: 'js',
        pageURL: url,
        type: 'error',
        startTime: performance.now(),
    })
}

// Monitor promise errors - drawback is can't get column data
window.addEventListener('unhandledrejection', e => {
    report_event({
        reason: e.reason?.stack,
        subType: 'promise',
        type: 'error',
        startTime: e.timeStamp,
        pageURL: window.location,
    })
})

export interface EventReport {
    url?: any,
    type?: string,
    subType?: string,
    startTime?: any,
    html?: any,
    resourceType?: any,
    paths?: any,
    pageURL?: any,
    msg?: any,
    line?: any,
    column?: any,
    error?: any,
    reason?: any,
    method?: any,
    status?: any,
    success?: any,
    endTime?: any,
    duration?: any
}

//Will use this method to send the logs to the backend
export const report_event = (event: EventReport) => {
  setTimeout(() => {
    console.log('[Lazy Report]: ', event);
  }, 3000);
}

export default Logger;