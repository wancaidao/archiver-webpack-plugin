const FS = require("fs");
const ARCHIVER = require("archiver");

const PLUGIN_NAME = "ArchiverPlugin";

const defaultOptions = {
    format: "zip",
    source: "./dist",
    destpath: "dist",
    destination: "./dist.zip",
};

class ArchiverPlugin {
    constructor(options = {}) {
        this.options = { ...defaultOptions, ...options };
    }
    apply(compiler) {
        const onEnd = async () => {
            const format = this.options.format;
            const source = this.options.source;
            const destpath = this.options.destpath;
            const destination = this.options.destination;
            FS.existsSync(destination) && FS.rmSync(destination);
            const output = FS.createWriteStream(destination);
            const archive = ARCHIVER(format);
            archive.pipe(output);
            archive.directory(source, destpath);
            archive.finalize();
        };
        compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, onEnd);
    }
}

export default ArchiverPlugin;
