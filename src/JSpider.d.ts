declare namespace JSpider {
    type RxjsOperator = Function;
    type RxjsObservable = Object;
}

interface JSpider {
    plugins: Plugins;
    tools: Tools;
    simpleCrawl: RxjsObservable;
}

interface Plugins {
    Request(): RxjsOperator;
    Download(): RxjsOperator;
}
interface Tools {
    $load(): Promise;
}

declare module "JSpider" {
    export = JSpider;
}
