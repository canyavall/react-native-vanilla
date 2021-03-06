import chalk from 'chalk';
import path from 'path';
import shell from 'shelljs';
import Common, { initializeBuilder, logComplete, logError } from './common';
import Runner from './cli/runner';
import App from './cli/app';
import Platform from './cli/platform';
import Target from './cli/target';
import Linker from './cli/linker';
import Plugin from './cli/plugin';
import Constants from './constants';
import Exec from './exec';
import FileUtils from './fileutils';

const commands = {
    start: Runner,
    build: Runner,
    export: Runner,
    app: App,
    link: Linker,
    platform: Platform,
    run: Runner,
    package: Runner,
    target: Target,
    plugin: Plugin,
    log: Runner,
};

const run = (cmd, subCmd, program, process) => {
    initializeBuilder(cmd, subCmd, process, program)
        .then((v) => {
            if (commands[cmd]) {
                commands[cmd](v).then(() => logComplete(true)).catch(e => logError(e, true));
            } else {
                logError(`Command ${chalk.white(cmd)} is not supported by RNV CLI. run ${chalk.white('rnv -h')} for help`, true);
            }
        }).catch(e => logError(e, true));
};


export { Constants, Runner, App, Platform, Target, Common, Exec, FileUtils };


export default { run };
