
declare module 'react-window';

declare module '*.svg?inline' {
    const content: any
    export default content
}
declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export { ReactComponent } ;
    export default content;
}
