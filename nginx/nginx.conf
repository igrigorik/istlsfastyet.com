 http {

  # usual config stuff...

  server {
    listen 173.230.151.99:80;
    server_name istlsfastyet.com www.istlsfastyet.com;

    # redirect to naked domain avoiding http://www -> https://www -> https:// chain.
    rewrite ^ https://istlsfastyet.com$request_uri? permanent;
  }

  ssl_session_cache shared:SSL:10m;  # 10MB -> ~40,000 sessions.
  ssl_session_timeout 24h;           # 24 hours
  ssl_buffer_size 1400;              # 1400 bytes to fit in one MTU

  server {
    listen 173.230.151.99:443 ssl spdy;
    server_name www.istlsfastyet.com;

    rewrite ^ https://istlsfastyet.com$request_uri? permanent;

    include includes/ssl.conf;
  }

  server {
    listen 173.230.151.99:443 ssl spdy;
    server_name istlsfastyet.com;

    # Path for static files
    root /home/istlsfastyet/public;
    charset utf-8;

    include includes/ssl.conf;
    include includes/cache.conf;
  }

}
