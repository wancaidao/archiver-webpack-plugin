import type { Compiler, WebpackPluginInstance } from "webpack";

interface Options {
    format?: string;
    source?: string;
    destpath?: string | false;
    destination?: string;
}

declare class ArchiverPlugin implements WebpackPluginInstance {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
}

export default ArchiverPlugin;
