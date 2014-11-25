#!/bin/bash

ACCESS_TOKEN='d7eb8f18be29bcfa5e631924e85bbbbd9c4077e1';
DEVICE_ID='53ff6e065075535146431187';

curl -X GET -H "Authorization: Bearer $ACCESS_TOKEN" https://api.spark.io/v1/devices/$DEVICE_ID;