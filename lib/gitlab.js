const { GitLab } = require('@gitbeaker/node')

module.exports = {
  getClient: function (options) {
    const gitlab = new GitLab({
      headers: { 'user-agent': 'clearlydefined.io ' },
      token: options.token
    })
    return gitlab
  }
}