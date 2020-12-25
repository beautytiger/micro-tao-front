FROM harbor.beautytiger.com/docker.io/nginx:centos
ADD dist /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/default.conf
