cd /usr/bin

npm install

#Pull down certs from etcd server and write them to /etc/nginx/
nodejs get_certs.js

#Run nginx
nginx -g "daemon off;"