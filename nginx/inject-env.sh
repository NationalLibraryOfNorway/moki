#!/usr/bin/env bash

NGINX_TEMPLATE_FILE=$1
NGINX_OUTPUT_FILE=$2

if [[ ! -f ${NGINX_TEMPLATE_FILE} ]]
then
  echo "ERROR: Parameter 1 nginx.conf file ('$NGINX_TEMPLATE_FILE') does not exist."
  exit 1
fi


sed -e s~%API_HOST_URL%~"${API_HOST_URL}"~g \
"${NGINX_TEMPLATE_FILE}" > "${NGINX_OUTPUT_FILE}"
