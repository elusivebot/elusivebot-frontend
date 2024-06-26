FROM nginx:stable
LABEL version="0.1.0" description="ElusiveBot frontend web service" maintainer="bryan@degrendel.com"

COPY out /usr/share/nginx/html
