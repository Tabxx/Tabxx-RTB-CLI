const path = require('path')
const fs = require('fs')
const node_ssh = require('node-ssh')
const ssh = new node_ssh()
const zipdir = require('zip-dir')
const config = require('../config/deploy.ts')

class deploy {
  constructor() {
    this.config = Object.assign(
      {
        distPath: 'html',
        zipName: 'release',
      },
      config
    )
    this.config = Object.assign(this.config, {
      distFilePath: path.join(__dirname, '../', this.config.distPath),
      zipFilePath: path.join(__dirname, `../${this.config.zipName || 'release'}.zip`),
    })
    this.compressedFile()
  }
  /**
   * 压缩资源文件
   */
  compressedFile() {
    zipdir(
      this.config.distFilePath,
      {
        saveTo: this.config.zipFilePath,
      },
      (err) => {
        if (!err) {
          console.log('资源文件压缩成功！')
          this.uploadFile()
        } else {
          console.log('资源文件压缩失败！')
          process.exit(1)
        }
      }
    )
  }

  /**
   * 上传文件到服务器
   */
  uploadFile() {
    ssh
      .connect({
        host: this.config.host,
        port: this.config.post,
        username: this.config.username,
        password: this.config.password,
      })
      .then(() => {
        ssh.putFile(this.config.zipFilePath, `${this.config.webDir}/${this.config.zipName}.zip`).then(
          () => {
            console.log('文件上传成功！')
            this.statrRemoteShell()
          },
          (error) => {
            console.log('文件上传失败')
            console.log(error)
            process.exit(0)
          }
        )
      })
      .catch((err) => {
        console.log(err, 'catch error')
      })
  }

  // 开始执行远程命令
  statrRemoteShell() {
    const webDir = this.config.webDir
    const commands = [`cd ${webDir}`, `unzip -o ${this.config.zipName}.zip && rm -f ${this.config.zipName}.zip`]
    const promises = []
    for (let i = 0; i < commands.length; i += 1) {
      promises.push(this.runCommand(commands[i], webDir))
    }
    Promise.all(promises)
      .then(() => {
        console.log('远程解压成功！')
        this.deleteLocalZip()
      })
      .catch((err) => {
        console.log('远程解压失败', err)
        process.exit(0)
      })
  }

  // 执行Linux命令
  runCommand(command, webDir) {
    return new Promise((resolve, reject) => {
      ssh
        .execCommand(command, {
          cwd: webDir,
        })
        .then((result) => {
          resolve()
          if (result.stderr) {
            process.exit(1)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 删除本地压缩包
  deleteLocalZip() {
    fs.unlink(this.config.zipFilePath, (err) => {
      if (err) {
        console.log('本地release.zip删除失败', err)
      }
      console.log('本地release.zip删除成功')
      process.exit(0)
    })
  }
}

new deploy()
