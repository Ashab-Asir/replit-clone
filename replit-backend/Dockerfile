FROM ubuntu:20.04

RUN useradd -ms /bin/bash replit

WORKDIR /home/replit

RUN apt update && apt upgrade -y

RUN apt install nano curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt-get intall -y nodejs

RUN echo "PS1='\w '" >> /home/replit/bashrc

WORKDIR /home/replit/app