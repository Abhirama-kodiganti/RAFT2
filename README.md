# RAFT3DCC5

## Installation

1. Build the application:

```bash
go build -o raft3dExec ./cmd/server
```

## Running the Cluster

To demonstrate Raft3D, you need to run at least 3 nodes. Here's how to start a 3-node cluster:

### Node 1 (Bootstrap node)

```bash
mkdir -p data/node1
./raft3dExec -id node1 -raft-addr localhost:7000 -raft-dir data/node1 -http-addr localhost:8000 -bootstrap -peers localhost:7001,localhost:7002
```

### Node 2

```bash
mkdir -p data/node2
./raft3dExec -id node2 -raft-addr localhost:7001 -raft-dir data/node2 -http-addr localhost:8001
```

### Node 3

```bash
mkdir -p data/node3
./raft3dExec -id node3 -raft-addr localhost:7002 -raft-dir data/node3 -http-addr localhost:8002
```

