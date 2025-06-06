import { asyncLocalStorage } from './trace.middleware';

export function LogMethods(): ClassDecorator {
  return (target: any) => {
    const propertyNames = Object.getOwnPropertyNames(target.prototype);

    for (const propertyName of propertyNames) {
      if (propertyName === 'constructor') continue;

      const originalMethod = target.prototype[propertyName];
      if (typeof originalMethod !== 'function') continue;

      target.prototype[propertyName] = function (...args: any[]) {
        const traceId = asyncLocalStorage.getStore()?.traceId || 'no-trace-id';
        const result = originalMethod.apply(this, args);
        let logObj = {
          traceId,
          level: 'info',
          method: propertyName,
          args,
        };

        if (result instanceof Promise) {
          return result.then((res) => {
            logObj['timestamp'] = new Date().toISOString();
            logObj['result'] = res;
            console.info(JSON.stringify(logObj));
            return res;
          });
        } else {
          logObj['timestamp'] = new Date().toISOString();
          logObj['result'] = result;
          console.info(JSON.stringify(logObj));
          return result;
        }
      };
    }
  };
}
