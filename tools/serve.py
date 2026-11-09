# -*- coding: utf-8 -*-
"""Serveur de développement : renvoie toujours la version fraîche des fichiers.

Pendant qu'on itère sur le CSS/JS, le cache du navigateur fait passer des
versions périmées et les vérifications deviennent fausses. Le cache de
Python suffit ensuite à la production.
"""

import functools
import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    handler = functools.partial(Handler, directory=ROOT)
    with socketserver.TCPServer(("127.0.0.1", PORT), handler) as httpd:
        print("serving %s on http://localhost:%d" % (ROOT, PORT), flush=True)
        httpd.serve_forever()
