# --- Phase 1: Build (builder) ---
FROM docker.io/library/ruby:3.4.11-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libcurl4-gnutls-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile* ./
RUN bundle install

COPY . .

RUN bundle exec jekyll build

RUN bundle exec rake test_html


# --- Phase 2: Runtime ---
FROM docker.io/library/debian:trixie-slim AS deploy

RUN apt-get update && apt-get install -y --no-install-recommends \
    lighttpd \
    media-types \
    && rm -rf /var/lib/apt/lists/*

RUN sed -i 's/server.port                 = 80/server.port                 = 8000/' /etc/lighttpd/lighttpd.conf && \
    sed -i '/server.pid-file/d' /etc/lighttpd/lighttpd.conf && \
    sed -i 's|server.errorlog             = "/var/log/lighttpd/error.log"|server.errorlog             = "/dev/stderr"|' /etc/lighttpd/lighttpd.conf

RUN rm -rf /var/www/html/*

COPY --from=builder /app/_site /var/www/html

RUN chown -R www-data:www-data /var/www/html

EXPOSE 8000

USER www-data

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
