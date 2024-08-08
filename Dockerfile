FROM nginx:1.27.0-alpine

COPY dist/moki/browser /usr/share/nginx/html/moki

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache bash

EXPOSE 80

CMD /bin/bash -c "bash /opt/inject-env.sh /opt/nginx.template /etc/nginx/conf.d/nginx.conf && exec nginx -g 'daemon off;'"
