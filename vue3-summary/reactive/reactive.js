/**
 * 1. reactive 接收一个参数，判断这个参数是否是对象
 * 2. 创建拦截器对象 handler, 设置get/set/deleteProperty
 * 3. 返回Proxy 对象
 */

function isObject(target) {
  return typeof target === "object" && target !== null;
}

function convert(target) {
  if (!isObject(target)) return target;
  return reactive(target);
}

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
 */
const hasOwn = Object.hasOwn;

function reactive(target) {
  if (!isObject(target)) return target;
  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key); 
      const result = Reflect.get(target, key, receiver);
      return convert(result);
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, value, receiver);
      let result = true;
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver);
        // 触发更新
        trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);

      if (hadKey && result) {
        // 删除成功，触发更新
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}

let activeEffect = null;
function effect(callback) {
  activeEffect = callback;
  callback(); //当访问响应式数据的属性时，进行依赖收集
  activeEffect = null;
}

// 依赖收集

let targetMap = new WeakMap();
function track(target, key) {
    if(!activeEffect) return 
    let depsMap = targetMap.get(target);
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap)
    }

    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set();
        depsMap.set(key,dep)
    }
    dep.add(activeEffect)
}

function trigger(target,key){
    const depsMap = targetMap.get(target)
    if(!depsMap) return
    const dep = depsMap.get(key)
    if(!dep) return
    dep.forEach(effect => {
        effect()
    })
}

export { reactive, effect, track };
