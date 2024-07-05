FROM nginx:1.27.0-alpine

COPY dist/moki/browser /usr/share/nginx/html/moki

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]
