#!/bin/bash
# Claude Desktop Approval Script
# Usage: ./scripts/approve-component.sh <component-name>

set -e

COMPONENT_NAME=$1
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: ./scripts/approve-component.sh <component-name>"
  echo "Example: ./scripts/approve-component.sh M3TextField"
  exit 1
fi

# Get component from queue
COMPONENT=$(jq --arg name "$COMPONENT_NAME" '.queue[] | select(.name == $name)' .migration/queue.json)

if [ -z "$COMPONENT" ]; then
  echo "❌ Error: $COMPONENT_NAME not found in queue"
  exit 1
fi

# Add to completed
echo "✅ Approving $COMPONENT_NAME..."
jq --arg name "$COMPONENT_NAME" \
   --arg timestamp "$TIMESTAMP" \
   --argjson component "$COMPONENT" \
   '.completed += [($component + {"approvedAt": $timestamp, "status": "approved"})]' \
   .migration/completed.json > .migration/completed.tmp.json && \
   mv .migration/completed.tmp.json .migration/completed.json

# Remove from queue
jq --arg name "$COMPONENT_NAME" \
   '.queue = [.queue[] | select(.name != $name)]' \
   .migration/queue.json > .migration/queue.tmp.json && \
   mv .migration/queue.tmp.json .migration/queue.json

echo "✅ $COMPONENT_NAME approved and moved to completed"
echo "📊 Queue: $(jq '.queue | length' .migration/queue.json) components remaining"
echo "✅ Completed: $(jq '.completed | length' .migration/completed.json) components total"
