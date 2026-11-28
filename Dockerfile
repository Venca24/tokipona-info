FROM docker.io/library/ruby:3.4.13-slim AS jekyll-builder

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


FROM docker.io/library/debian:trixie-slim AS lighttpd-builder

RUN apt-get update && apt-get download \
    lighttpd \
    libpcre2-8-0 \
    libnettle8t64

RUN mkdir -p /rootfs && \
    for deb in *.deb; do dpkg-deb -x "$deb" /rootfs; done

RUN rm -rf /rootfs/usr/share/doc \
           /rootfs/usr/share/man \
           /rootfs/usr/share/info \
           /rootfs/usr/share/lintian \
           /rootfs/etc/init.d \
           /rootfs/etc/lighttpd/conf-available \
           /rootfs/etc/lighttpd/conf-enabled \
           /rootfs/var/log \
           /rootfs/var/cache \
           /rootfs/var/www/html/*


FROM gcr.io/distroless/cc-debian13

LABEL org.opencontainers.image.title="tokipona.info" \
      org.opencontainers.image.description="Toki Pona in 72 illustrated lessons as a static website" \
      org.opencontainers.image.authors="Václav Zouzalík <Vaclav.Zouzalik@seznam.cz>" \
      org.opencontainers.image.source="https://github.com/Venca24/tokipona-info" \
      org.opencontainers.image.licenses="MIT"

COPY --from=lighttpd-builder /rootfs /

COPY ./container/lighttpd.conf /etc/lighttpd/lighttpd.conf

COPY --from=jekyll-builder --chown=65532:65532 /app/_site /var/www/html

USER nonroot
EXPOSE 8000

ENTRYPOINT ["/usr/sbin/lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
