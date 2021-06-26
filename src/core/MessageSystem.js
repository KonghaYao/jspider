import consola from "consola";
// TODO 编写指定的信息发布端口
/*
    这是信息中心，为了保证没有这个信息中心也可以进行使用，
    我在这里模仿了 console 这个对象的格式，便于在项目中进行使用
    同时，将 API 集中于此处，可以方便后面对发布信息的插件进行更换
*/
export const console = {
    log() {},
};
