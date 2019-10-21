#!/usr/bin/env node

const program = require('commander');


// 定义当前版本
// 定义使用方法
// 定义四个指令
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('add', 'add a new template')
  .command('delete', 'delete a template')
  .command('list', 'list all the templates')
  .command('init', 'generate a new project from a template')
  
// console.log(process.argv)  process.argv可以获取我们在命令行中输入的所有参数，包括node
// 解析命令行参数
program.parse(process.argv)
