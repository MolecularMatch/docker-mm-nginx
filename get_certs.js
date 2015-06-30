//Download the cert/key/password from our etcd server
var http = require('http')
var fs = require('fs')
var async = require('async')

async.series([
    function(callback) {
        http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/molecularmatch.com.key', function(response) {
            // Continuously update stream with data
            var body = ''
            response.on('data', function(d) {
                body += d
            })
            response.on('end', function() {
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body)
                fs.writeFile('/etc/nginx/molecularmatch.com.key', parsed.node.value, callback)
            })
        }).on('error', function(err) {
            callback(err)
        })
    },
    function(callback) {
        http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/molecularmatch.com.cert', function(response) {
            // Continuously update stream with data
            var body = ''
            response.on('data', function(d) {
                body += d
            })
            response.on('end', function() {
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body)
                fs.writeFile('/etc/nginx/molecularmatch.com.cert', parsed.node.value, callback)
            })
        }).on('error', function(err) {
            callback(err)
        })
    },
    function(callback) {
        http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/passwords', function(response) {
            // Continuously update stream with data
            var body = ''
            response.on('data', function(d) {
                body += d
            })
            response.on('end', function() {
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body)
                fs.writeFile('/etc/nginx/passwords', parsed.node.value, callback)
            })
        }).on('error', function(err) {
            callback(err)
        })
    }
], function(err) {
    if (err) console.log(err)
    process.exit()
})