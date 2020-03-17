#!/usr/bin/env python3
import os

def multisplit(chaine,*args):
    nwchn = [chaine]
    for arg in args:
        part1 = nwchn[len(nwchn)-1].split(arg)[0]
        part2 = nwchn[len(nwchn)-1].split(arg)[1]
        del nwchn[len(nwchn)-1]
        nwchn.append(part1)
        nwchn.append(part2)
    return nwchn

clascode = {
    "62":"62ekf",
    "64":"64ide",
    "65":"65gjd",
    "53":"53fep",
}

with open("masterpage.html","r") as fichier:
    mascont = fichier.read()

clascont = {}

for classe in clascode:
    with open("{}/{}.html".format(clascode[classe],classe),"r") as fichier:
        clascont[classe] = fichier.read()
    clascont[classe] = multisplit(clascont[classe],"<title>","</title>","<h1>","</h1>","<!--ADD-->","<!--VFIN-->")
    clascont[classe] = ["<title>"+clascont[classe][1]+"</title>","<h1>"+clascont[classe][3]+"</h1>","<!--ADD-->"+clascont[classe][5]+"<!--VFIN-->"]
    clascont[classe] = mascont.replace("<title>TITRE</title>",clascont[classe][0]).replace("<h1>TITRE</h1>",clascont[classe][1])\
        .replace("<!--CONTENT-->",clascont[classe][2])
    with open("{}/{}.html".format(clascode[classe],classe),"w") as fichier:
        fichier.write(clascont[classe])


with open("masterpage.html","r") as fichier:
    mascont = fichier.read()

os.system("git add masterpage.html 53fep 64ide 62ekf 65gjd;git commit -am \"update masterpage\";git push")

os.system("ssh helluy@minux \"cd clgtruch.github.io;git pull\"")