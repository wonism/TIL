# Web App with Django
참고 : http://django-book.readthedocs.io/en/latest/index.html

## Environment
- OS : OSX
- Language : Python3 (version : 3.5.0)
- Framework : Django (version : 1.9.7)
- DB : MySQL

## Setup
__Install python 3__
```sh
# Install pyenv for environment management
$ brew update
$ brew install pyenv

# Add "pyenv virtualenv-init" to '.bash_profile'
$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile

# Install python 3.5.0
$ pyenv install 3.5.0

# Select python version
$ pyenv shell 3.5.0

# Check python version
$ pyenv -version

# Symlink python
$ brew link --overwrite python
```

__Install Django and mysql-python__
```sh
$ sudo pip install django
$ sudo pip install mysql-python
```

## Start Django Project
```sh
# Make Project
$ django-admin startproject django_study
$ cd django_study

# Start Server
$ python3 manage.py runserver

# If you change port, command this line.
$ python3 manage.py runserver 8080
```

