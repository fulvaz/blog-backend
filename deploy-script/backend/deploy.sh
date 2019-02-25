BASEDIR=$(dirname "$0")

sh $BASEDIR/env.sh
docker-compose -f $BASEDIR/docker-compose.yml down
docker-compose -f $BASEDIR/docker-compose.yml pull
docker-compose -f $BASEDIR/docker-compose.yml up -d