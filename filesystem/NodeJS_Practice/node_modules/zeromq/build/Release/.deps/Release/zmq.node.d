cmd_Release/zmq.node := ln -f "Release/obj.target/zmq.node" "Release/zmq.node" 2>/dev/null || (rm -rf "Release/zmq.node" && cp -af "Release/obj.target/zmq.node" "Release/zmq.node")
