'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const ignoredEnv = require('./ignored.env')

module.exports = merge(prodEnv, ignoredEnv, {
  NODE_ENV: '"development"'
})
