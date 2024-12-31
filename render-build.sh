#!/usr/bin/env bash

# Mettre à jour les dépôts
apt-get update -y

# Installer Tesseract et ses dépendances
apt-get install -y tesseract-ocr

# Installer des fichiers linguistiques supplémentaires si nécessaire (par ex., français)
apt-get install -y tesseract-ocr-fra
