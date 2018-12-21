# INTER-IoT N2N Controller (Ryu-Based)

INTER-IoT project describes `network interoperability` as the quality of communicate devices belonging to different networks or different sub-areas of the same network that belongs to an IoT deployment. 
Thus, to overcome this gap and obtain interoperability, the n2n solution is based on software defined paradigms as SDN and NFV. 
For that purpose INTER-IoT project develop a customized controller to manage SDN networks within the frame of the N2N solution
the is based in the Ryu controller. Ryu is a component-based software defined networking framework that supports the main protocols for managing network
devices, such as OpenFlow, OVSDB, OF-config, etc.

Ryu provides software components with well defined API that has been modified in order to fulfil INTER-IoT requirements
and to communicate with INTER-FW as the main access portal to every interoperability solution.

## Quick Start

To install this controller you must get the source code and install from it as follow::

    % git clone git://github.com/INTER-IoT/n2n-ryu.git
    % cd ryu
    % pip install .
  
In order to execute the main INTER-IoT application you must execute::

    % sh quick_init.sh

## Optional Requirements

Some functionalities of Ryu requires extra packages:

- OF-Config requires `lxml` and `ncclient`
- NETCONF requires `paramiko`
- BGP speaker (SSH console) requires `paramiko`
- Zebra protocol service (database) requires `SQLAlchemy`

If you want to use the functionalities, please install requirements::

    % pip install -r tools/optional-requires

Please refer to tools/optional-requires for details.


## Support & Collaboration

INTER-IoT is an open H2020 project funded by the EU.

_The doc hub of the whole project can be found at:_ `<https://docs.inter-iot.eu/>`

_For the network to network interoperability please refer to:_  `<https://docs.inter-iot.eu/docs/n2n/latest/>`

All code is freely available under the Apache 2.0 license.
