#!/usr/bin/env node
const program = require('commander');

//用于命令行交互
const inquirer = require('inquirer');

//修改命令行样式
const chalk = require('chalk');

const fs = require('fs');

const tplObj = require(`${__dirname}/../template`);

// 自定义交互式命令行的问题及简单的校验
let question = [
    {
      name: "name",
      type: 'input',
      message: "请输入要删除的模板名称",
      validate (val) {
        if (val === '') {
          return 'Name is required!'
        } else if (!tplObj[val]) {
          return 'Template does not exist!'
        } else {
          return true
        }
      }
    }
  ];

  inquirer
  .prompt(question).then(answers => {
    // answers 就是用户输入的内容，是个对象
    let { name, url } = answers;
    // 过滤 unicode 字符
    delete tplObj[name];
    // 把模板信息写入 template.json 文件中
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if (err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Deleted successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
    })
  });
  
