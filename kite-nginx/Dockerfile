FROM nginx:1.15.5

RUN rm /etc/nginx/conf.d/default.conf

COPY ./dist /etc/nginx/html/
COPY ./kite-proxy.conf /etc/nginx/conf.d/kite-proxy.conf
COPY ./localhost.cert /etc/nginx/cert.crt
COPY ./localhost.key /etc/nginx/key.key