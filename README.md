# BIGMOUTH

Bigmouth wants to be ur local loudspeaker

## Installing

    $ git clone https://github.com/ngty/bigmouth
    $ cd bigmouth
    $ make setup

Most likely the setup won't be successful the 1st time. Just fix
whatever problem u come across & rerun the setup.

## Running

In the foreground:

    $ make run

Alternatively, in the background:

    $ make start

By default, bigmouth listens to port `3456` & its private
instance of festival listens to `3457`, u can tweak these in
`config.json`.

Unsurprisingly, to stop:

    $ make stop

## Pinging It

With the default voice:

    $ curl -X PUT http://127.0.0.1:3456/ping

With ur favourite voice (eg. `a`):

    $ curl -X PUT http://127.0.0.1:3456/a/ping

### Using It

With the default voice:

    $ curl -X PUT http://127.0.0.1:3456/speak \
    >   -dtext="once upon a time"

With ur favourite voice (eg. `a`):

    $ curl -X PUT http://127.0.0.1:3456/a/speak \
    >   -dtext="once upon a time"

### Gotchas

For alsa users, u may encounter the following error:

    > Linux: can't open /dev/dsp

To fix the problem, just add the following to `~/.festivalrc`:

    (Parameter.set 'Audio_Method 'Audio_Command)
    (Parameter.set 'Audio_Command "aplay -q -c 1 -t raw -f s16 -r $SR $FILE")')

Ref: [archlinux festival wiki](
https://wiki.archlinux.org/index.php/Festival#Can.27t_open_.2Fdev.2Fdsp)

### Copyright

See LICENSE for details.

