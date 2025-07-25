import json

from odoo import http
from odoo.http import request


class mainController(http.Controller):

    @http.route(['/hello'], type="http", auth="public", website=True, method=['GET'],
                csrf=False)
    def example(self):
        return "Hello World!"
