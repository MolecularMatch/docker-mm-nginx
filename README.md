# docker-mm-nginx
Nginx server for the mm project

Run with:
docker run -p 443:443 -e ETCD_HOST=localhost -e ETCD_PORT=4001 rsmith/docker-mm-nginx