FROM nginx:1.27.0-alpine

ARG HTTP_PROXY
ARG HTTPS_PROXY

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

COPY dist/moki/browser /usr/share/nginx/html/moki
COPY nginx /opt
RUN rm /etc/nginx/conf.d/default.conf

RUN apk add --no-cache bash

EXPOSE 80

CMD /bin/bash -c "bash /opt/inject-env.sh /opt/nginx.template /etc/nginx/conf.d/nginx.conf && exec nginx -g 'daemon off;'"
