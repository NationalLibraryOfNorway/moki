FROM nginx:1.27.0-alpine

COPY dist/moki/browser /usr/share/nginx/html/moki

# Copy template files ready for environment variable substitution
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]
