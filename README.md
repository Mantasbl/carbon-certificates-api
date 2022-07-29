### Carbon Certificates application API

## Setup guide

Setup requires Docker

1. create .env file at the root of this project and populate it with values from .env.sample (normally values shouldn't be kept in sample file, but for ease of setup and demo purposes, they're there.)
2. run docker container build command `docker-compose build` and start it with `docker-compose up`
3. run migrations with `npm run typeorm -- migration:run`, currently migrations also contain seeder values, which, given more time, should be removed into separate factories/seeders, using something like faker-js

## Use guide

Once the docker container is running, assuming env has sample values, you should be able to access swagger docs at
`http://localhost:4005/api/docs/static/index.html#/`, this contains all of the endpoints available at given time.

## TODO (due to lack of spare time they got postponed to last weekend of July.)

1. Add /login endpoint for passport-jwt authentication, that generates jwt for use on GET@ /api/v1/certificates and PATCH@ /api/v1/certificates/{certificateId} endpoints, and limit access to only those certificates that belong to logged in user
2. Add unit tests using Jest