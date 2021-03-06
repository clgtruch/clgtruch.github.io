#!/usr/bin/env python3
import os
import sys
import time
import locale
locale.setlocale(locale.LC_TIME,'')
temps = time.localtime()
classe = sys.argv[1]
day = time.strftime("%d", temps)
month = time.strftime("%m", temps)
smj = time.strftime("%A", temps).lower()
date = day + month
frmdate = smj + " " + day + "/" + month

if classe == "62":
    os.chdir("62ekf")
elif classe == "64":
    os.chdir("64ide")
elif classe == "65":
    os.chdir("65gjd")
elif classe == "53":
    os.chdir("53fep")

with open("{}.html".format(classe),"r") as fichier:
    cont = fichier.read()

if "<h2>{}</h2>".format(frmdate) not in cont:
    cont = cont.replace("<!--UPLOAD-->","").replace("<!--FIN-->","")
    cont = cont.replace("<!--ADD-->","<!--ADD-->\n<h2>{}</h2>\n<ul>\n<!--UPLOAD-->\n</ul>\n<!--FIN-->".format(frmdate)) 

fics = os.listdir(date)

for fic in os.listdir(date):
    if "{}/{}".format(date,fic) not in cont and fic[0] != ".":
        cont = cont.replace("<!--UPLOAD-->","<li><a href=\"{0}/{1}\" download>{1}</a></li>\n<!--UPLOAD-->".format(date,fic))

with open("{}.html".format(classe),"w") as fichier:
    fichier.write(cont)

os.system("git add {}.html".format(classe))
os.system("git add {}".format(date))
os.system("git commit -am \"Updt {} {} {}\"".format(classe,date,len(fics)))
os.system("../bashpull.sh")
print("OK")