import ora from 'ora';
declare class Spin {
    ora: ora.Ora;
    start(msg: string): ora.Ora;
}
declare const _default: Spin;
export default _default;
