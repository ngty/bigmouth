BM_ROOT=$(shell pwd)
PATH := $(BM_ROOT)/node_modules/.bin:$(PATH)

all: setup

setup:
	npm install

run: setup
	forever -w server.js

start: setup
	forever start -l $(BM_ROOT)/log/log \
		-o $(BM_ROOT)/log/out -e $(BM_ROOT)/log/err server.js

stop: setup
	forever stop server.js

restart: stop start

