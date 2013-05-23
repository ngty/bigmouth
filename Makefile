BM_ROOT=$(shell pwd)
PATH := $(BM_ROOT)/node_modules/.bin:$(PATH)


all: setup

run:
	forever server.js

start: setup
	forever start -l $(BM_ROOT)/log/log \
		-o $(BM_ROOT)/log/out -e $(BM_ROOT)/log/err server.js

stop: setup
	forever stop server.js

restart: stop start


setup: setup/festival setup/voices
	npm install

setup/festival:
	if [ -n "$(shell type festival | grep 'not found')" ]; then \
		echo "ERROR: Missing `festival`, pls install it !!"; \
		exit 1; \
	fi

setup/voices:
	mkdir -p tmp
	for href in $(shell cat VOICES.hrefs); do \
		[ -f  tmp/`basename $$href` ] || \
			wget $$href -O tmp/`basename $$href`; \
	done

