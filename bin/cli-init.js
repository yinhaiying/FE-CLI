#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const tplObj = require(`${__dirname}/../template`);


program
  .usage(`<template-name> [project-name]`)

  program.parse(process.argv);

//当没有输入参数的时候，给个提示
if(program.args.length < 1){
    return program.help();
}

//好比vue init webpack project-name的命令一样，第一个参数是webpack,第二个参数是project-name

// 注意：program.args中的第一个参数是指令后携带的参数和progress.argv是命令行输入的第一个单词是不一样的。

let templateName = program.args[0];
let projectName = program.args[1];

if(!tplObj[templateName]){
    console.log(chalk.red('\n Template does not exit! \n'));
    return ;
}

if(!projectName){
    console.log(chalk.red('\n Project should not be empty! \n'));
    return ;
}


let url = tplObj[templateName];
console.log(chalk.white('\n Start generating... \n'));

//出现加载图标
const spinner = ora('Downloading...');
spinner.start();

//执行下载方法并传入参数
download(
    url,
    projectName,
    error => {
        if(error){
            spinner.fail();
            console.log(chalk.red(`Generation failed. ${error}`));
            return ;
        }
        //结束加载图标
        spinner.succeed();
        console.log(chalk.green('\n Generation completed!'));
        console.log(`\n To get started`);
        console.log(`\n  cd ${projectName} \n`)
    }
)
