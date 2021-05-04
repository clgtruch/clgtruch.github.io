#!/usr/bin/env python3
import cherrypy
import os 
import sys 
import time
import json

CODE = "1106"

os.chdir(sys.path[0])
def content(filename, **args):
    with open(filename, "r") as file:
        cont = file.read()
    for item in args:
        cont = cont.replace(f"<?{item}>", args[item])
    return cont

def redirect(url):
    return "<script>location.href=\"{}\"</script>".format(url)

class Main:
    def __init__(self):
        self.app = App()
        self.app.exposed = True
    @cherrypy.expose
    def index(self):
        return ""
    @cherrypy.expose
    def consulter(self,code=None,file=None):
        print(code)
        if code != CODE:
            return "<form action='consulter' method='POST'><label for='code'>Code secret : </label><input name='code' type='text' id='code'/></form>"
        elif file is None:
            return "<ul><li>" + "</li><li>".join(["<a href='consulter?code="+code+"&file=" + f + "' download>" + f + "</a>" for f in os.listdir("results")]) + "</li></ul>"
        else:
            cherrypy.response.headers["Content-Type"] = "text/csv"
            cherrypy.response.headers["Content-Disposition"] = 'attachment; filename="{}"'.format(file)
            return content("results/{}".format(file))


@cherrypy.expose
class App:
    def POST(self,data):
        data = json.loads(data)
        if "{}.csv".format(data["exId"]) not in os.listdir("results"):
            csv_header = "Nom;Jour;Heure;Temps;Score total"
            for q in data["results"]:
                csv_header += ";Score Q{0};Reponse Q{0}".format(q["q_nb"])
            with open("results/{}.csv".format(data["exId"]),"w") as fichier:
                fichier.write(csv_header+"\n")

        csv_datas = "{};{};{};{};{}".format(data["nom"],time.strftime("%d.%m.%Y"), time.strftime("%H:%M"),data["temps"],data["score"])
        for q in data["results"]:
            csv_datas += ";\"{}\";\"{}\"".format(q["correct"],q["resp"])
        with open("results/{}.csv".format(data["exId"]),"a") as fichier:
            fichier.write(csv_datas+"\n")
        return "ok"

            
        

config = {
    "/": {
        "tools.sessions.on": True
    },
    "/app": {
        "request.dispatch": cherrypy.dispatch.MethodDispatcher(),
        'tools.response_headers.on': True,
        'tools.response_headers.headers': [('Access-Control-Allow-Origin', "https://clgtruch.github.io"), ("Vary", "Origin")]
        #'tools.response_headers.headers': [('Access-Control-Allow-Origin', "null"), ("Vary", "Origin")]
    }
}

if "https" in os.listdir(sys.path[0]):
    cherrypy.server.ssl_module = 'builtin'
    cherrypy.server.ssl_certificate = "cert.pem"
    cherrypy.server.ssl_private_key = "privkey.pem"

cherrypy.config.update({
    'server.socket_host': '0.0.0.0',
    'server.socket_port': 6710
})
cherrypy.quickstart(Main(),"/",config)
