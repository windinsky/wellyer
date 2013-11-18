#!/bin/bash
nohup node ../source/server.js 3000 >> 3000.log &
nohup node ../source/server.js 3001 >> 3001.log &
nohup node ../source/server.js 3002 >> 3002.log &
