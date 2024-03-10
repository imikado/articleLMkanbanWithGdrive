FROM php:8.2.16-apache-bookworm
RUN apt update -y && apt install -y wget unzip
RUN wget -O composer-setup.php https://getcomposer.org/installer
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN useradd mika -s /bin/bash
RUN a2enmod headers