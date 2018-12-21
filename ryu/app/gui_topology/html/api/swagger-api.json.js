{
    "swagger": "2.0",
    "info": {
        "description": "Network Controller API",
        "version": "1.0.0",
        "title": "Inter-IoT_network"
    },
    "basePath": "/",
    "host": "192.168.1.8:8080",
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json",
        "application/x-www-form-urlencoded"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/stats/switches": {
            "get": {
                "tags": [
                    "Switches"
                ],
                "summary": "List Switches",
                "description": "Retrieve the list of all switches within the virtual network.",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Switches ID list"
                    }
                }
            }
        },
        "/stats/desc/{id}": {
            "get": {
                "tags": [
                    "Switch Basic Info"
                ],
                "summary": "Switch Basic Description",
                "description": "Retrieve basic information of the sought switch.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Switch Info"
                    },
                    "400": {
                        "description": "Invalid ID"
                    }
                }
            }
        },
        "/stats/flow/{id}": {
            "get": {
                "tags": [
                    "Flow Information"
                ],
                "summary": "Flow information",
                "description": "Retrieve info about a specific flow in the switch.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Flow information"
                    }
                }
            }
        },
        "/stats/table/{id}": {
            "get": {
                "tags": [
                    "Table Information"
                ],
                "summary": "Table information",
                "description": "Retrieve info about a specific table in the switch.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Table information"
                    }
                }
            }
        },
        "/stats/table/features/{id}": {
            "get": {
                "tags": [
                    "Table Features Information"
                ],
                "summary": "Table features information",
                "description": "Retrieve info about features of a specific table in the switch.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Table features information"
                    }
                }
            }
        },
        "/stats/port/{id}": {
            "get": {
                "tags": [
                    "Information of all ports"
                ],
                "summary": "Port information",
                "description": "Retrieve info about a specific port in a switch.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Port information"
                    }
                }
            }
        },
        "/stats/port/{id}/{port}": {
            "get": {
                "tags": [
                    "Information of a port"
                ],
                "summary": "Port information",
                "description": "Retrieve info about a specific port in a switch.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "port",
                        "in": "path",
                        "description": "Port ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "All Ports information"
                    }
                }
            }
        },
        "/stats/flow": {
            "post": {
                "tags": [
                    "Add Flow Entry"
                ],
                "summary": "Addition of a new flow entry",
                "description": "",
                "parameters": [
                    {
                        "name": "flowentry",
                        "in": "body",
                        "description": "Flow entry description",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/flowentry"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            }
        },
        "/stats/flow": {
            "put": {
                "tags": [
                    "Modify Flow Entry"
                ],
                "summary": "Modify flow entry in a switch",
                "description": "",
                "parameters": [
                    {
                        "name": "flowentry",
                        "in": "body",
                        "description": "Flow entry description",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/flowentry"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            }
        },
        "/stats/flow": {
            "delete": {
                "tags": [
                    "Delete Flow Entry"
                ],
                "description": "Delete flow entry in a switch",
                "parameters":[
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "flow_id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            }
        },
        "/stats/port/desc": {
            "put": {
                "tags": [
                    "Modify Port Description"
                ],
                "summary": "Modify port description",
                "description": "",
                "parameters": [
                    {
                        "name": "portdesc",
                        "in": "body",
                        "description": "Port description",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/portdesc"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            }
        },
        "/stats/role": {
            "post": {
                "tags": [
                    "Role Creation"
                ],
                "summary": "Set a role",
                "description": "",
                "parameters": [
                    {
                        "name": "role",
                        "in": "formData",
                        "description": "Role",
                        "required": false,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            }
        },
        "/qos/queue/status/{id}": {
            "get": {
                "tags": [
                    "Queue Status"
                ],
                "summary": "Get status of the queue",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Queue status of the switch",
                        "schema": {
                            "type": "object",
                            "items": {
                                "$ref": "#/definitions/queue"
                            }
                        }
                    }
                }
            }
        },
        "/qos/queue/{id}": {
            "get": {
                "tags": [
                    "Queue Description"
                ],
                "summary": "Retrieve the queue configuration",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Queue description",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Queue description of the switch",
                        "schema": {
                            "type": "object",
                            "items": {
                                "$ref": "#/definitions/queue"
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Queue Configuration"
                ],
                "summary": "Set a queue into a port",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Switch ID",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    },
                    {
                        "name": "flowentry",
                        "in": "body",
                        "description": "Flow information. If OFv1.3 or earlier: 'actions', if OFv1.4 or later: 'instrucions'",
                        "schema": {
                            "$ref": "#/definitions/flowentry"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Flow Info"
                    },
                    "400": {
                        "description": "Invalid ID "
                    },
                    "404": {
                        "description": "Not found"
                    },
                    "405": {
                        "description": "Invalid Input"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Delete Queue Configuration"
                ],
                "summary": "Delete the configuration of a queue",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/qos/rule/{id}": {
            "get": {
                "tags": [
                    "Rule Description"
                ],
                "summary": "Retrieve the rules configuration",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Rule Configuration",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Rule configuration",
                        "schema": {
                            "type": "object",
                            "items": {
                                "$ref": "#/definitions/rule"
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Set QoS rule"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "content",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/rule"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK. Qos ID generated",
                        "schema": {
                            "type": "integer"
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Delete QoS Rule"
                ],
                "summary": "Delete a Qos Rule",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "description": "Switch ID",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "rule_id",
                        "in": "path",
                        "description": "integer || all",
                        "type": "integer",
                        "enum": [
                            "integer",
                            "all"
                        ],
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/qos/meter/{id}": {
            "get": {
                "tags": [
                    "Meter Description"
                ],
                "summary": "Retrieve the meters configuration",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Meter Configuration",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Meter configuration",
                        "schema": {
                            "type": "object",
                            "items": {
                                "$ref": "#/definitions/meter"
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Set QoS Meter"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "description": "switch ID",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "Meter",
                        "description": "Meter",
                        "in": "body",
                        "required": false,
                        "schema": {
                            "$ref": "#/definitions/meter"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Delete QoS meter"
                ],
                "summary": "Delete a Qos Meter",
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "description": "Switch ID",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "meter_id",
                        "in": "path",
                        "description": "Meter ID",
                        "type": "integer",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        }
    },
    "definitions": {
        "portdesc": {
            "type": "object",
            "properties": {
                "dpid": {
                    "type": "integer",
                    "example": 1
                },
                "port_no": {
                    "type": "integer",
                    "example": 1,
                    "default": 0
                },
                "config": {
                    "type": "integer",
                    "example": 1,
                    "default": 0
                },
                "mask": {
                    "type": "integer",
                    "example": 1,
                    "default": 0
                }
            }
        },
        "flowentry": {
            "type": "object",
            "properties": {
                "dpid": {
                    "type": "integer",
                    "example": 1
                },
                "cookie": {
                    "type": "integer",
                    "example": 1
                },
                "cookie_mask": {
                    "type": "integer",
                    "example": 1
                },
                "table_id": {
                    "type": "integer",
                    "example": 0
                },
                "idle_timeout": {
                    "type": "integer",
                    "example": 30
                },
                "hard_timeout": {
                    "type": "integer",
                    "example": 30
                },
                "priority": {
                    "type": "integer",
                    "example": 1111,
                    "minimum": 0,
                    "maximum": 65533
                },
                "buffer_id": {
                    "type": "integer",
                    "example": 1
                },
                "flags": {
                    "type": "integer",
                    "example": 1
                },
                "match": {
                    "$ref": "#/definitions/match"
                },
                "actions": {
                    "type": "array"
                },
                "instructions": {
                    "type": "array"
                }
            }
        },
        "queue": {
            "type": "object",
            "properties": {
                "port_name": {
                    "description": "Name of the port",
                    "type": "string",
                    "default": "OFPP_ANY",
                    "example": "eth1"
                },
                "type": {
                    "description": "linux-htb or linux-other",
                    "type": "string",
                    "enum": [
                        "linux-htb",
                        "linux-other"
                    ]
                },
                "max_rate": {
                    "description": "Bandwith max rate of the queue in bps",
                    "type": "integer"
                },
                "queues": {
                    "type": "object",
                    "properties": {
                        "max_rate": {
                            "description": "Maximum rate of the queue",
                            "type": "integer"
                        },
                        "min_rate": {
                            "description": "Minimum rate of the queue",
                            "type": "integer"
                        }
                    }
                }
            }
        },
        "rule": {
            "type": "object",
            "properties": {
                "priority": {
                    "description": "Priority of the rule between 0 and 65533. When 'priority' has not been set up, priority: 1' is set",
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 65533,
                    "default": 1
                },
                "match": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/match"
                    }
                },
                "actions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/action"
                    }
                }
            }
        },
        "match": {
            "type": "object",
            "properties": {
                "in_port": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 65535
                },
                "dl_src": {
                    "description": "<xx:xx:xx:xx:xx:xx>",
                    "type": "string"
                },
                "dl_dst": {
                    "description": "<xx:xx:xx:xx:xx:xx>",
                    "type": "string"
                },
                "dl_type": {
                    "description": "<ARP or IPv4 or IPv6>",
                    "type": "string",
                    "enum": [
                        "ARP",
                        "IPv4",
                        "IPv6"
                    ]
                },
                "nw_src": {
                    "description": "<A.B.C.D/M>",
                    "type": "string"
                },
                "nw_dst": {
                    "description": "<A.B.C.D/M>",
                    "type": "string"
                },
                "ipv6_src": {
                    "description": "<xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx/M>",
                    "type": "string"
                },
                "ipv6_dst": {
                    "description": "<xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx/M>",
                    "type": "string"
                },
                "nw_proto": {
                    "description": "<TCP or UDP or ICMP or ICMPv6>",
                    "type": "string",
                    "enum": [
                        "TCP",
                        "UDP",
                        "IPCM",
                        "IPCMv6"
                    ]
                },
                "tp_src": {
                    "description": "<int>",
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 65535
                },
                "tp_dst": {
                    "description": "<int>",
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 65535
                },
                "ip_dscp": {
                    "description": "<int>",
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 63
                }
            }
        },
        "action": {
            "type": "array",
            "description": "<field> : <value>",
            "items": {
                "type": "object",
                "properties": {
                    "mark": {
                        "description": "<dscp-value>, sets the IPv4 ToS/DSCP field to tos.",
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 63
                    },
                    "meter": {
                        "description": "meter ID, apply meter entry",
                        "type": "integer"
                    },
                    "queue": {
                        "description": "queue ID, register queue specified by queue-id",
                        "type": "integer"
                    }
                }
            }
        },
        "meter": {
            "type": "object",
            "description": "Meters declaration. The parameters specified in the bands depend on the flag type.",
            "properties": {
                "meter_id": {
                    "type": "integer"
                },
                "bands": {
                    "type": "object",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
                                "DROP",
                                "DSCP_REMARK"
                            ]
                        },
                        "flag": {
                            "type": "string",
                            "enum": [
                                "KBPS",
                                "PKTPS",
                                "BURST",
                                "STATS"
                            ]
                        },
                        "burst_size": {
                            "type": "integer"
                        },
                        "rate": {
                            "type": "integer"
                        },
                        "prec_level": {
                            "description": "Number of drop precedence level to add",
                            "type": "integer"
                        }
                    }
                }
            }
        }
    }
}