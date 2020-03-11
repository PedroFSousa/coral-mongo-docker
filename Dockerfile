FROM mongo:3.6.4

LABEL maintainer="The INESC TEC Team <coral@lists.inesctec.pt>"
LABEL system="Coral"

# Add script to create roles for the agate and mica databases
COPY obiba_config.js /docker-entrypoint-initdb.d/obiba_config.js

RUN mkdir /data/users
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

# Run mongodb
CMD ["mongod"]
