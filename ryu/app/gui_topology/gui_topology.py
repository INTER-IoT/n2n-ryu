# -*- coding: utf-8 -*-
#  Copyright 2016-2018 Universitat Politècnica de València
#  Copyright 2016-2018 Università della Calabria
#  Copyright 2016-2018 Prodevelop, SL
#  Copyright 2016-2018 Technische Universiteit Eindhoven
#  Copyright 2016-2018 Fundación de la Comunidad Valenciana para la 
#  Investigación, Promoción y Estudios Comerciales de Valenciaport
#  Copyright 2016-2018 Rinicom Ltd
#  Copyright 2016-2018 Association pour le développement de la formation 
#  professionnelle dans le transport
#  Copyright 2016-2018 Noatum Ports Valenciana, S.A.U.
#  Copyright 2016-2018 XLAB razvoj programske opreme in svetovanje d.o.o.
#  Copyright 2016-2018 Systems Research Institute Polish Academy of Sciences
#  Copyright 2016-2018 Azienda Sanitaria Locale TO5
#  Copyright 2016-2018 Alessandro Bassi Consulting SARL
#  Copyright 2016-2018 Neways Technologies B.V.
#  
#  See the NOTICE file distributed with this work for additional information
#  regarding copyright ownership.
#  
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#  
#      http://www.apache.org/licenses/LICENSE-2.0
#  
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
"""
Usage example

1. Join switches (use your favorite method):
$ sudo mn --controller remote --topo tree,depth=3

2. Run this application:
$ PYTHONPATH=. ./bin/ryu run \
    --observe-links ryu/app/gui_topology/gui_topology.py

3. Access http://<ip address of ryu host>:8080 with your web browser.
"""

import os
import logging

from webob.static import DirectoryApp

from ryu.app.wsgi import ControllerBase, WSGIApplication, route
from ryu.base import app_manager


PATH = os.path.dirname(__file__)
LOG = logging.getLogger('ryu.app.gui_topology.gui_topology')

app_manager.require_app('ryu.app.rest_topology')
app_manager.require_app('ryu.app.ws_topology')
app_manager.require_app('ryu.app.ofctl_rest')

# Serving static files
class GUIServerApp(app_manager.RyuApp):
    _CONTEXTS = {
        'wsgi': WSGIApplication,
    }

    def __init__(self, *args, **kwargs):
        super(GUIServerApp, self).__init__(*args, **kwargs)

        wsgi = kwargs['wsgi']
        wsgi.register(GUIServerController)


class GUIServerController(ControllerBase):
    def __init__(self, req, link, data, **config):
        super(GUIServerController, self).__init__(req, link, data, **config)
        path = "%s/html/" % PATH
        self.static_app = DirectoryApp(path)

    @route('topology', '/{filename:.*(html|css|js|svg|png)$}')
    def static_handler(self, req, **kwargs):
        if kwargs['filename']:
            req.path_info = kwargs['filename']
        return self.static_app(req)



