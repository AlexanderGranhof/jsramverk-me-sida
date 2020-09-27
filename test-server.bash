docker-compose -f docker-compose-test.yml up -d server

sleep 10

docker-compose -f docker-compose-test.yml up test-server
docker-compose -f docker-compose-test.yml down
