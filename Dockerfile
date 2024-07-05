FROM nginx:1.27.0-alpine

COPY dist /usr/share/nginx/html

# Copy template files ready for environment variable substitution
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
#EXPOSE 80 443 6006 4200

CMD ["nginx-debug", "-g", "daemon off;"]
