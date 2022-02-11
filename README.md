# rtcstats-server

The rtcstats-server represents the server side component of the rtcstats ecosystem, the client side being
https://github.com/jitsi/rtcstats which collects and sends WebRTC related statistics.

## Requirements

- node v12 or above
- npm v6 or above

## Architecture

Comming soon...

## How to use
### Run
```
$ npm install
$ npm run start
```
### Configure
The server is configured using the node [config](https://github.com/jitsi/rtcstats-server/blob/master/config/) module thus it will use one of the available config yaml files
found under the ./config directory in accordance to the NODE_ENV (debug|production) environment variable.

Default values can be seen here [default](https://github.com/jitsi/rtcstats-server/blob/master/config/default.yaml).

There are also some additional env variables that can be set in order do overwrite config options from
the command line, these can be found here [custom-env-var](https://github.com/jitsi/rtcstats-server/blob/master/config/custom-environment-variables.yaml)

### Prometheus stats

- rtcstats_websocket_connections
  - help: 'number of open websocket connections'
  - type: Gauge

- rtcstats_websocket_connection_error
  - help: 'number of open websocket connections that failed with an error',
  - type: Counter

- rtcstats_queued_dumps
  - help: 'Number of rtcstats dumps queued up for future processing'
  - type: Counter

- rtcstats_queue_size
  - help: 'Number of dumps currently queued for processing'
  - type: Gauge

- rtcstats_disk_queue_size
  - help: 'Size occupied on disk by queued dumps'
  - type: Gauge

- rtcstats_files_processed
  - help: 'number of files processed',
  - type: Counter

- rtcstats_files_errored
  - help: 'number of files with errors during processing'
  - type: Counter

- rtcstats_processing_time
  - help: 'Processing time for a request',
  - maxAgeSeconds: 600,
  - ageBuckets: 5,
  - percentiles: [ 0.1, 0.25, 0.5, 0.75, 0.9 ],
  - type: Summary

- rtcstats_dump_size
  - help: 'Size of processed rtcstats dumps',
  - maxAgeSeconds: 600,
  - ageBuckets: 5,
  - percentiles: [ 0.1, 0.25, 0.5, 0.75, 0.9 ],
  - type: Summary

## Deploying

### Prerequisites

Have access to the Amazon ECR repository:
- for prod: 103425057857.dkr.ecr.us-west-2.amazonaws.com/jitsi-vo/rtcstats-server
- for pilot: 103425057857.dkr.ecr.us-west-2.amazonaws.com/pilot/rtcstats-server
Have acces to https://jenkins.jitsi.net to run the job that updates the k8s cluster
Optionally have setup kubectl for monitoring and debugging of problems

### Build docker image and push it

```sh
npm install
RTCSTATS_REPOSITORY=103425057857.dkr.ecr.us-west-2.amazonaws.com/jitsi-vo/rtcstats-server ./scripts/deploy.sh true
```

This will build the client, create a docker image and push it to repository. It is a good practice to also create a release on Github.

### Run the jenkins job

https://jenkins.jitsi.net/job/helm-deploy-pilot/

You can monitor the pods with

```sh
kubectl get pods | grep rtcstats
```

And check the logs for errors with

```sh
kubectl logs -f -l app.kubernetes.io/name=rtcstats-server --max-log-requests 15
```

#### Pilot

Parameters:
 * CHART_NAME - rtcstats-server
 * DEPLOY_TAG - The app version (e.g. rtcstats-server-2.8.5)
 * KUBE_CLUSTER - pilot-blue

#### Production (meet.jit.si)

Parameters:
 * CHART_NAME - rtcstats-server
 * DEPLOY_TAG - The app version (e.g. rtcstats-server-2.8.5)
 * KUBE_CLUSTER - prod-blue
 * HELM_OVERRIDES - rtcstats-server-prod.yaml

#### Production (8x8)

Parameters:
 * CHART_NAME - rtcstats-server-8x8
 * DEPLOY_TAG - The app version (e.g. rtcstats-server-2.8.5)
 * KUBE_CLUSTER - prod-blue
 * HELM_OVERRIDES - rtcstats-server-prod-8x8.yaml

To check the version deployed run

```sh
kubectl describe pod rtcstats-server
```

## Authors and acknowledgment
The project is a fork of https://github.com/fippo/rtcstats-server thus proper thanks are in order for the original
contributors.
