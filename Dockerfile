FROM docker.io/nginx:1.15.12
ADD dist /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/default.conf
