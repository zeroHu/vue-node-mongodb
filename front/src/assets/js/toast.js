import ToastComponent from '@/components/toast.vue'
const Toast = {}
Toast.install = (Vue) => {
    // 生成一个子类
    const ToastConstructor = Vue.extend(ToastComponent);
    // 生成一个该子类的实例
    const instance = new ToastConstructor();

    // 将实例挂载在body上
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    // 通过Vue的原型注册一个方法
    Vue.prototype.$toast = (msg, duration = 2500) => {
        instance.message = msg;
        instance.show = true;
        setTimeout(() => {
            instance.show = false
        }, duration)
    }
}
export default Toast
