BASEDIR=$(dirname "$0")

docker-compose -f $BASEDIR/docker-compose.yml down
docker-compose -f $BASEDIR/docker-compose.yml pull
docker-compose -f $BASEDIR/docker-compose.yml up -d