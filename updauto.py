#!/usr/bin/env python3
import os
msg = input("Commit message : ")
os.system("git add 53fep 62ekf 64ide 65gjd autopush.py bashpull.sh index.html masterpage.html updauto.py pmaster.py reset.py style.css")
os.system("git commit -am \"{}\"".format(msg))
os.system("git push")
os.system("ssh helluy@minux \"cd clgtruch.github.io;git pull\"")