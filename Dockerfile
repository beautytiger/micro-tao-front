FROM docker.io/konmyn/microservice:centos-nginx
ADD dist /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/default.conf
