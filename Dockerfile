FROM nginx:1.27.0-alpine

COPY dist /usr/share/nginx/html/

# Copy template files ready for environment variable substitution
COPY nginx.conf.template /etc/nginx/templates/

CMD ["nginx-debug", "-g", "daemon off;"]
