# Base Webapp

Hello! This is a WIP skeleton to quickly code up a webapp. The FE is React with TypeScript. The backend is Django python with a simple sqlite3 database.

As time goes on, there'll be links to projects that use this, I think.

Currently:
* [One Fire at a Time](https://github.com/ksiondag/one_fire_at_a_time)

Actually, right now this is just a copy of One Fire at a Time, but it'll be mutated into a simple example of all things worthy of an example, hopefully.

## System Setup Info

My setup is:

* Windows Subsystem for Linux (WSL) Ubuntu 16.04
* Python 3.6.10 (built from tar.xz file provided on [python.org](https://www.python.org/downloads/release/python-3610/))

There was some silliness in building python. I first `sudo apt install python3` to install various python dependencies, and then I did the following:

```bash
sudo apt install libsqlite3-dev
sudo apt install libreadline-dev
sudo apt install libcurses-dev
sudo apt install libncurses-dev
sudo apt install libgdbm-dev
sudo apt install lzma-dev
sudo apt install bz2-dev
sudo apt install liblzma-dev
```

There's a better way to install python dependencies that apt installing python3, but that's what I did. Also, some of these libraries aren't strictly necessary.

After these commands though, I was able to make and install python via the tar file's instructions.

From there I installed pip via [thier installation instructions](https://pip.pypa.io/en/stable/installing/).

## Setup

Clone the repo into project directory. Delete the .git directory and init a new git directory. Do initial commit.

I recommend doing this in a virtualenv:

```bash
pip install virtualenv
mkdir && cd ~/env
virtualenv base
source ~/env/base/bin/activate
cd ~/base_webapp
pip install -r requirements.txt
```

That installs all the python stuff. Now setup database stuff:

```bash
python manage.py makemigrations
python manage.py migrate
```

Now, the example site should work:

```bash
python manage.py runserver
```

Now go to [localhost:8000/example](http://localhost:8000/example/).

You'll want to create a superuser, and just assume they're logged in at first until you create a login flow.

```bash
python manage.py createsuperuser --name example --email name@example.com
```

Also, tests:

```bash
python manage.py test
```

## Cheatsheet

## Useful Django Documentation

## TODOs

Ideally, this example setup would be an end-to-end example, so:

So there should be examples of:

* django models
* REST API
* FE that calls to the backend
* django custom middleware?
* django unit tests
* user registration flows (right now have to make users manual from commandline)
* user login flows

There should also be instructions on:
* How to create a new app and plug the app in
* How to migrate from sqlite3 to postgres (when scaling becomes necessary)
* How to setup migrations (right now I'm just deleting the first one and starting from scratch with each change)

Quality of life stuff:
* django shell should use iPython
* tab completetion for manage.py commands
* bash script that does all the setup stuff?