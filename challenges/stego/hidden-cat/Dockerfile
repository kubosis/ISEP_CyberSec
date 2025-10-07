FROM debian:12-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/challenge

COPY . /opt/challenge/

# Másoljuk közvetlenül az Nginx webrootba
RUN cp -r /opt/challenge/* /var/www/html/

CMD ["nginx", "-g", "daemon off;"]
