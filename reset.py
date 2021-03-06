#!/usr/bin/env python3
import os
import sys
import re

classe = sys.argv[1]

if classe == "62":
    os.chdir("62ekf")

with open("{}.html".format(classe),"r") as fichier:
    cont = fichier.read()

cont = re.sub(r"<!--ADD-->[\W,\w]*<!--FIN-->","<!--ADD-->",cont)
print(cont)

with open("{}.html".format(classe),"w") as fichier:
    fichier.write(cont)

os.system("git add {}.html".format(classe))
os.system("git commit -am \"Reset {}\"".format(classe))
os.system("../bashpull.sh")